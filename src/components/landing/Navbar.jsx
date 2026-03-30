import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useStore';
import AuthDropdown from './AuthDropdown';
import Logo from '../common/Logo';

export default function Navbar() {
  const { isAuthenticated } = useAuthStore();

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#f5f5f5]/80 backdrop-blur-md border-b border-gray-200/50">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Logo />
        
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <AuthDropdown />
          ) : (
            <Link 
              to="/login"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-[#2F3BFF] hover:bg-[#252fe0] rounded-lg transition-colors shadow-md shadow-[#2F3BFF]/20"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
