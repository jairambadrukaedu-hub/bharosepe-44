-- Fix role resolution and optimize for role-based queries
-- First, create a function to determine roles based on transaction data
CREATE OR REPLACE FUNCTION public.get_user_role_in_contract(
  contract_id_param UUID,
  user_id_param UUID
) RETURNS TEXT
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    CASE 
      WHEN t.buyer_id = user_id_param THEN 'buyer'
      WHEN t.seller_id = user_id_param THEN 'seller'
      ELSE NULL
    END
  FROM contracts c
  JOIN transactions t ON c.transaction_id = t.id
  WHERE c.id = contract_id_param;
$$;

-- Update existing contracts to populate missing role fields
UPDATE contracts 
SET 
  initiator_role = (
    SELECT CASE 
      WHEN t.buyer_id = c.created_by THEN 'buyer'
      WHEN t.seller_id = c.created_by THEN 'seller'
      ELSE NULL
    END
    FROM transactions t 
    WHERE t.id = c.transaction_id
  ),
  counterparty_role = (
    SELECT CASE 
      WHEN t.buyer_id = c.recipient_id THEN 'buyer'
      WHEN t.seller_id = c.recipient_id THEN 'seller'
      ELSE NULL
    END
    FROM transactions t 
    WHERE t.id = c.transaction_id
  )
WHERE initiator_role IS NULL OR counterparty_role IS NULL;

-- Create optimized indexes for role-based queries
CREATE INDEX IF NOT EXISTS idx_contracts_role_queries 
ON contracts(created_by, initiator_role, status);

CREATE INDEX IF NOT EXISTS idx_contracts_recipient_role 
ON contracts(recipient_id, counterparty_role, status);

-- Create a view for efficient role-based contract queries
CREATE OR REPLACE VIEW public.contracts_with_roles AS
SELECT 
  c.*,
  t.buyer_id,
  t.seller_id,
  t.title as transaction_title,
  t.amount as transaction_amount,
  CASE 
    WHEN c.created_by = t.buyer_id THEN 'buyer'
    WHEN c.created_by = t.seller_id THEN 'seller'
    ELSE NULL
  END as creator_role,
  CASE 
    WHEN c.recipient_id = t.buyer_id THEN 'buyer'
    WHEN c.recipient_id = t.seller_id THEN 'seller'
    ELSE NULL
  END as recipient_role
FROM contracts c
JOIN transactions t ON c.transaction_id = t.id;

-- Grant access to the view
GRANT SELECT ON public.contracts_with_roles TO authenticated;

-- Create RLS policy for the view
CREATE POLICY "Users can view role-aware contracts" ON public.contracts_with_roles
FOR SELECT USING (
  auth.uid() = created_by OR auth.uid() = recipient_id
);