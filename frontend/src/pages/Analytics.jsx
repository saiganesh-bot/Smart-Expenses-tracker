import React from 'react';
import Navigation from '../components/layout/Navigation';
import AnalyticsSection from '../components/dashboard/AnalyticsSection';
import BudgetProgress from '../components/dashboard/BudgetProgress';
import { useExpenseStore } from '../store/useStore';

export default function Analytics() {
  const { expenses } = useExpenseStore();

  return (
    <Navigation>
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-2xl font-black text-gray-900 mb-6">Financial Analytics</h1>
        <AnalyticsSection expenses={expenses} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <BudgetProgress expenses={expenses} />
           <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
             <h3 className="text-lg font-bold text-gray-900 mb-4">AI Prediction</h3>
             <p className="text-gray-500 leading-relaxed">
               Based on your current spending, you are likely to exceed your 'Shopping' budget by 10% this month.
               We recommend reducing discretionary spending for the next 7 days.
             </p>
           </div>
        </div>
      </div>
    </Navigation>
  );
}
