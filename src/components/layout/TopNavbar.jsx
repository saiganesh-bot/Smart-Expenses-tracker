import { Search, AlignLeft } from 'lucide-react';

export default function TopNavbar() {
  return (
    <header className="relative z-50 flex items-center justify-between px-6 py-5">
      <div className="flex items-center gap-3">
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/50 text-gray-700 shadow-sm backdrop-blur-md transition-transform hover:scale-105 active:scale-95">
          <AlignLeft size={20} />
        </button>
      </div>
      
      <div className="flex flex-col items-center">
        <span className="text-xs font-medium text-gray-400">Main Account</span>
        <h1 className="text-lg font-bold text-gray-800">Smart Wallet</h1>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/50 text-gray-700 shadow-sm backdrop-blur-md transition-transform hover:scale-105 active:scale-95">
          <Search size={20} />
        </button>
      </div>
    </header>
  );
}
