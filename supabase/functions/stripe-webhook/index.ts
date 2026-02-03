import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@14.14.0?target=deno";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

// =============================================
// SECURITY: Stripe Webhook Signature Verification
// =============================================
const STRIPE_WEBHOOK_SIGNING_SECRET = Deno.env.get('STRIPE_WEBHOOK_SECRET');
if (!STRIPE_WEBHOOK_SIGNING_SECRET) {
  throw new Error('STRIPE_WEBHOOK_SECRET environment variable is required');
}

// =============================================
// ZOD VALIDATION SCHEMAS
// =============================================

// Schema for Stripe Checkout Session metadata
const CheckoutSessionMetadataSchema = z.object({
  brand_id: z.string().uuid(),
  campaign_id: z.string().uuid()
});

// Schema for checkout.session.completed event
const CheckoutSessionCompletedSchema = z.object({
  id: z.string(),
  object: z.literal('event'),
  type: z.literal('checkout.session.completed'),
  data: z.object({
    object: z.object({
      id: z.string(),
      object: z.literal('checkout.session'),
      amount_total: z.number(),
      currency: z.string(),
      payment_intent: z.string().nullable(),
      payment_status: z.enum(['paid', 'unpaid', 'no_payment_required']),
      metadata: CheckoutSessionMetadataSchema
    })
  })
});

type CheckoutSessionCompletedEvent = z.infer<typeof CheckoutSessionCompletedSchema>;

// =============================================
// HELPER: Convert Stripe amount (cents) to decimal
// =============================================
function convertStripeAmount(amountInCents: number, currency: string): number {
  // Stripe amounts are in smallest currency unit (cents for USD, IDR has no subunit)
  const zeroDecimalCurrencies = ['BIF', 'CLP', 'DJF', 'GNF', 'JPY', 'KMF', 'KRW', 'MGA', 'PYG', 'RWF', 'UGX', 'VND', 'VUV', 'XAF', 'XOF', 'XPF', 'IDR'];

  if (zeroDecimalCurrencies.includes(currency.toUpperCase())) {
    return amountInCents;
  }

  return amountInCents / 100;
}

// =============================================
// MAIN HANDLER
// =============================================
Deno.serve(async (req) => {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // =============================================
    // STEP 1: VERIFY STRIPE SIGNATURE
    // =============================================
    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      console.error('Missing stripe-signature header');
      return new Response(JSON.stringify({ error: 'Missing signature' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const body = await req.text();
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16'
    });

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        STRIPE_WEBHOOK_SIGNING_SECRET!
      );
    } catch (err) {
      console.error('Stripe signature verification failed:', err);
      return new Response(
        JSON.stringify({ error: 'Invalid signature' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.log(`Verified Stripe event: ${event.id} (${event.type})`);

    // =============================================
    // STEP 2: HANDLE checkout.session.completed
    // =============================================
    if (event.type !== 'checkout.session.completed') {
      console.log(`Ignoring event type: ${event.type}`);
      return new Response(
        JSON.stringify({ received: true, ignored: true, type: event.type }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // =============================================
    // STEP 3: VALIDATE EVENT PAYLOAD WITH ZOD
    // =============================================
    let validatedEvent: CheckoutSessionCompletedEvent;
    try {
      validatedEvent = CheckoutSessionCompletedSchema.parse(event);
    } catch (validationError) {
      console.error('Event validation failed:', validationError);
      return new Response(
        JSON.stringify({ error: 'Invalid event payload', details: validationError }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const session = validatedEvent.data.object;

    // Check payment was successful
    if (session.payment_status !== 'paid') {
      console.log(`Payment not completed. Status: ${session.payment_status}`);
      return new Response(
        JSON.stringify({ received: true, payment_status: session.payment_status }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Extract metadata
    const { brand_id, campaign_id } = session.metadata;
    const amountPaid = convertStripeAmount(session.amount_total, session.currency);

    console.log('Processing payment:', {
      event_id: validatedEvent.id,
      session_id: session.id,
      payment_intent: session.payment_intent,
      brand_id,
      campaign_id,
      amount: amountPaid,
      currency: session.currency
    });

    // =============================================
    // STEP 4: CALL DATABASE RPC (ACID Transaction)
    // =============================================
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error('Missing Supabase environment variables');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    const { data: result, error: rpcError } = await supabase.rpc(
      'process_stripe_checkout_completed',
      {
        _stripe_event_id: validatedEvent.id,
        _stripe_session_id: session.id,
        _stripe_payment_intent_id: session.payment_intent || '',
        _brand_id: brand_id,
        _campaign_id: campaign_id,
        _amount_paid: amountPaid,
        _currency: session.currency,
        _metadata: {
          session_id: session.id,
          payment_intent: session.payment_intent,
          currency: session.currency
        }
      }
    );

    if (rpcError) {
      console.error('RPC function error:', rpcError);

      // Check if error is due to idempotency (already processed)
      if (rpcError.message.includes('already processed')) {
        console.log('Event already processed (idempotent)');
        return new Response(
          JSON.stringify({
            received: true,
            idempotent: true,
            message: 'Event already processed'
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      throw rpcError;
    }

    console.log('Payment processed successfully:', result);

    // =============================================
    // STEP 5: RETURN SUCCESS RESPONSE
    // =============================================
    return new Response(
      JSON.stringify({
        received: true,
        processed: true,
        result
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Webhook handler error:', error);

    // Return 500 to tell Stripe to retry
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
});