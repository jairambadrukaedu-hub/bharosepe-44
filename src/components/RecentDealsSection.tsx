import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Package, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  status: string;
  updated_at: string;
  buyer_id?: string;
  seller_id?: string;
}

interface RecentDealsSectionProps {
  userMode: 'Buyer' | 'Seller';
  transactions: Transaction[];
  onViewAll: () => void;
  onStartNew: () => void;
}

const RecentDealsSection: React.FC<RecentDealsSectionProps> = ({
  userMode,
  transactions,
  onViewAll,
  onStartNew
}) => {
  const navigate = useNavigate();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'disputed':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-gray-500" />;
      default:
        return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'disputed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'rejected':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'In Escrow';
      case 'completed':
        return 'Completed';
      case 'disputed':
        return 'Disputed';
      case 'rejected':
        return 'Rejected';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short'
    });
  };

  if (transactions.length === 0) {
    return (
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-foreground">Recent Deals</h2>
        </div>
        
        <motion.div 
          className="bg-card rounded-2xl p-8 text-center border border-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            {userMode === 'Buyer' ? (
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            ) : (
              <Package className="h-8 w-8 text-muted-foreground" />
            )}
          </div>
          
          <h3 className="text-lg font-medium text-foreground mb-2">
            No deals yet as {userMode.toLowerCase()}
          </h3>
          
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
            {userMode === 'Buyer' 
              ? 'Start your first secure purchase with a trusted seller'
              : 'Create your first protected sale with a buyer'
            }
          </p>
          
          <Button onClick={onStartNew} className="px-6">
            {userMode === 'Buyer' ? 'Start First Purchase' : 'Create First Sale'}
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-foreground">Recent Deals</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onViewAll}
          className="text-muted-foreground hover:text-foreground"
        >
          View All
        </Button>
      </div>
      
      <div className="space-y-3">
        {transactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card 
              className="cursor-pointer hover:shadow-md transition-shadow duration-200 border border-border"
              onClick={() => navigate(`/transaction-status`, { state: { transactionId: transaction.id } })}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      {userMode === 'Buyer' ? (
                        <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <Package className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">
                        {transaction.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(transaction.updated_at)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold text-foreground">
                      ₹{transaction.amount.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {getStatusIcon(transaction.status)}
                      <Badge 
                        variant="secondary"
                        className={`text-xs ${getStatusColor(transaction.status)}`}
                      >
                        {getStatusText(transaction.status)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentDealsSection;