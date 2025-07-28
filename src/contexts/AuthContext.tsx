import React, { createContext, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useQueryClient, useQuery } from '@tanstack/react-query';

export interface User {
  name: string;
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          return JSON.parse(storedUser) as User;
        } catch (error) {
          console.error('Kullanıcı bilgileri parse edilemedi:', error);
          localStorage.removeItem('user');
        }
      }
      
      const userData = queryClient.getQueryData(['user']) as User | null;
      return userData || null;
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const login = (userData: User) => {
    queryClient.setQueryData(['user'], userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    queryClient.setQueryData(['user'], null);
    localStorage.removeItem('user');
  };

  const hasPermission = (permission: string): boolean => {
    return user?.permissions.includes(permission) || false;
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && !user) {
      try {
        const userData = JSON.parse(storedUser) as User;
        queryClient.setQueryData(['user'], userData);
      } catch (error) {
        console.error('Kullanıcı bilgileri yüklenemedi:', error);
        localStorage.removeItem('user');
      }
    }
  }, [queryClient, user]);

  const value: AuthContextType = {
    user: user || null,
    isLoading,
    login,
    logout,
    hasPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 