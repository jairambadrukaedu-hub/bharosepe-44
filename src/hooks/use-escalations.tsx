import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';

export interface Escalation {
  id: string;
  transaction_id: string;
  escalated_by: string;
  escalation_reason: string;
  escalation_notes?: string;
  evidence_files: string[];
  dispute_data: any;
  status: 'pending' | 'in_progress' | 'resolved';
  assigned_to?: string;
  resolution_notes?: string;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
}

export const useEscalations = () => {
  const { user } = useAuth();
  const [escalations, setEscalations] = useState<Escalation[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEscalations = async (transactionId?: string) => {
    if (!user) return;

    try {
      setLoading(true);
      
      let query = supabase
        .from('escalations')
        .select('*')
        .order('created_at', { ascending: false });

      if (transactionId) {
        query = query.eq('transaction_id', transactionId);
      }

      const { data, error } = await query;

      if (error) throw error;

      const transformedData = (data || []).map((item: any) => ({
        ...item,
        evidence_files: Array.isArray(item.evidence_files) ? item.evidence_files : []
      }));

      setEscalations(transformedData);
    } catch (error) {
      console.error('Error fetching escalations:', error);
      toast.error('Failed to fetch escalations');
    } finally {
      setLoading(false);
    }
  };

  const createEscalation = async (
    transactionId: string,
    escalationReason: string,
    escalationNotes?: string,
    evidenceFiles: File[] = []
  ) => {
    if (!user) {
      toast.error('Please log in to create an escalation');
      return false;
    }

    try {
      setLoading(true);

      // Fetch all dispute context data
      const [disputeData, disputeMessages, disputeProposals] = await Promise.all([
        // Get dispute info
        supabase
          .from('disputes')
          .select('*')
          .eq('transaction_id', transactionId)
          .order('created_at', { ascending: false }),
        
        // Get all dispute messages
        supabase
          .from('dispute_messages')
          .select('*')
          .eq('dispute_id', transactionId)
          .order('created_at', { ascending: true }),
        
        // Get all dispute proposals
        supabase
          .from('dispute_proposals')
          .select('*')
          .eq('dispute_id', transactionId)
          .order('created_at', { ascending: true })
      ]);

      // Upload evidence files if any
      const uploadedFiles: string[] = [];
      for (const file of evidenceFiles) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('escalation-evidence')
          .upload(fileName, file);

        if (uploadError) {
          console.error('File upload error:', uploadError);
          continue; // Continue with other files
        }

        uploadedFiles.push(uploadData.path);
      }

      // Create escalation record
      const { data, error } = await supabase
        .from('escalations')
        .insert({
          transaction_id: transactionId,
          escalated_by: user.id,
          escalation_reason: escalationReason,
          escalation_notes: escalationNotes,
          evidence_files: uploadedFiles,
          dispute_data: {
            disputes: disputeData.data || [],
            messages: disputeMessages.data || [],
            proposals: disputeProposals.data || [],
            escalation_timestamp: new Date().toISOString()
          }
        })
        .select()
        .single();

      if (error) throw error;

      // Update transaction status to 'escalated'
      const { error: updateError } = await supabase
        .from('transactions')
        .update({ status: 'escalated' })
        .eq('id', transactionId);

      if (updateError) {
        console.error('Error updating transaction status:', updateError);
        // Don't fail the whole operation for this
      }

      toast.success('Escalation request submitted successfully');
      await fetchEscalations(transactionId);
      
      return true;
    } catch (error: any) {
      console.error('Error creating escalation:', error);
      toast.error('Failed to submit escalation request');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getEscalationByTransactionId = (transactionId: string) => {
    return escalations.find(escalation => escalation.transaction_id === transactionId);
  };

  useEffect(() => {
    if (user) {
      fetchEscalations();
    }
  }, [user]);

  return {
    escalations,
    loading,
    fetchEscalations,
    createEscalation,
    getEscalationByTransactionId
  };
};