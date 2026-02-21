-- Add missing columns to contracts table for contract generation support
-- This ensures v_contract_details view has all necessary columns

-- Add missing columns to contracts table
ALTER TABLE public.contracts 
ADD COLUMN IF NOT EXISTS contract_content TEXT, -- Generated contract HTML/text content
ADD COLUMN IF NOT EXISTS contract_hash VARCHAR(64), -- Hash for integrity verification  
ADD COLUMN IF NOT EXISTS terms TEXT, -- Contract terms
ADD COLUMN IF NOT EXISTS created_by UUID; -- Who created the contract

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_contracts_contract_hash ON public.contracts(contract_hash);
CREATE INDEX IF NOT EXISTS idx_contracts_created_by ON public.contracts(created_by);

-- Update the v_contract_details view to include the new columns
CREATE OR REPLACE VIEW public.v_contract_details AS
SELECT
  c.id,
  c.id as contract_id,
  c.transaction_id,
  c.seller_id,
  c.buyer_id,
  c.product_category,
  c.annexure_code,
  c.status,
  c.populated_fields,
  c.total_placeholders,
  c.escrow_amount,
  c.platform_fee,
  c.inspection_deadline,
  c.has_dispute,
  c.dispute_status,
  c.seller_signed_at,
  c.buyer_signed_at,
  c.created_at,
  c.updated_at,
  -- New columns for generated contract content
  c.contract_content,
  c.contract_hash,
  c.terms,
  c.created_by
FROM public.contracts c;

-- Add comment explaining the view
COMMENT ON VIEW public.v_contract_details IS 'Comprehensive view of contract details including generated contract content and metadata';