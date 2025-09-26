import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContractNotificationRequest {
  contract_id: string;
  recipient_id: string;
  transaction_id: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log('🔄 Contract notification function called');
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('✅ Handling CORS preflight request');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    console.log('✅ Environment variables loaded');
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { contract_id, recipient_id, transaction_id }: ContractNotificationRequest = await req.json();

    console.log('📨 Request data:', { contract_id, recipient_id, transaction_id });

    // Fetch contract basic details first
    const { data: contract, error: contractError } = await supabase
      .from('contracts')
      .select('*')
      .eq('id', contract_id)
      .single();

    if (contractError) {
      console.error('Contract query error:', contractError);
      return new Response(
        JSON.stringify({ error: 'Database error fetching contract', details: contractError.message }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }
    
    if (!contract) {
      console.error('Contract not found for ID:', contract_id);
      return new Response(
        JSON.stringify({ error: 'Contract not found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
      );
    }
    
    // Fetch related data without relying on FK-based joins
    const [
      { data: tx, error: txError },
      { data: creatorProfile, error: creatorError },
      recipientResult
    ] = await Promise.all([
      supabase.from('transactions').select('id, title').eq('id', contract.transaction_id).maybeSingle(),
      supabase.from('profiles').select('full_name, user_id').eq('user_id', contract.created_by).maybeSingle(),
      contract.recipient_id
        ? supabase.from('profiles').select('full_name, user_id').eq('user_id', contract.recipient_id).maybeSingle()
        : Promise.resolve({ data: null, error: null } as any)
    ]);

    const recipientProfile = (recipientResult as any)?.data ?? null;

    if (txError) console.warn('⚠️ Transactions fetch warning:', txError);
    if (creatorError) console.warn('⚠️ Creator profile fetch warning:', creatorError);
    if ((recipientResult as any)?.error) console.warn('⚠️ Recipient profile fetch warning:', (recipientResult as any).error);

    console.log('✅ Contract data fetched:', { contract, tx, creatorProfile, recipientProfile });

    // Create notification
    const notificationPayload = {
      user_id: recipient_id,
      type: 'contract_received',
      title: 'New Contract Received',
      message: `${creatorProfile?.full_name || 'Someone'} sent you a contract for "${tx?.title || 'a transaction'}"`,
      contract_id: contract_id,
      transaction_id: transaction_id,
      sender_id: contract.created_by,
      read: false
    };
    
    console.log('📤 Creating notification with payload:', notificationPayload);

    const { error: notificationError } = await supabase
      .from('notifications')
      .insert(notificationPayload);

    if (notificationError) {
      console.error('❌ Notification creation failed:', notificationError);
      throw notificationError;
    }

    console.log('✅ Contract notification sent successfully');

    return new Response(
      JSON.stringify({ success: true, message: 'Notification sent successfully' }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('❌ Error in send-contract-notification function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
};

serve(handler);