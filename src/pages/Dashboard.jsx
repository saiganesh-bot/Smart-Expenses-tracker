import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExpenseStore, useAuthStore } from '../store/useStore';
import SummaryCards from '../components/dashboard/SummaryCards';
import AnalyticsSection from '../components/dashboard/AnalyticsSection';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import BudgetProgress from '../components/dashboard/BudgetProgress';
import GoalsSection from '../components/dashboard/GoalsSection';
import Navigation from '../components/layout/Navigation';
import { Plus, LayoutDashboard, Target } from 'lucide-react';

export default function Dashboard() {
  const { expenses, fetchExpenses, goals, fetchGoals, openExpenseModal, currentTab, setTab } = useExpenseStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchExpenses();
    fetchGoals();
  }, [fetchExpenses, fetchGoals]);

  return (
    <Navigation>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-2xl md:text-3xl font-black text-gray-900">
              Welcome back, <span className="text-primary">{user?.name?.split(' ')[0] || 'User'}</span>! 👋
            </h1>
            <p className="text-gray-500 font-medium mt-1">Here's what's happening with your money today.</p>
          </motion.div>

          <div className="flex items-center gap-3 bg-gray-100/50 p-1.5 rounded-2xl border border-gray-200/50">
            <button
              onClick={() => setTab('overview')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                currentTab === 'overview' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <LayoutDashboard size={18} />
              Overview
            </button>
            <button
              onClick={() => setTab('goals')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                currentTab === 'goals' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Target size={18} />
              Goals
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openExpenseModal}
            className="flex items-center justify-center gap-2 primary-gradient text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-primary/20 transition-all"
          >
            <Plus size={20} />
            Add Expense
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {currentTab === 'overview' ? (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Summary Cards */}
              <SummaryCards expenses={expenses} />

              {/* Desktop Grid Layout */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
                {/* Main Analytics Column */}
                <div className="xl:col-span-2 space-y-6 md:space-y-8">
                  <AnalyticsSection expenses={expenses} />
                  <RecentTransactions expenses={expenses} />
                </div>

                {/* Sidebar Column */}
                <div className="space-y-6 md:space-y-8">
                  <BudgetProgress expenses={expenses} />
                  
                  {/* Promo Card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-950 p-8 rounded-[32px] text-white shadow-xl relative overflow-hidden group"
                  >
                    <div className="relative z-10">
                      <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                        Premium Feature
                      </span>
                      <h3 className="text-xl font-bold mb-2 leading-tight text-white">Upgrade to Pro for AI Insights</h3>
                      <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                        Get personalized savings tips and automated budget forecasting powered by AI.
                      </p>
                      <button className="w-full py-3 bg-white text-gray-900 rounded-2xl font-bold hover:bg-gray-100 transition-colors">
                        Go Premium
                      </button>
                    </div>
                    
                    <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/20 blur-[80px] rounded-full group-hover:bg-primary/30 transition-colors" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="goals"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <GoalsSection goals={goals} expenses={expenses} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Navigation>
  );
}
