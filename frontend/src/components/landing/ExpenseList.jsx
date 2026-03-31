import { motion } from 'framer-motion';
import { Trash2, ShoppingBag, Utensils, Car, Home, Film, HeartPulse, MoreHorizontal } from 'lucide-react';
import { useExpenseStore } from '../../store/useStore';
import { formatCurrency } from '../../utils/formatters';

const categoryIcons = {
  'Food': Utensils,
  'Transportation': Car,
  'Housing': Home,
  'Entertainment': Film,
  'Health': HeartPulse,
  'Shopping': ShoppingBag,
  'Other': MoreHorizontal
};

export default function ExpenseList() {
  const { expenses, deleteExpense, loading } = useExpenseStore();

  if (expenses.length === 0 && !loading) {
    return (
      <div className="text-center py-20 bg-white rounded-[32px] border border-gray-100 shadow-sm">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
          <ShoppingBag size={32} />
        </div>
        <h3 className="text-xl font-bold text-gray-900">No expenses yet</h3>
        <p className="text-gray-500 mt-2">Add your first expense to see it here!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{expenses.length} Records</span>
      </div>

      <div className="grid gap-4">
        {expenses.map((expense, index) => {
          const Icon = categoryIcons[expense.category] || MoreHorizontal;
          return (
            <motion.div
              key={expense.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group flex items-center justify-between p-5 bg-white rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#f5f5f5] flex items-center justify-center text-[#2F3BFF] group-hover:scale-110 transition-transform">
                  <Icon size={22} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{expense.title}</h4>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{expense.category} • {new Date(expense.date).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <span className={`text-lg font-bold ${expense.type === 'INCOME' ? 'text-emerald-500' : 'text-gray-900'}`}>
                  {expense.type === 'INCOME' ? '+' : '-'}{formatCurrency(expense.amount, { showDecimal: true })}
                </span>
                <button
                  onClick={() => deleteExpense(expense.id)}
                  className="p-2.5 rounded-xl text-red-400 hover:bg-red-50 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all active:scale-95"
                  title="Delete Expense"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
