import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './use-auth';
import { toast } from 'sonner';

export interface DisputeProposal {
  id: string;
  dispute_id: string;
  proposed_by: string;
  proposal_type: 'release_full' | 'release_partial' | 'refund_full' | 'refund_partial';
  amount?: number;
  description?: string;
  status: 'pending' | 'accepted' | 'rejected';
  responded_by?: string;
  responded_at?: string;
  created_at: string;
  updated_at: string;
  proposer_profile?: {
    full_name: string;
  };
}

export const useDisputeProposals = (disputeId: string) => {
  const { user } = useAuth();
  const [proposals, setProposals] = useState<DisputeProposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const checkIsEscalated = async (): Promise<boolean> => {
    if (!disputeId) return false;
    const { data: dispute, error: disputeError } = await supabase
      .from('disputes')
      .select('transaction_id')
      .eq('id', disputeId)
      .maybeSingle();
    if (disputeError) {
      console.error('Error verifying dispute for escalation:', disputeError);
      toast.error('Unable to verify escalation state');
      return true;
    }
    if (!dispute?.transaction_id) return false;
    const { data: tx, error: txError } = await supabase
      .from('transactions')
      .select('status')
      .eq('id', dispute.transaction_id)
      .maybeSingle();
    if (txError) {
      console.error('Error checking transaction status:', txError);
      toast.error('Unable to verify escalation state');
      return true;
    }
    return tx?.status === 'escalated';
  };

  const fetchProposals = async () => {
    if (!disputeId) return;

    const { data, error } = await supabase
      .from('dispute_proposals')
      .select('*')
      .eq('dispute_id', disputeId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching proposals:', error);
      toast.error('Failed to load proposals');
    } else {
      const proposalsData = (data || []);
      // Fetch proposer profiles separately (no FK join)
      const proposerIds = Array.from(new Set(proposalsData.map((p: any) => p.proposed_by).filter(Boolean)));
      let profilesByUserId: Record<string, { full_name: string } | undefined> = {};

      if (proposerIds.length > 0) {
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('user_id, full_name')
          .in('user_id', proposerIds);

        if (profilesError) {
          console.error('Error fetching proposer profiles:', profilesError);
        } else if (profiles) {
          profilesByUserId = profiles.reduce((acc: Record<string, { full_name: string }>, cur: any) => {
            acc[cur.user_id] = { full_name: cur.full_name };
            return acc;
          }, {});
        }
      }

      setProposals(proposalsData.map((item: any) => ({
        ...item,
        proposer_profile: profilesByUserId[item.proposed_by]
      })) as DisputeProposal[]);
    }
    setLoading(false);
  };

  const createProposal = async (
    proposalType: DisputeProposal['proposal_type'],
    amount?: number,
    description?: string
  ) => {
    if (!user || !disputeId) return;

    const escalated = await checkIsEscalated();
    if (escalated) {
      toast.error('This case is escalated to Customer Care. Proposals are disabled.');
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('dispute_proposals')
        .insert({
          dispute_id: disputeId,
          proposed_by: user.id,
          proposal_type: proposalType,
          amount,
          description,
        });

      if (error) throw error;

      toast.success('Proposal submitted successfully');
      // Notify the other party about the new proposal (non-blocking)
      supabase.functions.invoke('send-proposal-notification', {
        body: {
          dispute_id: disputeId,
          actor_id: user.id,
          event: 'proposal_created',
          proposal_type: proposalType,
          amount,
        }
      }).catch((e) => {
        console.error('Failed to send proposal notification:', e);
      });
      await fetchProposals();
    } catch (error) {
      console.error('Error creating proposal:', error);
      toast.error('Failed to submit proposal');
    } finally {
      setSubmitting(false);
    }
  };

  const respondToProposal = async (
    proposalId: string,
    action: 'accepted' | 'rejected',
    transactionId?: string,
    escrowAmount?: number
  ) => {
    if (!user) return;

    const escalated = await checkIsEscalated();
    if (escalated) {
      toast.error('This case is escalated to Customer Care. Proposal actions are disabled.');
      return;
    }

    setSubmitting(true);
    try {
      const { error: updateError } = await supabase
        .from('dispute_proposals')
        .update({
          status: action,
          responded_by: user.id,
          responded_at: new Date().toISOString(),
        })
        .eq('id', proposalId);

      if (updateError) throw updateError;

      // If accepted, update transaction status and handle escrow
      if (action === 'accepted' && transactionId) {
        const proposal = proposals.find(p => p.id === proposalId);
        if (proposal) {
          // All accepted proposals result in completed status
          const newStatus = 'completed';
          
          // Calculate resolution breakdown
          let buyerRefund = 0;
          let sellerRelease = 0;
          const totalAmount = escrowAmount || 0;
          
          if (proposal.proposal_type === 'release_full') {
            sellerRelease = totalAmount;
            buyerRefund = 0;
          } else if (proposal.proposal_type === 'refund_full') {
            buyerRefund = totalAmount;
            sellerRelease = 0;
          } else if (proposal.proposal_type === 'release_partial') {
            sellerRelease = proposal.amount || 0;
            buyerRefund = totalAmount - sellerRelease;
          } else if (proposal.proposal_type === 'refund_partial') {
            buyerRefund = proposal.amount || 0;
            sellerRelease = totalAmount - buyerRefund;
          }

          const resolutionBreakdown = {
            buyer_refund: buyerRefund,
            seller_release: sellerRelease,
            resolution_type: proposal.proposal_type,
            total_amount: totalAmount
          };

          // Update transaction status
          const { error: txError } = await supabase
            .from('transactions')
            .update({ 
              status: newStatus,
              resolution_breakdown: resolutionBreakdown,
              updated_at: new Date().toISOString()
            })
            .eq('id', transactionId);

          if (txError) throw txError;

          // Update dispute status
          const { error: disputeError } = await supabase
            .from('disputes')
            .update({
              status: 'resolved',
              resolved_at: new Date().toISOString(),
              resolution_notes: `Proposal accepted: ${proposal.proposal_type} ${proposal.amount ? `₹${proposal.amount}` : 'full amount'}`
            })
            .eq('id', disputeId);

          if (disputeError) throw disputeError;
        }
      }

      // Notify the other party about the response (non-blocking)
      supabase.functions.invoke('send-proposal-notification', {
        body: {
          dispute_id: disputeId,
          actor_id: user.id,
          event: action === 'accepted' ? 'proposal_accepted' : 'proposal_rejected',
          proposal_id: proposalId,
        }
      }).catch((e) => {
        console.error('Failed to send proposal response notification:', e);
      });

      toast.success(`Proposal ${action} successfully`);
      await fetchProposals();
    } catch (error) {
      console.error('Error responding to proposal:', error);
      toast.error(`Failed to ${action} proposal`);
    } finally {
      setSubmitting(false);
    }
  };

  // Set up real-time subscription for proposals
  useEffect(() => {
    if (!disputeId) return;

    const channel = supabase
      .channel('dispute-proposals-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'dispute_proposals',
          filter: `dispute_id=eq.${disputeId}`,
        },
        () => {
          fetchProposals();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [disputeId]);

  useEffect(() => {
    fetchProposals();
  }, [disputeId, user]);

  return {
    proposals,
    loading,
    submitting,
    createProposal,
    respondToProposal,
    fetchProposals,
  };
};