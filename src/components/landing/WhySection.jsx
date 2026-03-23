import { motion } from 'framer-motion';
import { Sparkles, PieChart, ShieldCheck, Layers } from 'lucide-react';

const reasons = [
  {
    icon: Sparkles,
    title: 'Simple & Intuitive',
    description: 'Easily track your expenses without complexity.',
  },
  {
    icon: PieChart,
    title: 'Smart Insights',
    description: 'Get meaningful insights into your spending habits.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure & Reliable',
    description: 'Your financial data is protected and private.',
  },
  {
    icon: Layers,
    title: 'All-in-One Platform',
    description: 'Manage expenses, goals, and analytics in one place.',
  },
];

export default function WhySection() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose SpentWise?</h2>
        <p className="text-lg text-gray-500">Built to give you peace of mind and complete visibility over your finances.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center text-center p-6 bg-white rounded-3xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#f5f5f5] text-[#2F3BFF] mb-6">
              <reason.icon size={26} strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
            <p className="text-gray-600 leading-relaxed">{reason.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
