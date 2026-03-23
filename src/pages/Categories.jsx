import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, ShoppingBag, Coffee, Car, Home, Zap, Monitor, HeartPulse, ChevronRight, Plus } from 'lucide-react';
import clsx from 'clsx';

const expensesCategories = [
  { id: 1, name: 'Food & Dining', icon: Utensils, color: 'text-amber-500', bg: 'bg-amber-100', amount: 840.50 },
  { id: 2, name: 'Transportation', icon: Car, color: 'text-blue-500', bg: 'bg-blue-100', amount: 320.00 },
  { id: 3, name: 'Shopping', icon: ShoppingBag, color: 'text-purple-500', bg: 'bg-purple-100', amount: 450.25 },
  { id: 4, name: 'Housing', icon: Home, color: 'text-indigo-500', bg: 'bg-indigo-100', amount: 1500.00 },
  { id: 5, name: 'Utilities', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-100', amount: 210.00 },
  { id: 6, name: 'Entertainment', icon: Monitor, color: 'text-pink-500', bg: 'bg-pink-100', amount: 180.00 },
  { id: 7, name: 'Health & Fitness', icon: HeartPulse, color: 'text-red-500', bg: 'bg-red-100', amount: 95.00 },
  { id: 8, name: 'Coffee', icon: Coffee, color: 'text-amber-700', bg: 'bg-amber-100', amount: 45.00 },
];

const incomeCategories = [
  { id: 9, name: 'Salary', icon: Home, color: 'text-green-500', bg: 'bg-green-100', amount: 5000.00 },
  { id: 10, name: 'Freelance', icon: Monitor, color: 'text-blue-500', bg: 'bg-blue-100', amount: 1200.00 },
];

export default function Categories() {
  const [activeTab, setActiveTab] = useState('Expenses');
  const items = activeTab === 'Expenses' ? expensesCategories : incomeCategories;

  return (
    <div className="flex flex-col gap-6 px-6 pt-2 pb-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Categories</h2>
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 shadow-sm border border-blue-100">
          <Plus size={18} />
        </button>
      </div>

      <div className="flex w-full rounded-[16px] bg-white p-1.5 shadow-sm border border-gray-100">
        {['Expenses', 'Income'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="relative flex-1 rounded-[12px] py-2.5 text-sm font-semibold transition-colors"
          >
            {activeTab === tab && (
              <motion.div
                layoutId="category-tab"
                className="absolute inset-0 rounded-[12px] bg-blue-500"
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
            )}
            <span className={`relative z-10 ${activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`}>
              {tab}
            </span>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-center justify-between rounded-[20px] bg-white p-4 shadow-sm border border-gray-50 transition-transform hover:scale-[1.02] cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className={clsx('flex h-12 w-12 items-center justify-center rounded-2xl', item.bg, item.color)}>
                  <item.icon size={22} />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">{item.name}</span>
                  <span className="text-xs text-gray-400">
                    {activeTab === 'Expenses' ? '-' : '+'}${item.amount.toFixed(2)}
                  </span>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-300" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
