import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@/components/BottomNavigation';
import { useTransactions } from '@/hooks/use-transactions';
import DashboardAnalytics from '@/components/DashboardAnalytics';
import { useUserModeContext } from '@/components/UserModeContext';
import { useAuth } from '@/hooks/use-auth';
import { useEnhancedTransactionStore } from '@/utils/enhancedTransactionState';
import { useContracts } from '@/hooks/use-contracts';
import { useDisputes } from '@/hooks/use-disputes';
import ModernProfileHeader from '@/components/ModernProfileHeader';
import ModernEscrowCard from '@/components/ModernEscrowCard';
import RoleBasedQuickActions from '@/components/RoleBasedQuickActions';
import RecentDealsSection from '@/components/RecentDealsSection';
import ModernSavedParties from '@/components/ModernSavedParties';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { userMode, setUserMode } = useUserModeContext();
  const { user, loading: authLoading } = useAuth();
  const { transactions, loading: transactionsLoading, getActiveTransactions, getEscrowBalance } = useTransactions(userMode);
  const { getAgreementsByProfile, getNotificationsByProfile } = useEnhancedTransactionStore();
  const { 
    getPendingContracts,
    getPendingContractsAsBuyer,
    getPendingContractsAsSeller,
    contracts,
    getContractAmount
  } = useContracts();
  const { getActiveDisputes } = useDisputes();
  
  // Redirect unauthenticated users to login
  useEffect(() => {
    const handleAuthRedirect = async () => {
      if (!authLoading && !user) {
        console.log('❌ No authenticated user found, redirecting to auth...');
        navigate('/auth');
      } else if (!authLoading && user) {
        // Check if user needs to complete profile setup
        const { checkUserProfileStatus } = useAuth.getState();
        const hasPhone = await checkUserProfileStatus();
        if (!hasPhone) {
          console.log('📱 User needs to complete profile setup...');
          navigate('/profile-setup');
        }
      }
    };

    handleAuthRedirect();
  }, [user, authLoading, navigate]);

  // Show loading while auth is loading
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Don't render anything if not authenticated
  if (!user) {
    return null;
  }
  
  // Calculate effective escrow balance using contract amounts
  const getEffectiveEscrowBalance = () => {
    if (userMode === 'Buyer') {
      // For buyers: money I've paid that's currently held in escrow
      return transactions
        .filter(tx => 
          tx.role === 'buyer' && 
          (tx.status === 'payment_made' || tx.status === 'work_completed')
        )
        .reduce((sum, tx) => {
          // Find the latest accepted contract for this transaction
          const acceptedContract = contracts
            .filter(contract => contract.transaction_id === tx.id)
            .sort((a, b) => {
              const statusPriority = { 
                'accepted_awaiting_payment': 3, 
                'awaiting_acceptance': 2, 
                'draft': 1,
                'rejected': 0,
                'expired': 0
              };
              const priorityDiff = (statusPriority[b.status as keyof typeof statusPriority] || 0) - (statusPriority[a.status as keyof typeof statusPriority] || 0);
              if (priorityDiff !== 0) return priorityDiff;
              return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            })[0];
          
          const effectiveAmount = acceptedContract ? getContractAmount(acceptedContract) : tx.amount;
          return sum + effectiveAmount;
        }, 0);
    } else {
      // For sellers: money held in escrow waiting to be released to me
      return transactions
        .filter(tx => 
          tx.role === 'seller' && 
          (tx.status === 'payment_made' || tx.status === 'work_completed')
        )
        .reduce((sum, tx) => {
          // Find the latest accepted contract for this transaction
          const acceptedContract = contracts
            .filter(contract => contract.transaction_id === tx.id)
            .sort((a, b) => {
              const statusPriority = { 
                'accepted_awaiting_payment': 3, 
                'awaiting_acceptance': 2, 
                'draft': 1,
                'rejected': 0,
                'expired': 0
              };
              const priorityDiff = (statusPriority[b.status as keyof typeof statusPriority] || 0) - (statusPriority[a.status as keyof typeof statusPriority] || 0);
              if (priorityDiff !== 0) return priorityDiff;
              return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            })[0];
          
          const effectiveAmount = acceptedContract ? getContractAmount(acceptedContract) : tx.amount;
          return sum + effectiveAmount;
        }, 0);
    }
  };
  
  const escrowBalance = getEffectiveEscrowBalance();
  const activeTransactions = getActiveTransactions();
  const recentTransactions = transactions.slice(0, 3); // Show only 3 most recent

  // Get pending contracts for current user based on role
  const pendingContracts = userMode === 'Buyer' ? getPendingContractsAsBuyer() : getPendingContractsAsSeller();

  return (
    <div className="bharose-container pb-20 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Modern Profile Header */}
        <ModernProfileHeader 
          userName={user?.user_metadata?.full_name}
          userEmail={user?.email}
          avatarUrl={user?.user_metadata?.avatar_url}
        />

        {/* Pending Contracts Alert */}
        {pendingContracts.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mt-4"
          >
            <Alert className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-800">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-yellow-800 dark:text-yellow-200">
                    {pendingContracts.length} pending contract{pendingContracts.length > 1 ? 's' : ''} 
                  </span>
                  <span className="text-yellow-700 dark:text-yellow-300 ml-1">
                    awaiting your response
                  </span>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => navigate('/contracts')}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white ml-4"
                >
                  Review
                </Button>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Modern Escrow Balance Card */}
        <ModernEscrowCard 
          userMode={userMode}
          balance={escrowBalance}
          onViewAll={() => navigate('/transactions', { state: { userMode } })}
        />
        
        {/* Role-based Quick Actions */}
        <RoleBasedQuickActions 
          userMode={userMode}
          onStartTransaction={() => navigate('/transaction-setup')}
          onViewTransactions={() => navigate('/transactions', { state: { userMode } })}
          onViewDisputes={() => navigate('/disputes')}
          onViewSavedParties={() => navigate('/transactions')} // Could be dedicated saved parties page
          disputeCount={getActiveDisputes(userMode).length}
        />
        
        {/* Recent Deals Section */}
        <RecentDealsSection 
          userMode={userMode}
          transactions={recentTransactions}
          onViewAll={() => navigate('/transactions', { state: { userMode } })}
          onStartNew={() => navigate('/transaction-setup')}
        />
        
        {/* Modern Saved Parties */}
        <ModernSavedParties 
          userMode={userMode}
          parties={[]} // Could be fetched from actual data
          onViewAll={() => navigate('/transactions')} // Could be dedicated saved parties page
          onContactParty={(partyId) => navigate('/transaction-setup', { state: { selectedParty: partyId } })}
        />
        
        {/* Dashboard Analytics */}
        <DashboardAnalytics userMode={userMode} />
      </motion.div>
      
      <BottomNavigation userMode={userMode} />
    </div>
  );
};

export default Dashboard;