import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Wallet, TrendingUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ModernEscrowCardProps {
  userMode: 'Buyer' | 'Seller';
  balance: number;
  onViewAll: () => void;
}

const ModernEscrowCard: React.FC<ModernEscrowCardProps> = ({ 
  userMode, 
  balance, 
  onViewAll 
}) => {
  const isBuyer = userMode === 'Buyer';
  
  return (
    <motion.div 
      className="relative overflow-hidden rounded-2xl p-6 text-white"
      style={{
        background: isBuyer 
          ? 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary)) 50%, hsl(240 5.9% 5%) 100%)'
          : 'linear-gradient(135deg, hsl(145 63% 42%) 0%, hsl(145 63% 35%) 50%, hsl(145 63% 25%) 100%)'
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full border border-white/20 -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full border border-white/20 translate-y-12 -translate-x-12"></div>
      </div>
      
      <div className="relative">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            {isBuyer ? (
              <div className="p-3 rounded-full bg-white/20 backdrop-blur">
                <Shield className="h-6 w-6" />
              </div>
            ) : (
              <div className="p-3 rounded-full bg-white/20 backdrop-blur">
                <Wallet className="h-6 w-6" />
              </div>
            )}
            <div>
              <p className="text-sm opacity-90 font-medium">
                {isBuyer ? 'Your Money in Escrow' : 'Your Receivables in Escrow'}
              </p>
              <p className="text-xs opacity-70">
                {isBuyer ? 'Secured until release' : 'Awaiting buyer confirmation'}
              </p>
            </div>
          </div>
          
          {!isBuyer && (
            <div className="flex items-center gap-1 text-xs opacity-80">
              <TrendingUp className="h-3 w-3" />
              <span>Growing</span>
            </div>
          )}
        </div>
        
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-1">₹{balance.toLocaleString()}</h2>
            <div className="flex items-center gap-1 text-xs opacity-80">
              <Clock className="h-3 w-3" />
              <span>Updated now</span>
            </div>
          </div>
          
          <Button 
            variant="secondary" 
            size="sm" 
            className="bg-white/20 hover:bg-white/30 border-none text-white backdrop-blur"
            onClick={onViewAll}
          >
            View All
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ModernEscrowCard;