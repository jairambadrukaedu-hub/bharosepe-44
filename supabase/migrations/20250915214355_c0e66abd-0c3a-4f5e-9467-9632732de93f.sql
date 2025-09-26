-- Fix role resolution and optimize for role-based queries
-- Create a function to determine roles based on transaction data
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
WITH contract_roles AS (
  SELECT 
    c.id,
    CASE 
      WHEN t.buyer_id = c.created_by THEN 'buyer'
      WHEN t.seller_id = c.created_by THEN 'seller'
      ELSE NULL
    END as initiator_role,
    CASE 
      WHEN t.buyer_id = c.recipient_id THEN 'buyer'
      WHEN t.seller_id = c.recipient_id THEN 'seller'
      ELSE NULL
    END as counterparty_role
  FROM contracts c
  JOIN transactions t ON c.transaction_id = t.id
  WHERE c.initiator_role IS NULL OR c.counterparty_role IS NULL
)
UPDATE contracts 
SET 
  initiator_role = contract_roles.initiator_role,
  counterparty_role = contract_roles.counterparty_role
FROM contract_roles
WHERE contracts.id = contract_roles.id;

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