import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useAuth } from '../../contexts/AuthContext';
import { Menu } from 'lucide-react';

const Layout = () => {
  const { isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      
      <div className="flex">
        {/* Botón para mostrar/ocultar sidebar */}
        {isAuthenticated && (
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="fixed top-16 left-4 z-50 p-2 bg-primary text-white rounded-lg shadow-lg hover:bg-primary-dark transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        
        {/* Sidebar colapsable */}
        {isAuthenticated && sidebarOpen && (
          <div className="fixed inset-0 z-40">
            <div 
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setSidebarOpen(false)}
            ></div>
            <div className="fixed left-0 top-0 h-full w-64 z-50">
              <Sidebar onClose={() => setSidebarOpen(false)} />
            </div>
          </div>
        )}
        
        <main className="flex-1 transition-all duration-300">
          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
