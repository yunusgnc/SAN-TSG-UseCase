import React, { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useI18n } from "../contexts/I18nContext";
import { useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiGlobe,
  FiLogOut,
  FiHome,
  FiChevronDown,
  FiFileText,
} from "react-icons/fi";

const Header: React.FC = () => {
  const { user, logout } = useAuthContext();
  const { t, locale, setLocale } = useI18n();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    handleNavigate("/login");
  };

  const toggleLanguage = () => {
    const newLocale = locale === "tr" ? "en" : "tr";
    setLocale(newLocale);
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            </div>

            <nav className="hidden md:flex ml-10 space-x-1">
              <button
                onClick={() => handleNavigate("/")}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
              >
                <FiHome className="w-4 h-4" />
                {t("dashboard", "title")}
              </button>
              <button
                onClick={() => handleNavigate("/posts")}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
              >
                <FiFileText className="w-4 h-4" />
                {t("posts", "postsList")}
              </button>
            </nav>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              <FiGlobe className="w-4 h-4" />
              <span className="font-medium">{locale.toUpperCase()}</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {user?.name?.charAt(0)}
                  </span>
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-900">
                    {user?.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {user?.permissions.length} izin
                  </div>
                </div>
                <FiChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    isUserMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                  >
                    <FiLogOut className="w-4 h-4" />
                    {t("auth", "logout")}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => handleNavigate("/")}
                className="flex items-center gap-3 w-full px-3 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              >
                <FiHome className="w-5 h-5" />
                {t("dashboard", "title")}
              </button>
              <button
                onClick={() => handleNavigate("/posts")}
                className="flex items-center gap-3 w-full px-3 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              >
                <FiFileText className="w-5 h-5" />
                {t("posts", "postsList")}
              </button>

              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex items-center space-x-3 px-3 py-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {user?.name?.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      {user?.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {user?.permissions.length} izin
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 px-3 py-2">
                  <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex-1 justify-center"
                  >
                    <FiGlobe className="w-4 h-4" />
                    {locale.toUpperCase()}
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    <FiLogOut className="w-4 h-4" />
                    {t("auth", "logout")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
