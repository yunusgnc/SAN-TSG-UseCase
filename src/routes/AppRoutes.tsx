import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './routes';
import ProtectedRoute from '../components/ProtectedRoute';

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
                  <Suspense fallback={<div>Yükleniyor...</div>}>
                    <Component />
                  </Suspense>
                </ProtectedRoute>
              ) : (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                  <Component />
                </Suspense>
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