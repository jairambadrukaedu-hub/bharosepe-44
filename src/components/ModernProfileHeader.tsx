import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Bell,
  ChevronDown,
  Menu
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import UserRoleToggle from './UserRoleToggle';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { useNotifications } from '@/hooks/use-notifications';
import { useUserModeContext } from './UserModeContext';

interface ModernProfileHeaderProps {
  userName?: string;
  userEmail?: string;
  avatarUrl?: string;
}

const ModernProfileHeader: React.FC<ModernProfileHeaderProps> = ({
  userName,
  userEmail,
  avatarUrl
}) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { notifications } = useNotifications();
  const { userMode, setUserMode } = useUserModeContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  const displayName = userName || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <motion.div
      className="flex items-center justify-between py-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Left side - Logo and greeting */}
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-foreground">Bharose Pe</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back, {displayName}
        </p>
      </div>

      {/* Right side - Notifications and Profile */}
      <div className="flex items-center gap-3">
        {/* Role Toggle */}
        <div className="hidden sm:block">
          <UserRoleToggle 
            currentMode={userMode}
            onChange={setUserMode}
            className="scale-90"
          />
        </div>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="sm"
          className="relative p-2 h-10 w-10"
          onClick={() => navigate('/notifications')}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>

        {/* Profile Dropdown */}
        <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 h-auto p-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="end" className="w-56 bg-background border border-border">
            <div className="px-3 py-2">
              <p className="text-sm font-medium text-foreground">{displayName}</p>
              <p className="text-xs text-muted-foreground">
                {userEmail || user?.email}
              </p>
              <div className="mt-2 sm:hidden">
                <UserRoleToggle 
                  currentMode={userMode}
                  onChange={setUserMode}
                  className="scale-75 origin-left"
                />
              </div>
            </div>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={() => navigate('/profile')}
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={() => navigate('/profile')}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={() => navigate('/help')}
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              Help & Support
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem 
              className="cursor-pointer text-destructive focus:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
};

export default ModernProfileHeader;