import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, SortAsc } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import UnifiedTransactionCard from './UnifiedTransactionCard';
import { useTransactions, type Transaction } from '@/hooks/use-transactions';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useContracts, type Contract } from '@/hooks/use-contracts';
import ContractRevisionEditor from '@/components/ContractRevisionEditor';

interface OptimizedTransactionListProps {
  transactions: Transaction[];
  userMode: string;
  onEditResend?: (transaction: Transaction) => void;
  rejectedContractsMap?: Map<string, any>;
  currentUserId?: string;
}

const OptimizedTransactionList: React.FC<OptimizedTransactionListProps> = ({ 
  transactions, 
  userMode, 
  onEditResend,
  rejectedContractsMap,
  currentUserId 
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { updateTransactionStatus } = useTransactions(userMode as 'Buyer' | 'Seller');
  
  const [disputeDialogOpen, setDisputeDialogOpen] = useState(false);
  const [currentTransactionId, setCurrentTransactionId] = useState<string | null>(null);
  const [disputeDetails, setDisputeDetails] = useState('');

  const handleTransactionClick = useCallback((id: string) => {
    navigate(`/transaction-status/${id}`, { state: { userMode } });
  }, [navigate, userMode]);

  const handleDisputeOpen = useCallback((id: string) => {
    setCurrentTransactionId(id);
    setDisputeDialogOpen(true);
  }, []);

  const handleDisputeSubmit = useCallback(async () => {
    if (!disputeDetails.trim()) {
      toast.error('Please describe the issue');
      return;
    }

    if (currentTransactionId) {
      try {
        await updateTransactionStatus(currentTransactionId, 'disputed', disputeDetails, true);
        
        // Send dispute notification to the other party (non-blocking)
        supabase.functions.invoke('send-dispute-notification', {
          body: {
            transaction_id: currentTransactionId,
            disputing_party_id: user?.id,
            dispute_reason: 'general_dispute',
            description: disputeDetails
          }
        }).then(() => {
          console.log('✅ Dispute notification sent');
        }).catch((notificationError) => {
          console.error('Failed to send dispute notification:', notificationError);
          // Don't fail the entire operation if notification fails
        });
        
        setDisputeDialogOpen(false);
        setDisputeDetails('');
        toast.success('Dispute submitted successfully');
      } catch (error) {
        toast.error('Failed to submit dispute');
      }
    }
  }, [currentTransactionId, disputeDetails, updateTransactionStatus]);

  return (
    <div className="space-y-4">
      {transactions.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>No transactions found</p>
        </div>
      ) : (
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {transactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <UnifiedTransactionCard
                transaction={transaction}
                userMode={userMode}
                showActions={true}
                onStatusUpdate={updateTransactionStatus}
                onEditResend={onEditResend}
                rejectionReason={rejectedContractsMap?.get(transaction.id)?.response_message}
                isContractCreator={rejectedContractsMap?.get(transaction.id)?.created_by === currentUserId}
                className="mb-3"
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Dispute Dialog */}
      <Dialog open={disputeDialogOpen} onOpenChange={setDisputeDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Raise a Dispute</DialogTitle>
            <DialogDescription>
              Please provide details about the issue you're experiencing.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Textarea 
              value={disputeDetails}
              onChange={(e) => setDisputeDetails(e.target.value)}
              placeholder="Describe your issue in detail..."
              className="min-h-[100px]"
            />
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDisputeDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleDisputeSubmit}
              className="bg-bharose-primary hover:bg-bharose-primary/90"
            >
              Submit Dispute
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OptimizedTransactionList;