import React from "react";
import { nav } from "../../nav";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuthContext();
  
  const handleLogout = () => {
    logout();
    nav.login.go(navigate);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            {user && (
              <p className="text-gray-600 mt-1">
                Hoş geldin, {user.name} | İzinler: {user.permissions.join(', ') || 'Yok'}
              </p>
            )}
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/posts')}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Gönderiler
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Çıkış
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Son 5 Gönderi</h2>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((post) => (
                <div key={post} className="border-b border-gray-200 pb-3 last:border-b-0">
                  <h3 className="font-medium text-gray-900">Gönderi {post}</h3>
                  <p className="text-sm text-gray-600">Bu gönderi {post} için örnek açıklama metni...</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">2 saat önce</span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Detayları Gör
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Son 5 Yorum</h2>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((comment) => (
                <div key={comment} className="border-b border-gray-200 pb-3 last:border-b-0">
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">Kullanıcı {comment}</p>
                      <p className="text-sm text-gray-600">Bu yorum {comment} için örnek yorum metni...</p>
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
