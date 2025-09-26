import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PaymentNotificationRequest {
  transaction_id: string;
  payer_id: string;
  amount: number;
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
    
    const { transaction_id, payer_id, amount }: PaymentNotificationRequest = await req.json();
    
    console.log('Processing payment notification:', { transaction_id, payer_id, amount });
    
    // Get transaction details
    const { data: transaction, error: transactionError } = await supabase
      .from('transactions')
      .select(`
        *,
        buyer_profile:profiles!buyer_id(full_name, phone),
        seller_profile:profiles!seller_id(full_name, phone)
      `)
      .eq('id', transaction_id)
      .single();
      
    if (transactionError || !transaction) {
      console.error('Transaction not found:', transactionError);
      return new Response(
        JSON.stringify({ error: 'Transaction not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Determine who should receive the notification (the seller)
    const sellerId = transaction.seller_id;
    const buyerName = transaction.buyer_profile?.full_name || 'Unknown Buyer';
    const sellerName = transaction.seller_profile?.full_name || 'Unknown Seller';
    
    // Create notification for seller
    const notificationPayload = {
      user_id: sellerId,
      type: 'payment_received',
      title: 'Payment Received!',
      message: `${buyerName} has made a payment of ₹${amount.toLocaleString()} for "${transaction.title}". You can now proceed with delivery.`,
      transaction_id: transaction_id,
      sender_id: payer_id,
      read: false
    };
    
    const { error: notificationError } = await supabase
      .from('notifications')
      .insert(notificationPayload);
      
    if (notificationError) {
      console.error('Failed to create notification:', notificationError);
      return new Response(
        JSON.stringify({ error: 'Failed to create notification' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log('Payment notification sent successfully to seller:', sellerId);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Payment notification sent successfully',
        notified_user: sellerName 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
    
  } catch (error: any) {
    console.error('Error in send-payment-notification function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
};

serve(handler);