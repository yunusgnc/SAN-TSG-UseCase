export interface User {
  name: string;
  permissions: string[];
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface CreatePostData {
  title: string;
  body: string;
  userId: number;
}

export interface UpdatePostData {
  title: string;
  body: string;
}

export interface AppRoute {
  name: string;
  path: string;
  renderer: () => Promise<{ default: React.ComponentType<any> }>;
  permissions?: string[];
  translations?: string[];
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

export interface I18nContextType {
  locale: string;
  setLocale: (locale: string) => void;
  t: (module: string, key: string) => string;
  availableLocales: string[];
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermissions?: string[];
}

export interface AuthenticatedLayoutProps {
  children: React.ReactNode;
} 