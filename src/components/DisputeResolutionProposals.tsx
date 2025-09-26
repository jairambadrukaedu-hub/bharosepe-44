import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDisputeProposals, DisputeProposal } from '@/hooks/use-dispute-proposals';
import { CheckCircle, XCircle, Clock, DollarSign, RefreshCw, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/use-auth';
import { useEscalations } from '@/hooks/use-escalations';

interface DisputeResolutionProposalsProps {
  dispute: any;
  transaction: any;
  userRole: 'buyer' | 'seller';
  onResolutionComplete?: () => void;
}

export const DisputeResolutionProposals: React.FC<DisputeResolutionProposalsProps> = ({
  dispute,
  transaction,
  userRole,
  onResolutionComplete,
}) => {
  const { proposals, loading, submitting, createProposal, respondToProposal } = useDisputeProposals(dispute.id);
  const { user } = useAuth();
  
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [proposalType, setProposalType] = useState<DisputeProposal['proposal_type']>('release_full');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [pendingResponse, setPendingResponse] = useState<{
    proposalId: string;
    action: 'accepted' | 'rejected';
  } | null>(null);

  const escrowAmount = transaction.amount;
  const isResolved = dispute.status === 'resolved';
  // Consider both transaction status and presence of an escalation record
  const { getEscalationByTransactionId } = useEscalations();
  const escalation = getEscalationByTransactionId?.(transaction.id);
  const isEscalated = transaction.status === 'escalated' || Boolean(escalation);

  const handleCreateProposal = async () => {
    const proposalAmount = proposalType.includes('partial') ? parseFloat(amount) : undefined;
    
    if (proposalType.includes('partial') && (!proposalAmount || proposalAmount <= 0 || proposalAmount > escrowAmount)) {
      return;
    }

    await createProposal(proposalType, proposalAmount, description);
    setShowCreateDialog(false);
    setAmount('');
    setDescription('');
  };

  const handleResponse = async (proposalId: string, action: 'accepted' | 'rejected') => {
    await respondToProposal(proposalId, action, transaction.id, escrowAmount);
    setShowConfirmDialog(false);
    setPendingResponse(null);
    if (action === 'accepted' && onResolutionComplete) {
      onResolutionComplete();
    }
  };

  const openConfirmDialog = (proposalId: string, action: 'accepted' | 'rejected') => {
    setPendingResponse({ proposalId, action });
    setShowConfirmDialog(true);
  };

  const getProposalTypeText = (type: string) => {
    switch (type) {
      case 'release_full': return 'Release Full Amount';
      case 'release_partial': return 'Release Partial Amount';
      case 'refund_full': return 'Refund Full Amount';
      case 'refund_partial': return 'Refund Partial Amount';
      default: return type;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const canCreateProposal = !isResolved && !isEscalated && !proposals.some(p => p.status === 'pending');
  const buyerActions = ['release_full', 'release_partial'];
  const sellerActions = ['refund_full', 'refund_partial'];
  const availableActions = userRole === 'buyer' ? buyerActions : sellerActions;

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <RefreshCw className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Resolution Summary for Resolved Disputes */}
      {isResolved && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-green-800">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Dispute Resolved</span>
            </div>
            <p className="text-sm text-green-700 mt-2">
              {dispute.resolution_notes || 'Funds have been settled according to the agreed proposal.'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Existing Proposals */}
      {proposals.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground">Resolution Proposals</h4>
          {proposals.map((proposal) => (
            <Card key={proposal.id} className="border-l-4 border-l-primary">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-sm">
                        {proposal.proposer_profile?.full_name || 'Unknown'}
                      </span>
                      <Badge variant="outline" className={getStatusColor(proposal.status)}>
                        {getStatusIcon(proposal.status)}
                        <span className="ml-1 capitalize">{proposal.status}</span>
                      </Badge>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-medium">
                        {getProposalTypeText(proposal.proposal_type)}
                        {proposal.amount && (
                          <span className="ml-2 text-primary">₹{proposal.amount}</span>
                        )}
                      </p>
                      
                      {proposal.description && (
                        <p className="text-xs text-muted-foreground">{proposal.description}</p>
                      )}
                      
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(proposal.created_at), 'MMM d, yyyy HH:mm')}
                      </p>
                    </div>
                  </div>

                  {/* Response Buttons */}
                  {proposal.status === 'pending' && proposal.proposed_by !== user?.id && !isEscalated && (
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openConfirmDialog(proposal.id, 'accepted')}
                        disabled={submitting}
                        className="text-green-600 border-green-200 hover:bg-green-50"
                      >
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openConfirmDialog(proposal.id, 'rejected')}
                        disabled={submitting}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Escalated to Customer Care Notice */}
      {isEscalated && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-orange-800">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">Escalated to Customer Care</span>
            </div>
            <p className="text-sm text-orange-700 mt-2">
              This dispute has been escalated to Customer Care. No new proposals can be created or responded to until Customer Care resolves this case.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Create New Proposal Button - Hidden when escalated */}
      {canCreateProposal && !isEscalated && (
        <Button
          onClick={() => setShowCreateDialog(true)}
          className="w-full"
          disabled={submitting}
        >
          <DollarSign className="w-4 h-4 mr-2" />
          Create Resolution Proposal
        </Button>
      )}

      {/* Create Proposal Dialog - Hidden when escalated */}
      {!isEscalated && (
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Resolution Proposal</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {availableActions.map((action) => (
                <Button
                  key={action}
                  variant={proposalType === action ? "default" : "outline"}
                  onClick={() => setProposalType(action as DisputeProposal['proposal_type'])}
                  className="text-xs h-12 whitespace-normal"
                >
                  {getProposalTypeText(action)}
                </Button>
              ))}
            </div>

            {proposalType.includes('partial') && (
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Amount (Max: ₹{escrowAmount})
                </label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  max={escrowAmount}
                  min="1"
                />
              </div>
            )}

            <div>
              <label className="text-sm font-medium mb-2 block">
                Description (Optional)
              </label>
              <Textarea
                placeholder="Explain your proposal..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowCreateDialog(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateProposal}
                disabled={
                  submitting ||
                  (proposalType.includes('partial') && (!amount || parseFloat(amount) <= 0 || parseFloat(amount) > escrowAmount))
                }
                className="flex-1"
              >
                Submit Proposal
              </Button>
            </div>
          </div>
        </DialogContent>
        </Dialog>
      )}

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pendingResponse?.action === 'accepted' ? 'Accept Proposal' : 'Reject Proposal'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {pendingResponse?.action === 'accepted'
                ? 'Are you sure you want to accept this proposal? This will resolve the dispute and update the transaction status.'
                : 'Are you sure you want to reject this proposal? The other party will be notified.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => pendingResponse && handleResponse(pendingResponse.proposalId, pendingResponse.action)}
              disabled={submitting}
              className={
                pendingResponse?.action === 'accepted'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-red-600 hover:bg-red-700'
              }
            >
              {pendingResponse?.action === 'accepted' ? 'Accept' : 'Reject'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
