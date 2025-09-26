-- Update transactions table to support new statuses
ALTER TABLE public.transactions 
DROP CONSTRAINT IF EXISTS transactions_status_check;

ALTER TABLE public.transactions 
ADD CONSTRAINT transactions_status_check 
CHECK (status IN ('created', 'contract_sent', 'contract_accepted', 'payment_made', 'work_completed', 'in-progress', 'completed', 'disputed', 'cancelled'));

-- Add new columns for enhanced tracking
ALTER TABLE public.transactions 
ADD COLUMN IF NOT EXISTS dispute_reason TEXT,
ADD COLUMN IF NOT EXISTS work_marked_done_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS payment_released_at TIMESTAMP WITH TIME ZONE;