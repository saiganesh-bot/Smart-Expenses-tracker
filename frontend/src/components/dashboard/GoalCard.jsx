import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, AlertCircle, Clock, Trash2, Edit2 } from 'lucide-react';
import { useExpenseStore } from '../../store/useStore';
import { formatCurrency } from '../../utils/formatters';

export default function GoalCard({ goal }) {
  const { expenses, deleteGoal } = useExpenseStore();

  // Calculation Logic (Last 30 Days)
  const last30Days = new Date();
  last30Days.setDate(last30Days.getDate() - 30);

  const recentTransactions = expenses.filter(e => new Date(e.date) >= last30Days);
  
  const totalIncome = recentTransactions
    .filter(e => e.type === 'INCOME')
    .reduce((sum, e) => sum + parseFloat(e.amount), 0);
    
  const totalExpenses = recentTransactions
    .filter(e => e.type === 'EXPENSE')
    .reduce((sum, e) => sum + parseFloat(e.amount), 0);

  const monthlySavings = totalIncome - totalExpenses;
  const monthlyContribution = goal.monthlyOverride || monthlySavings;

  const remainingAmount = Math.max(goal.targetAmount - goal.currentAmount, 0);
  const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);

  let timePrediction = "";
  let isUnreachable = false;

  if (remainingAmount <= 0) {
    timePrediction = "Goal Achieved! 🎉";
  } else if (monthlyContribution <= 0) {
    isUnreachable = true;
    timePrediction = "Goal cannot be reached with current spending";
  } else {
    const months = remainingAmount / monthlyContribution;
    if (months < 1) {
      const days = Math.ceil(months * 30);
      timePrediction = `${days} day${days > 1 ? 's' : ''} remaining`;
    } else {
      timePrediction = `${months.toFixed(1)} month${months > 1 ? 's' : ''} remaining`;
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
    >
      {/* Background Icon Watermark */}
      <Target className="absolute -right-4 -bottom-4 text-gray-50 opacity-[0.03] group-hover:scale-110 transition-transform duration-700" size={120} />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <Target size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{goal.name}</h3>
              <p className="text-xs text-gray-400 font-medium">Target: {formatCurrency(goal.targetAmount)}</p>
            </div>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
              <Edit2 size={16} />
            </button>
            <button 
              onClick={() => deleteGoal(goal.id)}
              className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Progress Section */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-end">
            <span className="text-2xl font-black text-gray-900">{formatCurrency(goal.currentAmount)}</span>
            <span className="text-sm font-bold text-primary">{progress.toFixed(0)}%</span>
          </div>
          <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full primary-gradient rounded-full"
            />
          </div>
        </div>

        {/* Insights Section */}
        <div className={`p-4 rounded-2xl flex items-center gap-3 ${
          isUnreachable ? 'bg-red-50 border border-red-100' : 'bg-indigo-50/50 border border-indigo-100/50'
        }`}>
          {isUnreachable ? (
            <AlertCircle size={18} className="text-red-500 shrink-0" />
          ) : (
            <Clock size={18} className="text-primary shrink-0" />
          )}
          <span className={`text-xs font-bold leading-tight ${isUnreachable ? 'text-red-600' : 'text-gray-700'}`}>
            {timePrediction}
          </span>
        </div>

        {/* Contribution Insight */}
        {!isUnreachable && remainingAmount > 0 && (
          <div className="mt-4 flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            <TrendingUp size={12} className="text-green-500" />
            <span>Based on {formatCurrency(monthlyContribution)} monthly savings</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
