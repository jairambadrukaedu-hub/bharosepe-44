-- Fix handle_new_user trigger - Remove reference to deleted 'role' column
-- The role column was removed in migration 20251125_remove_role_from_profiles.sql
-- but the trigger still referenced it, causing all new user signups to fail with
-- "column 'role' does not exist" error

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, phone)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'phone'
  );
  RETURN new;
END;
$$;

-- The trigger on_auth_user_created remains unchanged
-- It will execute this updated function on auth.users INSERT
