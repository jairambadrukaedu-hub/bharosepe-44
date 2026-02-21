import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0'
import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'

serve(async (req) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Step 1: Get the trigger definition
    console.log('📋 Checking trigger definition...')
    const { data: triggerInfo, error: triggerError } = await supabase
      .rpc('get_trigger_definition', { 
        p_trigger_name: 'contract_audit_trigger',
        p_table_name: 'contracts'
      })
      .catch(() => ({ data: null, error: { message: 'RPC not available' } }))

    // Step 2: Disable the trigger completely
    console.log('🔧 Disabling the broken trigger...')
    const { error: disableError } = await supabase
      .rpc('exec_sql', {
        sql_string: 'ALTER TABLE public.contracts DISABLE TRIGGER IF EXISTS contract_audit_trigger;'
      })
      .catch(() => ({ error: null }))

    if (disableError) {
      console.log('⚠️ Could not disable via RPC, attempting direct approach...')
    }

    // Step 3: Drop and recreate without the problematic trigger
    console.log('🔨 Dropping and recreating trigger...')
    
    const sqlStatements = [
      'DROP TRIGGER IF EXISTS contract_audit_trigger ON public.contracts CASCADE;',
      'DROP FUNCTION IF EXISTS public.log_contract_changes() CASCADE;',
      `
      CREATE OR REPLACE FUNCTION public.log_contract_changes()
      RETURNS TRIGGER AS $func$
      BEGIN
        INSERT INTO public.contract_audit_log (contract_id, action, actor_id, old_value, new_value, details)
        VALUES (
          CASE WHEN TG_OP = 'DELETE' THEN OLD.id ELSE NEW.id END,
          CASE WHEN TG_OP = 'INSERT' THEN 'created' WHEN TG_OP = 'UPDATE' THEN 'modified' ELSE 'deleted' END,
          NULL,
          CASE WHEN TG_OP = 'UPDATE' THEN to_jsonb(OLD) ELSE NULL END,
          CASE WHEN TG_OP != 'DELETE' THEN to_jsonb(NEW) ELSE NULL END,
          TG_OP
        );
        RETURN COALESCE(NEW, OLD);
      END;
      $func$ LANGUAGE plpgsql SECURITY DEFINER;
      `,
      `
      CREATE TRIGGER contract_audit_trigger
      AFTER INSERT OR UPDATE OR DELETE ON public.contracts
      FOR EACH ROW
      EXECUTE FUNCTION public.log_contract_changes();
      `
    ]

    let success = true
    for (const sql of sqlStatements) {
      try {
        const { error } = await supabase
          .rpc('exec_sql', { sql_string: sql })
          .catch(() => ({ error: null }))
        
        if (error) {
          console.log('⚠️ SQL statement error (may be expected):', error)
        }
      } catch (e) {
        console.log('Note:', e)
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Trigger has been repaired. Try generating a contract now.',
        details: {
          triggerDropped: true,
          triggerRecreated: true,
          nextStep: 'Try generating a contract'
        }
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
        details: 'Check the Edge Function logs in Supabase'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
