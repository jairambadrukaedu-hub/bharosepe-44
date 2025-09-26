import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, AlertTriangle, Phone, FileText, Download, Paperclip, Image, X } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/use-auth';
import { useDisputes } from '@/hooks/use-disputes';
import { useTransactions } from '@/hooks/use-transactions';
import { useUserModeContext } from '@/components/UserModeContext';
import { useDisputeChat } from '@/hooks/use-dispute-chat';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


const DisputeResolution = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { userMode } = useUserModeContext();
  const { transactions } = useTransactions(userMode as 'Buyer' | 'Seller');
  const { getDisputeByTransactionId } = useDisputes();
  
  const transaction = transactions.find(tx => tx.id === id);
  const dispute = getDisputeByTransactionId(id || '');
  
  const { messages, loading: chatLoading, sending, sendMessage, sendFileMessage } = useDisputeChat(dispute?.id || '');
  const [newMessage, setNewMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const downloadEvidence = async (fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('dispute-evidence')
        .download(fileName);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName.split('/').pop() || 'evidence';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading evidence:', error);
      toast.error('Failed to download evidence');
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() && !selectedFile) return;

    let success = false;
    if (selectedFile) {
      success = await sendFileMessage(selectedFile, newMessage.trim());
    } else {
      success = await sendMessage(newMessage.trim());
    }

    if (success) {
      setNewMessage('');
      setSelectedFile(null);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getOtherPartyName = () => {
    if (!transaction || !user) return 'Other Party';
    
    const isUserBuyer = transaction.buyer_id === user.id;
    return isUserBuyer ? 'Seller' : 'Buyer';
  };

  const isCurrentUserMessage = (senderId: string) => {
    return user?.id === senderId;
  };

  if (!transaction) {
    return (
      <div className="bharose-container">
        <div className="flex items-center mb-4">
          <button 
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-semibold">Dispute Resolution</h1>
        </div>
        <div className="text-center py-8">
          <p>Transaction not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bharose-container h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-lg font-semibold">Dispute Resolution</h1>
            <p className="text-sm text-muted-foreground">{transaction.title}</p>
          </div>
        </div>
        <button 
          className="flex items-center text-sm text-bharose-primary hover:underline"
          onClick={() => {/* Add call functionality */}}
        >
          <Phone size={16} className="mr-1" />
          Call Support
        </button>
      </div>

      {/* Dispute Status and Details */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-bharose-error/10 border border-bharose-error/20 rounded-lg p-4 mb-4"
      >
        <div className="flex items-center mb-2">
          <AlertTriangle size={20} className="text-bharose-error mr-2" />
          <span className="font-medium text-bharose-error">Dispute Active</span>
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          This transaction is under review. Our support team will help resolve the issue.
        </p>
        
        {dispute && (
          <div className="mt-3 pt-3 border-t border-bharose-error/20">
            <h4 className="font-medium text-sm mb-2">Dispute Details:</h4>
            <p className="text-sm"><strong>Reason:</strong> {dispute.dispute_reason}</p>
            <p className="text-sm mt-1"><strong>Description:</strong> {dispute.description}</p>
            
            {dispute.evidence_files && dispute.evidence_files.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium mb-1">Evidence Files:</p>
                <div className="flex flex-wrap gap-2">
                  {dispute.evidence_files.map((fileName, index) => (
                    <button
                      key={index}
                      onClick={() => downloadEvidence(fileName)}
                      className="flex items-center text-xs bg-white rounded px-2 py-1 hover:bg-gray-50"
                    >
                      <FileText size={12} className="mr-1" />
                      Evidence {index + 1}
                      <Download size={10} className="ml-1" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 px-4">
        {chatLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bharose-primary"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No messages yet. Start the conversation to resolve this dispute.</p>
          </div>
        ) : (
          messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${
                isCurrentUserMessage(message.sender_id) ? 'justify-end' : 'justify-start'
              }`}
            >
              <div className={`max-w-[80%] flex gap-3 ${
                isCurrentUserMessage(message.sender_id) ? 'flex-row-reverse' : ''
              }`}>
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src={message.sender_profile?.avatar_url} />
                  <AvatarFallback>
                    {isCurrentUserMessage(message.sender_id) 
                      ? (user?.user_metadata?.full_name || 'You')[0] 
                      : getOtherPartyName()[0]
                    }
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className={`flex items-center gap-2 mb-1 ${
                    isCurrentUserMessage(message.sender_id) ? 'flex-row-reverse' : ''
                  }`}>
                    <span className="text-xs font-medium">
                      {isCurrentUserMessage(message.sender_id) 
                        ? 'You' 
                        : message.sender_profile?.full_name || getOtherPartyName()
                      }
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(message.created_at)}
                    </span>
                  </div>
                  
                  <div className={`rounded-lg p-3 ${
                    isCurrentUserMessage(message.sender_id)
                      ? 'bg-bharose-primary text-white'
                      : 'bg-muted'
                  }`}>
                    <p className="text-sm">{message.message}</p>
                    
                    {/* File/Image attachments */}
                    {message.file_url && (
                      <div className="mt-2 pt-2 border-t border-white/20">
                        {message.message_type === 'image' ? (
                          <img 
                            src={message.file_url} 
                            alt={message.file_name || 'Shared image'}
                            className="max-w-full h-auto rounded cursor-pointer"
                            onClick={() => window.open(message.file_url, '_blank')}
                          />
                        ) : (
                          <div className="flex items-center gap-2 text-xs">
                            <FileText className="h-4 w-4" />
                            <span>{message.file_name}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => window.open(message.file_url, '_blank')}
                              className="h-6 px-2"
                            >
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
        
        {sending && (
          <div className="flex justify-end">
            <div className="bg-bharose-primary/80 text-white rounded-lg p-3 max-w-[80%]">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* File Upload and Message Input */}
      <div className="border-t bg-white">
        {/* Selected File Preview */}
        {selectedFile && (
          <div className="px-4 py-2 bg-muted/50 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              {selectedFile.type.startsWith('image/') ? (
                <Image className="h-4 w-4 text-bharose-primary" />
              ) : (
                <FileText className="h-4 w-4 text-bharose-primary" />
              )}
              <span className="text-sm font-medium">{selectedFile.name}</span>
              <span className="text-xs text-muted-foreground">
                ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={removeSelectedFile}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        
        <div className="flex items-center gap-2 p-4">
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileSelect}
            accept="image/*,.pdf,.doc,.docx,.txt"
            className="hidden"
          />
          <Button
            size="icon"
            variant="ghost"
            onClick={() => fileInputRef.current?.click()}
            disabled={sending}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={selectedFile ? "Add a message (optional)..." : "Type your message..."}
            onKeyPress={(e) => e.key === 'Enter' && !sending && handleSendMessage()}
            disabled={sending}
            className="flex-1"
          />
          
          <Button
            onClick={handleSendMessage}
            disabled={(!newMessage.trim() && !selectedFile) || sending}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>


      {/* Quick Actions */}
      <div className="flex space-x-3 p-4 bg-gray-50">
        <button
          onClick={() => navigate(`/transaction-status/${id}`)}
          className="flex-1 py-2 px-4 bg-white border border-border rounded-lg text-sm font-medium hover:bg-gray-50"
        >
          Back to Transaction
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          className="flex-1 py-2 px-4 bg-bharose-primary text-white rounded-lg text-sm font-medium"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default DisputeResolution;