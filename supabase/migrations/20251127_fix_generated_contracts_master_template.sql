-- Make master_template_id optional in generated_contracts table
-- This allows us to store generated contracts without requiring a template reference

ALTER TABLE IF EXISTS public.generated_contracts
ALTER COLUMN master_template_id DROP NOT NULL;
