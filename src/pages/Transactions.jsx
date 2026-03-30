import React from 'react';
import Navigation from '../components/layout/Navigation';
import ExpenseList from '../components/landing/ExpenseList';

export default function Transactions() {
  return (
    <Navigation>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-black text-gray-900 mb-6">Transactions History</h1>
        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 min-h-[600px]">
          <ExpenseList />
        </div>
      </div>
    </Navigation>
  );
}
