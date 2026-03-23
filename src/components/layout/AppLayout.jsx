import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import BottomNavbar from './BottomNavbar';
import TopNavbar from './TopNavbar';
import Sidebar from './Sidebar';
import AddExpenseModal from '../ui/AddExpenseModal';
import { useExpenseStore } from '../../store/useStore';

export default function AppLayout() {
  const location = useLocation();
  const { fetchExpenses } = useExpenseStore();

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return (
    <div className="mx-auto flex h-dvh w-full overflow-hidden bg-[var(--color-background)] md:max-w-none md:flex-row">
      <Sidebar />
      
      <div className="relative flex flex-1 flex-col overflow-hidden shadow-2xl md:shadow-none">
        <div className="md:hidden"><TopNavbar /></div>
        
        {/* Main scrollable content area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden hide-scrollbar pb-24 md:pb-6 relative md:px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="min-h-full max-w-4xl mx-auto"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        <div className="md:hidden"><BottomNavbar /></div>
      </div>
      
      <AddExpenseModal />
    </div>
  );
}
