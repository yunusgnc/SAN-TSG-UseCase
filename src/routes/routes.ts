export type RoutePermission = 'VIEW_POSTS' | 'VIEW_COMMENTS' | 'EDIT_POST' | 'CREATE_POST';

export interface AppRoute {
  name: string;
  path: string;
  renderer: () => Promise<{ default: React.ComponentType<any> }>;
  permissions?: RoutePermission[];
  translations?: string[];
}

export const routes: AppRoute[] = [
  // Public routes (no permissions required)
  {
    name: 'login',
    path: '/login',
    renderer: () => import('../pages/auth/LoginPage'),
    permissions: [],
    translations: ['auth', 'common'],
  },
  {
    name: 'forbidden',
    path: '/403',
    renderer: () => import('../pages/ForbiddenPage'),
    permissions: [],
    translations: ['errors', 'common'],
  },
  {
    name: 'not-found',
    path: '/404',
    renderer: () => import('../pages/NotFoundPage'),
    permissions: [],
    translations: ['errors', 'common'],
  },
  
  // Protected routes (require authentication and permissions)
  {
    name: 'dashboard',
    path: '/',
    renderer: () => import('../pages/dashboard/DashboardPage'),
    permissions: ['VIEW_POSTS'],
    translations: ['dashboard', 'common'],
  },
  {
    name: 'posts',
    path: '/posts',
    renderer: () => import('../pages/posts/PostsPage'),
    permissions: ['VIEW_POSTS'],
    translations: ['posts', 'common'],
  },
  {
    name: 'post-detail',
    path: '/posts/:postId',
    renderer: () => import('../pages/posts/PostDetailPage'),
    permissions: ['VIEW_POSTS'],
    translations: ['posts', 'comments', 'common'],
  },
  {
    name: 'create-post',
    path: '/posts/create',
    renderer: () => import('../pages/posts/CreatePostPage'),
    permissions: ['CREATE_POST'],
    translations: ['posts', 'forms', 'common'],
  },
]; 