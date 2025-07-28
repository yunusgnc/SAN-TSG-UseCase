import { routes } from '../routes/routes';
import type { AppRoute } from '../routes/routes';
import { useNavigate } from 'react-router-dom';

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
        // Permission kontrolü
        if (route.permissions && route.permissions.length > 0) {
          if (!isUserLoggedIn || !isUserLoggedIn()) {
            alert('You are not authorized to access this page');
            return;
          }
          
          const hasAllPermissions = route.permissions.every(permission => 
            hasPermission && hasPermission(permission)
          );
          
          if (!hasAllPermissions) {
            alert('You are not authorized to access this page');
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