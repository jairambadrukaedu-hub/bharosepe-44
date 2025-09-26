import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';

export interface Dispute {
  id: string;
  transaction_id: string;
  contract_id?: string | null;
  disputing_party_id: string;
  dispute_reason: string;
  description: string;
  evidence_files: string[];
  status: 'active' | 'resolved' | 'escalated';
  created_at: string;
  updated_at: string;
  resolved_at?: string | null;
  resolution_notes?: string | null;
  // Related data
  transaction?: {
    id: string;
    title: string;
    amount: number;
    buyer_id: string;
    seller_id: string;
  };
}

export const useDisputes = () => {
  const { user } = useAuth();
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDisputes = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('disputes')
        .select(`
          *,
          transaction:transactions(
            id,
            title,
            amount,
            buyer_id,
            seller_id
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform the data to match our interface
      const transformedData = (data || []).map((item: any) => ({
        ...item,
        evidence_files: Array.isArray(item.evidence_files) ? item.evidence_files : []
      }));

      setDisputes(transformedData);
    } catch (error) {
      console.error('Error fetching disputes:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDisputeById = (id: string) => {
    return disputes.find(dispute => dispute.id === id);
  };

  const getDisputeByTransactionId = (transactionId: string) => {
    return disputes.find(dispute => dispute.transaction_id === transactionId);
  };

  const getActiveDisputes = (userMode?: 'Buyer' | 'Seller') => {
    let filteredDisputes = disputes.filter(dispute => dispute.status === 'active');
    
    if (userMode && user?.id) {
      // Filter disputes based on user's role in the transaction
      filteredDisputes = filteredDisputes.filter(dispute => {
        if (userMode === 'Buyer') {
          return dispute.transaction?.buyer_id === user.id;
        } else {
          return dispute.transaction?.seller_id === user.id;
        }
      });
    }
    
    return filteredDisputes;
  };

  const getResolvedDisputes = (userMode?: 'Buyer' | 'Seller') => {
    let filteredDisputes = disputes.filter(dispute => dispute.status === 'resolved');
    
    if (userMode && user?.id) {
      // Filter disputes based on user's role in the transaction
      filteredDisputes = filteredDisputes.filter(dispute => {
        if (userMode === 'Buyer') {
          return dispute.transaction?.buyer_id === user.id;
        } else {
          return dispute.transaction?.seller_id === user.id;
        }
      });
    }
    
    return filteredDisputes;
  };

  const updateDisputeStatus = async (
    disputeId: string, 
    status: Dispute['status'], 
    resolutionNotes?: string
  ) => {
    try {
      const updateData: any = { 
        status,
        updated_at: new Date().toISOString()
      };

      if (status === 'resolved') {
        updateData.resolved_at = new Date().toISOString();
        if (resolutionNotes) {
          updateData.resolution_notes = resolutionNotes;
        }
      }

      const { error } = await supabase
        .from('disputes')
        .update(updateData)
        .eq('id', disputeId);

      if (error) throw error;

      // Refresh disputes
      await fetchDisputes();
      
      return true;
    } catch (error) {
      console.error('Error updating dispute status:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchDisputes();
  }, [user]);

  return {
    disputes,
    loading,
    fetchDisputes,
    getDisputeById,
    getDisputeByTransactionId,
    getActiveDisputes,
    getResolvedDisputes,
    updateDisputeStatus
  };
};