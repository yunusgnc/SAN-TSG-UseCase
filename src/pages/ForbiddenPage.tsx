import React from 'react';
import { nav } from '../nav';
import { useNavigate } from 'react-router-dom';

const ForbiddenPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl font-bold text-red-500 mb-4">403</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Erişim Reddedildi</h1>
        <p className="text-gray-600 mb-8">
          Bu sayfaya erişim izniniz bulunmamaktadır.
        </p>
        <button
          onClick={() => nav.dashboard.go(navigate)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Ana Sayfaya Dön
        </button>
      </div>
    </div>
  );
};

export default ForbiddenPage; 