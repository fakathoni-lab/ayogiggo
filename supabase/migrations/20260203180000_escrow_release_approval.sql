-- =============================================
-- ESCROW RELEASE & SUBMISSION APPROVAL SYSTEM
-- =============================================
-- This migration implements:
-- 1. Atomic RPC function for approving submissions and releasing escrow funds
-- 2. ACID-compliant transaction that:
--    - Verifies Brand ownership
--    - Updates Submission status to 'APPROVED'
--    - Moves funds from Brand's pending_balance to Creator's available_balance
--    - Creates immutable audit trail in transaction_ledgers
--    - Sends notification to Creator
-- =============================================

-- =============================================
-- 1. ATOMIC RPC FUNCTION FOR SUBMISSION APPROVAL & ESCROW RELEASE
-- =============================================
CREATE OR REPLACE FUNCTION public.approve_submission_and_release_escrow(
  _submission_id UUID,
  _brand_user_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _submission RECORD;
  _campaign RECORD;
  _brand_wallet_id UUID;
  _creator_wallet_id UUID;
  _brand_balance_before NUMERIC;
  _brand_pending_before NUMERIC;
  _brand_balance_after NUMERIC;
  _brand_pending_after NUMERIC;
  _creator_balance_before NUMERIC;
  _creator_pending_before NUMERIC;
  _creator_balance_after NUMERIC;
  _creator_pending_after NUMERIC;
  _amount NUMERIC;
  _brand_ledger_id UUID;
  _creator_ledger_id UUID;
  _notification_id BIGINT;
BEGIN
  -- =============================================
  -- STEP 1: VERIFY SUBMISSION EXISTS AND GET DATA
  -- =============================================
  SELECT s.*, c.brand_id, c.prize_money, c.title
  INTO _submission
  FROM public.submissions s
  JOIN public.campaigns c ON s.campaign_id = c.id
  WHERE s.id = _submission_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Submission not found';
  END IF;

  -- =============================================
  -- STEP 2: VERIFY BRAND OWNERSHIP (Zero Trust)
  -- =============================================
  IF _submission.brand_id != _brand_user_id THEN
    RAISE EXCEPTION 'Unauthorized: You do not own this campaign';
  END IF;

  -- =============================================
  -- STEP 3: VERIFY SUBMISSION CAN BE APPROVED
  -- =============================================
  IF _submission.status = 'approved' THEN
    RAISE EXCEPTION 'Submission already approved';
  END IF;

  IF _submission.status = 'declined' THEN
    RAISE EXCEPTION 'Cannot approve a declined submission';
  END IF;

  -- =============================================
  -- STEP 4: GET CAMPAIGN AMOUNT
  -- =============================================
  _amount := _submission.prize_money;

  IF _amount IS NULL OR _amount <= 0 THEN
    RAISE EXCEPTION 'Invalid campaign prize amount';
  END IF;

  -- =============================================
  -- STEP 5: GET OR CREATE BRAND WALLET
  -- =============================================
  SELECT id, balance, pending_balance
  INTO _brand_wallet_id, _brand_balance_before, _brand_pending_before
  FROM public.wallets
  WHERE user_id = _brand_user_id;

  IF _brand_wallet_id IS NULL THEN
    INSERT INTO public.wallets (user_id, balance, pending_balance)
    VALUES (_brand_user_id, 0, 0)
    RETURNING id, balance, pending_balance
    INTO _brand_wallet_id, _brand_balance_before, _brand_pending_before;
  END IF;

  -- =============================================
  -- STEP 6: VERIFY BRAND HAS SUFFICIENT ESCROW
  -- =============================================
  IF _brand_pending_before < _amount THEN
    RAISE EXCEPTION 'Insufficient escrow balance. Required: %, Available: %', _amount, _brand_pending_before;
  END IF;

  -- =============================================
  -- STEP 7: GET OR CREATE CREATOR WALLET
  -- =============================================
  SELECT id, balance, pending_balance
  INTO _creator_wallet_id, _creator_balance_before, _creator_pending_before
  FROM public.wallets
  WHERE user_id = _submission.creator_id;

  IF _creator_wallet_id IS NULL THEN
    INSERT INTO public.wallets (user_id, balance, pending_balance)
    VALUES (_submission.creator_id, 0, 0)
    RETURNING id, balance, pending_balance
    INTO _creator_wallet_id, _creator_balance_before, _creator_pending_before;
  END IF;

  -- =============================================
  -- STEP 8: UPDATE SUBMISSION STATUS TO 'APPROVED'
  -- =============================================
  UPDATE public.submissions
  SET status = 'approved',
      reviewed_at = now(),
      updated_at = now()
  WHERE id = _submission_id;

  -- =============================================
  -- STEP 9: DEDUCT FROM BRAND'S PENDING BALANCE
  -- =============================================
  UPDATE public.wallets
  SET pending_balance = pending_balance - _amount,
      updated_at = now()
  WHERE id = _brand_wallet_id
  RETURNING balance, pending_balance INTO _brand_balance_after, _brand_pending_after;

  -- =============================================
  -- STEP 10: ADD TO CREATOR'S AVAILABLE BALANCE
  -- =============================================
  UPDATE public.wallets
  SET balance = balance + _amount,
      updated_at = now()
  WHERE id = _creator_wallet_id
  RETURNING balance, pending_balance INTO _creator_balance_after, _creator_pending_after;

  -- =============================================
  -- STEP 11: CREATE BRAND LEDGER ENTRY (RELEASE)
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
    description,
    metadata
  )
  VALUES (
    _brand_user_id,
    _brand_wallet_id,
    _amount,
    'escrow_release',
    'success',
    _brand_balance_before,
    _brand_balance_after,
    _brand_pending_before,
    _brand_pending_after,
    _submission.campaign_id,
    'campaign_approval',
    format('Escrow released: Submission approved for campaign "%s"', _submission.title),
    jsonb_build_object(
      'submission_id', _submission_id,
      'creator_id', _submission.creator_id,
      'campaign_id', _submission.campaign_id
    )
  )
  RETURNING id INTO _brand_ledger_id;

  -- =============================================
  -- STEP 12: CREATE CREATOR LEDGER ENTRY (EARNING)
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
    description,
    metadata
  )
  VALUES (
    _submission.creator_id,
    _creator_wallet_id,
    _amount,
    'earning',
    'success',
    _creator_balance_before,
    _creator_balance_after,
    _creator_pending_before,
    _creator_pending_after,
    _submission.campaign_id,
    'campaign_approval',
    format('Earnings received: Work approved for campaign "%s"', _submission.title),
    jsonb_build_object(
      'submission_id', _submission_id,
      'brand_id', _brand_user_id,
      'campaign_id', _submission.campaign_id
    )
  )
  RETURNING id INTO _creator_ledger_id;

  -- =============================================
  -- STEP 13: SEND NOTIFICATION TO CREATOR
  -- =============================================
  -- Check if notifications table exists (EZSite table)
  IF EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_name = 'notifications'
  ) THEN
    -- Insert notification using EZSite table structure
    INSERT INTO public.notifications (
      user_id,
      type,
      title,
      message,
      is_read,
      metadata
    )
    VALUES (
      _submission.creator_id::TEXT,
      'payment',
      'Work Approved! 🎉',
      format('Your submission for "%s" has been approved! $%s has been released to your wallet.', _submission.title, _amount),
      false,
      jsonb_build_object(
        'campaign_id', _submission.campaign_id,
        'submission_id', _submission_id,
        'amount', _amount
      )::TEXT
    )
    RETURNING id INTO _notification_id;
  END IF;

  -- =============================================
  -- STEP 14: RETURN SUCCESS RESULT
  -- =============================================
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Submission approved and funds released successfully',
    'submission_id', _submission_id,
    'brand_ledger_id', _brand_ledger_id,
    'creator_ledger_id', _creator_ledger_id,
    'amount_released', _amount,
    'brand_pending_balance', _brand_pending_after,
    'creator_available_balance', _creator_balance_after,
    'notification_id', _notification_id
  );

