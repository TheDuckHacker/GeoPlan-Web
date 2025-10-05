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
        {/* Desktop: persistent sidebar, Mobile: toggle button and overlay */}
        {isAuthenticated && (
          <aside id="app-sidebar" className="hidden md:block fixed left-0 top-14 h-[calc(100vh-56px)] w-64 z-20" aria-hidden="false">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </aside>
        )}

        {/* Mobile toggle */}
        {isAuthenticated && (
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden fixed top-16 left-4 z-50 p-2 bg-primary text-white rounded-lg shadow-lg hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            aria-label="Abrir menú"
            aria-controls="app-sidebar"
            aria-expanded={sidebarOpen}
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        {/* Mobile overlay sidebar */}
        {isAuthenticated && sidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div 
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setSidebarOpen(false)}
            ></div>
            <div className="fixed left-0 top-0 h-full w-64 z-50">
              <Sidebar onClose={() => setSidebarOpen(false)} />
            </div>
          </div>
        )}

        <main className={`flex-1 transition-all duration-300 pt-16 ${isAuthenticated ? 'md:ml-64' : ''}`}>
          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
