import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section className="py-20 px-6 max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About SpentWise</h2>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          SpentWise is a smart expense tracking platform designed to simplify how you manage money. Whether you're budgeting daily expenses or planning long-term goals, SpentWise helps you stay in control with clarity and ease.
        </p>
      </motion.div>
    </section>
  );
}
