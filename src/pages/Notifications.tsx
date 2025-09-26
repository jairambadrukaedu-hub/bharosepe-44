import React from 'react';
import { Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HeaderWithRoleToggle from '@/components/HeaderWithRoleToggle';
import BottomNavigation from '@/components/BottomNavigation';
import ContractNotifications from '@/components/ContractNotifications';
import { useUserModeContext } from '@/components/UserModeContext';
import { useNotifications } from '@/hooks/use-notifications';

const Notifications = () => {
  const { userMode } = useUserModeContext();
  const { markAllAsRead } = useNotifications();

  return (
    <div className="bharose-container pb-20">
      <HeaderWithRoleToggle 
        title="Notifications"
        showBack={true}
        showNotifications={false}
        showUserToggle={false}
      />

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">All Notifications</h1>
        <Button variant="outline" size="sm" onClick={markAllAsRead}>
          Mark All Read
        </Button>
      </div>

      <ContractNotifications />
      
      <BottomNavigation userMode={userMode} />
    </div>
  );
};

export default Notifications;