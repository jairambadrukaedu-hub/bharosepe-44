import React from 'react';
import { Button } from '@/components/ui/button';
import { useTransactions } from '@/hooks/use-transactions';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';

const TestTransactionCreate = () => {
  const { user } = useAuth();
  const { createTransaction } = useTransactions('Buyer');

  const handleTestCreate = async () => {
    if (!user) {
      toast.error('Please log in first');
      return;
    }

    try {
      console.log('🧪 Testing transaction creation...');
      const transactionId = await createTransaction({
        title: 'Test Transaction',
        amount: 100,
        description: 'Test transaction for debugging',
        seller_id: '8b25f86f-74cd-4036-857b-0079b9aacd50', // Use actual seller ID from profiles
        seller_phone: '8374155974',
        delivery_date: '2025-09-20'
      });
      
      console.log('✅ Test transaction created:', transactionId);
      toast.success('Test transaction created successfully!');
    } catch (error: any) {
      console.error('❌ Test transaction failed:', error);
      toast.error(`Test failed: ${error.message}`);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-yellow-50">
      <h3 className="font-medium mb-2">Debug: Test Transaction Creation</h3>
      <p className="text-sm text-gray-600 mb-3">
        This will test if transactions can be created with current setup.
      </p>
      <Button onClick={handleTestCreate} variant="outline">
        Test Create Transaction
      </Button>
    </div>
  );
};

export default TestTransactionCreate;