import React from 'react';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProfileEditNoticeProps {
  type?: 'warning' | 'success' | 'info';
  title: string;
  message: string;
  className?: string;
}

export default function ProfileEditNotice({ 
  type = 'info', 
  title, 
  message, 
  className = '' 
}: ProfileEditNoticeProps) {
  const getStyles = () => {
    switch (type) {
      case 'warning':
        return {
          container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
          icon: <AlertTriangle className="h-4 w-4 text-yellow-600" />
        };
      case 'success':
        return {
          container: 'bg-green-50 border-green-200 text-green-800',
          icon: <CheckCircle className="h-4 w-4 text-green-600" />
        };
      default:
        return {
          container: 'bg-blue-50 border-blue-200 text-blue-800',
          icon: <Info className="h-4 w-4 text-blue-600" />
        };
    }
  };

  const styles = getStyles();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`p-3 border rounded-lg ${styles.container} ${className}`}
    >
      <div className="flex items-start gap-2">
        {styles.icon}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">{title}</p>
          <p className="text-sm mt-1">{message}</p>
        </div>
      </div>
    </motion.div>
  );
}