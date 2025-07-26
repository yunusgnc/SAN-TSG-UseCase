export type RoutePermission = 'VIEW_POSTS' | 'VIEW_COMMENTS' | 'EDIT_POST' | 'CREATE_POST';

export interface AppRoute {
  name: string;
  path: string;
  renderer: () => Promise<{ default: React.ComponentType<any> }> | React.ComponentType<any>;
  permissions?: RoutePermission[];
  translations?: string[];
}

export const routes: AppRoute[] = [
  {
    name: 'dashboard',
    path: '/',
    renderer: () => import('../pages/dashboard/DashboardPage'),
    permissions: [],
    translations: ['dashboard'],
  },
  {
    name: 'login',
    path: '/login',
    renderer: () => import('../pages/auth/LoginPage'),
    permissions: [],
    translations: ['auth'],
  },
]; 