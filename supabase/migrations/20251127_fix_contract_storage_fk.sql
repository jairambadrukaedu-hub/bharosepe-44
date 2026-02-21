-- Remove the problematic foreign key constraint from contract_storage
-- This table is a fallback storage mechanism and doesn't need to reference transactions

BEGIN;

-- Drop the foreign key constraint
ALTER TABLE IF EXISTS public.contract_storage 
DROP CONSTRAINT IF EXISTS contract_storage_transaction_id_fkey;

-- Recreate the table without the foreign key if needed, or just ensure the constraint is dropped
-- transaction_id remains UUID NOT NULL but as a simple reference, not a foreign key

COMMIT;
