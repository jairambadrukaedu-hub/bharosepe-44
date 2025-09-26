import { serve } from 'https://deno.land/std@0.190.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ProposalNotificationRequest {
  dispute_id: string;
  actor_id: string; // who performed the action
  event: 'proposal_created' | 'proposal_accepted' | 'proposal_rejected';
  // Optional context to craft better messages without extra reads
  proposal_type?: 'release_full' | 'release_partial' | 'refund_full' | 'refund_partial';
  amount?: number;
  proposal_id?: string; // optional, if available
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

    const body: ProposalNotificationRequest = await req.json();
    const { dispute_id, actor_id, event, proposal_type, amount, proposal_id } = body;

    console.log('send-proposal-notification payload:', body);

    // Fetch dispute -> transaction
    const { data: dispute, error: disputeError } = await supabase
      .from('disputes')
      .select('id, transaction_id')
      .eq('id', dispute_id)
      .single();

    if (disputeError || !dispute) {
      console.error('Dispute not found:', disputeError);
      return new Response(
        JSON.stringify({ error: 'Dispute not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Get transaction and profiles to compute recipient and names
    const { data: transaction, error: txError } = await supabase
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
      .eq('id', dispute.transaction_id)
      .single();

    if (txError || !transaction) {
      console.error('Transaction not found for dispute:', txError);
      return new Response(
        JSON.stringify({ error: 'Transaction not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const otherPartyId = transaction.buyer_id === actor_id
      ? transaction.seller_id
      : transaction.buyer_id;

    const actorName = transaction.buyer_id === actor_id
      ? (transaction.buyer?.full_name || 'Buyer')
      : (transaction.seller?.full_name || 'Seller');

    // Build title and message
    const prettyType = (t?: string) => {
      switch (t) {
        case 'release_full': return 'Release Full Amount';
        case 'release_partial': return 'Release Partial Amount';
        case 'refund_full': return 'Refund Full Amount';
        case 'refund_partial': return 'Refund Partial Amount';
        default: return 'Resolution Proposal';
      }
    };

    let title = 'Resolution Proposal';
    let message = `${actorName} submitted a resolution proposal on "${transaction.title}".`;

    if (event === 'proposal_created') {
      title = 'New Resolution Proposal';
      const detail = `${prettyType(proposal_type)}${amount ? ` (₹${amount})` : ''}`;
      message = `${actorName} proposed: ${detail}. Review and respond.`;
    } else if (event === 'proposal_accepted') {
      title = 'Proposal Accepted';
      message = `${actorName} accepted the resolution proposal for "${transaction.title}".`;
    } else if (event === 'proposal_rejected') {
      title = 'Proposal Rejected';
      message = `${actorName} rejected the resolution proposal for "${transaction.title}".`;
    }

    // Insert notification for the counterparty
    const { error: notifError } = await supabase
      .from('notifications')
      .insert({
        user_id: otherPartyId,
        type: event,
        title,
        message,
        transaction_id: transaction.id,
        sender_id: actor_id,
        read: false,
      });

    if (notifError) {
      console.error('Failed to create notification:', notifError);
      return new Response(
        JSON.stringify({ error: 'Failed to create notification' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  } catch (err: any) {
    console.error('send-proposal-notification error:', err);
    return new Response(
      JSON.stringify({ error: err.message || 'Unknown error' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
};

serve(handler);
