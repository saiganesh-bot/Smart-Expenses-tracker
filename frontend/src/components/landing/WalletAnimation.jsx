import { motion } from 'framer-motion';

export default function WalletAnimation() {
  return (
    <motion.div 
      className="relative flex h-[480px] w-full max-w-[500px] items-end justify-center perspective-[1200px] group mx-auto mt-16 lg:mt-24"
      whileHover="hover"
      initial="initial"
    >
      {/* Back Card */}
      <motion.div
        variants={{
          initial: { y: 20, rotate: 0, scale: 0.9, opacity: 0 },
          hover: { y: -200, x: -40, rotate: -12, scale: 0.95, opacity: 1 }
        }}
        transition={{ type: 'spring', stiffness: 180, damping: 22, ease: 'easeOut' }}
        className="absolute bottom-16 h-64 w-80 rounded-[20px] bg-gradient-to-br from-indigo-800 to-purple-900 p-6 text-white shadow-2xl shadow-indigo-900/30 border border-white/10"
        style={{ zIndex: 1 }}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="w-12 h-8 bg-white/20 rounded-md"></div>
          <div className="flex justify-between items-end mt-4">
            <span className="text-sm font-mono tracking-widest text-indigo-200">**** **** **** 1032</span>
          </div>
        </div>
      </motion.div>

      {/* Middle Card */}
      <motion.div
        variants={{
          initial: { y: 20, rotate: 0, scale: 0.9, opacity: 0 },
          hover: { y: -230, x: 0, rotate: -4, scale: 1, opacity: 1 }
        }}
        transition={{ type: 'spring', stiffness: 180, damping: 22, ease: 'easeOut' }}
        className="absolute bottom-16 h-64 w-80 rounded-[20px] bg-gradient-to-br from-gray-800 to-black p-6 text-white shadow-2xl shadow-black/30 border border-white/15"
        style={{ zIndex: 2 }}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="w-12 h-8 bg-white/20 rounded-md"></div>
          <div className="flex justify-between items-end mt-4">
            <span className="text-sm font-mono tracking-widest text-gray-300">**** **** **** 4281</span>
            <div className="flex items-center relative">
              <div className="w-8 h-8 rounded-full bg-red-500/80 mix-blend-screen"></div>
              <div className="w-8 h-8 rounded-full bg-orange-400/80 -ml-4 mix-blend-screen"></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Front Card */}
      <motion.div
        variants={{
          initial: { y: 20, rotate: 0, scale: 0.9, opacity: 0 },
          hover: { y: -260, x: 40, rotate: 8, scale: 1.05, opacity: 1 }
        }}
        transition={{ type: 'spring', stiffness: 180, damping: 22, ease: 'easeOut' }}
        className="absolute bottom-16 h-64 w-80 rounded-[20px] bg-gradient-to-br from-[#2F3BFF] to-[#1e26b3] p-6 text-white shadow-2xl shadow-[#2F3BFF]/40 border border-white/20"
        style={{ zIndex: 3 }}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="w-12 h-8 bg-white/30 rounded-md"></div>
          <div className="flex justify-between items-end mt-4">
            <span className="text-sm font-mono tracking-widest text-blue-100">**** **** **** 9012</span>
            <span className="font-bold italic text-lg">VISA</span>
          </div>
        </div>
      </motion.div>

      {/* Wallet Body (STATIC) */}
      <div 
        className="relative z-10 h-64 w-[420px] rounded-[32px] bg-gradient-to-br from-[#2F3BFF] to-[#1a2bce] p-8 shadow-2xl shadow-[#2F3BFF]/30 border border-white/10"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-3 rounded-full bg-black/15 shadow-inner"></div>
        {/* Shadow under wallet for depth */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-80 h-8 bg-black/15 blur-2xl rounded-full"></div>
      </div>
    </motion.div>
  );
}
