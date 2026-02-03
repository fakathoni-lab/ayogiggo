# Stripe Integration & Escrow System Setup Guide

## Overview

This guide covers the setup and configuration of the banking-grade Stripe integration with escrow ledger system for the Giggo Creator Marketplace.

## Architecture

### Payment Flow
1. **Brand Initiates Payment** → Stripe Checkout Session created
2. **Payment Successful** → Stripe webhook `checkout.session.completed` fired
3. **Webhook Handler** → Verifies signature → Calls atomic RPC function
4. **Database Transaction** → Updates wallet, creates ledger entry, activates campaign
5. **Funds in Escrow** → Money held in `pending_balance` until work approved

### Security Features
- ✅ **Stripe Signature Verification** - Prevents webhook spoofing
- ✅ **Idempotency** - Prevents duplicate processing via `webhook_events` table
- ✅ **ACID Compliance** - All-or-nothing database transactions
- ✅ **Immutable Audit Trail** - `transaction_ledgers` table (insert-only)
- ✅ **Type Safety** - Zod validation for all webhook payloads
- ✅ **RLS Policies** - Row-level security on all tables

## Required Environment Variables

### Supabase Edge Function Secrets

You need to configure the following secrets in your Supabase project:

```bash
# Navigate to Supabase Dashboard > Project Settings > Edge Functions > Secrets

STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_signing_secret_here

# These are automatically available in Supabase Edge Functions:
# SUPABASE_URL
# SUPABASE_SERVICE_ROLE_KEY
```

### Setting Secrets via CLI

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Link to your project
supabase link --project-ref your_project_id

# Set secrets
supabase secrets set STRIPE_SECRET_KEY=sk_test_...
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...

# Verify secrets
supabase secrets list
```

## Database Migration

### Apply Migration

```bash
# Run migration to create tables and functions
supabase db push

# Or if using Supabase Studio:
# Go to SQL Editor → Run the migration file:
# supabase/migrations/20260203175056_escrow_ledger_system.sql
```

### What Gets Created

1. **`transaction_ledgers`** - Immutable audit log
   - Captures balance snapshots before/after each transaction
   - Includes Stripe payment_intent_id and session_id
   - Cannot be updated or deleted (enforced by RLS)

2. **`webhook_events`** - Idempotency tracking
   - Stores Stripe event_id (unique constraint)
   - Tracks processing status: pending → processing → success/failed
   - Prevents duplicate webhook processing

3. **RPC Functions**:
   - `process_stripe_checkout_completed()` - Atomic payment processing
   - `get_wallet_summary()` - User wallet query helper

## Stripe Dashboard Configuration

### 1. Get API Keys

```
Stripe Dashboard → Developers → API Keys
- Publishable key: pk_test_... (for frontend)
- Secret key: sk_test_... (for backend/webhook)
```

### 2. Create Webhook Endpoint

```
Stripe Dashboard → Developers → Webhooks → Add endpoint

Endpoint URL: https://your_project_id.supabase.co/functions/v1/stripe-webhook

Events to listen:
✅ checkout.session.completed

Description: Giggo Campaign Payment Webhook
```

### 3. Get Webhook Signing Secret

After creating the webhook endpoint:
```
Click on the endpoint → Signing secret (whsec_...)
```

This is your `STRIPE_WEBHOOK_SECRET` - add it to Supabase secrets!

## Deploy Edge Function

```bash
# Deploy the webhook handler
supabase functions deploy stripe-webhook

# Test the function
supabase functions invoke stripe-webhook --method POST \
  --body '{"test": true}'
```

## Frontend Integration Example

### Create Stripe Checkout Session

```typescript
import { supabase } from '@/lib/supabase';

