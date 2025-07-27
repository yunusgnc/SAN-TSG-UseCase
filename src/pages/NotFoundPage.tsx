import React from 'react';
import { nav } from '../nav';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl font-bold text-gray-400 mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Sayfa Bulunamadı</h1>
        <p className="text-gray-600 mb-8">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>
        <div className="space-y-4">
          <button
            onClick={() => nav.dashboard.go(navigate)}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Ana Sayfaya Dön
          </button>
          <button
            onClick={() => window.history.back()}
            className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Geri Git
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage; 