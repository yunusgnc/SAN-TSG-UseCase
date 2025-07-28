import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './routes';
import ProtectedRoute from '../components/ProtectedRoute';
import AuthenticatedLayout from '../components/AuthenticatedLayout';
const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-gray-600">Sayfa yükleniyor...</p>
    </div>
  </div>
);

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {routes.map((route) => {
        const Component = React.lazy(route.renderer);
        
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.permissions && route.permissions.length > 0 ? (
                <ProtectedRoute requiredPermissions={route.permissions}>
                  <AuthenticatedLayout>
                    <Suspense fallback={<LoadingSpinner />}>
                      <Component />
                    </Suspense>
                  </AuthenticatedLayout>
                </ProtectedRoute>
              ) : (
                <AuthenticatedLayout>
                  <Suspense fallback={<LoadingSpinner />}>
                    <Component />
                  </Suspense>
                </AuthenticatedLayout>
              )
            }
          />
        );
      })}
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes; 