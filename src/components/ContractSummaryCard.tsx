import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Clock, CheckCircle, XCircle, Eye, EyeOff, User, Calendar, ChevronDown, ChevronUp, Edit3, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Contract, useContracts } from '@/hooks/use-contracts';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ContractRevisionEditor from '@/components/ContractRevisionEditor';

interface ContractSummaryCardProps {
  contract: Contract;
  type: 'sent' | 'received';
}

export const ContractSummaryCard = ({ contract, type }: ContractSummaryCardProps) => {
  const { user } = useAuth();
  const { respondToContract } = useContracts();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isResponding, setIsResponding] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [hasResponded, setHasResponded] = useState(false);
  const [showRevisionEditor, setShowRevisionEditor] = useState(false);
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'awaiting_acceptance':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'accepted_awaiting_payment':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'expired':
        return <Clock className="h-4 w-4 text-gray-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'awaiting_acceptance':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'accepted_awaiting_payment':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'expired':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    // First check if this contract is associated with a completed transaction
    const transaction = contract.transaction;
    
    switch (status) {
      case 'awaiting_acceptance':
        return 'Awaiting Acceptance';
      case 'accepted_awaiting_payment':
        return 'Active – Waiting for Buyer Payment';
      case 'accepted':
        // Check if we can determine more detail from context
        return 'Active';
      case 'rejected':
        return 'Rejected';
      case 'expired':
        return 'Expired';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  // Create a 3-line summary from contract content
  const getSummary = (content: string) => {
    const lines = content.split('\n').filter(line => line.trim());
    return lines.slice(0, 3).join('\n');
  };

  const isRecipient = contract.recipient_id === user?.id;
  const canRespond = isRecipient && contract.status === 'awaiting_acceptance' && !hasResponded;
  const canRevise = contract.created_by === user?.id && contract.status === 'rejected';
  
  const handleResponse = async (action: 'accept' | 'reject') => {
    setIsResponding(true);
    try {
await respondToContract(contract.id, action, responseMessage || undefined);
// Optimistic: hide response actions immediately
setHasResponded(true);
toast.success(`Contract ${action}ed successfully!`);
if (action === 'accept') {
  toast.info('Contract accepted. Both parties will be notified. Next: Awaiting escrow payment.');
}
// Contract status will be updated automatically by the hook's real-time subscription
    } catch (error) {
      console.error('Error responding to contract:', error);
      toast.error(`Failed to ${action} contract`);
    } finally {
      setIsResponding(false);
    }
  };

  return (
    <Card className="mb-4 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-bharose-primary" />
              <h3 className="font-medium">
                {contract.transaction?.title || 'Contract Agreement'}
              </h3>
              <Badge className={`${getStatusColor(contract.status)} border`}>
                {getStatusLabel(contract.status)}
              </Badge>
            </div>
            
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-3 w-3" />
                <span>
                  {type === 'sent' ? 'To: ' : 'From: '}
                  <span className="font-medium text-foreground">
                    {type === 'sent' ? contract.recipient_name : contract.creator_name}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <span>Amount: ₹{contract.transaction?.amount?.toLocaleString() || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(contract.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {getStatusIcon(contract.status)}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Contract Summary (first 3 lines) */}
        <div className="mb-4">
          <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg border">
            <p className="whitespace-pre-wrap">{getSummary(contract.contract_content)}</p>
            {contract.contract_content.split('\n').filter(line => line.trim()).length > 3 && (
              <p className="text-xs text-muted-foreground mt-1 italic">
                ...{contract.contract_content.split('\n').filter(line => line.trim()).length - 3} more lines
              </p>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 h-8 px-2 text-xs"
          >
            {isExpanded ? (
              <>
                <EyeOff className="h-3 w-3 mr-1" />
                Hide Full Contract
                <ChevronUp className="h-3 w-3 ml-1" />
              </>
            ) : (
              <>
                <Eye className="h-3 w-3 mr-1" />
                View Full Contract
                <ChevronDown className="h-3 w-3 ml-1" />
              </>
            )}
          </Button>
        </div>

        {/* Expanded Contract Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 space-y-3"
            >
              <div>
                <Label className="text-xs font-medium text-muted-foreground">Full Contract Details</Label>
                <div className="mt-1 p-3 bg-muted/30 rounded-lg border text-sm">
                  <p className="whitespace-pre-wrap">{contract.contract_content}</p>
                </div>
              </div>

              {contract.terms && (
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">Additional Terms</Label>
                  <div className="mt-1 p-3 bg-muted/30 rounded-lg border text-sm">
                    <p className="whitespace-pre-wrap">{contract.terms}</p>
                  </div>
                </div>
              )}

              {contract.response_message && (
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">Response Message</Label>
                  <div className="mt-1 p-3 bg-muted/30 rounded-lg border text-sm">
                    <p className="whitespace-pre-wrap">{contract.response_message}</p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Response Section for Recipients */}
        {canRespond && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3 border-t pt-4"
          >
            <div className="bg-bharose-primary/5 p-3 rounded-lg border border-bharose-primary/20">
              <p className="text-sm font-medium text-bharose-primary mb-1">Action Required</p>
              <p className="text-xs text-muted-foreground">
                You have received a contract that requires your response. Review the terms and accept or reject.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="response-message" className="text-xs">Response Message (Optional)</Label>
              <Textarea
                id="response-message"
                value={responseMessage}
                onChange={(e) => setResponseMessage(e.target.value)}
                placeholder="Add any comments or feedback..."
                className="resize-none text-sm"
                rows={2}
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => handleResponse('accept')}
                disabled={isResponding}
                className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-xs h-8"
              >
                {isResponding ? (
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <CheckCircle className="h-3 w-3" />
                )}
                Accept Contract
              </Button>
              
              <Button
                variant="outline"
                onClick={() => handleResponse('reject')}
                disabled={isResponding}
                className="flex items-center gap-1 border-red-200 text-red-600 hover:bg-red-50 text-xs h-8"
              >
                {isResponding ? (
                  <div className="w-3 h-3 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <XCircle className="h-3 w-3" />
                )}
                Reject Contract
              </Button>
            </div>
          </motion.div>
        )}
        
        {/* Show next steps for accepted contracts */}
        {contract.status === 'accepted_awaiting_payment' && (
          <div className="mt-4 bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-sm font-medium text-green-800 mb-1">✅ Contract Accepted!</p>
            <p className="text-xs text-green-600 mb-4">
              Payment is now required to secure this transaction in escrow.
            </p>
            
            {/* Show payment button only for buyers */}
            {contract.transaction && 
             contract.transaction.buyer_id === user?.id && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/payment', {
                    state: {
                      amount: contract.transaction.amount.toString(),
                      transactionId: contract.transaction_id
                    }
                  });
                }}
                className="w-full bg-bharose-primary hover:bg-bharose-primary/90 text-white text-sm font-medium py-3"
              >
                🔒 Pay into Escrow - ₹{contract.transaction.amount.toLocaleString()}
              </Button>
            )}
            
            {/* Show waiting message for sellers */}
            {contract.transaction && 
             contract.transaction.seller_id === user?.id && (
              <div className="text-center py-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700">⏳ Waiting for buyer payment</p>
                <p className="text-xs text-blue-600 mt-1">
                  The buyer will pay ₹{contract.transaction.amount.toLocaleString()} into secure escrow
                </p>
              </div>
            )}
          </div>
        )}

        {/* Show revision option for rejected contracts */}
        {canRevise && (
          <div className="mt-4 bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm font-medium text-red-800 mb-1">❌ Contract Rejected</p>
                <p className="text-xs text-red-600">
                  You can revise and resend this contract to address the concerns.
                </p>
              </div>
              <RotateCcw className="h-4 w-4 text-red-600 shrink-0 mt-1" />
            </div>
            
            {contract.response_message && (
              <div className="mb-3 p-2 bg-red-100 rounded border border-red-200">
                <p className="text-xs font-medium text-red-700 mb-1">Rejection Reason:</p>
                <p className="text-xs text-red-600 whitespace-pre-wrap">
                  {contract.response_message}
                </p>
              </div>
            )}
            
            <Button
              onClick={() => setShowRevisionEditor(true)}
              className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 flex items-center justify-center gap-2"
            >
              <Edit3 className="h-3 w-3" />
              Edit & Resend Contract
            </Button>
          </div>
        )}
      </CardContent>

      {/* Revision Editor Modal */}
      <AnimatePresence>
        {showRevisionEditor && (
          <ContractRevisionEditor
            originalContract={contract}
            onClose={() => setShowRevisionEditor(false)}
            onRevisionSent={() => {
              setShowRevisionEditor(false);
              // Optionally refresh or show success message
            }}
          />
        )}
      </AnimatePresence>
    </Card>
  );
};

export default ContractSummaryCard;