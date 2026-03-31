import React from 'react';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

export default function Navigation({ children }) {
  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Sidebar for Desktop */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="md:pl-64 min-h-screen transition-all duration-300">
        <div className="p-4 md:p-8 pb-24 md:pb-8">
          {children}
        </div>
      </main>

      {/* Bottom Nav for Mobile */}
      <BottomNav />
    </div>
  );
}
