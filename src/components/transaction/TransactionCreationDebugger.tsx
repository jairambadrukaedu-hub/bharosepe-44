import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useTransactions } from '@/hooks/use-transactions';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const TransactionCreationDebugger: React.FC = () => {
  const { user } = useAuth();
  const { createTransaction } = useTransactions('Buyer');
  const [isDebugging, setIsDebugging] = useState(false);

  const runDebugTests = async () => {
    if (!user) {
      toast.error('Please log in first');
      return;
    }

    setIsDebugging(true);
    console.log('🔍 Starting transaction creation debug tests...');

    try {
      // Test 1: Check current user profile
      console.log('Test 1: Checking current user profile...');
      const { data: currentUserProfile, error: userError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      console.log('Current user profile:', currentUserProfile, 'Error:', userError);

      // Test 2: Get all profiles to find a test seller
      console.log('Test 2: Finding available sellers...');
      const { data: allProfiles, error: profilesError } = await supabase
        .from('profiles')
        .select('user_id, full_name, phone, role')
        .neq('user_id', user.id)
        .limit(3);

      console.log('Available profiles:', allProfiles, 'Error:', profilesError);

      if (!allProfiles || allProfiles.length === 0) {
        console.log('❌ No other users found to test with');
        toast.error('No other users found to test transaction creation');
        return;
      }

      const testSeller = allProfiles[0];
      console.log('📋 Using test seller:', testSeller);

      // Test 3: Try creating a test transaction
      console.log('Test 3: Creating test transaction...');
      
      const testTransactionData = {
        title: 'Test Transaction - Debug',
        amount: 100,
        description: 'Debug test transaction',
        seller_id: testSeller.user_id,
        seller_phone: testSeller.phone,
        delivery_date: new Date().toISOString().split('T')[0]
      };

      console.log('Test transaction data:', testTransactionData);

      const transactionId = await createTransaction(testTransactionData);
      
      console.log('✅ Test transaction created with ID:', transactionId);
      toast.success(`Test transaction created successfully! ID: ${transactionId}`);

      // Test 4: Verify transaction was actually saved
      console.log('Test 4: Verifying transaction was saved...');
      const { data: savedTransaction, error: verifyError } = await supabase
        .from('transactions')
        .select('*')
        .eq('id', transactionId)
        .single();

      console.log('Saved transaction:', savedTransaction, 'Error:', verifyError);

      if (savedTransaction) {
        console.log('✅ Transaction successfully verified in database');
        toast.success('Transaction successfully verified in database!');
      }

    } catch (error) {
      console.error('❌ Debug test failed:', error);
      toast.error(`Debug test failed: ${error.message}`);
    } finally {
      setIsDebugging(false);
    }
  };

  if (!user) {
    return (
      <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
        <p className="text-sm text-yellow-800">Please log in to access debugging tools</p>
      </div>
    );
  }

  return (
    <div className="p-4 border border-blue-200 rounded-lg bg-blue-50 space-y-3">
      <h3 className="font-semibold text-blue-900">Transaction Creation Debugger</h3>
      <p className="text-sm text-blue-700">
        This will run diagnostic tests to identify transaction creation issues.
      </p>
      
      <div className="space-y-2">
        <p className="text-xs text-blue-600">Current user: {user.email}</p>
        <p className="text-xs text-blue-600">User ID: {user.id}</p>
      </div>

      <Button
        onClick={runDebugTests}
        disabled={isDebugging}
        variant="outline"
        size="sm"
        className="text-blue-700 border-blue-300 hover:bg-blue-100"
      >
        {isDebugging ? 'Running Debug Tests...' : 'Run Debug Tests'}
      </Button>
      
      <p className="text-xs text-blue-600">
        Check the browser console (F12) for detailed debug output.
      </p>
    </div>
  );
};

export default TransactionCreationDebugger;