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
    navigate('/');
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
            className="absolute right-0 mt-3 w-56 rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-black/5 overflow-hidden"
            style={{ zIndex: 50 }}
          >
            <div className="px-4 py-3 border-b border-gray-100 mb-2">
              <p className="text-sm font-bold text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
            
            <button 
              onClick={() => handleNavigate('/dashboard')} 
              className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all group"
            >
              <LayoutDashboard size={18} className="text-gray-400 group-hover:text-indigo-500 transition-colors" />
              <span>Dashboard</span>
            </button>
            
            <button 
              onClick={() => handleNavigate('/settings')} 
              className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all group"
            >
              <Settings size={18} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
              <span>Settings</span>
            </button>
            
            <div className="h-px bg-gray-100 my-2 mx-2"></div>
            
            <button 
              onClick={handleLogout} 
              className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-all group"
            >
              <LogOut size={18} className="text-red-400 group-hover:text-red-500 transition-colors" />
              <span>Logout</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
