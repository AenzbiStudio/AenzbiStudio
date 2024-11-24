import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from "@/components/ui/button"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link to="/" className="text-2xl font-bold text-gray-900">
                AenzbiStudio
              </Link>
            </div>
            <nav className="flex space-x-10">
              {user && (
                <>
                  <Link to="/dashboard" className="text-base font-medium text-gray-500 hover:text-gray-900">
                    Dashboard
                  </Link>
                  <Link to="/editor" className="text-base font-medium text-gray-500 hover:text-gray-900">
                    Editor
                  </Link>
                  <Link to="/projects" className="text-base font-medium text-gray-500 hover:text-gray-900">
                    Projects
                  </Link>
                  <Link to="/settings" className="text-base font-medium text-gray-500 hover:text-gray-900">
                    Settings
                  </Link>
                </>
              )}
            </nav>
            <div className="flex items-center justify-end md:flex-1 lg:w-0">
              {user ? (
                <Button onClick={logout} variant="ghost">
                  Logout
                </Button>
              ) : (
                <Link to="/login" className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; 2023 AenzbiStudio. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

