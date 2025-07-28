import React, { Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { routes } from './routes';
import ProtectedRoute from '../components/ProtectedRoute';
import AuthenticatedLayout from '../components/AuthenticatedLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import { preloadTranslations } from '../i18n';

const AppRoutes: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const currentRoute = routes.find(route => {
      if (route.path.includes(':')) {
        const routePathParts = route.path.split('/');
        const currentPathParts = location.pathname.split('/');
        
        if (routePathParts.length !== currentPathParts.length) return false;
        
        return routePathParts.every((part, index) => {
          if (part.startsWith(':')) return true;
          return part === currentPathParts[index];
        });
      }
      
      return route.path === location.pathname;
    });

    if (currentRoute && currentRoute.translations) {
      preloadTranslations(currentRoute.translations);
    }
  }, [location.pathname]);

  return (
    <Routes>
      {routes.map((route) => {
        const rendererResult = route.renderer();
        const isLazyComponent = rendererResult instanceof Promise;
        const Component = isLazyComponent ? React.lazy(() => rendererResult) : rendererResult;
        
        const isPublicPage = ['login', 'forbidden', 'not-found'].includes(route.name);
        
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.permissions && route.permissions.length > 0 ? (
                <ProtectedRoute requiredPermissions={route.permissions}>
                  <AuthenticatedLayout>
                    {isLazyComponent ? (
                      <Suspense fallback={<LoadingSpinner message="Sayfa yükleniyor..." size="lg" />}>
                        <Component />
                      </Suspense>
                    ) : (
                      <Component />
                    )}
                  </AuthenticatedLayout>
                </ProtectedRoute>
              ) : isPublicPage ? (
                isLazyComponent ? (
                  <Suspense fallback={<LoadingSpinner message="Sayfa yükleniyor..." size="lg" />}>
                    <Component />
                  </Suspense>
                ) : (
                  <Component />
                )
              ) : (
                <AuthenticatedLayout>
                  {isLazyComponent ? (
                    <Suspense fallback={<LoadingSpinner message="Sayfa yükleniyor..." size="lg" />}>
                      <Component />
                    </Suspense>
                  ) : (
                    <Component />
                  )}
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