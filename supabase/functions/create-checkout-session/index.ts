import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@14.14.0?target=deno";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

// =============================================
// CORS HEADERS
// =============================================
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// =============================================
// ZOD VALIDATION SCHEMAS
// =============================================
const CreateCheckoutSessionSchema = z.object({
  campaign_id: z.string().uuid(),
  amount: z.number().positive(),
  currency: z.string().default('usd'),
  success_url: z.string().url(),
  cancel_url: z.string().url(),
});

type CreateCheckoutSessionRequest = z.infer<typeof CreateCheckoutSessionSchema>;

// =============================================
// MAIN HANDLER
// =============================================
Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    // =============================================
    // STEP 1: AUTHENTICATE USER
    // =============================================
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const token = authHeader.replace('Bearer ', '');
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      console.error('Authentication failed:', authError);
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Authenticated user:', user.id);

    // =============================================
    // STEP 2: VALIDATE REQUEST BODY
    // =============================================
    let requestBody: CreateCheckoutSessionRequest;
    try {
      const rawBody = await req.json();
      requestBody = CreateCheckoutSessionSchema.parse(rawBody);
    } catch (validationError) {
      console.error('Request validation failed:', validationError);
      return new Response(
        JSON.stringify({ error: 'Invalid request body', details: validationError }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const { campaign_id, amount, currency, success_url, cancel_url } = requestBody;

    // =============================================
    // STEP 3: VERIFY CAMPAIGN OWNERSHIP
    // =============================================
    const { data: campaign, error: campaignError } = await supabase
      .from('campaigns')
      .select('id, brand_id, title, status')
      .eq('id', campaign_id)
      .eq('brand_id', user.id)
      .single();

    if (campaignError || !campaign) {
      console.error('Campaign not found or unauthorized:', campaignError);
      return new Response(
        JSON.stringify({ error: 'Campaign not found or you do not have permission' }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Only allow payment for draft campaigns
    if (campaign.status !== 'draft') {
      return new Response(
        JSON.stringify({ error: 'Campaign is not in draft status' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('Campaign verified:', campaign.id);

    // =============================================
    // STEP 4: CREATE STRIPE CHECKOUT SESSION
    // =============================================
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      throw new Error('STRIPE_SECRET_KEY not configured');
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: `Campaign: ${campaign.title}`,
              description: 'Campaign launch payment - Funds held in escrow',
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url,
      cancel_url,
      metadata: {
        brand_id: user.id,
        campaign_id: campaign.id,
      },
    });

    console.log('Stripe checkout session created:', session.id);

    // =============================================
    // STEP 5: RETURN CHECKOUT URL
    // =============================================
    return new Response(
      JSON.stringify({
        url: session.url,
        session_id: session.id,
        campaign_id: campaign.id,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Checkout session creation error:', error);

    return new Response(
      JSON.stringify({
        error: 'Failed to create checkout session',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
