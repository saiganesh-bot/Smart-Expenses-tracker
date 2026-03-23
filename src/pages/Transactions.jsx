import { motion } from 'framer-motion';
import { Utensils, ShoppingBag, Coffee, Car, Search, Filter, Home, HeartPulse, Tv, Trash2, DollarSign } from 'lucide-react';
import clsx from 'clsx';
import { useExpenseStore } from '../store/useStore';

const categoryMap = {
  'Food & Dining': { icon: Utensils, color: 'text-amber-500', bg: 'bg-amber-100' },
  'Transportation': { icon: Car, color: 'text-blue-500', bg: 'bg-blue-100' },
  'Shopping': { icon: ShoppingBag, color: 'text-purple-500', bg: 'bg-purple-100' },
  'Housing': { icon: Home, color: 'text-indigo-500', bg: 'bg-indigo-100' },
  'Utilities': { icon: Coffee, color: 'text-cyan-500', bg: 'bg-cyan-100' },
  'Entertainment': { icon: Tv, color: 'text-pink-500', bg: 'bg-pink-100' },
  'Health & Fitness': { icon: HeartPulse, color: 'text-red-500', bg: 'bg-red-100' },
  'Salary': { icon: DollarSign, color: 'text-green-500', bg: 'bg-green-100' },
  'Freelance': { icon: DollarSign, color: 'text-green-500', bg: 'bg-green-100' },
};

export default function Transactions() {
  const { expenses, deleteExpense } = useExpenseStore();

  // Group by date
  const grouped = expenses.reduce((acc, curr) => {
    const date = curr.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(curr);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));

  return (
    <div className="flex flex-col gap-6 px-6 pt-2 pb-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Transactions</h2>
        <div className="flex gap-2">
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm border border-gray-100">
            <Search size={18} />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm border border-gray-100">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {sortedDates.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">No transactions recorded yet.</div>
        ) : sortedDates.map((date, groupIdx) => (
          <div key={date} className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-gray-400">{date}</h3>
            
            <div className="flex flex-col gap-3">
              {grouped[date].map((item, itemIdx) => {
                const style = categoryMap[item.category] || { icon: DollarSign, color: 'text-gray-500', bg: 'bg-gray-100' };
                const Icon = style.icon;
                const isIncome = ['Salary', 'Freelance'].includes(item.category);

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: (groupIdx * 0.1) + (itemIdx * 0.05) }}
                    className="flex items-center justify-between rounded-[20px] bg-white p-4 shadow-sm border border-gray-50 transition-transform hover:scale-[1.02] cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={clsx('flex h-12 w-12 items-center justify-center rounded-2xl shrink-0', style.bg, style.color)}>
                        <Icon size={22} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-800 line-clamp-1">{item.title}</span>
                        <span className="text-xs text-gray-400 line-clamp-1">{item.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={clsx("font-bold", isIncome ? "text-green-500" : "text-gray-800")}>
                        {isIncome ? '+' : '-'}${Math.abs(item.amount).toFixed(2)}
                      </span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); deleteExpense(item.id); }}
                        className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
