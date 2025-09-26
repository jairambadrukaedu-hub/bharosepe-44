-- Manual SQL script to add amount column to contracts table
-- Run this in Supabase SQL Editor if the migration hasn't been applied

-- Check if amount column exists
DO $$ 
BEGIN
    -- Try to add the column, ignore error if it already exists
    BEGIN
        ALTER TABLE public.contracts ADD COLUMN amount DECIMAL(10,2);
        
        -- Update existing contracts to use their transaction amounts as default
        UPDATE public.contracts 
        SET amount = (
            SELECT t.amount 
            FROM public.transactions t 
            WHERE t.id = contracts.transaction_id
        )
        WHERE amount IS NULL;
        
        RAISE NOTICE 'Amount column added successfully to contracts table';
    EXCEPTION
        WHEN duplicate_column THEN
            RAISE NOTICE 'Amount column already exists in contracts table';
    END;
END $$;