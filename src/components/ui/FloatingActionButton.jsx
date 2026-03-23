import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useExpenseStore } from '../../store/useStore';

export default function FloatingActionButton() {
  const { openExpenseModal } = useExpenseStore();

  return (
    <motion.button
      onClick={openExpenseModal}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="absolute bottom-24 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full primary-gradient text-white shadow-lg shadow-blue-500/40"
    >
      <Plus size={28} strokeWidth={2.5} />
      {/* Pulse effect */}
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-blue-400 opacity-20"></span>
    </motion.button>
  );
}
