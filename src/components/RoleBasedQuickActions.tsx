import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Store, 
  ArrowRight, 
  AlertTriangle, 
  Users, 
  FileText,
  TrendingUp,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuickAction {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'warning';
  badgeCount?: number;
}

interface RoleBasedQuickActionsProps {
  userMode: 'Buyer' | 'Seller';
  onStartTransaction: () => void;
  onViewTransactions: () => void;
  onViewDisputes: () => void;
  onViewSavedParties: () => void;
  disputeCount?: number;
}

const RoleBasedQuickActions: React.FC<RoleBasedQuickActionsProps> = ({
  userMode,
  onStartTransaction,
  onViewTransactions,
  onViewDisputes,
  onViewSavedParties,
  disputeCount = 0
}) => {
  const isBuyer = userMode === 'Buyer';
  
  const actions: QuickAction[] = isBuyer ? [
    {
      icon: ShoppingBag,
      title: 'Start Purchase',
      subtitle: 'Buy securely with escrow',
      onClick: onStartTransaction,
      variant: 'primary'
    },
    {
      icon: ArrowRight,
      title: 'Transactions',
      subtitle: 'Manage your purchases',
      onClick: onViewTransactions
    },
    {
      icon: AlertTriangle,
      title: 'Disputes',
      subtitle: disputeCount > 0 ? `${disputeCount} active` : 'Manage disputes',
      onClick: onViewDisputes,
      variant: disputeCount > 0 ? 'warning' : undefined,
      badgeCount: disputeCount > 0 ? disputeCount : undefined
    },
    {
      icon: Heart,
      title: 'Saved Sellers',
      subtitle: 'Your trusted sellers',
      onClick: onViewSavedParties
    }
  ] : [
    {
      icon: Store,
      title: 'Create Listing',
      subtitle: 'Sell with protection',
      onClick: onStartTransaction,
      variant: 'primary'
    },
    {
      icon: ArrowRight,
      title: 'Transactions',
      subtitle: 'Manage your sales',
      onClick: onViewTransactions
    },
    {
      icon: AlertTriangle,
      title: 'Disputes',
      subtitle: disputeCount > 0 ? `${disputeCount} active` : 'Manage disputes',
      onClick: onViewDisputes,
      variant: disputeCount > 0 ? 'warning' : undefined,
      badgeCount: disputeCount > 0 ? disputeCount : undefined
    },
    {
      icon: Users,
      title: 'Frequent Buyers',
      subtitle: 'Your loyal customers',
      onClick: onViewSavedParties
    }
  ];

  const getButtonVariant = (variant?: string) => {
    switch (variant) {
      case 'primary': return 'default';
      case 'warning': return 'destructive';
      default: return 'outline';
    }
  };

  const getButtonClasses = (variant?: string) => {
    const baseClasses = "w-full h-auto p-6 flex flex-col items-center justify-center gap-3 relative";
    
    switch (variant) {
      case 'primary':
        return `${baseClasses} bg-primary text-primary-foreground hover:bg-primary/90 border-none`;
      case 'warning':
        return `${baseClasses} border-destructive/50 hover:bg-destructive/5`;
      default:
        return `${baseClasses} hover:bg-muted`;
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
              <Button
                variant={getButtonVariant(action.variant)}
                className={getButtonClasses(action.variant)}
                onClick={action.onClick}
              >
                {action.badgeCount && action.badgeCount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs rounded-full h-6 w-6 flex items-center justify-center font-medium">
                    {action.badgeCount}
                  </div>
                )}
                
                <Icon className={`h-8 w-8 ${
                  action.variant === 'primary' 
                    ? 'text-primary-foreground' 
                    : action.variant === 'warning'
                    ? 'text-destructive'
                    : 'text-primary'
                }`} />
                
                <div className="text-center">
                  <span className="font-semibold text-base block">{action.title}</span>
                  <span className={`text-sm ${
                    action.variant === 'primary' 
                      ? 'text-primary-foreground/80' 
                      : 'text-muted-foreground'
                  }`}>
                    {action.subtitle}
                  </span>
                </div>
              </Button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default RoleBasedQuickActions;