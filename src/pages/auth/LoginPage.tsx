import React, { useState } from "react";
import { nav } from "../../nav";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../../contexts/I18nContext";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { FiLock, FiUser, FiLogIn } from "react-icons/fi";

const LoginPage: React.FC = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const { t } = useI18n();

  const [permissions, setPermissions] = useState({
    VIEW_POSTS: true,
    VIEW_COMMENTS: true,
    EDIT_POST: false,
  });

  const handlePermissionChange = (permission: string) => {
    setPermissions((prev) => ({
      ...prev,
      [permission]: !prev[permission as keyof typeof prev],
    }));
  };

  const handleLogin = async () => {
    const selectedPermissions = Object.keys(permissions).filter(
      (key) => permissions[key as keyof typeof permissions]
    );

    const USER = {
      name: "John Doe",
      permissions: selectedPermissions,
    };

    await login(USER);
    nav.dashboard.go(navigate);
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="fixed top-6 right-6 z-50">
        <LanguageSwitcher />
      </div>

      <div className="relative flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8">
            <div className="text-center mb-8">
              <div className="mx-auto h-20 w-20 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <FiLock className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-3">
                {t("auth", "welcome")}
              </h2>
              <p className="text-gray-300 text-lg">
                {t("auth", "loginDescription")}
              </p>
            </div>

            <div className="space-y-6">
              <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-12 w-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                    <FiUser className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">
                      {t("auth", "demoUser")}
                    </p>
                    <p className="text-gray-300 text-sm">John Doe</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-white font-medium text-sm mb-3">
                    {t("auth", "permissions")}
                  </h3>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permissions.VIEW_POSTS}
                      disabled={true}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
                    />
                    <span className="text-white text-sm">
                      {t("auth", "viewPosts")}
                    </span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permissions.VIEW_COMMENTS}
                      disabled={true}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
                    />
                    <span className="text-white text-sm">
                      {t("auth", "viewComments")}
                    </span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permissions.EDIT_POST}
                      onChange={() => handlePermissionChange("EDIT_POST")}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-white text-sm">
                      {t("auth", "editPosts")}
                    </span>
                  </label>
                </div>
              </div>

              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300/50 shadow-xl hover:shadow-2xl"
              >
                <div className="flex items-center justify-center space-x-3">
                  <FiLogIn className="h-6 w-6" />
                  <span className="text-lg">{t("auth", "demoLogin")}</span>
                </div>
              </button>

              <div className="text-center pt-4">
                <p className="text-gray-400 text-sm">
                  {t("auth", "demoDescription")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
