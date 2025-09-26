-- Add resolution breakdown tracking to transactions table
ALTER TABLE public.transactions 
ADD COLUMN resolution_breakdown JSONB DEFAULT NULL;

-- Add comment for documentation
COMMENT ON COLUMN public.transactions.resolution_breakdown IS 'Stores breakdown of dispute resolution: {buyer_refund: amount, seller_release: amount, resolution_type: string}';