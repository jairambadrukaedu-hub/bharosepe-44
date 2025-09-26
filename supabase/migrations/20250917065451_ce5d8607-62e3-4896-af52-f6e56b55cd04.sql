-- Update the notifications table type constraint to include dispute_raised
ALTER TABLE notifications DROP CONSTRAINT IF EXISTS notifications_type_check;

-- Add the new constraint with the dispute_raised type
ALTER TABLE notifications ADD CONSTRAINT notifications_type_check 
CHECK (type IN ('contract_received', 'contract_accepted', 'contract_rejected', 'contract_updated', 'dispute_raised', 'payment_received'));