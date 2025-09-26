-- Remove auth.users foreign keys and add profiles foreign keys instead

-- Drop existing foreign keys to auth.users
ALTER TABLE public.contracts DROP CONSTRAINT IF EXISTS contracts_created_by_fkey;
ALTER TABLE public.contracts DROP CONSTRAINT IF EXISTS contracts_recipient_id_fkey;
ALTER TABLE public.transactions DROP CONSTRAINT IF EXISTS transactions_buyer_id_fkey;
ALTER TABLE public.transactions DROP CONSTRAINT IF EXISTS transactions_seller_id_fkey;  
ALTER TABLE public.notifications DROP CONSTRAINT IF EXISTS notifications_user_id_fkey;
ALTER TABLE public.notifications DROP CONSTRAINT IF EXISTS notifications_sender_id_fkey;

-- Add foreign keys to profiles table instead (using user_id column)
ALTER TABLE public.contracts 
ADD CONSTRAINT contracts_created_by_profiles_fkey 
FOREIGN KEY (created_by) REFERENCES public.profiles(user_id) ON DELETE CASCADE;

ALTER TABLE public.contracts 
ADD CONSTRAINT contracts_recipient_id_profiles_fkey 
FOREIGN KEY (recipient_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;

ALTER TABLE public.transactions 
ADD CONSTRAINT transactions_buyer_id_profiles_fkey 
FOREIGN KEY (buyer_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;

ALTER TABLE public.transactions 
ADD CONSTRAINT transactions_seller_id_profiles_fkey 
FOREIGN KEY (seller_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;

ALTER TABLE public.notifications 
ADD CONSTRAINT notifications_user_id_profiles_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;

ALTER TABLE public.notifications 
ADD CONSTRAINT notifications_sender_id_profiles_fkey 
FOREIGN KEY (sender_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;