async function initiatePayment(campaignId: string, amount: number) {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Not authenticated');

  // Create Stripe checkout session (you need to create this Edge Function)
  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout-session`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
      },
      body: JSON.stringify({
        campaign_id: campaignId,
        amount: amount,
        success_url: `${window.location.origin}/campaigns/${campaignId}/success`,
        cancel_url: `${window.location.origin}/campaigns/${campaignId}/cancel`,
      }),
    }
  );

  const { url } = await response.json();

  // Redirect to Stripe Checkout
  window.location.href = url;
}
```

### Create Checkout Session Edge Function (Recommended)

Create `supabase/functions/create-checkout-session/index.ts`:

```typescript
import Stripe from "https://esm.sh/stripe@14.14.0?target=deno";

Deno.serve(async (req) => {
  const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
    apiVersion: '2023-10-16',
  });

  const { campaign_id, amount, success_url, cancel_url } = await req.json();

  // Get user from JWT
  const authHeader = req.headers.get('Authorization')!;
  const token = authHeader.replace('Bearer ', '');
  const { data: { user } } = await createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!
  ).auth.getUser(token);

  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Campaign Payment - ${campaign_id}`,
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
      campaign_id,
    },
  });

  return new Response(JSON.stringify({ url: session.url }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
```

## Testing

### Test Webhook Locally

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe
# or: https://stripe.com/docs/stripe-cli

# Login
stripe login

# Forward webhooks to local Supabase
stripe listen --forward-to http://localhost:54321/functions/v1/stripe-webhook

# Trigger test event
stripe trigger checkout.session.completed
```

### Test Cards

```
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
```

## Monitoring & Debugging

### Check Webhook Status

```sql
-- View recent webhook events
SELECT
  stripe_event_id,
  event_type,
  status,
  processed_at,
  error_message,
  created_at
FROM webhook_events
ORDER BY created_at DESC
LIMIT 20;
```

### Check Transaction Ledgers

```sql
-- View recent ledger entries
SELECT
  user_id,
  amount,
  transaction_type,
  balance_after,
  pending_balance_after,
  description,
  stripe_session_id,
  created_at
FROM transaction_ledgers
ORDER BY created_at DESC
LIMIT 20;
```

### Check Wallet Balances

```sql
-- Get wallet summary for a user
SELECT get_wallet_summary('user_id_here');
```

## Error Handling

### Common Issues

1. **"Missing signature"**
   - Stripe-Signature header missing
   - Check webhook configuration in Stripe Dashboard

2. **"Invalid signature"**
   - Wrong `STRIPE_WEBHOOK_SECRET`
   - Verify secret matches webhook endpoint

3. **"Event already processed"**
   - Idempotency working correctly
   - Duplicate webhook - ignored safely

4. **RPC Function Errors**
   - Check Supabase logs
   - Verify migration applied correctly
   - Check wallet exists for user

## Production Checklist

- [ ] Replace test Stripe keys with live keys (`sk_live_...`, `pk_live_...`)
- [ ] Update webhook endpoint URL to production domain
- [ ] Configure production webhook secret
- [ ] Test full payment flow in production
- [ ] Set up Stripe webhook monitoring/alerts
- [ ] Configure database backups
- [ ] Enable Supabase Edge Function logs retention
- [ ] Document support process for failed payments
- [ ] Set up monitoring dashboard for wallet balances

## Security Notes

1. **NEVER expose `STRIPE_SECRET_KEY` or `STRIPE_WEBHOOK_SECRET` to client**
2. **ALWAYS verify Stripe signatures** (implemented in webhook handler)
3. **Use service_role key ONLY in Edge Functions** (server-side)
4. **RLS policies** prevent unauthorized access to sensitive data
5. **Immutable ledger** provides complete audit trail for compliance

## Support & Resources

- Stripe Webhook Docs: https://stripe.com/docs/webhooks
- Supabase Edge Functions: https://supabase.com/docs/guides/functions
- Stripe Testing: https://stripe.com/docs/testing
- Webhook Best Practices: https://stripe.com/docs/webhooks/best-practices

---

**Implementation Status**: ✅ Complete
**Security Level**: Banking-grade
**ACID Compliant**: Yes
**Idempotent**: Yes
