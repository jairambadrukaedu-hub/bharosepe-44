import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import StatusTimeline from '@/components/StatusTimeline';
import DeliveryProofUpload from '@/components/DeliveryProofUpload';
import DeliveryConfirmation from '@/components/DeliveryConfirmation';
import { DisputeResolutionProposals } from '@/components/DisputeResolutionProposals';
import { ResolutionBreakdown } from '@/components/ResolutionBreakdown';
import { EscalationForm } from '@/components/EscalationForm';
import TransactionInteractionHistory from '@/components/TransactionInteractionHistory';
import ContractRevisionEditor from '@/components/ContractRevisionEditor';
import { useEscalations } from '@/hooks/use-escalations';
import { useContracts } from '@/hooks/use-contracts';
import { Phone, Mail, MessageSquare, Flag, ShieldCheck, CheckCircle, Send, Home, Upload, FileCheck, CreditCard, Clock, DollarSign, AlertTriangle, FileText, User, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { useTransactions } from '@/hooks/use-transactions';
import { useAuth } from '@/hooks/use-auth';
import { useUserModeContext } from '@/components/UserModeContext';
import { supabase } from '@/integrations/supabase/client';

const TransactionStatus = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [showCompleteConfirmation, setShowCompleteConfirmation] = useState(false);
  const [showSupportChat, setShowSupportChat] = useState(false);
  const [showDeliveryUpload, setShowDeliveryUpload] = useState(false);
  const [showDeliveryConfirmation, setShowDeliveryConfirmation] = useState(false);
  const [showEscalationForm, setShowEscalationForm] = useState(false);
  const [showContractRevision, setShowContractRevision] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<{text: string, sender: 'user' | 'support', time: string}[]>([]);
  
  const { user } = useAuth();
  const { userMode } = useUserModeContext();
  const { transactions, loading, updateTransactionStatus } = useTransactions(userMode as 'Buyer' | 'Seller');
  const { getEscalationByTransactionId } = useEscalations();
  const { contracts } = useContracts();
  
  const [contractIdForTx, setContractIdForTx] = useState<string | null>(null);
  const [originalContract, setOriginalContract] = useState<any>(null);
  const [dispute, setDispute] = useState<any>(null);
  const transaction = transactions.find(tx => tx.id === id);
  const escalation = id ? getEscalationByTransactionId(id) : null;
  
  // Fetch related contract id and original contract data
  useEffect(() => {
    if (!id) return;
    const load = async () => {
      // Get active contract first; if none, fall back to latest contract
      let { data, error } = await supabase
        .from('contracts')
        .select('*')
        .eq('transaction_id', id)
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if ((!data || error)) {
        const { data: latest, error: latestError } = await supabase
          .from('contracts')
          .select('*')
          .eq('transaction_id', id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();
        if (!latestError && latest) {
          setContractIdForTx(latest.id);
          setOriginalContract(latest);
        }
      } else if (data) {
        setContractIdForTx(data.id);
        setOriginalContract(data);
      }

    };
    load();
  }, [id]);

  // Fetch dispute data if transaction is disputed
  useEffect(() => {
    if (!id || !transaction || transaction.status !== 'disputed') return;
    
    const fetchDispute = async () => {
      const { data, error } = await supabase
        .from('disputes')
        .select('*')
        .eq('transaction_id', id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (!error && data) {
        setDispute(data);
      }
    };
    
    fetchDispute();
  }, [id, transaction]);
  
  // Determine user's role in this specific transaction
  const userRole = transaction ? transaction.role : null;
  
  useEffect(() => {
    if (!loading && !transaction) {
      toast.error('Transaction not found');
      navigate('/transactions', { state: { userMode } });
    }
  }, [loading, transaction, navigate, userMode]);

  // Auto-open revision editor if navigated with openRevision flag
  useEffect(() => {
    const shouldOpen = (location.state as any)?.openRevision;
    if (shouldOpen && transaction && transaction.status === 'contract_rejected' && transaction.role === 'buyer') {
      setShowContractRevision(true);
    }
  }, [location.state, transaction]);

  const handleComplete = async () => {
    if (id) {
      try {
        await updateTransactionStatus(id, 'completed');
        toast.success('Transaction marked as complete!');
        setShowCompleteConfirmation(false);
        navigate('/dashboard');
      } catch (error) {
        toast.error('Failed to complete transaction');
      }
    }
  };
  
  const handleRaiseDispute = () => {
    navigate(`/dispute/${id}`, { state: { transactionId: id, userMode } });
  };

  const handleHomeNavigation = () => {
    navigate('/dashboard');
  };

  const handleMakePayment = () => {
    if (id && transaction) {
      navigate('/payment', { 
        state: { 
          amount: transaction.amount.toString(),
          transactionId: id,
          userMode
        }
      });
    }
  };

  const handleMarkWorkDone = async () => {
    if (id) {
      try {
        await updateTransactionStatus(id, 'work_completed');
        toast.success('Work marked as completed! Buyer has been notified to release payment.');
      } catch (error) {
        toast.error('Failed to mark work as done');
      }
    }
  };

  const handleReleasePayment = async () => {
    if (id) {
      try {
        await updateTransactionStatus(id, 'completed');
        toast.success('Payment released! Transaction completed successfully.');
        navigate('/dashboard');
      } catch (error) {
        toast.error('Failed to release payment');
      }
    }
  };

  const handleDeliveryUploadComplete = () => {
    setShowDeliveryUpload(false);
    if (id) {
      toast.success('Delivery proof uploaded! Buyer has been notified.');
    }
  };

  const handleDeliveryConfirmed = () => {
    setShowDeliveryConfirmation(false);
    if (id) {
      handleComplete();
    }
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    const newUserMessage = {
      text: chatMessage,
      sender: 'user' as const,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages(prev => [...prev, newUserMessage]);
    setChatMessage('');
    
    setTimeout(() => {
      const supportResponse = {
        text: "Thank you for contacting support. We're reviewing your dispute and will get back to you within 24 hours.",
        sender: 'support' as const,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, supportResponse]);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="bharose-container">
        <Header title="Transaction Details" showBack />
        <div className="mt-8 text-center">
          <p>Loading transaction...</p>
        </div>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="bharose-container">
        <Header title="Transaction Details" showBack />
        <div className="mt-8 text-center">
          <p>Transaction not found.</p>
        </div>
      </div>
    );
  }

  const isSeller = userRole === 'seller';
  const isBuyer = userRole === 'buyer';

  return (
    <div className="bharose-container pb-6">
      <Header title="Transaction Details" showBack />
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-4"
      >
        <div className="bharose-card mb-6">
          <h2 className="text-xl font-semibold mb-1">{transaction.title}</h2>
          <div className="flex justify-between items-center mb-4">
            <span className="text-muted-foreground">ID: {transaction.id}</span>
            <span className="text-bharose-primary font-semibold text-lg">₹{transaction.amount.toLocaleString()}</span>
          </div>
          
          {/* Transaction Status Badge */}
          <div className="flex items-center gap-2 mb-4">
            <div className={`flex items-center text-sm px-3 py-1 rounded-full border ${
              transaction.status === 'payment_made' || transaction.status === 'work_completed' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
              transaction.status === 'completed' ? 'bg-green-100 text-green-700 border-green-200' :
              transaction.status === 'disputed' ? 'bg-red-100 text-red-700 border-red-200' :
              transaction.status === 'escalated' ? 'bg-orange-100 text-orange-700 border-orange-200' :
              transaction.status === 'contract_rejected' ? 'bg-red-100 text-red-700 border-red-200' :
              'bg-gray-100 text-gray-700 border-gray-200'
            }`}>
              {(transaction.status === 'payment_made' || transaction.status === 'work_completed') && <Clock size={14} className="mr-1" />}
              {transaction.status === 'completed' && <CheckCircle size={14} className="mr-1" />}
              {transaction.status === 'disputed' && <Flag size={14} className="mr-1" />}
              {transaction.status === 'escalated' && <AlertTriangle size={14} className="mr-1" />}
              {transaction.status === 'contract_rejected' && <AlertTriangle size={14} className="mr-1" />}
              <span className="capitalize">
                {transaction.status === 'contract_rejected' ? 'Contract Rejected' : 
                 transaction.status.replace('_', ' ')}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">{transaction.date}</span>
          </div>
          
          <div className="pt-4 border-t border-border">
            <h3 className="font-medium mb-3">
              {transaction.role === 'buyer' ? 'Seller' : 'Buyer'} Details
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="font-medium">{transaction.counterparty}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {transaction.role === 'buyer' ? 'Seller' : 'Buyer'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Phone size={16} className="text-muted-foreground mr-2" />
                  <span className="text-sm">
                    {transaction.role === 'buyer' ? 
                      (transaction.seller_phone || 'N/A') : 
                      (transaction.buyer_phone || 'N/A')}
                  </span>
                </div>
                <button className="text-bharose-primary text-sm hover:underline">Call</button>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Mail size={16} className="text-muted-foreground mr-2" />
                  <span className="text-sm">Email not available</span>
                </div>
                <button className="text-bharose-primary text-sm hover:underline">Email</button>
              </div>
            </div>
          </div>
          
          <div className="bg-bharose-light/50 rounded-lg p-3 mt-4 flex items-start">
            <ShieldCheck className="text-bharose-primary mr-2 mt-0.5 flex-shrink-0" size={18} />
            <div>
              <p className="text-sm font-medium">Secure Escrow Protection</p>
              <p className="text-xs text-muted-foreground mt-1">
                Funds are held securely until delivery is confirmed by both parties
              </p>
            </div>
          </div>
        </div>
        
        {/* Transaction Status Timeline */}
        <div className="bharose-card mb-6">
          <h3 className="font-medium mb-4 flex items-center">
            <CheckCircle size={18} className="mr-2 text-bharose-primary" />
            Transaction Progress
          </h3>
          <StatusTimeline currentStatus={transaction.status} />
        </div>

        {/* Contract Section */}
        <div className="bharose-card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium flex items-center">
              <FileText size={18} className="mr-2 text-bharose-primary" />
              Contract
            </h3>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
              transaction.status === 'contract_accepted' 
                ? 'bg-blue-100 text-blue-700 border-blue-200'
                : transaction.status === 'created'
                ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                : transaction.status === 'contract_rejected'
                ? 'bg-red-100 text-red-700 border-red-200'
                : 'bg-gray-100 text-gray-700 border-gray-200'
            }`}>
              {transaction.status === 'contract_accepted' ? 'Accepted - Awaiting Payment' : 
               transaction.status === 'created' ? 'Pending Acceptance' : 
               transaction.status === 'contract_rejected' ? 'Rejected' :
               transaction.status === 'payment_made' ? 'Active - Payment Made' :
               'Active'}
            </div>
          </div>

          {/* Contract Item */}
          <div className="bg-background border border-border rounded-lg overflow-hidden">
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <FileText size={16} className="text-muted-foreground mr-2" />
                  <h4 className="font-medium text-lg">{transaction.title}</h4>
                </div>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <User size={14} className="mr-1" />
                <span>
                  {transaction.role === 'buyer' ? 'From: ' : 'To: '}
                  {transaction.counterparty}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm mb-4">
                <span className="text-muted-foreground">
                  Amount: <span className="font-medium text-foreground">₹{transaction.amount.toLocaleString()}</span>
                </span>
                <span className="text-muted-foreground flex items-center">
                  <Calendar size={14} className="mr-1" />
                  {new Date(transaction.created_at).toLocaleDateString()}
                </span>
              </div>

              {/* Contract Preview */}
              <div className="bg-muted/30 rounded-lg p-4 mb-4">
                <div className="text-center text-sm text-muted-foreground mb-3">
                  <h5 className="font-medium text-foreground">Transaction Agreement for: {transaction.title}</h5>
                  <p>Amount: ₹{transaction.amount.toLocaleString()}</p>
                  {transaction.delivery_date && (
                    <p>Expected Delivery: {new Date(transaction.delivery_date).toLocaleDateString()}</p>
                  )}
                </div>
                {transaction.description && (
                  <p className="text-xs text-muted-foreground text-center">
                    {transaction.description.substring(0, 100)}...
                  </p>
                )}
                <p className="text-xs text-muted-foreground text-center mt-2">...6 more lines</p>
              </div>

              {/* View Full Contract Button */}
              <button 
                className="w-full flex items-center justify-center py-2 px-4 text-sm font-medium text-foreground border border-border rounded-lg hover:bg-muted/50 transition-colors"
                onClick={() => {
                  if (contractIdForTx) {
                    navigate(`/contract/${contractIdForTx}`);
                  } else {
                    navigate('/contracts');
                  }
                }}
              >
                <FileText size={16} className="mr-2" />
                View Full Contract
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Status Message */}
            {transaction.status === 'contract_accepted' && (
              <div className="bg-blue-50 border-t border-blue-200 p-4">
                <div className="text-center">
                  <h6 className="font-medium text-blue-700 mb-1">Contract Accepted!</h6>
                  <p className="text-sm text-blue-600">
                    {transaction.role === 'buyer' 
                      ? 'You accepted this contract. Next: You need to make escrow payment.'
                      : 'Contract was accepted. Waiting for buyer to make payment.'
                    }
                  </p>
                </div>
              </div>
            )}
            
            {transaction.status === 'created' && (
              <div className="bg-yellow-50 border-t border-yellow-200 p-4">
                <div className="text-center">
                  <h6 className="font-medium text-yellow-700 mb-1">Contract Pending</h6>
                  <p className="text-sm text-yellow-600">
                    {transaction.role === 'buyer' 
                      ? 'Waiting for seller to accept the contract.'
                      : 'Please review and accept or reject this contract.'
                    }
                  </p>
                </div>
              </div>
            )}
            
            {transaction.status === 'contract_rejected' && (
              <div className="bg-red-50 border-t border-red-200 p-4">
                <div className="text-center">
                  <h6 className="font-medium text-red-700 mb-1">Contract Rejected</h6>
                  <p className="text-sm text-red-600 mb-3">
                    {transaction.role === 'buyer' 
                      ? 'The seller rejected your contract. You can edit and resend it.'
                      : 'You rejected this contract. The buyer can edit and resend a new version.'
                    }
                  </p>
                  {transaction.role === 'buyer' && (
                    <button 
                      className="bharose-primary-button w-full"
                      onClick={() => {
                        // This will trigger the ContractRevisionEditor
                        setShowContractRevision(true);
                      }}
                    >
                      <Send size={16} className="mr-2" />
                      Edit & Resend Contract
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Transaction Interaction History */}
        <TransactionInteractionHistory 
          transactionId={transaction.id}
        />

        {/* Enhanced Action Buttons based on status and role */}
        <div className="space-y-4">
          {/* Buyer Actions */}
          {isBuyer && transaction.status === 'contract_accepted' && (
            <button 
              className="bharose-primary-button w-full"
              onClick={handleMakePayment}
            >
              <CreditCard size={18} className="mr-2" />
              Make Payment
            </button>
          )}

          {isBuyer && transaction.status === 'payment_made' && (
            <div className="bg-bharose-light/30 p-4 rounded-lg text-center">
              <Clock size={20} className="mx-auto mb-2 text-bharose-primary" />
              <p className="text-sm font-medium">Payment Made</p>
              <p className="text-xs text-muted-foreground">Waiting for seller to complete the work</p>
            </div>
          )}

          {isBuyer && transaction.status === 'work_completed' && (
            <div className="space-y-3">
              <div className="bg-bharose-success/10 p-4 rounded-lg text-center">
                <CheckCircle size={20} className="mx-auto mb-2 text-bharose-success" />
                <p className="text-sm font-medium text-bharose-success">Work Completed!</p>
                <p className="text-xs text-muted-foreground">Seller has marked the work as done</p>
              </div>
              <button 
                className="bharose-primary-button w-full"
                onClick={handleReleasePayment}
              >
                <DollarSign size={18} className="mr-2" />
                Release Payment
              </button>
            </div>
          )}

          {/* Seller Actions */}
          {isSeller && transaction.status === 'payment_made' && (
            <button 
              className="bharose-primary-button w-full"
              onClick={handleMarkWorkDone}
            >
              <CheckCircle size={18} className="mr-2" />
              Mark Work as Done
            </button>
          )}

          {isSeller && transaction.status === 'work_completed' && (
            <div className="bg-bharose-light/30 p-4 rounded-lg text-center">
              <Clock size={20} className="mx-auto mb-2 text-bharose-primary" />
              <p className="text-sm font-medium">Waiting for Payment Release</p>
              <p className="text-xs text-muted-foreground">Buyer will review and release payment</p>
            </div>
          )}

          {/* Common Actions for active transactions */}
          {(transaction.status === 'payment_made' || transaction.status === 'work_completed') && (
            <button 
              className="bharose-outline-button w-full"
              onClick={handleRaiseDispute}
            >
              <AlertTriangle size={18} className="mr-2" />
              Raise a Dispute
            </button>
          )}

          {/* Dispute Resolution Chat for disputed transactions */}
          {transaction.status === 'disputed' && (
            <div className="space-y-4">
              <button 
                className="bharose-primary-button w-full"
                onClick={() => navigate(`/dispute-resolution/${id}`)}
              >
                <MessageSquare size={18} className="mr-2" />
                Open Dispute Resolution Chat
              </button>
              
              {/* Resolution Proposals */}
              {dispute && (
                <div className="bharose-card">
                  <h3 className="font-medium mb-4 text-center">Resolution Proposals</h3>
                  <DisputeResolutionProposals
                    transaction={transaction}
                    dispute={dispute}
                    userRole={userRole as 'buyer' | 'seller'}
                    onResolutionComplete={() => {
                      // Refresh the transaction data
                      window.location.reload();
                    }}
                  />
                </div>
              )}

              {/* Escalation Section */}
              {dispute && !escalation && (
                <div className="bharose-card">
                  <div className="flex items-center mb-4">
                    <AlertTriangle className="text-orange-500 mr-2" size={20} />
                    <h3 className="font-medium">Escalate to Customer Care</h3>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg mb-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      If you're unable to reach an agreement through proposals, you can escalate 
                      this dispute to our Customer Care team for resolution.
                    </p>
                    <ul className="text-xs text-muted-foreground list-disc list-inside space-y-1">
                      <li>Customer Care will review all dispute history</li>
                      <li>Transaction will be frozen until resolved</li>
                      <li>Resolution typically takes 3-5 business days</li>
                    </ul>
                  </div>

                  <button 
                    className="w-full flex items-center justify-center py-3 px-4 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                    onClick={() => setShowEscalationForm(true)}
                  >
                    <AlertTriangle size={18} className="mr-2" />
                    Escalate to Customer Care
                  </button>
                </div>
              )}

              {/* Show Escalation Status if Already Escalated */}
              {escalation && (
                <div className="bharose-card">
                  <div className="flex items-center mb-4">
                    <AlertTriangle className="text-orange-500 mr-2" size={20} />
                    <h3 className="font-medium">Escalated to Customer Care</h3>
                  </div>
                  
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        escalation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        escalation.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {escalation.status.charAt(0).toUpperCase() + escalation.status.slice(1).replace('_', ' ')}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(escalation.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-orange-800">Reason: </span>
                        <span className="text-sm text-orange-700">{escalation.escalation_reason}</span>
                      </div>
                      
                      {escalation.escalation_notes && (
                        <div>
                          <span className="text-sm font-medium text-orange-800">Notes: </span>
                          <span className="text-sm text-orange-700">{escalation.escalation_notes}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-orange-200">
                      <p className="text-xs text-orange-600">
                        <strong>Status:</strong> Your case is with our Customer Care team. 
                        You'll be notified of any updates via email and in-app notifications.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Show message for completed transactions */}
          {transaction.status === 'completed' && (
            <div className="space-y-4">
              <div className="bg-bharose-success/10 p-4 rounded-lg text-center">
                <CheckCircle size={20} className="mx-auto mb-2 text-bharose-success" />
                <p className="text-sm font-medium text-bharose-success">Transaction Completed!</p>
                <p className="text-xs text-muted-foreground">This transaction has been successfully completed</p>
              </div>
              
              {/* Resolution Breakdown if transaction was resolved through dispute */}
              {transaction.resolution_breakdown && (
                <ResolutionBreakdown 
                  resolutionData={transaction.resolution_breakdown}
                  userRole={userRole}
                />
              )}
            </div>
          )}
        </div>
        
        <button 
          className="bharose-outline-button w-full mt-4"
          onClick={handleHomeNavigation}
        >
          <Home size={18} className="mr-2" />
          Go to Dashboard
        </button>
        
        <button 
          className="w-full p-3 flex justify-center items-center text-muted-foreground hover:text-bharose-primary mt-4"
          onClick={() => setShowSupportChat(true)}
        >
          <MessageSquare size={18} className="mr-2" />
          Contact Support
        </button>
      </motion.div>
      
      {/* Delivery Proof Upload Modal */}
      {showDeliveryUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div 
            className="bg-white rounded-xl w-full max-w-md max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="p-4 border-b border-border flex justify-between items-center">
              <h3 className="text-lg font-semibold">Upload Delivery Proof</h3>
              <button 
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setShowDeliveryUpload(false)}
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <DeliveryProofUpload
                transactionId={id!}
                onUploadComplete={handleDeliveryUploadComplete}
              />
            </div>
          </motion.div>
        </div>
      )}

      {/* Delivery Confirmation Modal */}
      {showDeliveryConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div 
            className="bg-white rounded-xl w-full max-w-md max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="p-4 border-b border-border flex justify-between items-center">
              <h3 className="text-lg font-semibold">Confirm Delivery</h3>
              <button 
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setShowDeliveryConfirmation(false)}
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <DeliveryConfirmation
                transactionId={id!}
                onConfirmDelivery={handleDeliveryConfirmed}
              />
            </div>
          </motion.div>
        </div>
      )}

      {/* Support Chat */}
      {showSupportChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div 
            className="bg-white rounded-xl w-full max-w-md max-h-[80vh] flex flex-col"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="p-4 border-b border-border flex justify-between items-center">
              <h3 className="text-lg font-semibold">Support Chat</h3>
              <button 
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setShowSupportChat(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {transaction.status === 'disputed' && (
                <div className="bg-bharose-error/10 p-3 rounded-lg mb-4">
                  <p className="text-sm font-medium text-bharose-error">
                    Dispute Details: {transaction.dispute_details || 'No details provided'}
                  </p>
                </div>
              )}
              
              {chatMessages.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare size={40} className="mx-auto mb-2 opacity-20" />
                  <p>Start a conversation with our support team</p>
                </div>
              ) : (
                chatMessages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.sender === 'user' 
                          ? 'bg-bharose-primary text-white' 
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 border border-border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bharose-primary/30"
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button 
                  className="bg-bharose-primary text-white rounded-full w-10 h-10 flex items-center justify-center"
                  onClick={handleSendMessage}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
      {showCompleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div 
            className="bg-white rounded-xl p-6 w-full max-w-sm"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="text-center mb-4">
              <CheckCircle size={40} className="text-bharose-success mx-auto mb-2" />
              <h3 className="text-xl font-semibold">Complete Transaction?</h3>
              <p className="text-muted-foreground mt-2">
                This will release the payment to the seller and mark the transaction as complete.
              </p>
            </div>
            
            <div className="space-y-3 mt-6">
              <button 
                className="bharose-primary-button w-full"
                onClick={handleComplete}
              >
                Yes, Complete Transaction
              </button>
              
              <button 
                className="bharose-outline-button w-full"
                onClick={() => setShowCompleteConfirmation(false)}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Escalation Form Modal */}
      {showEscalationForm && (
        <EscalationForm
          transactionId={id!}
          onClose={() => setShowEscalationForm(false)}
          onSuccess={() => {
            setShowEscalationForm(false);
            toast.success('Escalation request submitted successfully!');
            window.location.reload(); // Refresh to show updated status
          }}
        />
      )}

      {/* Contract Revision Editor Modal */}
      {showContractRevision && originalContract && (
        <ContractRevisionEditor
          originalContract={originalContract}
          onClose={() => setShowContractRevision(false)}
          onRevisionSent={() => {
            setShowContractRevision(false);
            toast.success('Revised contract sent successfully!');
            window.location.reload(); // Refresh to show updated status
          }}
        />
      )}
    </div>
  );
};

export default TransactionStatus;
