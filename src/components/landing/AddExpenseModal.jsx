import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, IndianRupee, Tag, Calendar, Plus } from 'lucide-react';
import { useExpenseStore } from '../../store/useStore';

export default function AddExpenseModal() {
  const { isExpenseModalOpen, closeExpenseModal, addExpense, loading } = useExpenseStore();
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food',
    type: 'EXPENSE',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await addExpense({
      ...formData,
      amount: parseFloat(formData.amount)
    });
    if (success) {
      setFormData({
        title: '',
        amount: '',
        category: 'Food',
        type: 'EXPENSE',
        date: new Date().toISOString().split('T')[0]
      });
      closeExpenseModal();
    }
  };

  const categories = ['Food', 'Transportation', 'Housing', 'Entertainment', 'Health', 'Shopping', 'Other'];

  return (
    <AnimatePresence>
      {isExpenseModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeExpenseModal}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg overflow-hidden rounded-[28px] bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900">
                {formData.type === 'INCOME' ? 'Add Income' : 'Add Expense'}
              </h2>
              <button 
                onClick={closeExpenseModal}
                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Type Toggle */}
              <div className="flex p-1 bg-gray-100 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'EXPENSE' })}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${
                    formData.type === 'EXPENSE' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Expense
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'INCOME' })}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${
                    formData.type === 'INCOME' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Income
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">Title</label>
                <div className="relative">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    required
                    placeholder={formData.type === 'INCOME' ? "Where did this income come from?" : "What did you spend on?"}
                    className="w-full rounded-2xl bg-gray-50 border-none py-3.5 pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#2F3BFF]"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Amount (₹)</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="number"
                      required
                      step="0.01"
                      placeholder="0.00"
                      className="w-full rounded-2xl bg-gray-50 border-none py-3.5 pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#2F3BFF]"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="date"
                      required
                      className="w-full rounded-2xl bg-gray-50 border-none py-3.5 pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#2F3BFF]"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">Category</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat })}
                      className={`py-2 rounded-xl text-xs font-medium border-2 transition-all ${
                        formData.category === cat
                          ? 'bg-[#2F3BFF]/10 border-[#2F3BFF] text-[#2F3BFF]'
                          : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <button
                disabled={loading}
                className={`w-full mt-4 text-white rounded-2xl py-4 font-bold text-lg shadow-lg transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2 ${
                  formData.type === 'INCOME' 
                    ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30' 
                    : 'bg-[#2F3BFF] hover:bg-[#252fe0] shadow-[#2F3BFF]/30'
                }`}
              >
                {loading ? 'Adding...' : (
                  <>
                    <Plus size={20} />
                    {formData.type === 'INCOME' ? 'Add Income' : 'Add Expense'}
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
