import React from "react";
import { nav } from "../nav";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useI18n } from "../contexts/I18nContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthContext();
  const { t } = useI18n();

  const handleLogout = () => {
    logout();
    nav.login.go(navigate);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-4">
            <div 
              onClick={() => handleNavigate('/')}
              className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <span className="text-gray-900 font-bold text-lg">Admin Panel</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => handleNavigate('/')}
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {t('dashboard', 'title')}
            </button>
            <button
              onClick={() => handleNavigate('/posts')}
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {t('posts', 'title')}
            </button>
          </nav>

          {/* Right side - User info, language, logout */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {/* User Info */}
            {user && (
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <p className="text-gray-900 text-sm font-medium">{user.name}</p>
                  <p className="text-gray-500 text-xs">
                    {user.permissions.length} {t('dashboard', 'permissions')}
                  </p>
                </div>
                <div className="h-8 w-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            )}
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              {t('auth', 'logout')}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 