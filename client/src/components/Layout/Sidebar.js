import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Map, 
  BarChart3, 
  AlertTriangle, 
  Users, 
  Info,
  Trophy,
  Settings,
  X
} from 'lucide-react';

const Sidebar = ({ onClose }) => {
  const { user } = useAuth();
  const location = useLocation();

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Simulador', href: '/simulator', icon: Map },
    { name: 'Alertas', href: '/alerts', icon: AlertTriangle },
    { name: 'Comunidad', href: '/community', icon: Users },
    { name: 'Recompensas', href: '/rewards', icon: Trophy },
    { name: 'Configuración', href: '/settings', icon: Settings },
  ];

  const isActive = (href) => {
    return location.pathname === href;
  };

  return (
    <aside className="w-64 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
      <div className="p-4">
        {/* Botón de cerrar */}
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {/* User info */}
        <div className="flex items-center space-x-3 mb-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <img
            src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=11a4d4&color=fff`}
            alt={user?.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {user?.level || 'Usuario'}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Quick stats */}
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
            Tu Progreso
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600 dark:text-gray-400">Puntos</span>
              <span className="text-gray-900 dark:text-white font-medium">
                {user?.points || 0}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-600 dark:text-gray-400">Nivel</span>
              <span className="text-gray-900 dark:text-white font-medium">
                {user?.level || 'Principiante'}
              </span>
            </div>
          </div>
        </div>

        {/* About link */}
        <div className="mt-6">
          <Link
            to="/about"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Info className="w-5 h-5" />
            <span>Acerca de GeoPlan</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
