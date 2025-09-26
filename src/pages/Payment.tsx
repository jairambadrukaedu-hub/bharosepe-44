import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import PaymentMethods from '@/components/PaymentMethods';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface LocationState {
  amount: string;
  transactionId?: string; // Make transactionId optional for backward compatibility
}

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [amount, setAmount] = useState<string>('0');
  const [transactionId, setTransactionId] = useState<string | undefined>(undefined);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('upi');

  // Dummy payment methods
  const paymentMethods = [
    { id: 'upi', name: 'UPI Payment', icon: '/placeholder.svg' },
    { id: 'card', name: 'Credit/Debit Card', icon: '/placeholder.svg', lastFour: '4242' },
    { id: 'netbanking', name: 'Net Banking', icon: '/placeholder.svg' },
    { id: 'wallet', name: 'Digital Wallet', icon: '/placeholder.svg', lastFour: '8765' }
  ];
  
  useEffect(() => {
    if (state && state.amount) {
      setAmount(state.amount);
    }
    
    if (state && state.transactionId) {
      setTransactionId(state.transactionId);
    }
  }, [state]);
  
  const handlePayment = async () => {
    setLoading(true);
    
    try {
      // Update transaction status immediately
      if (transactionId) {
        const { error: updateError } = await supabase
          .from('transactions')
          .update({ status: 'payment_made' })
          .eq('id', transactionId);
          
        if (updateError) {
          console.error('Transaction status update error:', updateError);
          throw new Error('Failed to update transaction status');
        }
        
        console.log('✅ Transaction status updated to payment_made for:', transactionId);
        
        // Send notification in background (non-blocking)
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          supabase.functions.invoke('send-payment-notification', {
            body: {
              transaction_id: transactionId,
              payer_id: user.id,
              amount: Number(amount)
            }
          }).then(({ error }) => {
            if (error) {
              console.error('Notification function error:', error);
            } else {
              console.log('✅ Payment notification sent successfully');
            }
          }).catch(notificationError => {
            console.error('Failed to send notification:', notificationError);
          });
        }
        
        setSuccess(true);
        toast.success('Payment successful! 🎉');
        
        // Navigate immediately
        navigate(`/transaction-status/${transactionId}`, { replace: true });
      } else {
        setSuccess(true);
        toast.success('Payment processed successfully!');
        navigate('/dashboard', { replace: true });
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
      setLoading(false);
    }
  };
  
  return (
    <div className="bharose-container">
      <Header title="Payment" showBack />
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-4"
      >
        <div className="bharose-card">
          {success ? (
            <div className="text-center py-12">
              <CheckCircle size={60} className="text-bharose-success mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Payment Successful!</h2>
              <p className="text-muted-foreground">
                Your payment has been securely processed. The seller has been notified.
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <Lock size={60} className="text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Secure Payment</h2>
                <p className="text-muted-foreground">
                  You are paying ₹{Number(amount).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Your funds will be held securely until delivery is confirmed
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-4">Select Payment Method</h3>
                <PaymentMethods
                  methods={paymentMethods}
                  selectedMethod={selectedPaymentMethod}
                  onSelect={setSelectedPaymentMethod}
                />
              </div>
              
              <button
                className="bharose-primary-button w-full"
                onClick={handlePayment}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing Payment...
                  </span>
                ) : (
                  `Pay ₹${Number(amount).toLocaleString()} Now`
                )}
              </button>
              
              <div className="mt-4 text-center">
                <p className="text-xs text-muted-foreground">
                  🔒 SSL Encrypted • 256-bit Security
                </p>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Payment;
