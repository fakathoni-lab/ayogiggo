-- =============================================
-- ESCROW LEDGER SYSTEM & STRIPE INTEGRATION
-- =============================================
-- This migration implements:
-- 1. Immutable transaction_ledgers table for audit trails
-- 2. webhook_events table for idempotency tracking
-- 3. Enhanced wallets table (already has pending_balance from previous migration)
-- 4. Atomic RPC function for Stripe checkout.session.completed
-- =============================================

-- =============================================
-- 1. TRANSACTION LEDGERS TABLE (Immutable Audit Trail)
-- =============================================
CREATE TABLE IF NOT EXISTS public.transaction_ledgers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  wallet_id UUID NOT NULL REFERENCES public.wallets(id) ON DELETE RESTRICT,

  -- Transaction details
  amount NUMERIC(15, 2) NOT NULL,
  transaction_type public.transaction_type NOT NULL,
  status public.transaction_status NOT NULL,

  -- Balance snapshots (immutable audit trail)
  balance_before NUMERIC(15, 2) NOT NULL,
  balance_after NUMERIC(15, 2) NOT NULL,
  pending_balance_before NUMERIC(15, 2) NOT NULL,
  pending_balance_after NUMERIC(15, 2) NOT NULL,

  -- External references
  reference_id UUID, -- campaign_id, application_id, etc.
  reference_type TEXT, -- 'campaign', 'application', 'payout', etc.
  stripe_payment_intent_id TEXT,
  stripe_session_id TEXT,

  -- Metadata
  description TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,

  -- Immutability: once created, never updated
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

  CONSTRAINT positive_amount CHECK (amount > 0),
  CONSTRAINT valid_balance_before CHECK (balance_before >= 0),
  CONSTRAINT valid_balance_after CHECK (balance_after >= 0),
  CONSTRAINT valid_pending_before CHECK (pending_balance_before >= 0),
  CONSTRAINT valid_pending_after CHECK (pending_balance_after >= 0)
);

