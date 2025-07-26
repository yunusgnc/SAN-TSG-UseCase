import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Son 5 Gönderi</h2>
            <p className="text-gray-600">Gönderiler burada listelenecek</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Son 5 Yorum</h2>
            <p className="text-gray-600">Yorumlar burada listelenecek</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 