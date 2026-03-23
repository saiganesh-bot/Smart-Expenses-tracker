import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useStore';

export default function HeroSection() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const handleAddExpenses = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const handleTrackExpenses = () => {
    if (isAuthenticated) {
      navigate('/analytics');
    } else {
      navigate('/login');
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 pt-32 pb-16 overflow-hidden">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl z-10"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold text-[#111827] tracking-tight leading-tight mb-6">
          Take Control of <br className="hidden md:block"/>
          <span className="text-[#2F3BFF]">Your Expenses</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          Track spending, set budgets, and reach your savings goals — all in one beautifully simple app.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddExpenses}
            className="w-full sm:w-auto px-8 py-4 rounded-[12px] bg-[#2F3BFF] text-white font-bold text-lg shadow-lg shadow-[#2F3BFF]/25 hover:bg-[#252fe0] transition-colors"
          >
            Add Expenses
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleTrackExpenses}
            className="w-full sm:w-auto px-8 py-4 rounded-[12px] bg-transparent border-2 border-gray-200 text-gray-700 font-bold text-lg hover:border-gray-300 hover:bg-white transition-colors"
          >
            Track Expenses
          </motion.button>
        </div>
      </motion.div>

      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2F3BFF]/5 rounded-full blur-3xl -z-10"></div>
    </section>
  );
}
