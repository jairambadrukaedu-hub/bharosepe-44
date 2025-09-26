import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useContactSearch } from '@/hooks/use-contact-search';
import { useTransactions } from '@/hooks/use-transactions';
import { useContracts } from '@/hooks/use-contracts';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DebugTransaction = () => {
  const { user } = useAuth();
  const { findUserByPhone } = useContactSearch();
  const { createTransaction } = useTransactions('Buyer');
  const { createContract } = useContracts();
  const [testPhone, setTestPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);

  const testTransactionFlow = async () => {
    console.log('🧪 Starting debug transaction flow...');
    setLoading(true);
    
    try {
      // Step 1: Find user by phone
      console.log('Step 1: Finding user by phone:', testPhone);
      const seller = await findUserByPhone(testPhone);
      
      if (!seller) {
        toast.error('No user found with that phone number');
        return;
      }

      if (seller.id === user?.id) {
        toast.error('Cannot create transaction with yourself');
        return;
      }

      console.log('✅ Seller found:', seller);
      toast.success(`Found seller: ${seller.full_name}`);

      // Step 2: Create transaction
      console.log('Step 2: Creating transaction...');
      const txId = await createTransaction({
        title: 'Debug Test Transaction',
        amount: 1000,
        description: 'This is a test transaction for debugging',
        seller_id: seller.id,
        seller_phone: seller.phone,
        delivery_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      });

      console.log('✅ Transaction created with ID:', txId);
      setTransactionId(txId);
      toast.success(`Transaction created: ${txId}`);

      // Step 3: Create contract
      console.log('Step 3: Creating contract...');
      const contractId = await createContract({
        transaction_id: txId,
        contract_content: 'This is a test contract for debugging the flow.',
        terms: 'Test terms and conditions',
        recipient_id: seller.id
      });

      console.log('✅ Contract created with ID:', contractId);
      toast.success(`Contract created and sent: ${contractId}`);
      
    } catch (error: any) {
      console.error('❌ Debug flow failed:', error);
      toast.error(`Debug flow failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="p-4">
        <Card>
          <CardContent className="p-6">
            <p>Please log in to use the debug transaction flow</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Debug Transaction Flow</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Current User: {user.user_metadata?.full_name || user.email} ({user.id})
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Test Seller Phone Number
            </label>
            <input
              type="tel"
              value={testPhone}
              onChange={(e) => setTestPhone(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter 10-digit phone number"
              maxLength={10}
              className="w-full border rounded px-3 py-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Enter the phone number of another registered user to test with
            </p>
          </div>

          <Button
            onClick={testTransactionFlow}
            disabled={loading || testPhone.length !== 10}
            className="w-full"
          >
            {loading ? (
              <span className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Testing Flow...
              </span>
            ) : (
              'Test Complete Transaction + Contract Flow'
            )}
          </Button>

          {transactionId && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
              <p className="text-sm text-green-800">
                ✅ Last Transaction ID: {transactionId}
              </p>
            </div>
          )}

          <div className="mt-4 text-xs text-muted-foreground">
            <p>This will test:</p>
            <ul className="list-disc ml-4">
              <li>Phone number search</li>
              <li>Transaction creation</li>
              <li>Contract creation</li>
              <li>Notification sending</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DebugTransaction;