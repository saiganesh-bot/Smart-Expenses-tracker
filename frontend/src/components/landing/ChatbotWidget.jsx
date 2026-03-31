import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Minimize2 } from 'lucide-react';
import { useExpenseStore } from '../../store/useStore';
import { formatCurrency } from '../../utils/formatters';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { expenses } = useExpenseStore();
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hi! I am your AI Expense Assistant. How can I help you manage your money today?' }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (query) => {
    const q = query.toLowerCase();
    const total = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
    
    if (q.includes('total') || q.includes('how much') || q.includes('spent')) {
      if (expenses.length === 0) return "You haven't added any expenses yet! Start by clicking the 'Add Expenses' button.";
      return `So far, you've spent a total of ${formatCurrency(total, { showDecimal: true })}. This covers ${expenses.length} transaction(s).`;
    }
    
    if (q.includes('category') || q.includes('where')) {
      if (expenses.length === 0) return "Add some expenses first so I can analyze your spending by category!";
      const catMap = expenses.reduce((map, e) => {
        map[e.category] = (map[e.category] || 0) + parseFloat(e.amount);
        return map;
      }, {});
      const topCat = Object.entries(catMap).sort((a,b) => b[1] - a[1])[0];
      return `Your highest spending is in the ${topCat[0]} category (${formatCurrency(topCat[1], { showDecimal: true })}).`;
    }

    if (q.includes('save') || q.includes('suggest') || q.includes('tip')) {
      return "To save money, try setting a daily limit for 'Entertainment' or 'Food'. I noticed that consistent tracking helps users reduce impulse spends by 15%!";
    }

    return "That's interesting! I can help you track totals, identify expensive categories, or give you saving tips. Ask me 'How much did I spend?'";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Mock AI delay
    setTimeout(() => {
      const aiResponse = { role: 'ai', content: generateAIResponse(userMessage.content) };
      setMessages(prev => [...prev, aiResponse]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-full max-w-[360px] sm:w-[400px] h-[500px] bg-white rounded-[24px] shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 bg-[#2F3BFF] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={22} />
                </div>
                <div>
                  <h3 className="font-bold">SpentWise AI</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                    <span className="text-[10px] font-medium text-blue-100 uppercase">Always Active</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-blue-100 hover:text-white transition-colors">
                <Minimize2 size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-[#2F3BFF] text-white rounded-tr-none' 
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 border-t border-gray-100 bg-gray-50/50 flex gap-2">
              <input 
                type="text" 
                placeholder="Ask anything..."
                className="flex-1 bg-white rounded-xl px-4 py-2.5 text-sm outline-none ring-1 ring-gray-200 focus:ring-2 focus:ring-[#2F3BFF]"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button 
                className="w-10 h-10 bg-[#2F3BFF] text-white rounded-xl flex items-center justify-center hover:bg-[#252fe0] transition-colors shadow-md shadow-[#2F3BFF]/20"
                type="submit"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-[#2F3BFF] text-white shadow-xl shadow-[#2F3BFF]/30 flex items-center justify-center transition-transform hover:rotate-6 active:rotate-0"
      >
        <MessageSquare size={28} />
      </motion.button>
    </div>
  );
}
