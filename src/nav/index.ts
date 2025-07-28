import { routes } from '../routes/routes';
import type { AppRoute } from '../routes/routes';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

let hasPermission: ((permission: string) => boolean) | null = null;
let isUserLoggedIn: (() => boolean) | null = null;

export const setAuthHelpers = (
  permissionChecker: (permission: string) => boolean,
  userLoggedInChecker: () => boolean
) => {
  hasPermission = permissionChecker;
  isUserLoggedIn = userLoggedInChecker;
};

interface Navigator {
  [key: string]: {
    get: (params?: Record<string, string>) => string;
    go: (navigate: ReturnType<typeof useNavigate>, params?: Record<string, string>) => void;
  };
}

const createNavigator = (): Navigator => {
  const navigator: Navigator = {};

  routes.forEach((route: AppRoute) => {
    const routeName = route.name;
    
    navigator[routeName] = {
      get: (params?: Record<string, string>) => {
        let path = route.path;
        if (params) {
          Object.keys(params).forEach(key => {
            path = path.replace(`:${key}`, params[key]);
          });
        }
        return path;
      },
      go: (navigate, params) => {
        if (route.permissions && route.permissions.length > 0) {
          if (!isUserLoggedIn || !isUserLoggedIn()) {
            toast.error('Bu sayfaya erişim yetkiniz yok');
            return;
          }
          
          const hasAllPermissions = route.permissions.every(permission => 
            hasPermission && hasPermission(permission)
          );
          
          if (!hasAllPermissions) {
            toast.error('Bu sayfaya erişim yetkiniz yok');
            return;
          }
        }
        
        const url = navigator[routeName].get(params);
        navigate(url);
      }
    };
  });

  return navigator;
};

export const nav = createNavigator(); 