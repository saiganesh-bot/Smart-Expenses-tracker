import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet } from 'lucide-react';

const Logo = ({ className = "" }) => {
  return (
    <Link to="/" className={`flex items-center gap-3 group hover:opacity-90 transition-all duration-300 ${className}`}>
      <div className="w-10 h-10 primary-gradient rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 transition-transform duration-500 group-hover:rotate-[360deg]">
        <Wallet size={24} />
      </div>
      <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-[length:200%_auto] animate-gradient tracking-tight">
        SpentWise
      </span>
    </Link>
  );
};

export default Logo;
