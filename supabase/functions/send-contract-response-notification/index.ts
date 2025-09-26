import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContractResponseRequest {
  contract_id: string;
  action: 'accept' | 'reject';
  response_message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { contract_id, action, response_message }: ContractResponseRequest = await req.json();

    console.log('Sending contract response notification:', { contract_id, action });

    // Get contract details
    const { data: contractData, error: contractError } = await supabase
      .from('contracts')
      .select(`
        *,
        transaction:transactions(*),
        recipient:profiles!recipient_id(full_name)
      `)
      .eq('id', contract_id)
      .single();

    if (contractError || !contractData) {
      throw new Error('Contract not found');
    }

    const actionText = action === 'accept' ? 'accepted' : 'rejected';
    const notificationType = action === 'accept' ? 'contract_accepted' : 'contract_rejected';

    // Create notification for contract creator
    const { error: notificationError } = await supabase
      .from('notifications')
      .insert({
        user_id: contractData.created_by,
        type: notificationType,
        title: `Contract ${actionText.charAt(0).toUpperCase() + actionText.slice(1)}`,
        message: `${contractData.recipient?.full_name || 'Someone'} ${actionText} your contract for "${contractData.transaction?.title}"${response_message ? `: ${response_message}` : ''}`,
        contract_id: contract_id,
        transaction_id: contractData.transaction_id,
        sender_id: contractData.recipient_id,
        read: false
      });

    if (notificationError) {
      throw notificationError;
    }

    console.log('Contract response notification sent successfully');

    return new Response(
      JSON.stringify({ success: true, message: 'Response notification sent successfully' }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Error in send-contract-response-notification function:', error);
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