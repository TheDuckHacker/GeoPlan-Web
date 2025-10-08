import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  User, 
  LogOut, 
  Settings,
  Bell,
  Map,
  BarChart3,
  Home,
  AlertTriangle,
  Users,
  Info,
  Gamepad2,
  Trophy
} from 'lucide-react';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Cerrar menús cuando se hace scroll o click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest('.user-menu')) {
        setIsUserMenuOpen(false);
      }
    };

    const handleScroll = () => {
      setIsMobileMenuOpen(false);
      setIsUserMenuOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isUserMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const navigationItems = [
    { name: 'Inicio', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Simulador', href: '/simulator', icon: BarChart3 },
    { name: 'Alertas', href: '/alerts', icon: AlertTriangle },
    { name: 'Mapas', href: '/maps', icon: Map },
    { name: 'Comunidad', href: '/community', icon: Users },
    { name: 'Recompensas', href: '/rewards', icon: Trophy },
    { name: 'Minijuego', href: '/minigame', icon: Gamepad2, requireAuth: true },
    { name: 'Acerca de', href: '/about', icon: Info },
  ];

  return (
    <header className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Map className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                  GeoPlan
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                  Ciudad Viva
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navigationItems
              .filter(item => !item.requireAuth || isAuthenticated)
              .map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 group"
                  >
                    <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                );
              })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 lg:p-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5 lg:w-6 lg:h-6" /> : <Moon className="w-5 h-5 lg:w-6 lg:h-6" />}
            </button>

            {/* Notifications */}
            {isAuthenticated && (
              <button className="p-2 lg:p-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105 relative">
                <Bell className="w-5 h-5 lg:w-6 lg:h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              </button>
            )}

            {/* User menu */}
            {isAuthenticated ? (
              <div className="relative user-menu">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 lg:space-x-3 p-2 lg:p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 group"
                >
                  <img
                    src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=11a4d4&color=fff`}
                    alt={user?.name}
                    className="w-8 h-8 lg:w-10 lg:h-10 rounded-full ring-2 ring-gray-200 dark:ring-gray-600 group-hover:ring-primary transition-all"
                  />
                  <div className="hidden lg:block text-left">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.level || 'Usuario'}
                    </div>
                  </div>
                </button>

                {/* User dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50 animate-fade-in-down">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-3">
                        <img
                          src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=11a4d4&color=fff`}
                          alt={user?.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {user?.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {user?.points || 0} puntos • {user?.level || 'Principiante'}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      <span>Mi Perfil</span>
                    </Link>
                    <Link
                      to="/rewards"
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Trophy className="w-5 h-5" />
                      <span>Recompensas</span>
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Settings className="w-5 h-5" />
                      <span>Configuración</span>
                    </Link>
                    <hr className="my-2 border-gray-200 dark:border-gray-700" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Cerrar sesión</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2 lg:space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105"
                >
                  Registrarse
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            {/* User info for mobile */}
            {isAuthenticated && (
              <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <img
                    src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=11a4d4&color=fff`}
                    alt={user?.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {user?.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {user?.points || 0} puntos • {user?.level || 'Principiante'}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <nav className="px-4 py-4">
              <div className="grid grid-cols-2 gap-2">
                {navigationItems
                  .filter(item => !item.requireAuth || isAuthenticated)
                  .map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="flex flex-col items-center space-y-2 p-4 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 hover:scale-105"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon className="w-6 h-6" />
                        <span className="text-sm font-medium text-center">{item.name}</span>
                      </Link>
                    );
                  })}
              </div>
            </nav>

            {/* Quick actions for mobile */}
            {isAuthenticated && (
              <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-3 gap-2">
                  <Link
                    to="/profile"
                    className="flex flex-col items-center space-y-1 p-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    <span className="text-xs">Perfil</span>
                  </Link>
                  <Link
                    to="/rewards"
                    className="flex flex-col items-center space-y-1 p-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Trophy className="w-5 h-5" />
                    <span className="text-xs">Recompensas</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex flex-col items-center space-y-1 p-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="text-xs">Salir</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
