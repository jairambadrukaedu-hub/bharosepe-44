-- Add foreign key constraints carefully (only if they don't exist)

-- Check and add foreign keys for contracts table if they don't exist
DO $$
BEGIN
    -- Add created_by foreign key if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'contracts_created_by_fkey') THEN
        ALTER TABLE public.contracts 
        ADD CONSTRAINT contracts_created_by_fkey 
        FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE CASCADE;
    END IF;

    -- Add transaction_id foreign key if it doesn't exist  
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'contracts_transaction_id_fkey') THEN
        ALTER TABLE public.contracts 
        ADD CONSTRAINT contracts_transaction_id_fkey 
        FOREIGN KEY (transaction_id) REFERENCES public.transactions(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Add foreign keys for transactions table
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'transactions_buyer_id_fkey') THEN
        ALTER TABLE public.transactions 
        ADD CONSTRAINT transactions_buyer_id_fkey 
        FOREIGN KEY (buyer_id) REFERENCES auth.users(id) ON DELETE CASCADE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'transactions_seller_id_fkey') THEN
        ALTER TABLE public.transactions 
        ADD CONSTRAINT transactions_seller_id_fkey 
        FOREIGN KEY (seller_id) REFERENCES auth.users(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Add foreign keys for notifications table
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'notifications_user_id_fkey') THEN
        ALTER TABLE public.notifications 
        ADD CONSTRAINT notifications_user_id_fkey 
        FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'notifications_sender_id_fkey') THEN
        ALTER TABLE public.notifications 
        ADD CONSTRAINT notifications_sender_id_fkey 
        FOREIGN KEY (sender_id) REFERENCES auth.users(id) ON DELETE CASCADE;
    END IF;
END $$;