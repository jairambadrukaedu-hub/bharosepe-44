-- Fix amount precision issues by changing to INTEGER
-- This prevents floating-point precision errors

-- Change contracts.amount from DECIMAL(10,2) to INTEGER
ALTER TABLE contracts 
ALTER COLUMN amount TYPE INTEGER;

-- Change transactions.amount from DECIMAL to INTEGER if needed
-- (Check current type first)
DO $$ 
BEGIN 
    -- Check if transactions.amount is not already INTEGER
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'transactions' 
        AND column_name = 'amount' 
        AND data_type != 'integer'
    ) THEN
        ALTER TABLE transactions ALTER COLUMN amount TYPE INTEGER;
    END IF;
END $$;

-- Add comment for documentation
COMMENT ON COLUMN contracts.amount IS 'Contract amount in rupees (whole numbers only to avoid floating-point precision issues)';
COMMENT ON COLUMN transactions.amount IS 'Transaction amount in rupees (whole numbers only to avoid floating-point precision issues)';