
import React, { Suspense } from 'react';

// Lazy load charts to reduce initial bundle size
const LazyPieChart = React.lazy(() => 
  import('recharts').then(module => ({ 
    default: ({ data, colors }: { data: any[], colors: string[] }) => (
      <module.ResponsiveContainer width="100%" height="100%">
        <module.PieChart>
          <module.Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }: any) => percent > 0 ? `${name} ${(percent * 100).toFixed(0)}%` : ''}
          >
            {data.map((entry: any, index: number) => (
              <module.Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </module.Pie>
          <module.Tooltip />
        </module.PieChart>
      </module.ResponsiveContainer>
    )
  }))
);

const LazyBarChart = React.lazy(() => 
  import('recharts').then(module => ({ 
    default: ({ data }: { data: any[] }) => (
      <module.ResponsiveContainer width="100%" height="100%">
        <module.BarChart data={data}>
          <module.CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <module.XAxis dataKey="month" />
          <module.YAxis tickFormatter={(value: number) => `₹${value/1000}k`} />
          <module.Tooltip 
            formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']}
            contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
          />
          <module.Bar dataKey="amount" fill="#6E59A5" radius={[4, 4, 0, 0]} />
        </module.BarChart>
      </module.ResponsiveContainer>
    )
  }))
);
import { BarChart3, PieChart as PieChartIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTransactionStore, TransactionStatus } from '@/utils/transactionState';

interface AnalyticsProps {
  userMode: string;
}

const COLORS = ['#6E59A5', '#F97316', '#EA384C'];

const DashboardAnalytics: React.FC<AnalyticsProps> = ({ userMode }) => {
  const { transactions } = useTransactionStore();
  
  // Filter transactions by role based on user mode
  const userTransactions = transactions.filter(tx => 
    userMode === 'Buyer' ? tx.role === 'buyer' : tx.role === 'seller'
  );
  
  // Generate status data for pie chart
  const statusData = [
    { name: 'Active', value: userTransactions.filter(tx => tx.status === 'in-progress').length },
    { name: 'Completed', value: userTransactions.filter(tx => tx.status === 'completed').length },
    { name: 'Disputed', value: userTransactions.filter(tx => tx.status === 'disputed').length },
  ];
  
  // Generate monthly transaction data for bar chart (last 6 months)
  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const monthYear = `${d.toLocaleString('default', { month: 'short' })}`;
    
    return {
      month: monthYear,
      amount: Math.floor(Math.random() * 50000) + 10000, // Simulated data
    };
  }).reverse();

  return (
    <div className="bharose-card mt-4">
      <h2 className="text-lg font-semibold mb-4">Transaction Analytics</h2>
      
      <Tabs defaultValue="status">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="status" className="flex items-center gap-1">
            <PieChartIcon size={16} />
            Status
          </TabsTrigger>
          <TabsTrigger value="monthly" className="flex items-center gap-1">
            <BarChart3 size={16} />
            Monthly
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="status" className="h-64">
          <Suspense fallback={
            <div className="flex items-center justify-center h-full">
              <div className="w-6 h-6 rounded-full border-2 border-bharose-primary border-t-transparent animate-spin"></div>
            </div>
          }>
            <LazyPieChart data={statusData} colors={COLORS} />
          </Suspense>
        </TabsContent>
        
        <TabsContent value="monthly" className="h-64">
          <Suspense fallback={
            <div className="flex items-center justify-center h-full">
              <div className="w-6 h-6 rounded-full border-2 border-bharose-primary border-t-transparent animate-spin"></div>
            </div>
          }>
            <LazyBarChart data={monthlyData} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardAnalytics;
