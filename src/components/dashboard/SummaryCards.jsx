import React from 'react';
import { Wallet, ArrowUpRight, ArrowDownRight, PiggyBank } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/formatters';

const Card = ({ title, amount, icon: Icon, trend, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 flex flex-col gap-4 relative overflow-hidden group hover:shadow-md transition-shadow"
  >
    <div className={`w-12 h-12 rounded-2xl ${color} text-white flex items-center justify-center shadow-lg shadow-primary/10 group-hover:scale-110 transition-transform`}>
      <Icon size={24} />
    </div>
    
    <div>
      <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">{title}</p>
      <h3 className="text-2xl font-black text-gray-900 mt-1">{amount}</h3>
    </div>

    {trend && (
      <div className={`flex items-center gap-1 text-xs font-bold ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
        {trend > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        <span>{Math.abs(trend)}% from last month</span>
      </div>
    )}

    {/* Subtle Background Pattern */}
    <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity rotate-12">
      <Icon size={120} />
    </div>
  </motion.div>
);

export default function SummaryCards({ expenses }) {
  const totalExpenses = expenses
    .filter(e => e.type === 'EXPENSE')
    .reduce((sum, e) => sum + parseFloat(e.amount), 0);
    
  const totalIncome = expenses
    .filter(e => e.type === 'INCOME')
    .reduce((sum, e) => sum + parseFloat(e.amount), 0);

  const totalBalance = totalIncome - totalExpenses;
  const savings = totalIncome > 0 ? (totalBalance / totalIncome) * 100 : 0;

  const stats = [
    { title: 'Total Balance', amount: totalBalance, icon: Wallet, color: 'primary-gradient', trend: 12, delay: 0.1 },
    { title: 'Income', amount: totalIncome, icon: ArrowUpRight, color: 'bg-emerald-500', trend: 8, delay: 0.2 },
    { title: 'Expenses', amount: totalExpenses, icon: ArrowDownRight, color: 'bg-rose-500', trend: -5, delay: 0.3 },
    { title: 'Savings Rate', amount: savings, icon: PiggyBank, color: 'bg-indigo-500', trend: 15, delay: 0.4, isPercentage: true },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
      {stats.map((stat, i) => (
        <Card 
          key={stat.title} 
          {...stat} 
          amount={stat.isPercentage ? `${stat.amount.toFixed(1)}%` : formatCurrency(stat.amount)} 
        />
      ))}
    </div>
  );
}
