import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useQueryClient, useQuery } from '@tanstack/react-query';

export interface User {
  name: string;
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
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

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      const userData = queryClient.getQueryData(['user']) as User | null;
      return userData || null;
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const login = (userData: User) => {
    queryClient.setQueryData(['user'], userData);
  };

  const logout = () => {
    queryClient.setQueryData(['user'], null);
  };

  const hasPermission = (permission: string): boolean => {
    return user?.permissions.includes(permission) || false;
  };

  const value: AuthContextType = {
    user: user || null,
    login,
    logout,
    hasPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 