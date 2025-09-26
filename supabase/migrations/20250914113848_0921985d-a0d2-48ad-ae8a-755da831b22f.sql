-- Add foreign key constraints to establish proper relationships

-- Add foreign key constraints for transactions table
ALTER TABLE public.transactions 
ADD CONSTRAINT transactions_buyer_id_profiles_fkey 
FOREIGN KEY (buyer_id) REFERENCES public.profiles(user_id);

ALTER TABLE public.transactions 
ADD CONSTRAINT transactions_seller_id_profiles_fkey 
FOREIGN KEY (seller_id) REFERENCES public.profiles(user_id);

-- Add foreign key constraints for contracts table  
ALTER TABLE public.contracts
ADD CONSTRAINT contracts_created_by_profiles_fkey 
FOREIGN KEY (created_by) REFERENCES public.profiles(user_id);

ALTER TABLE public.contracts
ADD CONSTRAINT contracts_recipient_id_profiles_fkey 
FOREIGN KEY (recipient_id) REFERENCES public.profiles(user_id);

ALTER TABLE public.contracts
ADD CONSTRAINT contracts_transaction_id_transactions_fkey 
FOREIGN KEY (transaction_id) REFERENCES public.transactions(id);

-- Add foreign key constraints for notifications table
ALTER TABLE public.notifications
ADD CONSTRAINT notifications_user_id_profiles_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(user_id);

ALTER TABLE public.notifications
ADD CONSTRAINT notifications_sender_id_profiles_fkey 
FOREIGN KEY (sender_id) REFERENCES public.profiles(user_id);

ALTER TABLE public.notifications
ADD CONSTRAINT notifications_contract_id_contracts_fkey 
FOREIGN KEY (contract_id) REFERENCES public.contracts(id);

ALTER TABLE public.notifications
ADD CONSTRAINT notifications_transaction_id_transactions_fkey 
FOREIGN KEY (transaction_id) REFERENCES public.transactions(id);