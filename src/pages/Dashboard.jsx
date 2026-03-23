import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft, MoreHorizontal, CreditCard, ChevronDown } from 'lucide-react';
import FloatingActionButton from '../components/ui/FloatingActionButton';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { useExpenseStore } from '../store/useStore';
import { useMemo } from 'react';

export default function Dashboard() {
  const { expenses } = useExpenseStore();

  const { income, spent, balance, chartData } = useMemo(() => {
    const incomeCategories = ['Salary', 'Freelance'];
    let inc = 0;
    let exp = 0;
    
    // Calculate totals
    expenses.forEach(e => {
      if (incomeCategories.includes(e.category)) inc += e.amount;
      else exp += e.amount;
    });

    // Generate chart data (last 7 days of non-income spending)
    const spendingOnly = expenses.filter(e => !incomeCategories.includes(e.category));
    const grouped = spendingOnly.reduce((acc, curr) => {
      const day = curr.date.substring(5); // MM-DD
      acc[day] = (acc[day] || 0) + curr.amount;
      return acc;
    }, {});

    const chart = Object.keys(grouped).slice(0, 7).reverse().map(date => ({
      name: date,
      value: grouped[date]
    }));

    // Fallback if empty
    if (chart.length === 0) {
      chart.push({ name: 'Mon', value: 0 }, { name: 'Tue', value: 0 });
    }

    return { income: inc, spent: exp, balance: inc - exp, chartData: chart };
  }, [expenses]);

  return (
    <div className="flex flex-col gap-6 px-6 pt-2 pb-10">
      
      {/* Balance Card Hero Section */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="primary-gradient relative overflow-hidden rounded-[28px] p-6 text-white shadow-xl shadow-blue-500/30"
      >
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
        
        <div className="relative z-10 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-100">Total Balance</span>
            <button className="rounded-full bg-white/20 p-1.5 backdrop-blur-md transition-colors hover:bg-white/30">
              <MoreHorizontal size={16} />
            </button>
          </div>
          
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-bold tracking-tight">${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
          
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-xs font-medium backdrop-blur-md">
              <ArrowUpRight size={14} className="text-green-300" />
              <span>+${income.toLocaleString()} income</span>
            </div>
            
            <div className="flex -space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-500 bg-blue-800 text-[10px] font-bold">
                <CreditCard size={14} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Analytics Chart Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">Analytics</h2>
          <button className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm border border-gray-100">
            Recent <ChevronDown size={14} />
          </button>
        </div>
        
        <div className="h-48 w-full rounded-[24px] bg-white p-4 shadow-sm border border-gray-50 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-xs text-gray-400">Spending Trend</p>
              <p className="text-lg font-bold text-gray-800">${spent.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>
          </div>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#142BFF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#142BFF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#142BFF" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* Cash Flow Summary */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        className="flex gap-4"
      >
        <div className="flex-1 rounded-[24px] bg-white p-4 shadow-sm border border-gray-50">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-500 mb-3">
            <ArrowDownLeft size={20} />
          </div>
          <p className="text-sm font-medium text-gray-400">Income</p>
          <p className="text-xl font-bold text-gray-800">${income.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        </div>
        
        <div className="flex-1 rounded-[24px] bg-white p-4 shadow-sm border border-gray-50">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500 mb-3">
            <ArrowUpRight size={20} />
          </div>
          <p className="text-sm font-medium text-gray-400">Expenses</p>
          <p className="text-xl font-bold text-gray-800">${spent.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        </div>
      </motion.div>

      <FloatingActionButton />
    </div>
  );
}
