-- Add unique constraint to contract_form_data table for contract_id
-- This fixes the "no unique or exclusion constraint matching the ON CONFLICT specification" error

ALTER TABLE contract_form_data
ADD CONSTRAINT unique_contract_id UNIQUE (contract_id);

-- Add index for better performance on contract_id queries
CREATE INDEX IF NOT EXISTS idx_contract_form_data_contract_id 
ON contract_form_data (contract_id);

-- Add index for better performance on seller_id queries
CREATE INDEX IF NOT EXISTS idx_contract_form_data_seller_id 
ON contract_form_data (seller_id);

-- Add index for better performance on product_category queries
CREATE INDEX IF NOT EXISTS idx_contract_form_data_product_category 
ON contract_form_data (product_category);