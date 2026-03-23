import { NavLink } from 'react-router-dom';
import { Home, PieChart, ArrowLeftRight, UserRound } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/dashboard', label: 'Home', icon: Home },
  { path: '/analytics', label: 'Analytics', icon: PieChart },
  { path: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { path: '/categories', label: 'Profile', icon: UserRound },
];

export default function BottomNavbar() {
  return (
    <nav className="absolute bottom-0 left-0 right-0 z-50 rounded-t-3xl border-t border-white/50 glass-effect pb-safe px-6 pt-4 pb-6">
      <ul className="flex items-center justify-between relative">
        {navItems.map((item) => (
          <li key={item.path} className="relative z-10 w-16">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                clsx(
                  'flex flex-col items-center justify-center gap-1 transition-colors duration-300',
                  isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div className="relative p-2">
                    {isActive && (
                      <motion.div
                        layoutId="active-nav"
                        className="absolute inset-0 rounded-full bg-blue-100"
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      />
                    )}
                    <item.icon
                      size={24}
                      className={clsx('relative z-10', isActive ? 'text-blue-500' : 'text-gray-400')}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                  </div>
                  <span
                    className={clsx(
                      'text-[10px] font-medium transition-all duration-300',
                      isActive ? 'text-blue-600 opacity-100' : 'opacity-0 scale-75 h-0 overflow-hidden'
                    )}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
