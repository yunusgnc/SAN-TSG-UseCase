import React from "react";
import { nav } from "../../nav";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useI18n } from "../../contexts/I18nContext";
import LanguageSwitcher from "../../components/LanguageSwitcher";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuthContext();
  const { t } = useI18n();

  const handleLogout = () => {
    logout();
    nav.login.go(navigate);
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              {t("dashboard", "recentPosts")}
            </h2>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((post) => (
                <div
                  key={post}
                  className="border-b border-gray-200 pb-3 last:border-b-0"
                >
                  <h3 className="font-medium text-gray-900">Gönderi {post}</h3>
                  <p className="text-sm text-gray-600">
                    Bu gönderi {post} için örnek açıklama metni...
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">2 saat önce</span>
                    <button
                      onClick={() => nav.posts.go(navigate)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Detayları Gör
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              {t("dashboard", "recentComments")}
            </h2>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((comment) => (
                <div
                  key={comment}
                  className="border-b border-gray-200 pb-3 last:border-b-0"
                >
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        Kullanıcı {comment}
                      </p>
                      <p className="text-sm text-gray-600">
                        Bu yorum {comment} için örnek yorum metni...
                      </p>
                      <span className="text-xs text-gray-500">1 saat önce</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
