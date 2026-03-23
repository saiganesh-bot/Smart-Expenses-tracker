import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { useExpenseStore } from '../store/useStore';

const filterDays = { 'Week': 7, 'Month': 30, 'Year': 365 };
const COLORS = ['#F59E0B', '#142BFF', '#8B5CF6', '#EC4899', '#10B981', '#F43F5E'];

export default function Analytics() {
  const [activeFilter, setActiveFilter] = useState('Week');
  const { expenses } = useExpenseStore();

  const { areaData, pieData } = useMemo(() => {
    const days = filterDays[activeFilter];
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const filtered = expenses.filter(e => new Date(e.date) >= cutoffDate);
    const incomeCategories = ['Salary', 'Freelance'];

    // Group for Area Chart
    const groupDate = filtered.reduce((acc, curr) => {
      const day = curr.date.substring(5);
      if (!acc[day]) acc[day] = { name: day, income: 0, expense: 0 };
      if (incomeCategories.includes(curr.category)) {
        acc[day].income += curr.amount;
      } else {
        acc[day].expense += curr.amount;
      }
      return acc;
    }, {});

    let area = Object.values(groupDate).sort((a,b) => a.name.localeCompare(b.name));
    if (area.length === 0) area = [{ name: 'N/A', income: 0, expense: 0 }];

    // Group for Pie Chart (Expenses only)
    const categoryGroup = filtered
      .filter(e => !incomeCategories.includes(e.category))
      .reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        return acc;
      }, {});

    const pie = Object.keys(categoryGroup).map((key, i) => ({
      name: key,
      value: categoryGroup[key],
      color: COLORS[i % COLORS.length]
    })).sort((a, b) => b.value - a.value);

    return { areaData: area, pieData: pie };
  }, [expenses, activeFilter]);

  const totalExpense = pieData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="flex flex-col gap-6 px-6 pt-2 pb-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Analytics</h2>
      </div>

      <div className="flex w-full rounded-full bg-white p-1 shadow-sm border border-gray-100">
        {Object.keys(filterDays).map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className="relative flex-1 rounded-full py-2 text-sm font-medium transition-colors"
          >
            {activeFilter === filter && (
              <motion.div
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-blue-50"
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
            )}
            <span className={`relative z-10 ${activeFilter === filter ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
              {filter}
            </span>
          </button>
        ))}
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-4 rounded-[24px] bg-white p-5 shadow-sm border border-gray-50"
      >
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">Income vs Expenses</h3>
          <div className="flex gap-3 text-xs font-medium">
            <span className="flex items-center gap-1 text-green-500">
              <span className="h-2 w-2 rounded-full bg-green-500"></span> Income
            </span>
            <span className="flex items-center gap-1 text-red-500">
              <span className="h-2 w-2 rounded-full bg-red-500"></span> Expense
            </span>
          </div>
        </div>
        
        <div className="h-60 w-full mt-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} dy={10} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="income" stroke="#22C55E" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                  <Area type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-col gap-4 rounded-[24px] bg-white p-5 shadow-sm border border-gray-50 mb-10"
      >
        <h3 className="font-semibold text-gray-800">Top Categories</h3>
        
        <div className="flex items-center gap-6">
          <div className="h-32 w-32 shrink-0 relative">
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={30}
                    outerRadius={55}
                    paddingAngle={5}
                    dataKey="value"
                    animationDuration={1000}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full flex items-center justify-center text-gray-300 text-xs text-center border-2 border-dashed rounded-full border-gray-200">No data</div>
            )}
          </div>
          
          <div className="flex flex-col gap-3 flex-1">
            {pieData.length > 0 ? pieData.slice(0, 3).map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-xs font-medium text-gray-600 line-clamp-1 truncate">{item.name}</span>
                </div>
                <span className="text-xs font-bold text-gray-800">{Math.round((item.value / totalExpense) * 100)}%</span>
              </div>
            )) : (
              <span className="text-sm text-gray-400">No categorised spending in this period.</span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