EXCEPTION
  WHEN OTHERS THEN
    -- =============================================
    -- ERROR HANDLING: Rollback transaction
    -- =============================================
    RAISE EXCEPTION 'Approval failed: %', SQLERRM;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.approve_submission_and_release_escrow TO authenticated;

-- =============================================
-- 2. HELPER FUNCTION: Get Submission Review Status
-- =============================================
CREATE OR REPLACE FUNCTION public.can_approve_submission(
  _submission_id UUID,
  _brand_user_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _result JSONB;
  _submission RECORD;
  _brand_wallet RECORD;
BEGIN
  -- Get submission and campaign data
  SELECT s.*, c.brand_id, c.prize_money, c.title
  INTO _submission
  FROM public.submissions s
  JOIN public.campaigns c ON s.campaign_id = c.id
  WHERE s.id = _submission_id;

  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'can_approve', false,
      'reason', 'Submission not found'
    );
  END IF;

  -- Check ownership
  IF _submission.brand_id != _brand_user_id THEN
    RETURN jsonb_build_object(
      'can_approve', false,
      'reason', 'Unauthorized: You do not own this campaign'
    );
  END IF;

  -- Check status
  IF _submission.status = 'approved' THEN
    RETURN jsonb_build_object(
      'can_approve', false,
      'reason', 'Submission already approved'
    );
  END IF;

  IF _submission.status = 'declined' THEN
    RETURN jsonb_build_object(
      'can_approve', false,
      'reason', 'Cannot approve a declined submission'
    );
  END IF;

  -- Check brand wallet escrow
  SELECT balance, pending_balance
  INTO _brand_wallet
  FROM public.wallets
  WHERE user_id = _brand_user_id;

  IF _brand_wallet IS NULL OR _brand_wallet.pending_balance < _submission.prize_money THEN
    RETURN jsonb_build_object(
      'can_approve', false,
      'reason', format('Insufficient escrow balance. Required: %s, Available: %s',
        COALESCE(_submission.prize_money, 0),
        COALESCE(_brand_wallet.pending_balance, 0))
    );
  END IF;

  -- All checks passed
  RETURN jsonb_build_object(
    'can_approve', true,
    'amount', _submission.prize_money,
    'creator_id', _submission.creator_id,
    'campaign_title', _submission.title
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.can_approve_submission TO authenticated;

-- =============================================
-- MIGRATION COMPLETE
-- =============================================
