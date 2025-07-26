import { routes } from '../routes/routes';
import type { AppRoute } from '../routes/routes';
import { useNavigate } from 'react-router-dom';

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
        const url = navigator[routeName].get(params);
        navigate(url);
      }
    };
  });

  return navigator;
};

export const nav = createNavigator(); 