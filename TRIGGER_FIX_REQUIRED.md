# CRITICAL: Remote Database Trigger Fix Required

## THE PROBLEM

You're getting this error when trying to generate contracts:
```
record "new" has no field "contract_id"
Code: 42703
```

## ROOT CAUSE

The **remote Supabase database** has a broken trigger called `contract_audit_trigger` that is:
1. Trying to reference `NEW.contract_id` (which doesn't exist)
2. Should be referencing `NEW.id` instead
3. Blocking all INSERT operations on the `contracts` table

## THE FIX

You need to execute this SQL on your **remote Supabase database** (https://app.supabase.com):

1. Go to your Supabase project dashboard
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Paste the following SQL:

```sql
-- Drop the broken trigger
DROP TRIGGER IF EXISTS contract_audit_trigger ON public.contracts;

-- Drop the broken function
DROP FUNCTION IF EXISTS public.log_contract_changes() CASCADE;

-- Recreate the function with CORRECT logic (using NEW.id, not NEW.contract_id)
CREATE OR REPLACE FUNCTION public.log_contract_changes()
RETURNS TRIGGER AS $$
BEGIN
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
    NULL,
    CASE WHEN TG_OP = 'UPDATE' THEN to_jsonb(OLD) ELSE NULL END,
    CASE WHEN TG_OP != 'DELETE' THEN to_jsonb(NEW) ELSE NULL END,
    TG_OP
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger with the fixed function
CREATE TRIGGER contract_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON public.contracts
FOR EACH ROW
EXECUTE FUNCTION public.log_contract_changes();
```

5. Click **Run** (or press `Ctrl+Enter`)
6. Wait for it to complete successfully

## AFTER THE FIX

Once you run this SQL, the contract generation should work perfectly! The trigger will properly log all contract changes without throwing errors.

## WORKAROUND (If you can't access Supabase SQL editor)

The application now has error handling that will:
1. Try to insert the contract
2. If it fails with the trigger error, it will log detailed information
3. This at least shows you the exact issue for debugging

But the **real fix** is to run the SQL above on your remote database.

---

**Status**: ✅ Code updated with proper error handling
**Next Step**: 🔧 Run the SQL migration on your remote Supabase database
**Time to Fix**: < 2 minutes
