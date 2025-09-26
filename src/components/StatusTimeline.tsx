import React from 'react';
import { cn } from '@/lib/utils';
import { Transaction } from '@/hooks/use-transactions';

interface StatusTimelineProps {
  currentStatus: Transaction['status'];
}

const StatusTimeline: React.FC<StatusTimelineProps> = ({ currentStatus }) => {
  const statuses: Transaction['status'][] = ['created', 'contract_accepted', 'payment_made', 'work_completed', 'completed'];
  
  const getStatusIndex = (status: Transaction['status']) => {
    if (status === 'disputed' || status === 'escalated' || status === 'contract_rejected') {
      return -1;
    }
    return statuses.indexOf(status);
  };
  
  const currentIndex = getStatusIndex(currentStatus);
  
  const statusLabels: Record<Transaction['status'], string> = {
    'created': 'Contract Sent',
    'contract_accepted': 'Contract Accepted',
    'payment_made': 'Payment Made',
    'work_completed': 'Work Completed',
    'completed': 'Completed',
    'disputed': 'Disputed',
    'escalated': 'Escalated to Support',
    'contract_rejected': 'Contract Rejected'
  };

  if (currentStatus === 'disputed' || currentStatus === 'escalated' || currentStatus === 'contract_rejected') {
    const isEscalated = currentStatus === 'escalated';
    const isRejected = currentStatus === 'contract_rejected';
    const bgColor = isEscalated ? 'bg-orange-500/30' : isRejected ? 'bg-red-500/30' : 'bg-bharose-error/30';
    const dotColor = isEscalated ? 'bg-orange-500' : isRejected ? 'bg-red-500' : 'bg-bharose-error';
    const textColor = isEscalated ? 'text-orange-500' : isRejected ? 'text-red-500' : 'text-bharose-error';
    
    return (
      <div className="relative">
        <div className={`absolute left-8 top-0 bottom-0 w-0.5 ${bgColor}`}></div>
        
        <div className="space-y-8">
          <div className="relative flex items-center">
            <div className={`w-4 h-4 rounded-full z-10 ${dotColor}`}></div>
            <div className="ml-6">
              <p className={`font-medium ${textColor}`}>
                {statusLabels[currentStatus]}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {isEscalated 
                  ? 'This transaction has been escalated to Customer Care'
                  : isRejected
                  ? 'The contract for this transaction was rejected'
                  : 'This transaction is under dispute'
                }
              </p>
            </div>
          </div>
          
          {statuses.map((status, index) => (
            <div key={status} className="relative flex items-center opacity-50">
              <div className="w-4 h-4 rounded-full z-10 bg-muted-foreground/30"></div>
              <div className="ml-6">
                <p className="font-medium text-muted-foreground">
                  {statusLabels[status]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-muted-foreground/30"></div>
      
      <div className="space-y-8">
        {statuses.map((status, index) => {
          const isCompleted = index <= currentIndex;
          const isActive = index === currentIndex;
          
          return (
            <div key={status} className="relative flex items-center">
              <div 
                className={cn(
                  "w-4 h-4 rounded-full z-10",
                  isCompleted ? "bg-bharose-primary" : "bg-muted-foreground/30"
                )}
              ></div>
              
              <div className="ml-6">
                <p 
                  className={cn(
                    "font-medium",
                    isActive ? "text-bharose-primary" : 
                    isCompleted ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {statusLabels[status]}
                </p>
                
                {isActive && (
                  <p className="text-sm text-muted-foreground mt-1">Current status</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusTimeline;
