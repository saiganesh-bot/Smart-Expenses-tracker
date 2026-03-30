import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/formatters';
import { ShoppingBag, Coffee, Car, Home, Smartphone, MoreHorizontal } from 'lucide-react';

const CategoryIcon = ({ category }) => {
  const icons = {
    'Food': { icon: Coffee, color: 'text-orange-500 bg-orange-50' },
    'Shopping': { icon: ShoppingBag, color: 'text-indigo-500 bg-indigo-50' },
    'Transport': { icon: Car, color: 'text-blue-500 bg-blue-50' },
    'Housing': { icon: Home, color: 'text-teal-500 bg-teal-50' },
    'Bills': { icon: Smartphone, color: 'text-red-500 bg-red-50' },
    'default': { icon: MoreHorizontal, color: 'text-gray-500 bg-gray-50' }
  };

  const { icon: Icon, color } = icons[category] || icons['default'];
  return (
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
      <Icon size={20} />
    </div>
  );
};

export default function RecentTransactions({ expenses, limit = 5 }) {
  const recent = expenses.slice(0, limit);

  return (
    <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex-1">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 leading-none">Recent Transactions</h3>
        <button className="text-sm font-semibold text-primary hover:underline">View All</button>
      </div>

      <div className="space-y-4">
        {recent.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-10">No transactions found</p>
        ) : (
          recent.map((expense, i) => (
            <motion.div
              key={expense.id || i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between group p-2 rounded-2xl hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <CategoryIcon category={expense.category} />
                <div>
                  <p className="text-sm font-bold text-gray-900">{expense.title || expense.description || 'Transaction'}</p>
                  <p className="text-xs text-gray-400 font-medium">{new Date(expense.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-black ${expense.type === 'INCOME' ? 'text-emerald-500' : 'text-gray-900'}`}>
                  {expense.type === 'INCOME' ? '+' : '-'}{formatCurrency(expense.amount, { showDecimal: true })}
                </p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{expense.category}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
