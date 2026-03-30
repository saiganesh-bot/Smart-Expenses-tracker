import React from 'react';
import Navigation from '../components/layout/Navigation';
import { motion } from 'framer-motion';
import { User, Shield, Bell, Eye, Globe, ChevronRight, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/useStore';

const SettingItem = ({ icon: Icon, label, value, danger }) => (
  <div className={`flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-100 group cursor-pointer hover:shadow-sm transition-all ${danger ? 'hover:bg-red-50' : 'hover:bg-gray-50'}`}>
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${danger ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-500 group-hover:text-primary'}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-sm font-bold text-gray-900">{label}</p>
        <p className="text-xs text-gray-400 font-medium">{value}</p>
      </div>
    </div>
    <ChevronRight size={18} className={danger ? 'text-red-300' : 'text-gray-300'} />
  </div>
);

export default function Profile() {
  const { user, logout } = useAuthStore();

  return (
    <Navigation>
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 flex flex-col items-center text-center relative overflow-hidden"
        >
          <div className="w-24 h-24 rounded-full primary-gradient p-1 mb-4">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-primary text-3xl font-black">
              {user?.name?.[0] || 'U'}
            </div>
          </div>
          <h2 className="text-2xl font-black text-gray-900">{user?.name || 'User Name'}</h2>
          <p className="text-gray-500 font-medium mb-6">{user?.email || 'user@example.com'}</p>
          
          <div className="w-full primary-gradient p-6 rounded-3xl text-white text-left relative overflow-hidden">
            <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-1">Current Plan</p>
            <h3 className="text-lg font-bold mb-4">Silver Member</h3>
            <button className="px-6 py-2 bg-white text-primary text-sm font-black rounded-xl shadow-lg hover:scale-105 transition-transform">
              Upgrade to Pro
            </button>
            <Shield size={100} className="absolute -right-8 -bottom-8 opacity-10 rotate-12" />
          </div>
        </motion.div>

        {/* Settings Group */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest px-4">Account Settings</h3>
          <SettingItem icon={User} label="Edit Profile" value="Change your personal info" />
          <SettingItem icon={Shield} label="Security" value="Password and 2FA" />
          <SettingItem icon={Bell} label="Notifications" value="Push, Email, SMS" />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest px-4">Appearance</h3>
          <SettingItem icon={Eye} label="Display" value="Dark mode, Themes" />
          <SettingItem icon={Globe} label="Currency" value="INR (₹)" />
        </div>

        <button 
          onClick={logout}
          className="w-full p-6 text-red-500 font-black flex items-center justify-center gap-3 bg-red-50 border border-red-100 rounded-[28px] hover:bg-red-100 transition-colors"
        >
          <LogOut size={20} />
          Logout Account
        </button>
      </div>
    </Navigation>
  );
}
