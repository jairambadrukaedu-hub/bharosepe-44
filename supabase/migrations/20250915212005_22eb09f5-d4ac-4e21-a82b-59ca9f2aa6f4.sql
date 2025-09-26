-- Update contract status enum to match new flow
DO $$ 
BEGIN
  -- Update existing contracts to new status names
  UPDATE contracts 
  SET status = CASE 
    WHEN status = 'sent' OR status = 'pending' THEN 'awaiting_acceptance'
    WHEN status = 'accepted' THEN 'accepted_awaiting_payment'
    WHEN status = 'rejected' THEN 'rejected'
    WHEN status = 'draft' THEN 'draft'
    ELSE 'awaiting_acceptance'
  END;
  
  -- Add role fields to contracts for proper role resolution
  ALTER TABLE contracts 
  ADD COLUMN IF NOT EXISTS initiator_role text CHECK (initiator_role IN ('buyer', 'seller')),
  ADD COLUMN IF NOT EXISTS counterparty_role text CHECK (counterparty_role IN ('buyer', 'seller'));
  
END $$;