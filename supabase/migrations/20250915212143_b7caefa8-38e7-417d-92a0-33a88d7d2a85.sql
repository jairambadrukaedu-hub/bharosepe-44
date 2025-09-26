-- Fix contract statuses step by step
DO $$ 
BEGIN
  -- First update existing contracts to new status names
  UPDATE contracts 
  SET status = CASE 
    WHEN status = 'sent' OR status = 'pending' THEN 'awaiting_acceptance'
    WHEN status = 'accepted' THEN 'accepted_awaiting_payment'
    WHEN status = 'rejected' THEN 'rejected'
    WHEN status = 'draft' THEN 'draft'
    WHEN status = 'active' THEN 'accepted_awaiting_payment'
    WHEN status = 'completed' THEN 'accepted_awaiting_payment'
    ELSE 'awaiting_acceptance'
  END;
  
  -- Drop the existing status check constraint
  ALTER TABLE contracts DROP CONSTRAINT IF EXISTS contracts_status_check;
  
  -- Add new constraint with updated status values
  ALTER TABLE contracts ADD CONSTRAINT contracts_status_check 
    CHECK (status IN ('draft', 'awaiting_acceptance', 'accepted_awaiting_payment', 'rejected', 'expired'));
  
  -- Add role fields to contracts for proper role resolution
  ALTER TABLE contracts 
  ADD COLUMN IF NOT EXISTS initiator_role text CHECK (initiator_role IN ('buyer', 'seller')),
  ADD COLUMN IF NOT EXISTS counterparty_role text CHECK (counterparty_role IN ('buyer', 'seller'));
  
END $$;