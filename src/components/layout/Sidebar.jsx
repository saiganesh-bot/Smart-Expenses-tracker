import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, BarChart3, User, LogOut } from 'lucide-react';
import Logo from '../common/Logo';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/useStore';

const SidebarItem = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group ${
        isActive
          ? 'bg-primary/10 text-primary font-semibold'
          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
      }`
    }
  >
    <Icon size={22} className="transition-transform duration-300 group-hover:scale-110" />
    <span>{label}</span>
  </NavLink>
);

export default function Sidebar() {
  const { logout, user } = useAuthStore();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-100 flex flex-col p-6 z-40 hidden md:flex">
        <Logo className="mb-4" />

      <nav className="flex-1 space-y-2">
        <SidebarItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
        <SidebarItem to="/transactions" icon={Receipt} label="Transactions" />
        <SidebarItem to="/analytics" icon={BarChart3} label="Analytics" />
        <SidebarItem to="/profile" icon={User} label="Profile" />
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-50">
        <div className="flex items-center gap-3 px-2 mb-6">
          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-primary font-bold">
            {user?.name?.[0] || 'U'}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-semibold text-gray-900 truncate">{user?.name || 'User'}</span>
            <span className="text-xs text-gray-500 truncate">{user?.email || 'user@example.com'}</span>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl w-full text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
        >
          <LogOut size={22} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
