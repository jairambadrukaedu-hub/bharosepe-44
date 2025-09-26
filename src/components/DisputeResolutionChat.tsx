import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, ArrowLeft, AlertTriangle, Clock, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { toast } from 'sonner';
import { useTransactionStore } from '@/utils/transactionState';
import { useAuth } from '@/hooks/use-auth';
import { useUserModeContext } from '@/components/UserModeContext';

interface DisputeMessage {
  id: string;
  sender: 'user' | 'support' | 'other_party';
  message: string;
  timestamp: Date;
  senderName: string;
  avatar?: string;
}

const DisputeResolutionChat: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { userMode } = useUserModeContext();
  const { transactions } = useTransactionStore();
  
  const transaction = transactions.find(tx => tx.id === id);
  const [messages, setMessages] = useState<DisputeMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!transaction) {
      toast.error('Transaction not found');
      navigate('/transactions');
      return;
    }

    // Initialize with dispute resolution messages
    const initialMessages: DisputeMessage[] = [
      {
        id: '1',
        sender: 'support',
        message: `Hello! I'm Sarah from Bharose Support. I've received your dispute regarding transaction #${id}. I'll be helping you resolve this matter. Let me review the details and get back to you shortly.`,
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        senderName: 'Sarah - Support Agent',
        avatar: '/api/placeholder/32/32'
      },
      {
        id: '2',
        sender: 'support',
        message: `I've reviewed your dispute details. ${transaction.status === 'disputed' && transaction.disputeDetails ? `Issue: ${transaction.disputeDetails}` : 'I\'m now investigating the matter.'} I'll be reaching out to the other party to get their perspective. Please feel free to provide any additional information that might help resolve this dispute.`,
        timestamp: new Date(Date.now() - 1000 * 60 * 3),
        senderName: 'Sarah - Support Agent'
      }
    ];

    setMessages(initialMessages);
  }, [transaction, id, navigate]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isLoading) return;
    
    setIsLoading(true);
    
    // Add user message
    const userMessage: DisputeMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: newMessage,
      timestamp: new Date(),
      senderName: user?.user_metadata?.full_name || user?.email || 'User'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Simulate support response
    setTimeout(() => {
      const supportResponses = [
        "Thank you for the additional information. I'm documenting this for the resolution process.",
        "I understand your concern. Let me check with the other party and get back to you within 2 hours.",
        "I've escalated this to our dispute resolution team. They'll review all evidence and provide a decision within 24 hours.",
        "Based on the information provided, I'm working on a fair resolution. I'll update you as soon as I have more details."
      ];
      
      const responseMessage: DisputeMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'support',
        message: supportResponses[Math.floor(Math.random() * supportResponses.length)],
        timestamp: new Date(),
        senderName: 'Sarah - Support Agent'
      };
      
      setMessages(prev => [...prev, responseMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getSenderIcon = (sender: string) => {
    switch (sender) {
      case 'support':
        return <Shield className="h-4 w-4" />;
      case 'other_party':
        return <User className="h-4 w-4" />;
      default:
        return null;
    }
  };

  if (!transaction) {
    return (
      <div className="bharose-container">
        <Header title="Dispute Resolution" showBack />
        <div className="mt-8 text-center">
          <p>Transaction not found or loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bharose-container pb-6">
      <Header title="Dispute Resolution" showBack />
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-4"
      >
        {/* Dispute Status Card */}
        <div className="bharose-card mb-4 bg-bharose-error/5 border-bharose-error/20">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-bharose-error mt-1" size={20} />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-bharose-error">Dispute Active</h3>
                <Badge variant="destructive" className="text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  In Review
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Transaction: {transaction.title} (₹{transaction.amount.toLocaleString()})
              </p>
              <p className="text-sm">
                Our support team is working to resolve this dispute fairly for both parties.
              </p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="bharose-card p-0 overflow-hidden">
          <div className="p-4 bg-muted/50 border-b">
            <h3 className="font-medium">Resolution Chat</h3>
            <p className="text-sm text-muted-foreground">
              Communicate with our support team and the other party
            </p>
          </div>
          
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src={msg.avatar} />
                  <AvatarFallback>
                    {msg.sender === 'user' ? (user?.user_metadata?.full_name || user?.email || 'User')?.[0] || 'U' : 'S'}
                  </AvatarFallback>
                </Avatar>
                
                <div className={`flex-1 max-w-[80%] ${msg.sender === 'user' ? 'text-right' : ''}`}>
                  <div className="flex items-center gap-2 mb-1">
                    {msg.sender !== 'user' && getSenderIcon(msg.sender)}
                    <span className="text-xs font-medium">
                      {msg.senderName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                  
                  <div 
                    className={`rounded-lg px-3 py-2 ${
                      msg.sender === 'user' 
                        ? 'bg-bharose-primary text-white' 
                        : msg.sender === 'support'
                        ? 'bg-bharose-success/10 text-bharose-success border border-bharose-success/20'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Chat Input */}
          <div className="p-4 border-t bg-muted/30">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message to support..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                size="icon" 
                onClick={handleSendMessage}
                disabled={isLoading || !newMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              All messages are monitored by our support team for quality and compliance.
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <Button 
            variant="outline" 
            onClick={() => navigate(`/transaction-status/${id}`)}
            className="w-full"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Transaction
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            className="w-full"
          >
            Go to Dashboard
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default DisputeResolutionChat;