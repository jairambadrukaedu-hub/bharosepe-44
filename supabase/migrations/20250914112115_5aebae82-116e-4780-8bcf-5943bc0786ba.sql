-- Add foreign key constraints to link tables properly

-- Add foreign keys for contracts table
ALTER TABLE public.contracts 
ADD CONSTRAINT contracts_created_by_fkey 
FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.contracts 
ADD CONSTRAINT contracts_recipient_id_fkey 
FOREIGN KEY (recipient_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add foreign keys for transactions table  
ALTER TABLE public.transactions 
ADD CONSTRAINT transactions_buyer_id_fkey 
FOREIGN KEY (buyer_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.transactions 
ADD CONSTRAINT transactions_seller_id_fkey 
FOREIGN KEY (seller_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add foreign keys for notifications table
ALTER TABLE public.notifications 
ADD CONSTRAINT notifications_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.notifications 
ADD CONSTRAINT notifications_sender_id_fkey 
FOREIGN KEY (sender_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add foreign key for contracts to transactions
ALTER TABLE public.contracts 
ADD CONSTRAINT contracts_transaction_id_fkey 
FOREIGN KEY (transaction_id) REFERENCES public.transactions(id) ON DELETE CASCADE;