import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  description?: string;
  status: 'created' | 'contract_accepted' | 'payment_made' | 'work_completed' | 'completed' | 'disputed' | 'escalated' | 'contract_rejected';
  buyer_id: string;
  seller_id: string;
  buyer_phone?: string;
  seller_phone?: string;
  delivery_date?: string;
  dispute_details?: string;
  has_evidence?: boolean;
  created_at: string;
  updated_at: string;
  resolution_breakdown?: {
    buyer_refund: number;
    seller_release: number;
    resolution_type: string;
    total_amount: number;
  };
  // Computed fields
  counterparty?: string;
  role?: 'buyer' | 'seller';
  date?: string;
}

export const useTransactions = (userMode: 'Buyer' | 'Seller') => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // First get transactions with profiles
      const { data, error } = await supabase
        .from('transactions')
        .select(`
          *,
          buyer_profile:profiles!buyer_id(full_name, phone),
          seller_profile:profiles!seller_id(full_name, phone)
        `)
        .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get contract statuses for each transaction (latest contract per transaction)
      const transactionIds = data?.map(tx => tx.id) || [];
      const { data: contractsData } = await supabase
        .from('contracts')
        .select('transaction_id, status, is_active, created_at')
        .in('transaction_id', transactionIds)
        .order('created_at', { ascending: false });

      // Build status maps preferring active contracts, with fallback to latest
      const activeStatusMap = new Map<string, string>();
      const latestStatusMap = new Map<string, string>();
      contractsData?.forEach((contract: any) => {
        if (!latestStatusMap.has(contract.transaction_id)) {
          latestStatusMap.set(contract.transaction_id, contract.status);
        }
        if (contract.is_active && !activeStatusMap.has(contract.transaction_id)) {
          activeStatusMap.set(contract.transaction_id, contract.status);
        }
      });

      const contractStatusMap = new Map<string, string>();
      transactionIds.forEach((txId: string) => {
        const status = activeStatusMap.get(txId) ?? latestStatusMap.get(txId);
        if (status) contractStatusMap.set(txId, status);
      });

      const allTransactions = data?.map((tx: any) => {
        const contractStatus = contractStatusMap.get(tx.id);
        let transactionStatus = tx.status;
        
        // If there's an active rejected contract, mark transaction as contract_rejected
        if (contractStatus === 'rejected') {
          transactionStatus = 'contract_rejected';
        }

        return {
          ...tx,
          status: transactionStatus,
          role: tx.buyer_id === user.id ? 'buyer' : 'seller',
          counterparty: tx.buyer_id === user.id 
            ? tx.seller_profile?.full_name || 'Unknown Seller'
            : tx.buyer_profile?.full_name || 'Unknown Buyer',
          date: new Date(tx.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })
        };
      }) || [];

      // Filter transactions based on userMode - only show transactions where user has the current role
      const filteredTransactions = allTransactions.filter(tx => 
        (userMode === 'Buyer' && tx.role === 'buyer') ||
        (userMode === 'Seller' && tx.role === 'seller')
      );

      setTransactions(filteredTransactions);
    } catch (error: any) {
      console.error('Error fetching transactions:', error);
      toast.error('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  const createTransaction = async (transactionData: {
    title: string;
    amount: number;
    description?: string;
    seller_id: string;
    seller_phone?: string;
    delivery_date?: string;
    buyer_id?: string; // Optional: when not provided, current user is the buyer
  }) => {
    console.log('🔄 Creating transaction with enhanced error handling...', transactionData);
    
    try {
      if (!user) {
        console.error('❌ User not authenticated');
        toast.error('Please log in to create a transaction');
        throw new Error('User not authenticated');
      }
      
      console.log('✅ User authenticated:', user.id);

      // Enhanced validation with better error messages
      if (!transactionData.title?.trim()) {
        console.error('❌ Title is required');
        toast.error('Please enter a transaction title');
        throw new Error('Transaction title is required');
      }
      
      if (!transactionData.amount || transactionData.amount <= 0) {
        console.error('❌ Invalid amount:', transactionData.amount);
        toast.error('Please enter a valid amount greater than 0');
        throw new Error('Valid amount is required');
      }

      if (!transactionData.seller_id || typeof transactionData.seller_id !== 'string') {
        console.error('❌ Invalid seller_id:', transactionData.seller_id);
        toast.error('Please select a valid seller');
        throw new Error('Valid seller ID is required');
      }

      // Determine buyer ID - use provided buyer_id or default to current user
      const buyerId = transactionData.buyer_id || user.id;
      
      // Prevent user from creating transaction with themselves
      if (transactionData.seller_id === buyerId) {
        console.error('❌ Cannot create transaction with yourself');
        toast.error('You cannot create a transaction with yourself');
        throw new Error('Cannot create transaction with yourself');
      }

      console.log('✅ Basic validations passed, proceeding to database operations...');

      // Simplified seller verification - just check if seller exists
      console.log('🔍 Verifying seller exists:', transactionData.seller_id);
      const { data: sellerProfile, error: sellerError } = await supabase
        .from('profiles')
        .select('user_id, full_name, phone')
        .eq('user_id', transactionData.seller_id)
        .maybeSingle();

      if (sellerError) {
        console.error('❌ Error verifying seller:', sellerError);
        toast.error('Error finding seller. Please try again.');
        throw new Error(`Seller verification failed: ${sellerError.message}`);
      }

      if (!sellerProfile) {
        console.error('❌ Seller not found:', transactionData.seller_id);
        toast.error('Selected seller not found. They may need to complete their profile.');
        throw new Error('Seller profile not found');
      }

      console.log('✅ Seller verified:', sellerProfile);

      // Get buyer profile (but don't fail if it doesn't exist - create it if needed)
      console.log('🔍 Getting buyer profile:', buyerId);
      let buyerProfile = null;
      const { data: existingBuyer, error: buyerError } = await supabase
        .from('profiles')
        .select('user_id, full_name, phone')
        .eq('user_id', buyerId)
        .maybeSingle();

      if (buyerError && buyerError.code !== 'PGRST116') {
        console.error('❌ Error getting buyer profile:', buyerError);
        // Don't fail here - continue with transaction creation
      }

      buyerProfile = existingBuyer;
      if (!buyerProfile) {
        console.warn('⚠️ Buyer profile not found, attempting to create transaction anyway:', buyerId);
      }
      console.log('ℹ️ Buyer profile:', buyerProfile);

      // Create transaction with simplified payload
      const transactionPayload = {
        title: transactionData.title.trim(),
        amount: transactionData.amount,
        description: transactionData.description?.trim() || null,
        seller_id: transactionData.seller_id,
        seller_phone: sellerProfile?.phone || null,
        delivery_date: transactionData.delivery_date || null,
        buyer_id: buyerId,
        buyer_phone: buyerProfile?.phone || null,
        status: 'created' as const
      };
      
      console.log('📤 Creating transaction with payload:', transactionPayload);

      const { data, error } = await supabase
        .from('transactions')
        .insert(transactionPayload)
        .select('*')
        .single();

      if (error) {
        console.error('❌ Transaction creation failed:', error);
        console.error('💡 Detailed error info:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
          payload: transactionPayload
        });
        
        // Enhanced error messages based on common failure scenarios
        let errorMessage = 'Failed to create transaction';
        
        if (error.code === '23503') {
          errorMessage = 'Database constraint error - invalid user references';
        } else if (error.code === '42501') {
          errorMessage = 'Permission denied - please refresh and try again';
        } else if (error.code === 'PGRST301') {
          errorMessage = 'Database connection error - please try again';
        } else if (error.message?.includes('jwt')) {
          errorMessage = 'Authentication expired - please refresh the page';
        } else if (error.code === '23505') {
          errorMessage = 'Transaction with these details already exists';
        } else {
          errorMessage = `Transaction creation failed: ${error.message}`;
        }
        
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
      
      if (!data) {
        console.error('❌ No transaction data returned');
        toast.error('Transaction was created but could not retrieve details');
        throw new Error('No transaction data returned');
      }

      console.log('✅ Transaction created successfully!', data);
      toast.success('Transaction created successfully! 🎉');
      
      // Refresh transactions list
      await fetchTransactions();
      
      return data.id;
    } catch (error: any) {
      console.error('❌ createTransaction final error:', error);
      
      // Don't double-toast - error handling above already shows user-friendly messages
      throw error;
    }
  };

  const updateTransactionStatus = async (
    transactionId: string, 
    status: Transaction['status'], 
    disputeDetails?: string,
    hasEvidence?: boolean
  ) => {
    try {
      const { error } = await supabase
        .from('transactions')
        .update({
          status,
          ...(disputeDetails && { dispute_details: disputeDetails }),
          ...(hasEvidence !== undefined && { has_evidence: hasEvidence })
        })
        .eq('id', transactionId);

      if (error) throw error;

      toast.success('Transaction updated successfully');
      await fetchTransactions(); // Refresh transactions
    } catch (error: any) {
      console.error('Error updating transaction:', error);
      toast.error('Failed to update transaction');
      throw error;
    }
  };

  const getActiveTransactions = () => {
    return transactions.filter(tx => ['created', 'contract_accepted', 'payment_made', 'work_completed'].includes(tx.status));
  };

  const getEscrowBalance = () => {
    // Role-specific escrow balance calculation
    if (userMode === 'Buyer') {
      // For buyers: money I've paid that's currently held in escrow
      return transactions
        .filter(tx => 
          tx.role === 'buyer' && 
          (tx.status === 'payment_made' || tx.status === 'work_completed')
        )
        .reduce((sum, tx) => sum + tx.amount, 0);
    } else {
      // For sellers: money held in escrow waiting to be released to me
      return transactions
        .filter(tx => 
          tx.role === 'seller' && 
          (tx.status === 'payment_made' || tx.status === 'work_completed')
        )
        .reduce((sum, tx) => sum + tx.amount, 0);
    }
  };

  const getTransactionsByStatus = (status: Transaction['status'] | 'all') => {
    return status === 'all' 
      ? transactions 
      : transactions.filter(tx => tx.status === status);
  };

  const resendTransaction = async (transactionId: string, updatedData: {
    title?: string;
    amount?: number;
    description?: string;
    delivery_date?: string;
  }) => {
    try {
      // Update transaction with new data and reset status to 'created'
      const { error } = await supabase
        .from('transactions')
        .update({
          ...updatedData,
          status: 'created',
          updated_at: new Date().toISOString()
        })
        .eq('id', transactionId);

      if (error) throw error;

      toast.success('Transaction updated and resent successfully');
      await fetchTransactions(); // Refresh transactions
      return true;
    } catch (error: any) {
      console.error('Error resending transaction:', error);
      toast.error('Failed to resend transaction');
      throw error;
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [user, userMode]);

  return {
    transactions,
    loading,
    createTransaction,
    updateTransactionStatus,
    getActiveTransactions,
    getEscrowBalance,
    getTransactionsByStatus,
    resendTransaction,
    refreshTransactions: fetchTransactions
  };
};