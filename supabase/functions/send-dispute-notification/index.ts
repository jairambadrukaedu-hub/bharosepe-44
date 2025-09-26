import { serve } from 'https://deno.land/std@0.190.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface DisputeNotificationRequest {
  transaction_id: string;
  disputing_party_id: string;
  dispute_reason: string;
  description: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { transaction_id, disputing_party_id, dispute_reason, description }: DisputeNotificationRequest = await req.json();

    console.log('Processing dispute notification:', { transaction_id, disputing_party_id, dispute_reason });

    // Get transaction details with buyer and seller info
    const { data: transaction, error: transactionError } = await supabase
      .from('transactions')
      .select(`
        id,
        title,
        amount,
        buyer_id,
        seller_id,
        buyer:profiles!buyer_id(full_name),
        seller:profiles!seller_id(full_name)
      `)
      .eq('id', transaction_id)
      .single();

    if (transactionError || !transaction) {
      console.error('Transaction not found:', transactionError);
      return new Response(
        JSON.stringify({ error: 'Transaction not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Determine who to notify (the other party)
    const otherPartyId = transaction.buyer_id === disputing_party_id 
      ? transaction.seller_id 
      : transaction.buyer_id;

    const disputingPartyName = transaction.buyer_id === disputing_party_id 
      ? transaction.buyer?.full_name || 'Buyer'
      : transaction.seller?.full_name || 'Seller';

    const otherPartyRole = transaction.buyer_id === disputing_party_id ? 'seller' : 'buyer';

    // Create notification for the other party
    const { error: notificationError } = await supabase
      .from('notifications')
      .insert({
        user_id: otherPartyId,
        type: 'dispute_raised',
        title: 'Dispute Raised',
        message: `${disputingPartyName} has raised a dispute for "${transaction.title}". Reason: ${dispute_reason}. Please respond promptly to resolve this matter.`,
        transaction_id: transaction_id,
        sender_id: disputing_party_id,
        read: false
      });

    if (notificationError) {
      console.error('Failed to create notification:', notificationError);
      return new Response(
        JSON.stringify({ error: 'Failed to create notification' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    console.log(`Dispute notification sent to ${otherPartyRole} (${otherPartyId})`);

    return new Response(
      JSON.stringify({ success: true, message: 'Dispute notification sent successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );

  } catch (error: any) {
    console.error('Error in send-dispute-notification function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
};

serve(handler);