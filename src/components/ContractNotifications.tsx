import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, CheckCircle, XCircle, Eye, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNotifications } from '@/hooks/use-notifications';
import { useNavigate } from 'react-router-dom';

export default function ContractNotifications() {
  const { notifications, markAsRead } = useNotifications();
  const navigate = useNavigate();

  // Show all notifications, not just contract ones
  const allNotifications = notifications;

  const handleViewNotification = async (notification: any) => {
    if (!notification.read) {
      await markAsRead(notification.id);
    }
    
    // Navigate based on notification type
    if (notification.type === 'dispute_raised' && notification.transaction_id) {
      navigate(`/transaction/${notification.transaction_id}`);
    } else if (notification.contract_id) {
      navigate(`/contract/${notification.contract_id}`);
    } else if (notification.transaction_id) {
      navigate(`/transaction/${notification.transaction_id}`);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'contract_received':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'contract_accepted':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'contract_rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'dispute_raised':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'payment_received':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      default:
        return <Clock className="h-5 w-5 text-orange-500" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'contract_received':
        return 'bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800';
      case 'contract_accepted':
        return 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800';
      case 'contract_rejected':
        return 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800';
      case 'dispute_raised':
        return 'bg-red-50 border-red-300 dark:bg-red-950/20 dark:border-red-700';
      case 'payment_received':
        return 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800';
      default:
        return 'bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-800';
    }
  };

  if (allNotifications.length === 0) {
    return (
      <div className="text-center py-8">
        <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
        <p className="text-muted-foreground">No notifications yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {allNotifications.map((notification, index) => (
        <motion.div
          key={notification.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`p-4 border rounded-lg ${getNotificationColor(notification.type)} ${
            !notification.read ? 'ring-2 ring-bharose-primary/20' : ''
          }`}
        >
          <div className="flex items-start gap-3">
            {getNotificationIcon(notification.type)}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(notification.created_at).toLocaleString()}
                  </p>
                </div>
                
                <div className="flex items-center gap-2 flex-shrink-0">
                  {!notification.read && (
                    <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                      New
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleViewNotification(notification)}
                  className="text-xs flex items-center gap-1"
                >
                  <Eye className="h-3 w-3" />
                  {notification.type === 'dispute_raised' ? 'View Transaction' : 
                   notification.type.includes('contract') ? 'View Contract' : 'View Details'}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}