import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, CheckCircle, AlertTriangle, Flag, XCircle } from 'lucide-react';
import { Transaction } from '@/hooks/use-transactions';
import { Button } from '@/components/ui/button';
import { ResolutionBreakdown } from '@/components/ResolutionBreakdown';
import { useNavigate } from 'react-router-dom';

interface UnifiedTransactionCardProps {
  transaction: Transaction;
  userMode: string;
  showActions?: boolean;
  className?: string;
  onStatusUpdate?: (id: string, status: Transaction['status']) => void;
  onEditResend?: (transaction: Transaction) => void;
  rejectionReason?: string;
  isContractCreator?: boolean;
}

const UnifiedTransactionCard: React.FC<UnifiedTransactionCardProps> = memo(({ 
  transaction, 
  userMode, 
  showActions = false,
  className = "",
  onStatusUpdate,
  onEditResend,
  rejectionReason,
  isContractCreator
}) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'created': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'contract_accepted': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'payment_made': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'work_completed': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'disputed': return 'bg-destructive/20 text-destructive border-destructive/20';
      case 'contract_rejected': return 'bg-destructive/20 text-destructive border-destructive/20';
      default: return 'bg-secondary text-secondary-foreground border-secondary/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'created': return <Clock size={12} />;
      case 'contract_accepted': return <CheckCircle size={12} />;
      case 'payment_made': return <Clock size={12} />;
      case 'work_completed': return <CheckCircle size={12} />;
      case 'completed': return <CheckCircle size={12} />;
      case 'disputed': return <AlertTriangle size={12} />;
      case 'contract_rejected': return <XCircle size={12} />;
      default: return <Clock size={12} />;
    }
  };

  const handleCardClick = () => {
    navigate(`/transaction-status/${transaction.id}`, { 
      state: { userMode, ...(transaction.status === 'contract_rejected' ? { openRevision: true } : {}) } 
    });
  };

  const handleQuickAction = (e: React.MouseEvent, action: 'confirm' | 'dispute') => {
    e.stopPropagation();
    
    if (action === 'confirm' && onStatusUpdate) {
      onStatusUpdate(transaction.id, 'completed');
    } else if (action === 'dispute') {
      navigate(`/dispute-resolution/${transaction.id}`, { 
        state: { transactionId: transaction.id, userMode } 
      });
    }
  };

  return (
    <motion.div 
      className={`bharose-card cursor-pointer hover:shadow-md transition-all duration-200 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-medium text-lg mb-1">{transaction.title}</h3>
          <p className="text-sm text-muted-foreground">
            {transaction.role === 'buyer' ? 'Buying from' : 'Selling to'} {transaction.counterparty}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <p className="font-semibold text-bharose-primary text-lg">
            ₹{transaction.amount.toLocaleString()}
          </p>
          <div className={`flex items-center text-xs px-2 py-1 rounded-full border mt-1 ${getStatusColor(transaction.status)}`}>
            {getStatusIcon(transaction.status)}
            <span className="ml-1 capitalize">
              {transaction.status === 'contract_rejected' ? 'Rejected' : 
               transaction.status === 'created' ? 'Pending Acceptance' :
               transaction.status.replace('_', ' ')}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {transaction.date}
        </p>
        
        <div className="flex items-center text-xs text-bharose-primary">
          <span>View details</span>
          <ArrowRight size={12} className="ml-1" />
        </div>
      </div>

      {/* Rejection details */}
      {transaction.status === 'contract_rejected' && (
        <div className="mt-3 p-3 rounded-lg border border-red-200 bg-red-50" onClick={(e) => e.stopPropagation()}>
          {rejectionReason && (
            <p className="text-xs text-red-700">Reason: {rejectionReason}</p>
          )}
        </div>
      )}

      {/* Quick Actions for active transactions */}
      {showActions && (transaction.status === 'payment_made' || transaction.status === 'work_completed') && transaction.role === 'buyer' && (
        <div className="flex gap-2 mt-3 pt-3 border-t border-border">
          <Button
            size="sm"
            variant="default"
            className="flex-1 h-8 text-xs"
            onClick={(e) => handleQuickAction(e, 'confirm')}
          >
            <CheckCircle size={12} className="mr-1" />
            Confirm
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 h-8 text-xs"
            onClick={(e) => handleQuickAction(e, 'dispute')}
          >
            <Flag size={12} className="mr-1" />
            Dispute
          </Button>
        </div>
      )}

      {/* Quick Actions for rejected contracts */}
      {showActions && transaction.status === 'contract_rejected' && (
        <div className="mt-3 pt-3 border-t border-border" onClick={(e) => e.stopPropagation()}>
          {/** Show Edit & Resend only for contract creator when prop provided; fallback to buyer role for backward compatibility */}
          { (typeof isContractCreator === 'boolean' ? isContractCreator : transaction.role === 'buyer') && (
            <Button
              size="sm"
              variant="default"
              className="w-full h-8 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                if (onEditResend) {
                  onEditResend(transaction);
                } else {
                  navigate(`/transaction-status/${transaction.id}`, { state: { userMode, openRevision: true } });
                }
              }}
            >
              <XCircle size={12} className="mr-1" />
              Edit & Resend
            </Button>
          )}
        </div>
      )}
    </motion.div>
  );
});

UnifiedTransactionCard.displayName = 'UnifiedTransactionCard';

export default UnifiedTransactionCard;