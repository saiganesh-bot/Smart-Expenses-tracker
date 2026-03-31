import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

export default function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-white border-y border-gray-100">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Core Features</h2>
          <p className="text-lg text-gray-500">Powerful tools designed to put you in complete control of your wealth.</p>
        </motion.div>



          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="group rounded-3xl bg-[#f5f5f5] p-8 shadow-sm border border-gray-200 transition-all hover:shadow-xl hover:shadow-[#2F3BFF]/10 text-left"
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#2F3BFF]/10 text-[#2F3BFF] mb-6 group-hover:scale-110 transition-transform">
              <Bot size={28} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Expense Agent</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              An intelligent AI agent that analyzes your spending patterns and helps you track, manage, and optimize your expenses automatically.
            </p>
          </motion.div>
      </div>
    </section>
  );
}
