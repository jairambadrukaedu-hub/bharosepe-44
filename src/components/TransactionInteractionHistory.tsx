import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Send, 
  Edit3, 
  CreditCard, 
  Package, 
  AlertTriangle,
  Clock,
  User,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface InteractionEvent {
  id: string;
  type: 'transaction_created' | 'contract_sent' | 'contract_accepted' | 'contract_rejected' | 'contract_revised' | 'payment_made' | 'work_completed' | 'dispute_raised' | 'transaction_completed';
  timestamp: string;
  actor_id: string;
  actor_name: string;
  description: string;
  details?: any;
}

interface TransactionInteractionHistoryProps {
  transactionId: string;
  compact?: boolean;
}

export const TransactionInteractionHistory = ({ 
  transactionId, 
  compact = false 
}: TransactionInteractionHistoryProps) => {
  const { user } = useAuth();
  const [events, setEvents] = useState<InteractionEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInteractionHistory();
  }, [transactionId]);

  const fetchInteractionHistory = async () => {
    try {
      setLoading(true);
      
      // Fetch transaction details
      const { data: transaction } = await supabase
        .from('transactions')
        .select(`
          *,
          buyer_profile:profiles!buyer_id(full_name),
          seller_profile:profiles!seller_id(full_name)
        `)
        .eq('id', transactionId)
        .single();

      // Fetch contracts for this transaction
      const { data: contracts } = await supabase
        .from('contracts')
        .select(`
          *,
          creator:profiles!created_by(full_name),
          recipient:profiles!recipient_id(full_name)
        `)
        .eq('transaction_id', transactionId)
        .order('created_at', { ascending: true });

      // Fetch disputes for this transaction
      const { data: disputes } = await supabase
        .from('disputes')
        .select(`
          *,
          disputer:profiles!disputing_party_id(full_name)
        `)
        .eq('transaction_id', transactionId)
        .order('created_at', { ascending: true });

      const historyEvents: InteractionEvent[] = [];

      // Add transaction creation event
      if (transaction) {
        historyEvents.push({
          id: `tx-${transaction.id}`,
          type: 'transaction_created',
          timestamp: transaction.created_at,
          actor_id: transaction.buyer_id,
          actor_name: transaction.buyer_profile?.full_name || 'Unknown User',
          description: `Transaction created for "${transaction.title}"`,
          details: {
            amount: transaction.amount,
            description: transaction.description
          }
        });
      }

      // Add contract events
      if (contracts) {
        contracts.forEach((contract: any) => {
          // Contract sent
          historyEvents.push({
            id: `contract-sent-${contract.id}`,
            type: 'contract_sent',
            timestamp: contract.created_at,
            actor_id: contract.created_by,
            actor_name: contract.creator?.full_name || 'Unknown User',
            description: contract.parent_contract_id 
              ? `Revised contract sent (Revision ${contract.revision_number})`
              : 'Contract sent for review',
            details: {
              contractId: contract.id,
              isRevision: !!contract.parent_contract_id,
              revisionNumber: contract.revision_number
            }
          });

          // Contract response
          if (contract.responded_at) {
            historyEvents.push({
              id: `contract-response-${contract.id}`,
              type: contract.status === 'rejected' ? 'contract_rejected' : 'contract_accepted',
              timestamp: contract.responded_at,
              actor_id: contract.recipient_id,
              actor_name: contract.recipient?.full_name || 'Unknown User',
              description: contract.status === 'rejected' 
                ? 'Contract rejected'
                : 'Contract accepted',
              details: {
                responseMessage: contract.response_message,
                contractId: contract.id
              }
            });
          }
        });
      }

      // Add payment events (based on transaction status changes)
      if (transaction && ['payment_made', 'work_completed', 'completed'].includes(transaction.status)) {
        historyEvents.push({
          id: `payment-${transaction.id}`,
          type: 'payment_made',
          timestamp: transaction.updated_at, // This is approximate
          actor_id: transaction.buyer_id,
          actor_name: transaction.buyer_profile?.full_name || 'Unknown User',
          description: `Payment of ₹${transaction.amount.toLocaleString()} made into escrow`,
          details: {
            amount: transaction.amount
          }
        });
      }

      // Add work completion events
      if (transaction && ['work_completed', 'completed'].includes(transaction.status)) {
        historyEvents.push({
          id: `work-completed-${transaction.id}`,
          type: 'work_completed',
          timestamp: transaction.work_marked_done_at || transaction.updated_at,
          actor_id: transaction.seller_id,
          actor_name: transaction.seller_profile?.full_name || 'Unknown User',
          description: 'Work marked as completed',
          details: {}
        });
      }

      // Add dispute events
      if (disputes) {
        disputes.forEach((dispute: any) => {
          historyEvents.push({
            id: `dispute-${dispute.id}`,
            type: 'dispute_raised',
            timestamp: dispute.created_at,
            actor_id: dispute.disputing_party_id,
            actor_name: dispute.disputer?.full_name || 'Unknown User',
            description: `Dispute raised: ${dispute.dispute_reason}`,
            details: {
              reason: dispute.dispute_reason,
              description: dispute.description
            }
          });
        });
      }

      // Add completion event
      if (transaction && transaction.status === 'completed') {
        historyEvents.push({
          id: `completed-${transaction.id}`,
          type: 'transaction_completed',
          timestamp: transaction.payment_released_at || transaction.updated_at,
          actor_id: transaction.buyer_id,
          actor_name: transaction.buyer_profile?.full_name || 'Unknown User',
          description: 'Transaction completed successfully',
          details: {
            amount: transaction.amount
          }
        });
      }

      // Sort events by timestamp
      historyEvents.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

      setEvents(historyEvents);
    } catch (error) {
      console.error('Error fetching interaction history:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEventIcon = (type: InteractionEvent['type']) => {
    switch (type) {
      case 'transaction_created':
        return <Package className="h-4 w-4" />;
      case 'contract_sent':
        return <Send className="h-4 w-4" />;
      case 'contract_accepted':
        return <CheckCircle className="h-4 w-4" />;
      case 'contract_rejected':
        return <XCircle className="h-4 w-4" />;
      case 'contract_revised':
        return <Edit3 className="h-4 w-4" />;
      case 'payment_made':
        return <CreditCard className="h-4 w-4" />;
      case 'work_completed':
        return <Package className="h-4 w-4" />;
      case 'dispute_raised':
        return <AlertTriangle className="h-4 w-4" />;
      case 'transaction_completed':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getEventColor = (type: InteractionEvent['type']) => {
    switch (type) {
      case 'transaction_created':
        return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'contract_sent':
        return 'text-purple-600 bg-purple-100 border-purple-200';
      case 'contract_accepted':
        return 'text-green-600 bg-green-100 border-green-200';
      case 'contract_rejected':
        return 'text-red-600 bg-red-100 border-red-200';
      case 'contract_revised':
        return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'payment_made':
        return 'text-emerald-600 bg-emerald-100 border-emerald-200';
      case 'work_completed':
        return 'text-indigo-600 bg-indigo-100 border-indigo-200';
      case 'dispute_raised':
        return 'text-red-600 bg-red-100 border-red-200';
      case 'transaction_completed':
        return 'text-green-600 bg-green-100 border-green-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const isCurrentUser = (actorId: string) => actorId === user?.id;

  if (loading) {
    return (
      <Card>
        <CardContent className="p-4 text-center">
          <Clock className="h-6 w-6 mx-auto mb-2 text-muted-foreground animate-spin" />
          <p className="text-sm text-muted-foreground">Loading interaction history...</p>
        </CardContent>
      </Card>
    );
  }

  if (compact) {
    return (
      <div className="space-y-2">
        {events.slice(-3).map((event) => (
          <div key={event.id} className="flex items-center gap-2 text-xs">
            <div className={`p-1 rounded-full border ${getEventColor(event.type)}`}>
              {getEventIcon(event.type)}
            </div>
            <span className="text-muted-foreground">
              {format(new Date(event.timestamp), 'MMM dd, HH:mm')}
            </span>
            <span className="font-medium">
              {isCurrentUser(event.actor_id) ? 'You' : event.actor_name}
            </span>
            <span className="text-muted-foreground">{event.description}</span>
          </div>
        ))}
        {events.length > 3 && (
          <p className="text-xs text-muted-foreground text-center">
            +{events.length - 3} more interactions
          </p>
        )}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-bharose-primary" />
          Interaction History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>
          
          <div className="space-y-4">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative flex items-start gap-4"
              >
                <div className={`p-2 rounded-full border z-10 bg-background ${getEventColor(event.type)}`}>
                  {getEventIcon(event.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">
                      {isCurrentUser(event.actor_id) ? 'You' : event.actor_name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(event.timestamp), 'MMM dd, yyyy HH:mm')}
                    </span>
                  </div>
                  
                  <p className="text-sm text-foreground mb-2">{event.description}</p>
                  
                  {event.details && (
                    <div className="text-xs text-muted-foreground space-y-1">
                      {event.details.responseMessage && (
                        <div className="bg-muted/50 p-2 rounded border">
                          <p className="font-medium">Response:</p>
                          <p>"{event.details.responseMessage}"</p>
                        </div>
                      )}
                      {event.details.amount && (
                        <p>Amount: ₹{event.details.amount.toLocaleString()}</p>
                      )}
                      {event.details.isRevision && (
                        <Badge variant="outline" className="text-xs">
                          Revision {event.details.revisionNumber}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionInteractionHistory;