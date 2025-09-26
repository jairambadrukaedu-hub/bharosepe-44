
import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, FileText, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import BottomNavigation from '@/components/BottomNavigation';
import { useLocation, useNavigate } from 'react-router-dom';
import OptimizedTransactionList from '@/components/transaction/OptimizedTransactionList';
import QuickTransactionSetup from '@/components/transaction/QuickTransactionSetup';
import { useTransactions, type Transaction } from '@/hooks/use-transactions';
import { useContracts, type Contract } from '@/hooks/use-contracts';
import ContractSummaryCard from '@/components/ContractSummaryCard';
import ContractRevisionEditor from '@/components/ContractRevisionEditor';
import { useAuth } from '@/hooks/use-auth';

interface TransactionsProps {
  userMode?: string;
}

const Transactions: React.FC<TransactionsProps> = ({ userMode: propUserMode = 'Buyer' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the user mode from location state if available, otherwise use the prop
  const [userMode, setUserMode] = useState(
    location.state?.userMode || propUserMode
  );
  
  const [showQuickSetup, setShowQuickSetup] = useState(false);
  const [activeTab, setActiveTab] = useState('overall');
  const { user } = useAuth();
  const [revisionContract, setRevisionContract] = useState<Contract | null>(null);
  
  const { transactions, loading, refreshTransactions, resendTransaction } = useTransactions(userMode as 'Buyer' | 'Seller');
  const { 
    contracts, 
    getPendingContractsAsBuyer, 
    getPendingContractsAsSeller,
    getContractsAsBuyer,
    getContractsAsSeller 
  } = useContracts();

  // Map of latest active rejected contract per transaction
  const rejectedByTx = useMemo(() => {
    const map = new Map<string, Contract>();
    contracts.forEach((c) => {
      if (c.status === 'rejected' && c.transaction_id) {
        const existing = map.get(c.transaction_id);
        if (!existing || (c.revision_number || 0) > (existing.revision_number || 0)) {
          map.set(c.transaction_id, c);
        }
      }
    });
    return map;
  }, [contracts]);

  // Merge transactions with rejected contract statuses
  const mergedTransactions = useMemo(() => {
    return transactions.map(transaction => {
      const rejectedContract = rejectedByTx.get(transaction.id);
      if (rejectedContract && rejectedContract.status === 'rejected') {
        return {
          ...transaction,
          status: 'contract_rejected' as const
        };
      }
      return transaction;
    });
  }, [transactions, rejectedByTx]);

  // Calculate transaction counts from merged data
  const transactionCounts = {
    overall: mergedTransactions.length,
    active: mergedTransactions.filter(tx => ['created', 'contract_accepted', 'payment_made', 'work_completed'].includes(tx.status)).length,
    completed: mergedTransactions.filter(tx => tx.status === 'completed').length,
    disputed: mergedTransactions.filter(tx => tx.status === 'disputed').length,
    rejected: mergedTransactions.filter(tx => tx.status === 'contract_rejected').length,
  };

  // Get relevant contracts based on user mode
  const userContracts = userMode === 'Buyer' ? getContractsAsBuyer() : getContractsAsSeller();
  const pendingContracts = userMode === 'Buyer' ? getPendingContractsAsBuyer() : getPendingContractsAsSeller();

  // Filter transactions based on active tab using merged data
  const getFilteredTransactions = () => {
    switch (activeTab) {
      case 'active':
        return mergedTransactions.filter(tx => ['created', 'contract_accepted', 'payment_made', 'work_completed'].includes(tx.status));
      case 'completed':
        return mergedTransactions.filter(tx => tx.status === 'completed');
      case 'disputed':
        return mergedTransactions.filter(tx => tx.status === 'disputed');
      case 'rejected':
        return mergedTransactions.filter(tx => tx.status === 'contract_rejected');
      default:
        return mergedTransactions;
    }
  };

  return (
    <div className="bharose-container pb-20">
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between py-4">
          <h1 className="text-xl font-semibold">Transactions</h1>
          <Button
            size="sm"
            onClick={() => setShowQuickSetup(!showQuickSetup)}
            className="bharose-primary-button"
          >
            <Plus size={16} className="mr-1" />
            New
          </Button>
        </div>

        {/* Quick Transaction Setup */}
        {showQuickSetup && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <QuickTransactionSetup />
          </motion.div>
        )}

        {/* Pending Contracts Section */}
        {pendingContracts.length > 0 && (
          <motion.div 
            className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 dark:bg-yellow-950 dark:border-yellow-800"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-yellow-800 dark:text-yellow-200 flex items-center gap-2">
                <FileText size={16} />
                Pending Contracts ({pendingContracts.length})
              </h3>
            </div>
            <div className="space-y-2">
              {pendingContracts.slice(0, 3).map((contract) => (
                <ContractSummaryCard 
                  key={contract.id} 
                  contract={contract} 
                  type="received"
                />
              ))}
              {pendingContracts.length > 3 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate('/contracts')}
                  className="w-full mt-2"
                >
                  View All {pendingContracts.length} Contracts
                </Button>
              )}
            </div>
          </motion.div>
        )}
        
        {/* Transaction Categories */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-4">
            <TabsTrigger value="overall" className="text-xs">
              Overall
              {transactionCounts.overall > 0 && (
                <Badge variant="secondary" className="ml-1 h-4 text-xs px-1">
                  {transactionCounts.overall}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="active" className="text-xs">
              Active
              {transactionCounts.active > 0 && (
                <Badge variant="secondary" className="ml-1 h-4 text-xs px-1">
                  {transactionCounts.active}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-xs">
              Completed
              {transactionCounts.completed > 0 && (
                <Badge variant="secondary" className="ml-1 h-4 text-xs px-1">
                  {transactionCounts.completed}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="disputed" className="text-xs">
              Disputed
              {transactionCounts.disputed > 0 && (
                <Badge variant="secondary" className="ml-1 h-4 text-xs px-1">
                  {transactionCounts.disputed}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="rejected" className="text-xs">
              Rejected
              {transactionCounts.rejected > 0 && (
                <Badge variant="secondary" className="ml-1 h-4 text-xs px-1">
                  {transactionCounts.rejected}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading transactions...</p>
              </div>
            ) : getFilteredTransactions().length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>{activeTab === 'rejected' ? 'No rejected deals yet' : 'No transactions in this category'}</p>
              </div>
            ) : (
              <OptimizedTransactionList 
                transactions={getFilteredTransactions()}
                userMode={userMode}
                onEditResend={(transaction) => {
                  const contract = rejectedByTx.get(transaction.id);
                  if (contract) {
                    setRevisionContract(contract);
                  }
                }}
                rejectedContractsMap={rejectedByTx}
                currentUserId={user?.id}
              />
            )}
          </TabsContent>
        </Tabs>
      </motion.div>

      {revisionContract && (
        <ContractRevisionEditor
          originalContract={revisionContract}
          onClose={() => setRevisionContract(null)}
          onRevisionSent={() => {
            setRevisionContract(null);
            refreshTransactions();
            setActiveTab('active');
          }}
        />
      )}
      
      <BottomNavigation userMode={userMode} />
    </div>
  );
};

export default Transactions;
