-- EMERGENCY FIX: Drop and recreate the contract_audit_trigger with correct logic
-- The remote database has a broken trigger trying to reference NEW.contract_id which doesn't exist
-- Error: 'record "new" has no field "contract_id"'

-- Step 1: Drop the broken trigger
DROP TRIGGER IF EXISTS contract_audit_trigger ON public.contracts;

-- Step 2: Drop the broken function (if it exists with wrong logic)
DROP FUNCTION IF EXISTS public.log_contract_changes() CASCADE;

-- Step 3: Recreate the function with CORRECT logic (using NEW.id, not NEW.contract_id)
CREATE OR REPLACE FUNCTION public.log_contract_changes()
RETURNS TRIGGER AS $$
BEGIN
  -- For INSERT and UPDATE, use NEW record
  -- For DELETE, use OLD record
  INSERT INTO public.contract_audit_log (
    contract_id,
    action,
    actor_id,
    old_value,
    new_value,
    details
  ) VALUES (
    CASE 
      WHEN TG_OP = 'DELETE' THEN OLD.id
      ELSE NEW.id
    END,
    CASE
      WHEN TG_OP = 'INSERT' THEN 'created'
      WHEN TG_OP = 'UPDATE' THEN 'modified'
      WHEN TG_OP = 'DELETE' THEN 'deleted'
    END,
    NULL,  -- actor_id will be NULL for now
    CASE WHEN TG_OP = 'UPDATE' THEN to_jsonb(OLD) ELSE NULL END,
    CASE WHEN TG_OP != 'DELETE' THEN to_jsonb(NEW) ELSE NULL END,
    TG_OP
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 4: Recreate the trigger with the fixed function
CREATE TRIGGER contract_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON public.contracts
FOR EACH ROW
EXECUTE FUNCTION public.log_contract_changes();