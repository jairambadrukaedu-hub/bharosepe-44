-- Add amount field to contracts table to support amount changes in revisions
ALTER TABLE public.contracts 
ADD COLUMN amount DECIMAL(10,2);

-- Update existing contracts to use their transaction amounts as default
UPDATE public.contracts 
SET amount = (
  SELECT t.amount 
  FROM public.transactions t 
  WHERE t.id = contracts.transaction_id
)
WHERE amount IS NULL;