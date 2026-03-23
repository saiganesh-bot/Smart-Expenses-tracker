import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useStore';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Wallet } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) navigate('/dashboard');
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center p-6 pb-24">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex w-full max-w-sm flex-col gap-8">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-[20px] primary-gradient text-white shadow-xl">
            <Wallet size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-sm text-gray-500">Log in to manage your smart expenses</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full rounded-[16px] border-none bg-white py-4 pl-12 pr-4 shadow-sm outline-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-500"
              value={email} onChange={(e) => setEmail(e.target.value)} required 
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full rounded-[16px] border-none bg-white py-4 pl-12 pr-4 shadow-sm outline-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-500"
              value={password} onChange={(e) => setPassword(e.target.value)} required 
            />
          </div>

          <button 
            disabled={loading}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-[16px] primary-gradient py-4 font-bold text-white shadow-lg shadow-blue-500/30 transition-transform active:scale-95 disabled:opacity-70"
          >
            {loading ? 'Logging in...' : 'Log In'}
            {!loading && <ArrowRight size={20} />}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
