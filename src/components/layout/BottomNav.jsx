import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Receipt, Plus, BarChart3, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useExpenseStore } from '../../store/useStore';

const NavItem = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex flex-col items-center gap-1 transition-all duration-300 ${
        isActive ? 'text-primary' : 'text-gray-400'
      }`
    }
  >
    <Icon size={24} />
    <span className="text-[10px] font-medium uppercase tracking-wider">{label}</span>
  </NavLink>
);

export default function BottomNav() {
  const { openExpenseModal } = useExpenseStore();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 px-6 py-3 flex items-center justify-between z-50 md:hidden">
      <NavItem to="/dashboard" icon={Home} label="Home" />
      <NavItem to="/transactions" icon={Receipt} label="Transactions" />
      
      <div className="relative -mt-12 group">
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          onClick={openExpenseModal}
          className="w-14 h-14 primary-gradient rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/40 relative z-10"
        >
          <Plus size={32} />
        </motion.button>
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 -z-0 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <NavItem to="/analytics" icon={BarChart3} label="Analytics" />
      <NavItem to="/profile" icon={User} label="Profile" />
    </nav>
  );
}
