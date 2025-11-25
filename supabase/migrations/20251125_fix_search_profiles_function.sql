-- Fix search_profiles_by_phone function to remove role column reference
-- Role column has been removed from profiles table
-- Must drop the function first to change return type

DROP FUNCTION IF EXISTS public.search_profiles_by_phone(text) CASCADE;

CREATE FUNCTION public.search_profiles_by_phone(search_phone text)
RETURNS TABLE (
  user_id uuid,
  full_name text,
  phone text
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    p.user_id,
    p.full_name,
    p.phone
  FROM public.profiles p
  WHERE p.phone IS NOT NULL 
    AND p.phone ILIKE '%' || search_phone || '%'
  LIMIT 20;
$$;
