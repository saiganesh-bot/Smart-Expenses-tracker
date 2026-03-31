import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';

const COLORS = ['#142BFF', '#22C55E', '#EF4444', '#F59E0B', '#8B5CF6'];

export default function AnalyticsSection({ expenses }) {
  // Aggregate data for Pie Chart
  const categoryData = expenses.reduce((acc, curr) => {
    const found = acc.find(item => item.name === curr.category);
    if (found) {
      found.value += parseFloat(curr.amount);
    } else {
      acc.push({ name: curr.category, value: parseFloat(curr.amount) });
    }
    return acc;
  }, []);

  // Mock data for Bar Chart (Monthly Comparison)
  const monthlyData = [
    { name: 'Jan', income: 4000, expense: 2400 },
    { name: 'Feb', income: 3000, expense: 1398 },
    { name: 'Mar', income: 2000, expense: 9800 },
    { name: 'Apr', income: 2780, expense: 3908 },
    { name: 'May', income: 1890, expense: 4800 },
    { name: 'Jun', income: 2390, expense: 3800 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Donut Chart (Budget Distribution) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex flex-col h-[400px]"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-2">Budget Distribution</h3>
        <p className="text-sm text-gray-500 mb-6 font-medium uppercase tracking-wider">Top Spending Categories</p>
        <div className="flex-1 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Bar Chart (Monthly Performance) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex flex-col h-[400px]"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-2">Monthly Comparison</h3>
        <p className="text-sm text-gray-500 mb-6 font-medium uppercase tracking-wider">Income vs Expenses</p>
        <div className="flex-1 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
              <Tooltip cursor={{ fill: '#F9FAFB' }} />
              <Legend verticalAlign="bottom" height={36} />
              <Bar dataKey="income" fill="#142BFF" radius={[4, 4, 0, 0]} barSize={20} />
              <Bar dataKey="expense" fill="#EF4444" radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
