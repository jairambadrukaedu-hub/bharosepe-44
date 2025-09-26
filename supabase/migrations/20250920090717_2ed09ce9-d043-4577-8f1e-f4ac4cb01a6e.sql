-- Create a secure function to search profiles by phone number
CREATE OR REPLACE FUNCTION public.search_profiles_by_phone(search_phone text)
RETURNS TABLE (
  user_id uuid,
  full_name text,
  phone text,
  role text
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    p.user_id,
    p.full_name,
    p.phone,
    p.role
  FROM public.profiles p
  WHERE p.phone IS NOT NULL 
    AND p.phone ILIKE '%' || search_phone || '%'
  LIMIT 20;
$$;