import React from "react";
import { nav } from "../../nav";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../../contexts/I18nContext";
import LanguageSwitcher from "../../components/LanguageSwitcher";

const LoginPage: React.FC = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const { t } = useI18n();

  const handleLogin = () => {
    const USER = {
      name: "John Doe",
      permissions: ["VIEW_POSTS", "VIEW_COMMENTS"],
    };

    login(USER);
    console.log("Kullanıcı giriş yaptı:", USER);

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
                <svg
                  className="h-10 w-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
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
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">
                      {t("auth", "demoUser")}
                    </p>
                    <p className="text-gray-300 text-sm">John Doe</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300/50 shadow-xl hover:shadow-2xl"
              >
                <div className="flex items-center justify-center space-x-3">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="text-lg">{t("auth", "demoLogin")}</span>
                </div>
              </button>

              <div className="text-center pt-4">
                <p className="text-gray-400 text-sm">
                  Bu bir demo uygulamasıdır. Gerçek kimlik bilgileri gerekmez.
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
