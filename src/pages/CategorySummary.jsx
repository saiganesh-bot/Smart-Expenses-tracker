import { motion } from 'framer-motion';
import { ArrowLeft, Utensils, ShoppingBag, Car, Coffee, Tv, HeartPulse, Home, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import clsx from 'clsx';
import { useExpenseStore } from '../store/useStore';
import { useMemo } from 'react';

const categoryMap = {
  'Food & Dining': { icon: Utensils, color: '#F59E0B', bg: 'bg-amber-100', text: 'text-amber-500' },
  'Transportation': { icon: Car, color: '#142BFF', bg: 'bg-blue-100', text: 'text-blue-500' },
  'Shopping': { icon: ShoppingBag, color: '#8B5CF6', bg: 'bg-purple-100', text: 'text-purple-500' },
  'Housing': { icon: Home, color: '#142BFF', bg: 'bg-indigo-100', text: 'text-indigo-500' },
  'Utilities': { icon: Coffee, color: '#06B6D4', bg: 'bg-cyan-100', text: 'text-cyan-500' },
  'Entertainment': { icon: Tv, color: '#EC4899', bg: 'bg-pink-100', text: 'text-pink-500' },
  'Health & Fitness': { icon: HeartPulse, color: '#EF4444', bg: 'bg-red-100', text: 'text-red-500' },
};

export default function CategorySummary() {
  const { expenses } = useExpenseStore();

  const { pieData, totalExpense } = useMemo(() => {
    const incomeCategories = ['Salary', 'Freelance'];
    
    const categoryGroup = expenses
      .filter(e => !incomeCategories.includes(e.category))
      .reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        return acc;
      }, {});

    let total = 0;
    const pie = Object.keys(categoryGroup).map((key) => {
      total += categoryGroup[key];
      const mapping = categoryMap[key] || { color: '#9CA3AF', icon: DollarSign, bg: 'bg-gray-100', text: 'text-gray-500' };
      return {
        name: key,
        value: categoryGroup[key],
        ...mapping
      };
    }).sort((a, b) => b.value - a.value);

    return { pieData: pie, totalExpense: total };
  }, [expenses]);

  return (
    <div className="flex flex-col gap-6 px-6 pt-2 pb-10">
      <div className="flex items-center gap-4">
        <Link to="/analytics" className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm border border-gray-100">
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <h2 className="text-xl font-bold text-gray-800">Category Breakdown</h2>
      </div>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative flex h-64 w-full items-center justify-center rounded-[32px] bg-white shadow-sm border border-gray-50 bg-gradient-to-br from-white to-gray-50/50"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-sm font-medium text-gray-400">Total Spent</span>
          <span className="text-3xl font-bold text-gray-800">${totalExpense.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        </div>
        
        {pieData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={80}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
                animationDuration={1500}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-20">
            <span className="h-40 w-40 rounded-full border-4 border-dashed border-gray-100"></span>
          </div>
        )}
      </motion.div>

      <div className="flex flex-col gap-3">
        <h3 className="mb-2 text-sm font-semibold text-gray-400">Largest Categories</h3>
        
        {pieData.length === 0 && <p className="text-center text-gray-400 text-sm mt-4">No structured items found.</p>}

        {pieData.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between rounded-[20px] bg-white p-4 shadow-sm border border-gray-50 transition-transform hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4">
                <div className={clsx('flex h-12 w-12 items-center justify-center rounded-2xl', item.bg, item.text)}>
                  {Icon && <Icon size={22} />}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">{item.name}</span>
                  <span className="text-xs text-gray-400">{((item.value / totalExpense) * 100).toFixed(1)}% of total</span>
                </div>
              </div>
              <span className="font-bold text-gray-800">${item.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
