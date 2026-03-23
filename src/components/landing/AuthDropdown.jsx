import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, LogOut, LayoutDashboard } from 'lucide-react';

export default function AuthDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2F3BFF] text-white font-bold shadow-md hover:scale-105 transition-transform"
      >
        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 rounded-xl bg-white p-2 shadow-xl shadow-black/5 ring-1 ring-black/5"
            style={{ zIndex: 50 }}
          >
            <div className="px-3 py-2 border-b border-gray-100 mb-2">
              <p className="text-sm font-semibold text-gray-800 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
            <button onClick={() => handleNavigate('/dashboard')} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <LayoutDashboard size={16} /> Dashboard
            </button>
            <button onClick={() => handleNavigate('/settings')} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <Settings size={16} /> Settings
            </button>
            <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors mt-1">
              <LogOut size={16} /> Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
