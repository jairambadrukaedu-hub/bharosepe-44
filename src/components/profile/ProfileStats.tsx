
import React from 'react';

interface UserStats {
  totalTransactions: number;
  successRate: number;
  avgTransactionValue: number;
  totalAmount: number;
  escrowBalance: number;
}

interface ProfileStatsProps {
  userStats: UserStats;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ userStats }) => {
  return (
    <div className="space-y-4">
      {/* Escrow Balance - Prominent Display */}
      <div className="bharose-card bg-gradient-to-br from-bharose-primary to-bharose-dark text-white">
        <h3 className="font-medium mb-2 opacity-90">Current Escrow Balance</h3>
        <div className="text-3xl font-bold">₹{userStats.escrowBalance.toLocaleString()}</div>
        <p className="text-sm opacity-80 mt-1">Money held securely in escrow</p>
      </div>

      {/* Transaction Statistics */}
      <div className="bharose-card">
        <h3 className="font-medium mb-4">Transaction Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-bharose-primary/5 rounded-lg">
            <div className="text-2xl font-bold text-bharose-primary">{userStats.totalTransactions}</div>
            <div className="text-sm text-muted-foreground">Total Transactions</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{userStats.successRate.toFixed(0)}%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">₹{userStats.avgTransactionValue.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Avg Transaction</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">₹{userStats.totalAmount.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Volume</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
