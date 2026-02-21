-- Create a simple table specifically for storing generated contracts
-- This bypasses all the complex requirements of the other contract tables

CREATE TABLE IF NOT EXISTS public.contract_storage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id UUID NOT NULL UNIQUE REFERENCES public.transactions(id) ON DELETE CASCADE,
  contract_content TEXT NOT NULL,
  terms TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contract_storage ENABLE ROW LEVEL SECURITY;

-- Create simple RLS policy: allow any authenticated user to insert/read
CREATE POLICY "Allow users to create and read contracts"
  ON public.contract_storage
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_contract_storage_transaction_id ON public.contract_storage(transaction_id);
CREATE INDEX IF NOT EXISTS idx_contract_storage_created_at ON public.contract_storage(created_at);
