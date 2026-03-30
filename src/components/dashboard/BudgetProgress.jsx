import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/formatters';

const BudgetProgressItem = ({ category, spent, limit, color }) => {
  const percentage = Math.min((spent / limit) * 100, 100);
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-sm font-bold text-gray-900">{category}</p>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            {formatCurrency(spent)} of {formatCurrency(limit)}
          </p>
        </div>
        <span className={`text-xs font-black ${percentage > 90 ? 'text-red-500' : 'text-primary'}`}>
          {percentage.toFixed(0)}%
        </span>
      </div>
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  );
};

export default function BudgetProgress({ expenses }) {
  // Example budget limits
  const budgets = [
    { category: 'Food', limit: 500, color: 'bg-orange-400' },
    { category: 'Shopping', limit: 800, color: 'bg-indigo-500' },
    { category: 'Transport', limit: 300, color: 'bg-blue-400' },
    { category: 'Housing', limit: 2000, color: 'bg-teal-500' },
  ];

  return (
    <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 w-full lg:w-80">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Budgets</h3>
      <div className="space-y-6">
        {budgets.map((budget) => {
          const spent = expenses
            .filter(e => e.category === budget.category)
            .reduce((sum, e) => sum + parseFloat(e.amount), 0);
          
          return (
            <BudgetProgressItem
              key={budget.category}
              {...budget}
              spent={spent}
            />
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
        <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1">Insight 💡</p>
        <p className="text-xs text-indigo-900 font-medium leading-relaxed">
          Your Shopping spending is <span className="font-bold">57%</span> of its budget. You're doing great!
        </p>
      </div>
    </div>
  );
}