-- Indexes for fast querying
CREATE INDEX IF NOT EXISTS idx_ledgers_user_id ON public.transaction_ledgers(user_id);
CREATE INDEX IF NOT EXISTS idx_ledgers_wallet_id ON public.transaction_ledgers(wallet_id);
CREATE INDEX IF NOT EXISTS idx_ledgers_reference_id ON public.transaction_ledgers(reference_id);
CREATE INDEX IF NOT EXISTS idx_ledgers_stripe_session ON public.transaction_ledgers(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_ledgers_created_at ON public.transaction_ledgers(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ledgers_type ON public.transaction_ledgers(transaction_type);

-- Enable RLS
ALTER TABLE public.transaction_ledgers ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only view their own ledger entries
CREATE POLICY "Users can view their own transaction ledgers"
ON public.transaction_ledgers FOR SELECT
USING (auth.uid() = user_id);

-- Prevent updates and deletes (immutable table)
CREATE POLICY "Prevent updates on ledgers"
ON public.transaction_ledgers FOR UPDATE
USING (false);

CREATE POLICY "Prevent deletes on ledgers"
ON public.transaction_ledgers FOR DELETE
USING (false);

-- Only system can insert (via RPC functions)
CREATE POLICY "System can insert ledgers"
ON public.transaction_ledgers FOR INSERT
WITH CHECK (false); -- Only SECURITY DEFINER functions can bypass this

-- =============================================
-- 2. WEBHOOK EVENTS TABLE (Idempotency Tracking)
-- =============================================
CREATE TABLE IF NOT EXISTS public.webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Stripe event details
  stripe_event_id TEXT NOT NULL UNIQUE, -- Ensures idempotency
  event_type TEXT NOT NULL,

  -- Processing status
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'processing', 'success', 'failed'
  processed_at TIMESTAMP WITH TIME ZONE,

  -- Payload and result
  payload JSONB NOT NULL,
  result JSONB,
  error_message TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

  CONSTRAINT valid_status CHECK (status IN ('pending', 'processing', 'success', 'failed'))
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_webhook_events_stripe_id ON public.webhook_events(stripe_event_id);
CREATE INDEX IF NOT EXISTS idx_webhook_events_status ON public.webhook_events(status);
CREATE INDEX IF NOT EXISTS idx_webhook_events_type ON public.webhook_events(event_type);
CREATE INDEX IF NOT EXISTS idx_webhook_events_created_at ON public.webhook_events(created_at DESC);

-- Enable RLS (admin only access)
ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;

-- Only admins can view webhook events
CREATE POLICY "Admins can view webhook events"
ON public.webhook_events FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- No direct insert/update/delete from clients
CREATE POLICY "Prevent client webhook manipulation"
ON public.webhook_events FOR ALL
USING (false);

-- Trigger for updated_at
CREATE TRIGGER update_webhook_events_updated_at
BEFORE UPDATE ON public.webhook_events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================
-- 3. ATOMIC RPC FUNCTION FOR STRIPE PAYMENT
-- =============================================
-- This function handles checkout.session.completed webhook
-- ACID compliant: Either everything succeeds or everything rolls back
-- =============================================

CREATE OR REPLACE FUNCTION public.process_stripe_checkout_completed(
  _stripe_event_id TEXT,
  _stripe_session_id TEXT,
  _stripe_payment_intent_id TEXT,
  _brand_id UUID,
  _campaign_id UUID,
  _amount_paid NUMERIC,
  _currency TEXT,
  _metadata JSONB DEFAULT '{}'::jsonb
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _wallet_id UUID;
  _balance_before NUMERIC;
  _pending_before NUMERIC;
  _balance_after NUMERIC;
  _pending_after NUMERIC;
  _ledger_id UUID;
  _webhook_event_id UUID;
  _existing_event_id UUID;
BEGIN
  -- =============================================
  -- STEP 1: IDEMPOTENCY CHECK
  -- =============================================
  -- Check if this Stripe event has already been processed
  SELECT id INTO _existing_event_id
  FROM public.webhook_events
  WHERE stripe_event_id = _stripe_event_id
    AND status = 'success';

  IF _existing_event_id IS NOT NULL THEN
    -- Event already processed, return success (idempotent)
    RETURN jsonb_build_object(
      'success', true,
      'message', 'Event already processed (idempotent)',
      'webhook_event_id', _existing_event_id
    );
  END IF;

  -- =============================================
  -- STEP 2: RECORD WEBHOOK EVENT (Processing)
  -- =============================================
  INSERT INTO public.webhook_events (
    stripe_event_id,
    event_type,
    status,
    payload
  )
  VALUES (
    _stripe_event_id,
    'checkout.session.completed',
    'processing',
    jsonb_build_object(
      'session_id', _stripe_session_id,
      'payment_intent_id', _stripe_payment_intent_id,
      'amount', _amount_paid,
      'currency', _currency,
      'brand_id', _brand_id,
      'campaign_id', _campaign_id,
      'metadata', _metadata
    )
  )
  RETURNING id INTO _webhook_event_id;

  -- =============================================
  -- STEP 3: GET OR CREATE BRAND WALLET
  -- =============================================
  SELECT id, balance, pending_balance
  INTO _wallet_id, _balance_before, _pending_before
  FROM public.wallets
  WHERE user_id = _brand_id;

  IF _wallet_id IS NULL THEN
    -- Create wallet if doesn't exist
    INSERT INTO public.wallets (user_id, balance, pending_balance)
    VALUES (_brand_id, 0, 0)
    RETURNING id, balance, pending_balance
    INTO _wallet_id, _balance_before, _pending_before;
  END IF;

  -- =============================================
  -- STEP 4: UPDATE WALLET (Add to Pending/Escrow)
  -- =============================================
  -- Add paid amount to pending_balance (escrow hold)
  UPDATE public.wallets
  SET pending_balance = pending_balance + _amount_paid,
      updated_at = now()
  WHERE id = _wallet_id
  RETURNING balance, pending_balance INTO _balance_after, _pending_after;

  -- =============================================
  -- STEP 5: CREATE IMMUTABLE LEDGER ENTRY
  -- =============================================
  INSERT INTO public.transaction_ledgers (
    user_id,
    wallet_id,
    amount,
    transaction_type,
    status,
    balance_before,
    balance_after,
    pending_balance_before,
    pending_balance_after,
    reference_id,
    reference_type,
    stripe_payment_intent_id,
    stripe_session_id,
    description,
    metadata
  )
  VALUES (
    _brand_id,
    _wallet_id,
    _amount_paid,
    'escrow_hold',
    'success',
    _balance_before,
    _balance_after,
    _pending_before,
    _pending_after,
    _campaign_id,
    'campaign',
    _stripe_payment_intent_id,
    _stripe_session_id,
    format('Escrow hold: Campaign payment (Session: %s)', _stripe_session_id),
    _metadata
  )
  RETURNING id INTO _ledger_id;

  -- =============================================
  -- STEP 6: UPDATE CAMPAIGN STATUS TO 'LIVE'
  -- =============================================
  UPDATE public.campaigns
  SET status = 'live',
      updated_at = now()
  WHERE id = _campaign_id
    AND brand_id = _brand_id
    AND status = 'draft'; -- Only activate if currently draft

  -- =============================================
  -- STEP 7: MARK WEBHOOK EVENT AS SUCCESS
  -- =============================================
  UPDATE public.webhook_events
  SET status = 'success',
      processed_at = now(),
      result = jsonb_build_object(
        'ledger_id', _ledger_id,
        'wallet_id', _wallet_id,
        'campaign_id', _campaign_id,
        'amount', _amount_paid,
        'balance_after', _balance_after,
        'pending_balance_after', _pending_after
      )
  WHERE id = _webhook_event_id;

  -- =============================================
  -- STEP 8: RETURN SUCCESS RESULT
  -- =============================================
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Payment processed successfully',
    'webhook_event_id', _webhook_event_id,
    'ledger_id', _ledger_id,
    'wallet_id', _wallet_id,
    'campaign_id', _campaign_id,
    'amount_paid', _amount_paid,
    'pending_balance', _pending_after
  );

EXCEPTION
  WHEN OTHERS THEN
    -- =============================================
    -- ERROR HANDLING: Mark webhook as failed
    -- =============================================
    UPDATE public.webhook_events
    SET status = 'failed',
        processed_at = now(),
        error_message = SQLERRM
    WHERE id = _webhook_event_id;

    -- Re-raise error to rollback transaction
    RAISE EXCEPTION 'Payment processing failed: %', SQLERRM;
END;
$$;

-- Grant execute permission to service role
GRANT EXECUTE ON FUNCTION public.process_stripe_checkout_completed TO service_role;

-- =============================================
-- 4. HELPER FUNCTION: Get User Wallet Summary
-- =============================================
CREATE OR REPLACE FUNCTION public.get_wallet_summary(_user_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _result JSONB;
BEGIN
  SELECT jsonb_build_object(
    'wallet_id', w.id,
    'user_id', w.user_id,
    'available_balance', w.balance,
    'pending_balance', w.pending_balance,
    'total_balance', w.balance + w.pending_balance,
    'created_at', w.created_at,
    'updated_at', w.updated_at
  )
  INTO _result
  FROM public.wallets w
  WHERE w.user_id = _user_id;

  IF _result IS NULL THEN
    RETURN jsonb_build_object(
      'wallet_id', null,
      'user_id', _user_id,
      'available_balance', 0,
      'pending_balance', 0,
      'total_balance', 0,
      'message', 'Wallet not found'
    );
  END IF;

  RETURN _result;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_wallet_summary TO authenticated;

-- =============================================
-- MIGRATION COMPLETE
-- =============================================
