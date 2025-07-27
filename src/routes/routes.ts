export type RoutePermission = 'VIEW_POSTS' | 'VIEW_COMMENTS' | 'EDIT_POST' | 'CREATE_POST';

export interface AppRoute {
  name: string;
  path: string;
  renderer: () => Promise<{ default: React.ComponentType<any> }>;
  permissions?: RoutePermission[];
  translations?: string[];
}

export const routes: AppRoute[] = [
  {
    name: 'dashboard',
    path: '/',
    renderer: () => import('../pages/dashboard/DashboardPage'),
    permissions: ['VIEW_POSTS'],
    translations: ['dashboard'],
  },
  {
    name: 'login',
    path: '/login',
    renderer: () => import('../pages/auth/LoginPage'),
    permissions: [],
    translations: ['auth'],
  },
  {
    name: 'forbidden',
    path: '/403',
    renderer: () => import('../pages/ForbiddenPage'),
    permissions: [],
    translations: [],
  },
  {
    name: 'not-found',
    path: '/404',
    renderer: () => import('../pages/NotFoundPage'),
    permissions: [],
    translations: [],
  },
]; 