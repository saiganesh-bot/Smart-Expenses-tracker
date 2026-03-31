import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import WalletAnimation from '../components/landing/WalletAnimation';
import AboutSection from '../components/landing/AboutSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import WhySection from '../components/landing/WhySection';
import { motion } from 'framer-motion';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] selection:bg-[#2F3BFF] selection:text-white font-sans overflow-x-hidden">
      <Navbar />
      
      <main className="pt-16">
        <HeroSection />
        
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="pb-32 pt-16 mt-20 md:mt-32 w-full flex justify-center"
        >
          <WalletAnimation />
        </motion.section>

        <AboutSection />
        <FeaturesSection />
        <WhySection />
      </main>

      <footer className="py-12 border-t border-gray-200 text-center text-gray-500">
        <p className="text-sm">© 2026 SpentWise. All rights reserved.</p>
      </footer>
    </div>
  );
}
