import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Settings,
  DollarSign,
  BarChart3,
  BookOpen,
  Info,
  Home,
  Clock
} from 'lucide-react';
import AuthModal from './AuthModal';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Binary Options', href: '/binary-options', icon: BarChart3 },
    { name: 'Markets', href: '/markets', icon: DollarSign },
    { name: 'Education', href: '/education', icon: BookOpen },
    { name: 'About', href: '/about', icon: Info }
  ];

  const authenticatedNavigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Markets', href: '/markets', icon: DollarSign },
    { name: 'Recent Trades', href: '/recent-trades', icon: Clock },
    { name: 'Settings', href: '/settings', icon: Settings }
  ];

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Quotex</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {isAuthenticated ? (
                // Authenticated user navigation
                <>
                  {authenticatedNavigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActive(item.href)
                            ? 'text-blue-400 bg-blue-900/20'
                            : 'text-gray-300 hover:text-white hover:bg-gray-800'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </>
              ) : (
                // Non-authenticated user navigation
                <>
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActive(item.href)
                            ? 'text-blue-400 bg-blue-900/20'
                            : 'text-gray-300 hover:text-white hover:bg-gray-800'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </>
              )}
            </div>

            {/* User Menu / Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                // Authenticated user menu
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm text-white font-medium">{user?.name}</div>
                    <div className="text-xs text-gray-400">Live Account</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-600 text-white">
                      ${user?.liveBalance.toLocaleString()}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLogout}
                      className="text-gray-300 hover:text-white hover:bg-gray-800"
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                // Non-authenticated user buttons
                <Button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {isAuthenticated ? (
                // Authenticated mobile navigation
                <>
                  {authenticatedNavigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                          isActive(item.href)
                            ? 'text-blue-400 bg-blue-900/20'
                            : 'text-gray-300 hover:text-white hover:bg-gray-700'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                  <div className="pt-4 pb-3 border-t border-gray-700">
                    <div className="px-3 py-2">
                      <div className="text-sm text-white font-medium">{user?.name}</div>
                      <div className="text-xs text-gray-400">Live Account</div>
                      <div className="mt-2">
                        <Badge className="bg-green-600 text-white">
                          ${user?.liveBalance.toLocaleString()}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </>
              ) : (
                // Non-authenticated mobile navigation
                <>
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                          isActive(item.href)
                            ? 'text-blue-400 bg-blue-900/20'
                            : 'text-gray-300 hover:text-white hover:bg-gray-700'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                  <div className="pt-4 pb-3 border-t border-gray-700">
                    <Button
                      onClick={() => {
                        setIsAuthModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-blue-600 text-white hover:bg-blue-700"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Navbar;