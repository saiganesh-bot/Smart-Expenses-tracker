import { motion } from 'framer-motion';
import { Utensils, Home, Car, ShoppingBag, Plus } from 'lucide-react';

const budgets = [
  { id: 1, name: 'Food & Dining', icon: Utensils, color: 'bg-amber-500', bg: 'bg-amber-100', spent: 540, total: 800 },
  { id: 2, name: 'Housing', icon: Home, color: 'bg-indigo-500', bg: 'bg-indigo-100', spent: 1500, total: 1500 },
  { id: 3, name: 'Transport', icon: Car, color: 'bg-blue-500', bg: 'bg-blue-100', spent: 180, total: 300 },
  { id: 4, name: 'Shopping', icon: ShoppingBag, color: 'bg-purple-500', bg: 'bg-purple-100', spent: 420, total: 500 },
];

export default function Budgets() {
  return (
    <div className="flex flex-col gap-6 px-6 pt-2 pb-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Budgets</h2>
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 shadow-sm border border-blue-100">
          <Plus size={18} />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {budgets.map((budget, index) => {
          const progress = Math.min((budget.spent / budget.total) * 100, 100);
          const isOver = budget.spent > budget.total;
          
          return (
            <motion.div
              key={budget.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex flex-col gap-3 rounded-[20px] bg-white p-5 shadow-sm border border-gray-50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-white ${budget.color}`}>
                    <budget.icon size={18} />
                  </div>
                  <span className="font-semibold text-gray-800">{budget.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-800">${budget.spent}</span>
                  <span className="text-xs text-gray-400"> / ${budget.total}</span>
                </div>
              </div>
              
              <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
                  className={`absolute inset-y-0 left-0 rounded-full ${isOver ? 'bg-red-500' : budget.color}`}
                />
              </div>
              
              <div className="flex justify-between text-xs font-medium text-gray-400">
                <span>{progress.toFixed(0)}% spent</span>
                <span className={isOver ? 'text-red-500' : ''}>
                  {isOver ? `Over by $${budget.spent - budget.total}` : `$${budget.total - budget.spent} left`}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
