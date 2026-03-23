import { NavLink, useNavigate } from 'react-router-dom';
import { Home, PieChart, ArrowLeftRight, UserRound, LogOut, Wallet } from 'lucide-react';
import { useAuthStore } from '../../store/useStore';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: Home },
  { path: '/analytics', label: 'Analytics', icon: PieChart },
  { path: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { path: '/categories', label: 'Categories', icon: UserRound },
];

export default function Sidebar() {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="hidden w-64 flex-col border-r border-gray-100 bg-white p-6 shadow-sm md:flex lg:w-72">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-white shadow-md">
          <Wallet size={20} />
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-800">Smart Tracker</h1>
        </div>
      </div>

      <nav className="flex-1">
        <ul className="flex flex-col gap-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  clsx(
                    'group relative flex items-center gap-4 rounded-xl px-4 py-3 font-medium transition-colors',
                    isActive ? 'text-blue-600' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="active-sidebar"
                        className="absolute inset-0 rounded-xl bg-blue-50"
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      />
                    )}
                    <item.icon size={20} className={clsx('relative z-10', isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-600')} />
                    <span className="relative z-10">{item.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto flex flex-col gap-4 border-t border-gray-100 pt-6">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-800 line-clamp-1">{user?.name}</span>
            <span className="text-xs text-gray-400 line-clamp-1">{user?.email}</span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-red-500 transition-colors hover:bg-red-50"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
