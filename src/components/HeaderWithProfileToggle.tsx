
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ThemeToggle from './ThemeToggle';
import UserRoleToggle from './UserRoleToggle';
import { useUserModeContext } from './UserModeContext';
import { useAuth } from '@/hooks/use-auth';
import { useNotifications } from '@/hooks/use-notifications';

interface HeaderWithProfileToggleProps {
  title?: string;
  showBack?: boolean;
  showNotifications?: boolean;
  className?: string;
  showUserToggle?: boolean;
}

const HeaderWithProfileToggle: React.FC<HeaderWithProfileToggleProps> = ({
  title,
  showBack = false,
  showNotifications = false,
  className = '',
  showUserToggle = true
}) => {
  const navigate = useNavigate();
  const { userMode, setUserMode } = useUserModeContext();
  const { user, signOut } = useAuth();
  const { unreadCount } = useNotifications();

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <div className={`flex items-center justify-between py-4 ${className}`}>
      <div className="flex items-center">
        {showBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-2"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        {title && <h1 className="text-xl font-semibold">{title}</h1>}
      </div>
      
      <div className="flex items-center space-x-2">
        {showUserToggle && (
          <UserRoleToggle 
            currentMode={userMode} 
            onChange={setUserMode} 
          />
        )}
        
        {showNotifications && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/notifications')}
            className="relative"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
              >
                {unreadCount}
              </Badge>
            )}
          </Button>
        )}
        
        <ThemeToggle />
        
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="text-destructive hover:text-destructive"
          aria-label="Logout"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default HeaderWithProfileToggle;
