import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, DollarSign, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/use-auth';

interface DisputeResolutionActionsProps {
  transaction: any;
  dispute: any;
  userRole: 'buyer' | 'seller';
  onResolutionComplete: () => void;
}

export const DisputeResolutionActions: React.FC<DisputeResolutionActionsProps> = ({
  transaction,
  dispute,
  userRole,
  onResolutionComplete
}) => {
  const { user } = useAuth();
  const [resolving, setResolving] = useState(false);
  const [releaseAmount, setReleaseAmount] = useState('');
  const [refundAmount, setRefundAmount] = useState('');
  const [showReleaseModal, setShowReleaseModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    type: 'release_full' | 'release_partial' | 'refund_full' | 'refund_partial';
    amount?: number;
  } | null>(null);

  const addResolutionMessage = async (resolutionText: string) => {
    try {
      await supabase
        .from('dispute_messages')
        .insert({
          dispute_id: dispute.id,
          sender_id: user!.id,
          message: resolutionText,
          message_type: 'system'
        });
    } catch (error) {
      console.error('Error adding resolution message:', error);
    }
  };

  const handleResolution = async (
    action: 'release_full' | 'release_partial' | 'refund_full' | 'refund_partial',
    amount?: number
  ) => {
    if (!user || !transaction || !dispute) return;

    setResolving(true);
    
    try {
      let resolutionNotes = '';
      let resolutionMessage = '';
      let newTransactionStatus = 'completed';
      
      // Determine resolution notes and messages based on action
      switch (action) {
        case 'release_full':
          resolutionNotes = 'Completed – Buyer Released Funds (Full)';
          resolutionMessage = `🎉 Dispute Resolved – Funds Settled\n\n₹${transaction.amount.toLocaleString()} released to Seller.\n\nThis dispute has been resolved and the transaction is now complete.`;
          break;
        case 'release_partial':
          const remainingAmount = transaction.amount - (amount || 0);
          resolutionNotes = `Completed – Buyer Released Funds (Partial) - ₹${amount?.toLocaleString()}`;
          resolutionMessage = `🎉 Dispute Resolved – Funds Settled\n\n₹${amount?.toLocaleString()} released to Seller\n₹${remainingAmount.toLocaleString()} refunded to Buyer\n\nThis dispute has been resolved and the transaction is now complete.`;
          break;
        case 'refund_full':
          resolutionNotes = 'Completed – Seller Refunded (Full)';
          resolutionMessage = `🎉 Dispute Resolved – Funds Settled\n\n₹${transaction.amount.toLocaleString()} refunded to Buyer.\n\nThis dispute has been resolved and the transaction is now complete.`;
          break;
        case 'refund_partial':
          const sellerAmount = transaction.amount - (amount || 0);
          resolutionNotes = `Completed – Seller Refunded (Partial) - ₹${amount?.toLocaleString()}`;
          resolutionMessage = `🎉 Dispute Resolved – Funds Settled\n\n₹${amount?.toLocaleString()} refunded to Buyer\n₹${sellerAmount.toLocaleString()} released to Seller\n\nThis dispute has been resolved and the transaction is now complete.`;
          break;
      }

      // Update dispute status to resolved
      const { error: disputeError } = await supabase
        .from('disputes')
        .update({
          status: 'resolved',
          resolved_at: new Date().toISOString(),
          resolution_notes: resolutionNotes,
          updated_at: new Date().toISOString()
        })
        .eq('id', dispute.id);

      if (disputeError) throw disputeError;

      // Update transaction status to completed
      const { error: transactionError } = await supabase
        .from('transactions')
        .update({
          status: newTransactionStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', transaction.id);

      if (transactionError) throw transactionError;

      // Add resolution message to chat
      await addResolutionMessage(resolutionMessage);

      // Success - call the completion callback
      onResolutionComplete();
      
    } catch (error) {
      console.error('Error resolving dispute:', error);
      toast.error('Failed to resolve dispute');
    } finally {
      setResolving(false);
      setShowConfirmDialog(false);
      setPendingAction(null);
    }
  };

  const handlePartialAmount = (amount: string, maxAmount: number) => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error('Please enter a valid amount');
      return null;
    }
    if (numAmount > maxAmount) {
      toast.error('Amount cannot exceed transaction value');
      return null;
    }
    return numAmount;
  };

  const handleActionConfirm = () => {
    if (!pendingAction) return;
    
    if (pendingAction.type.includes('partial') && pendingAction.amount) {
      handleResolution(pendingAction.type, pendingAction.amount);
    } else {
      handleResolution(pendingAction.type);
    }
  };

  const openConfirmDialog = (action: typeof pendingAction) => {
    setPendingAction(action);
    setShowConfirmDialog(true);
    setShowReleaseModal(false);
    setShowRefundModal(false);
  };

  // Only show actions if transaction is under dispute and has an amount (escrow balance exists)
  if (!transaction || !dispute || dispute.status !== 'active' || !transaction.amount) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Buyer Actions */}
      {userRole === 'buyer' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Escrow Balance: ₹{transaction.amount.toLocaleString()}</span>
            <Badge variant="outline">Buyer Actions</Badge>
          </div>
          
          <Dialog open={showReleaseModal} onOpenChange={setShowReleaseModal}>
            <DialogTrigger asChild>
              <Button className="w-full" disabled={resolving}>
                <DollarSign className="h-4 w-4 mr-2" />
                Release Funds
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Release Funds to Seller</DialogTitle>
                <DialogDescription>
                  Choose how much to release from the escrow balance of ₹{transaction.amount.toLocaleString()}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => openConfirmDialog({ type: 'release_full' })}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Release Full Amount (₹{transaction.amount.toLocaleString()})
                </Button>
                
                <div className="space-y-2">
                  <Input
                    type="number"
                    placeholder="Enter partial amount"
                    value={releaseAmount}
                    onChange={(e) => setReleaseAmount(e.target.value)}
                    max={transaction.amount}
                  />
                  <Button 
                    variant="outline" 
                    className="w-full"
                    disabled={!releaseAmount || parseFloat(releaseAmount) <= 0}
                    onClick={() => {
                      const amount = handlePartialAmount(releaseAmount, transaction.amount);
                      if (amount) openConfirmDialog({ type: 'release_partial', amount });
                    }}
                  >
                    Release Partial Amount (₹{releaseAmount || '0'})
                  </Button>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="ghost" onClick={() => setShowReleaseModal(false)}>
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {/* Seller Actions */}
      {userRole === 'seller' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Escrow Balance: ₹{transaction.amount.toLocaleString()}</span>
            <Badge variant="outline">Seller Actions</Badge>
          </div>
          
          <Dialog open={showRefundModal} onOpenChange={setShowRefundModal}>
            <DialogTrigger asChild>
              <Button className="w-full" disabled={resolving}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refund Buyer
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Refund Buyer</DialogTitle>
                <DialogDescription>
                  Choose how much to refund from the escrow balance of ₹{transaction.amount.toLocaleString()}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => openConfirmDialog({ type: 'refund_full' })}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refund Full Amount (₹{transaction.amount.toLocaleString()})
                </Button>
                
                <div className="space-y-2">
                  <Input
                    type="number"
                    placeholder="Enter partial amount"
                    value={refundAmount}
                    onChange={(e) => setRefundAmount(e.target.value)}
                    max={transaction.amount}
                  />
                  <Button 
                    variant="outline" 
                    className="w-full"
                    disabled={!refundAmount || parseFloat(refundAmount) <= 0}
                    onClick={() => {
                      const amount = handlePartialAmount(refundAmount, transaction.amount);
                      if (amount) openConfirmDialog({ type: 'refund_partial', amount });
                    }}
                  >
                    Refund Partial Amount (₹{refundAmount || '0'})
                  </Button>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="ghost" onClick={() => setShowRefundModal(false)}>
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pendingAction?.type === 'release_full' && 'Release Full Payment?'}
              {pendingAction?.type === 'release_partial' && 'Release Partial Payment?'}
              {pendingAction?.type === 'refund_full' && 'Refund Full Amount?'}
              {pendingAction?.type === 'refund_partial' && 'Refund Partial Amount?'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {pendingAction?.type === 'release_full' && 
                `This will release the full amount of ₹${transaction.amount.toLocaleString()} to the seller and close the dispute. This action cannot be undone.`
              }
              {pendingAction?.type === 'release_partial' && 
                `This will release ₹${pendingAction.amount?.toLocaleString()} to the seller and refund ₹${(transaction.amount - (pendingAction.amount || 0)).toLocaleString()} to you. The dispute will be closed. This action cannot be undone.`
              }
              {pendingAction?.type === 'refund_full' && 
                `This will refund the full amount of ₹${transaction.amount.toLocaleString()} to the buyer and close the dispute. This action cannot be undone.`
              }
              {pendingAction?.type === 'refund_partial' && 
                `This will refund ₹${pendingAction.amount?.toLocaleString()} to the buyer and release ₹${(transaction.amount - (pendingAction.amount || 0)).toLocaleString()} to you. The dispute will be closed. This action cannot be undone.`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={resolving}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleActionConfirm} disabled={resolving}>
              {resolving ? 'Processing...' : 'Confirm'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="text-xs text-muted-foreground text-center">
        <p>Fund handling actions are only available when the transaction is under dispute and has an escrow balance.</p>
      </div>
    </div>
  );
};

export default DisputeResolutionActions;