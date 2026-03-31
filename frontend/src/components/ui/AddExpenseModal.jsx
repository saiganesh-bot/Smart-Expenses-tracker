import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign, Tag, AlignLeft, Calendar } from 'lucide-react';
import { useExpenseStore } from '../../store/useStore';

export default function AddExpenseModal() {
  const { isExpenseModalOpen, closeExpenseModal, addExpense, loading } = useExpenseStore();
  
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food & Dining');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await addExpense({
      title,
      amount: parseFloat(amount),
      category,
      date
    });
    
    if (success) {
      setTitle('');
      setAmount('');
      closeExpenseModal();
    }
  };

  const categories = [
    'Food & Dining', 'Transportation', 'Shopping', 'Housing',
    'Utilities', 'Entertainment', 'Health & Fitness', 'Salary', 'Freelance'
  ];

  return (
    <AnimatePresence>
      {isExpenseModalOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeExpenseModal}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-[70] flex flex-col gap-6 rounded-t-[32px] bg-white p-6 pb-safe shadow-2xl max-w-md mx-auto"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">New Transaction</h2>
              <button 
                onClick={closeExpenseModal}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="number" step="0.01" placeholder="Amount (e.g. 50.00)" 
                  className="w-full rounded-[16px] border-none bg-gray-50 py-4 pl-12 pr-4 shadow-sm outline-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-500 font-bold text-lg"
                  value={amount} onChange={(e) => setAmount(e.target.value)} required 
                />
              </div>

              <div className="relative">
                <AlignLeft className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" placeholder="Title (e.g. Starbucks)" 
                  className="w-full rounded-[16px] border-none bg-gray-50 py-4 pl-12 pr-4 shadow-sm outline-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-500"
                  value={title} onChange={(e) => setTitle(e.target.value)} required 
                />
              </div>

              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <select 
                    className="w-full appearance-none rounded-[16px] border-none bg-gray-50 py-4 pl-12 pr-4 shadow-sm outline-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-500"
                    value={category} onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="relative flex-1">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="date"
                    className="w-full rounded-[16px] border-none bg-gray-50 py-4 pl-12 pr-4 shadow-sm outline-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-500"
                    value={date} onChange={(e) => setDate(e.target.value)} required 
                  />
                </div>
              </div>

              <button 
                disabled={loading}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-[16px] primary-gradient py-4 font-bold text-white shadow-lg shadow-blue-500/30 transition-transform active:scale-95 disabled:opacity-70"
              >
                {loading ? 'Saving...' : 'Save Transaction'}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
