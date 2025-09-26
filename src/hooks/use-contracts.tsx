import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';

export interface Contract {
  id: string;
  transaction_id: string;
  status: 'draft' | 'awaiting_acceptance' | 'accepted_awaiting_payment' | 'rejected' | 'expired';
  terms?: string;
  contract_content: string;
  created_by: string;
  recipient_id?: string;
  response_message?: string;
  responded_at?: string;
  created_at: string;
  updated_at: string;
  initiator_role?: 'buyer' | 'seller';
  counterparty_role?: 'buyer' | 'seller';
  // Revision fields
  parent_contract_id?: string;
  revision_number?: number;
  is_active?: boolean;
  // Computed fields from joins
  transaction?: {
    id: string;
    title: string;
    amount: number;
    buyer_id: string;
    seller_id: string;
  };
  creator_name?: string;
  recipient_name?: string;
  // Convenience fields for role-based access
  buyer_id?: string;
  seller_id?: string;
}

export const useContracts = () => {
  const { user, loading: authLoading } = useAuth();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContracts = async () => {
    console.log('🔄 Fetching contracts...');
    
    if (!user) {
      if (authLoading) {
        console.log('⏳ Auth still loading, waiting...');
        return;
      } else {
        console.log('❌ No user found after auth loaded, skipping contract fetch');
        setLoading(false);
        return;
      }
    }
    
    console.log('✅ User found:', user.id);

    try {
      setLoading(true);
      
      console.log('📤 Querying contracts...');
      const { data, error } = await supabase
        .from('contracts')
        .select('*')
        .or(`created_by.eq.${user.id},recipient_id.eq.${user.id}`)
        .eq('is_active', true)  // Only fetch active contracts
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Contract query failed:', error);
        throw error;
      }
      
      const contractsData = data || [];
      console.log('✅ Raw contract data:', contractsData);

      if (contractsData.length === 0) {
        setContracts([]);
        return;
      }

      // Fetch related transactions and profiles without relying on FKs
      const txIds = Array.from(new Set(contractsData.map((c: any) => c.transaction_id).filter(Boolean)));
      const userIds = Array.from(new Set(contractsData.flatMap((c: any) => [c.created_by, c.recipient_id]).filter(Boolean)));

      const [txRes, profilesRes] = await Promise.all([
        txIds.length
          ? supabase.from('transactions').select('id, title, amount, buyer_id, seller_id').in('id', txIds)
          : Promise.resolve({ data: [], error: null } as any),
        userIds.length
          ? supabase.from('profiles').select('user_id, full_name').in('user_id', userIds)
          : Promise.resolve({ data: [], error: null } as any)
      ]);

      if (txRes.error) {
        console.warn('⚠️ Transactions fetch failed:', txRes.error);
      }
      if (profilesRes.error) {
        console.warn('⚠️ Profiles fetch failed:', profilesRes.error);
      }

      const txMap = new Map((txRes.data || []).map((t: any) => [t.id, t]));
      const profileMap = new Map((profilesRes.data || []).map((p: any) => [p.user_id, p.full_name]));

      const formattedContracts = contractsData.map((c: any) => {
        const transaction = txMap.get(c.transaction_id) as { id: string; title: string; amount: number; buyer_id: string; seller_id: string } | null;
        return {
          ...c,
          transaction,
          creator_name: profileMap.get(c.created_by) || 'Unknown User',
          recipient_name: c.recipient_id ? (profileMap.get(c.recipient_id) || 'Unknown User') : undefined,
          // Add convenience fields for role-based filtering
          buyer_id: transaction?.buyer_id,
          seller_id: transaction?.seller_id
        };
      });

      console.log('✅ Formatted contracts:', formattedContracts);
      setContracts(formattedContracts);
    } catch (error: any) {
      console.error('❌ Error fetching contracts:', error);
      toast.error('Failed to load contracts');
    } finally {
      setLoading(false);
    }
  };

  const createContract = async (contractData: {
    transaction_id: string;
    contract_content: string;
    terms?: string;
    recipient_id?: string;
    initiator_role?: 'buyer' | 'seller';
    parent_contract_id?: string;
    revision_number?: number;
  }) => {
    console.log('🔄 Creating contract...', contractData);
    
    try {
      if (!user) {
        console.error('❌ User not authenticated for contract creation');
        toast.error('User not authenticated');
        throw new Error('User not authenticated');
      }
      
      console.log('✅ User authenticated:', user.id);

      // First verify the transaction exists and user has access
      console.log('🔍 Verifying transaction access:', contractData.transaction_id);
      const { data: transaction, error: txError } = await supabase
        .from('transactions')
        .select('id, title, buyer_id, seller_id')
        .eq('id', contractData.transaction_id)
        .maybeSingle();

      if (txError) {
        console.error('❌ Error verifying transaction:', txError);
        toast.error(`Error verifying transaction: ${txError.message}`);
        throw new Error('Error verifying transaction');
      }

      if (!transaction) {
        console.error('❌ Transaction not found:', contractData.transaction_id);
        toast.error('Transaction not found');
        throw new Error('Transaction not found');
      }

      if (transaction.buyer_id !== user.id && transaction.seller_id !== user.id) {
        console.error('❌ User not authorized for this transaction');
        toast.error('Not authorized for this transaction');
        throw new Error('Not authorized for this transaction');
      }

      console.log('✅ Transaction verified:', transaction);

      // If recipient_id is provided, verify recipient exists
      if (contractData.recipient_id) {
        console.log('🔍 Verifying recipient exists:', contractData.recipient_id);
        const { data: recipient, error: recipientError } = await supabase
          .from('profiles')
          .select('user_id, full_name')
          .eq('user_id', contractData.recipient_id)
          .maybeSingle();

        if (recipientError) {
          console.error('❌ Error verifying recipient:', recipientError);
          toast.error(`Error verifying recipient: ${recipientError.message}`);
          throw new Error('Error verifying recipient');
        }

        if (!recipient) {
          console.error('❌ Recipient not found:', contractData.recipient_id);
          toast.error('Recipient not found');
          throw new Error('Recipient not found');
        }

        console.log('✅ Recipient verified:', recipient);
      }

      // Create contract with role resolution
      console.log('💾 Inserting contract into database...');
      const contractPayload = {
        transaction_id: contractData.transaction_id,
        created_by: user.id,
        recipient_id: contractData.recipient_id || null,
        contract_content: contractData.contract_content.trim(),
        terms: contractData.terms?.trim() || null,
        status: contractData.recipient_id ? 'awaiting_acceptance' : 'draft',
        initiator_role: contractData.initiator_role || null,
        counterparty_role: contractData.initiator_role === 'buyer' ? 'seller' : 'buyer',
        parent_contract_id: contractData.parent_contract_id || null,
        revision_number: contractData.revision_number || 1,
        is_active: true
      };
      
      console.log('📤 Contract payload:', contractPayload);

      const { data: contract, error } = await supabase
        .from('contracts')
        .insert([contractPayload])
        .select('*')
        .single();

      if (error) {
        console.error('❌ Contract creation failed:', error);
        console.error('💡 Error details:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        
        let errorMessage = 'Failed to create contract';
        if (error.code === '23503') {
          errorMessage = 'Invalid references in contract';
        } else if (error.code === '42501') {
          errorMessage = 'Permission denied for contract creation';
        } else {
          errorMessage = `Database error: ${error.message}`;
        }
        
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      console.log('✅ Contract created successfully:', contract);

      // Send notification if recipient is provided
      if (contractData.recipient_id && contract) {
        console.log('📧 Sending contract notification...');
        // Send notification (non-blocking)
        supabase.functions.invoke('send-contract-notification', {
          body: {
            contract_id: contract.id,
            transaction_id: contractData.transaction_id,
            recipient_id: contractData.recipient_id
          }
        }).then((notificationResult) => {
          console.log('📧 Notification result:', notificationResult);
          if ((notificationResult as any).error) {
            console.warn('⚠️ Notification sending failed:', (notificationResult as any).error);
            toast.warning('Contract created but notification failed to send');
          } else {
            console.log('✅ Notification sent successfully');
          }
        }).catch((notificationError) => {
          console.warn('⚠️ Unexpected error sending notification:', notificationError);
          toast.warning('Contract created but notification failed to send');
        });
      }

      await fetchContracts(); // Refresh contracts
      toast.success('Contract created successfully!');
      return contract.id;
    } catch (error: any) {
      console.error('❌ Error in createContract:', error);
      
      // Re-throw the error to be handled by the calling component  
      throw error;
    }
  };

  const respondToContract = async (
    contractId: string, 
    action: 'accept' | 'reject',
    responseMessage?: string
  ) => {
    if (!user) throw new Error('User not authenticated');

    try {
      // Fetch the contract to get the related transaction id
      const { data: existingContract, error: fetchErr } = await supabase
        .from('contracts')
        .select('id, transaction_id')
        .eq('id', contractId)
        .maybeSingle();

      if (fetchErr) throw fetchErr;

      const status = action === 'accept' ? 'accepted_awaiting_payment' : 'rejected';
      
      // Update contract status and response info
      const { error: updateErr } = await supabase
        .from('contracts')
        .update({
          status,
          response_message: responseMessage,
          responded_at: new Date().toISOString()
        })
        .eq('id', contractId)
        .eq('recipient_id', user.id);

      if (updateErr) throw updateErr;

      // Update the related transaction status to show in Transactions list
      if (existingContract?.transaction_id) {
        if (action === 'accept') {
          await supabase
            .from('transactions')
            .update({ status: 'contract_accepted' })
            .eq('id', existingContract.transaction_id);
        } else if (action === 'reject') {
          await supabase
            .from('transactions')
            .update({ status: 'contract_rejected' })
            .eq('id', existingContract.transaction_id);
        }
      }

      // Send notification to contract creator (non-blocking)
      supabase.functions.invoke('send-contract-response-notification', {
        body: {
          contract_id: contractId,
          action,
          response_message: responseMessage
        }
      }).catch((e) => console.error('Failed to send contract response notification:', e));

      toast.success(`Contract ${action}ed successfully`);
      await fetchContracts(); // Refresh contracts
    } catch (error: any) {
      console.error('Error responding to contract:', error);
      toast.error(`Failed to ${action} contract`);
      throw error;
    }
  };

  const getContractsByStatus = (status: Contract['status'] | 'all') => {
    return status === 'all' 
      ? contracts 
      : contracts.filter(contract => contract.status === status);
  };

  const getSentContracts = () => {
    return contracts.filter(contract => 
      contract.created_by === user?.id && contract.recipient_id
    );
  };

  const getReceivedContracts = () => {
    return contracts.filter(contract => 
      contract.recipient_id === user?.id
    );
  };

  const getPendingContracts = () => {
    return contracts.filter(contract => 
      contract.recipient_id === user?.id && 
      contract.status === 'awaiting_acceptance'
    );
  };

  // Role-based contract filtering
  const getContractsAsBuyer = () => {
    if (!user?.id) return [];
    return contracts.filter(contract => {
      // Find contracts where the user is the buyer in the associated transaction
      return contract.buyer_id === user.id;
    });
  };

  const getContractsAsSeller = () => {
    if (!user?.id) return [];
    return contracts.filter(contract => {
      // Find contracts where the user is the seller in the associated transaction
      return contract.seller_id === user.id;
    });
  };

  const getPendingContractsAsBuyer = () => {
    return getContractsAsBuyer().filter(contract => 
      contract.status === 'awaiting_acceptance' && contract.recipient_id === user?.id
    );
  };

  const getPendingContractsAsSeller = () => {
    return getContractsAsSeller().filter(contract => 
      contract.status === 'awaiting_acceptance' && contract.recipient_id === user?.id
    );
  };

  const getUserRoleInContract = (contract: Contract): 'buyer' | 'seller' | null => {
    if (!user?.id) return null;
    if (contract.buyer_id === user.id) return 'buyer';
    if (contract.seller_id === user.id) return 'seller';
    return null;
  };

  // New function to create a revised contract
  const createRevisedContract = async (
    originalContract: Contract,
    revisedContent: string,
    revisedTerms?: string
  ) => {
    if (!user) throw new Error('User not authenticated');
    
    // Only allow contract creator to revise
    if (originalContract.created_by !== user.id) {
      throw new Error('Only contract creator can create revisions');
    }

    // Only allow revision of rejected contracts
    if (originalContract.status !== 'rejected') {
      throw new Error('Only rejected contracts can be revised');
    }

    const revisionNumber = (originalContract.revision_number || 1) + 1;
    const parentId = originalContract.parent_contract_id || originalContract.id;

    // 1) Create the new revised contract (active)
    const newContractId = await createContract({
      transaction_id: originalContract.transaction_id,
      contract_content: revisedContent,
      terms: revisedTerms,
      recipient_id: originalContract.recipient_id,
      initiator_role: originalContract.initiator_role,
      parent_contract_id: parentId,
      revision_number: revisionNumber
    });

    if (!newContractId) throw new Error('Failed to create revised contract');

    // 2) Mark previous versions as inactive
    try {
      await supabase
        .from('contracts')
        .update({ is_active: false })
        .or(`id.eq.${parentId},parent_contract_id.eq.${parentId}`)
        .neq('id', newContractId);
    } catch (e) {
      console.warn('Failed to mark previous contract versions inactive:', e);
    }

    // 3) Move transaction back to ongoing (waiting for acceptance)
    try {
      await supabase
        .from('transactions')
        .update({ status: 'created' })
        .eq('id', originalContract.transaction_id);
    } catch (e) {
      console.warn('Failed to update transaction status after revision:', e);
    }

    await fetchContracts();
    return newContractId;
  };

  // Function to get contract revision history
  const getContractHistory = async (contractId: string): Promise<Contract[]> => {
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from('contracts')
        .select('*')
        .or(`id.eq.${contractId},parent_contract_id.eq.${contractId}`)
        .order('revision_number', { ascending: true });

      if (error) throw error;

      return (data || []).map((contract: any) => ({
        ...contract,
        status: contract.status as Contract['status']
      }));
    } catch (error) {
      console.error('Error fetching contract history:', error);
      return [];
    }
  };

  useEffect(() => {
    // Don't fetch if auth is still loading
    if (authLoading) {
      console.log('⏳ Auth loading, waiting before fetching contracts...');
      return;
    }
    
    fetchContracts();

    // Set up real-time subscription for contract updates
    if (user) {
      console.log('🔔 Setting up real-time subscription for contracts...');
      const channel = supabase
        .channel('contracts-channel')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'contracts'
          },
          (payload) => {
            console.log('🔔 Contract update received:', payload);
            // Refresh contracts when any contract changes
            fetchContracts();
          }
        )
        .subscribe();

      return () => {
        console.log('🔇 Unsubscribing from contracts channel...');
        supabase.removeChannel(channel);
      };
    }
  }, [user, authLoading]);

  return {
    contracts,
    loading,
    createContract,
    respondToContract,
    createRevisedContract,
    getContractHistory,
    getContractsByStatus,
    getSentContracts,
    getReceivedContracts,
    getPendingContracts,
    getContractsAsBuyer,
    getContractsAsSeller,
    getPendingContractsAsBuyer,
    getPendingContractsAsSeller,
    getUserRoleInContract,
    refreshContracts: fetchContracts
  };
};