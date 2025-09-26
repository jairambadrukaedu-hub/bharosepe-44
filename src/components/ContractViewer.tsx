import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, XCircle, Clock, User, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useContracts, Contract } from '@/hooks/use-contracts';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';

interface ContractViewerProps {
  contractId: string;
}

export default function ContractViewer({ contractId }: ContractViewerProps) {
  const { user } = useAuth();
  const { contracts, respondToContract } = useContracts();
const [contract, setContract] = useState<Contract | null>(null);
const [responseMessage, setResponseMessage] = useState('');
const [isResponding, setIsResponding] = useState(false);
const [loading, setLoading] = useState(true);
const [isExpanded, setIsExpanded] = useState(false);
const [hasResponded, setHasResponded] = useState(false);
  useEffect(() => {
    const foundContract = contracts.find(c => c.id === contractId);
    setContract(foundContract || null);
    setLoading(false);
  }, [contracts, contractId]);

  const handleResponse = async (action: 'accept' | 'reject') => {
    if (!contract) return;

    setIsResponding(true);
try {
  await respondToContract(contract.id, action, responseMessage || undefined);
  // Optimistic local update for instant UI feedback
  setHasResponded(true);
  setContract(prev => prev ? {
    ...prev,
    status: action === 'accept' ? 'accepted_awaiting_payment' : 'rejected',
    response_message: responseMessage || prev.response_message,
    responded_at: new Date().toISOString()
  } : prev);
  toast.success(`Contract ${action}ed successfully`);
  // Contract status will be updated automatically by the hook's real-time subscription
} catch (error) {
      console.error('Error responding to contract:', error);
    } finally {
      setIsResponding(false);
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

  // Create a 3-line summary from contract content
  const getSummary = (content: string) => {
    const lines = content.split('\n').filter(line => line.trim());
    return lines.slice(0, 3).join('\n');
  };

  const isRecipient = contract && contract.recipient_id === user?.id;
  const canRespond = isRecipient && contract?.status === 'awaiting_acceptance' && !hasResponded;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="w-6 h-6 border-2 border-bharose-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="text-center py-8">
        <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
        <p className="text-muted-foreground">Contract not found</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6 text-bharose-primary" />
          <div>
            <h3 className="text-lg font-semibold">Contract Details</h3>
            <p className="text-sm text-muted-foreground">
              {contract.transaction?.title || 'Transaction Contract'}
            </p>
          </div>
        </div>
        
        <Badge className={`${getStatusColor(contract.status)} border`}>
          {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
        </Badge>
      </div>

      {/* Contract Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Created by</p>
            <p className="text-sm font-medium">{contract.creator_name}</p>
          </div>
        </div>
        
        {contract.recipient_name && (
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Sent to</p>
              <p className="text-sm font-medium">{contract.recipient_name}</p>
            </div>
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Created</p>
            <p className="text-sm font-medium">
              {new Date(contract.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        {contract.responded_at && (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Responded</p>
              <p className="text-sm font-medium">
                {new Date(contract.responded_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Contract Content (collapsed summary by default) */}
      <div className="space-y-3">
        <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg border">
          <p className="whitespace-pre-wrap">
            {contract.contract_content ? getSummary(contract.contract_content) : ''}
          </p>
          {contract.contract_content && contract.contract_content.split('\n').filter(line => line.trim()).length > 3 && (
            <p className="text-xs text-muted-foreground mt-1 italic">
              ...{contract.contract_content.split('\n').filter(line => line.trim()).length - 3} more lines
            </p>
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-8 px-2 text-xs"
        >
          {isExpanded ? 'Hide Full Contract' : 'View Full Contract'}
        </Button>

        {isExpanded && (
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Contract Details</Label>
              <div className="mt-2 p-4 bg-muted/50 rounded-lg border">
                <p className="text-sm whitespace-pre-wrap">{contract.contract_content}</p>
              </div>
            </div>

            {contract.terms && (
              <div>
                <Label className="text-sm font-medium">Additional Terms</Label>
                <div className="mt-2 p-4 bg-muted/50 rounded-lg border">
                  <p className="text-sm whitespace-pre-wrap">{contract.terms}</p>
                </div>
              </div>
            )}

            {contract.response_message && (
              <div>
                <Label className="text-sm font-medium">Response Message</Label>
                <div className="mt-2 p-4 bg-muted/50 rounded-lg border">
                  <p className="text-sm whitespace-pre-wrap">{contract.response_message}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Response Section for Recipients */}
      {canRespond && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 border-t pt-6"
        >
          <h4 className="font-medium">Respond to Contract</h4>
          
          <div className="space-y-3">
            <Label htmlFor="response-message">Response Message (Optional)</Label>
            <Textarea
              id="response-message"
              value={responseMessage}
              onChange={(e) => setResponseMessage(e.target.value)}
              placeholder="Add any comments or feedback..."
              className="resize-none"
              rows={3}
            />
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => handleResponse('accept')}
              disabled={isResponding}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              {isResponding ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <CheckCircle className="h-4 w-4" />
              )}
              Accept Contract
            </Button>
            
            <Button
              variant="outline"
              onClick={() => handleResponse('reject')}
              disabled={isResponding}
              className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50"
            >
              {isResponding ? (
                <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              Reject Contract
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}