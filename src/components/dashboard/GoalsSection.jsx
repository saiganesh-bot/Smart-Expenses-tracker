import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Plus, Info, X, IndianRupee, Wallet } from 'lucide-react';
import GoalCard from './GoalCard';
import { useExpenseStore } from '../../store/useStore';

export default function GoalsSection({ goals }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addGoal, loading } = useExpenseStore();
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    currentAmount: 0,
    monthlyOverride: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await addGoal({
      ...newGoal,
      targetAmount: parseFloat(newGoal.targetAmount),
      monthlyOverride: newGoal.monthlyOverride ? parseFloat(newGoal.monthlyOverride) : null
    });
    if (success) {
      setIsModalOpen(false);
      setNewGoal({ name: '', targetAmount: '', currentAmount: 0, monthlyOverride: '' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          Financial Goals
          <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase rounded-full ring-1 ring-indigo-200/50">
            {goals.length} Goals
          </span>
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 primary-gradient text-white px-5 py-2.5 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.03] transition-all"
        >
          <Plus size={18} />
          Create New Goal
        </button>
      </div>

      {/* Grid of Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {goals.map((goal, i) => (
            <motion.div
              layout
              key={goal.id || i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: i * 0.1 }}
            >
              <GoalCard goal={goal} />
            </motion.div>
          ))}
          {goals.length === 0 && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center space-y-4 bg-gray-50/50 rounded-[40px] border-2 border-dashed border-gray-200/60">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-400">
                <Target size={40} className="opacity-20" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-gray-900">No active goals yet</h3>
                <p className="text-sm text-gray-500 max-w-xs">Start your financial journey by setting a savings goal today!</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Goal Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl p-8 overflow-hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                  <Target className="text-primary" />
                  Set New Goal
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-3 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-2xl transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-sm font-bold text-gray-500 mb-2 block uppercase tracking-widest px-1">Goal Name</label>
                  <div className="relative">
                    <input
                      required
                      type="text"
                      placeholder="e.g. Dream Car, Emergency Fund"
                      className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 outline-none ring-2 ring-transparent focus:ring-[#2F3BFF] transition-all font-semibold pr-12"
                      value={newGoal.name}
                      onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                    />
                    <Target className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-full">
                    <label className="text-sm font-bold text-gray-500 mb-2 block uppercase tracking-widest px-1">Target Amount (₹)</label>
                    <div className="relative">
                      <input
                        required
                        type="number"
                        placeholder="0.00"
                        className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 outline-none ring-2 ring-transparent focus:ring-[#2F3BFF] transition-all font-semibold pl-12"
                        value={newGoal.targetAmount}
                        onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                      />
                      <IndianRupee className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-indigo-50/50 rounded-3xl border border-indigo-100 flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-indigo-100 flex items-center justify-center shrink-0">
                    <Info size={18} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-indigo-900 mb-1">Savings Strategy</h4>
                    <p className="text-xs text-indigo-700 leading-relaxed">
                      SpentWise analyzes your income and expenses to estimate your arrival time automatically.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full py-5 primary-gradient text-white rounded-3xl font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transform transition-all active:scale-95 disabled:opacity-50"
                  >
                    {loading ? 'Creating Goal...' : 'Launch Goal'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
