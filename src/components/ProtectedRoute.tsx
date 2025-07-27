import React, { useEffect } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { nav } from '../nav';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermissions?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredPermissions = [] 
}) => {
  const { user, hasPermission } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      nav.login.go(navigate);
      return;
    }

    // Route izinlerini kontrol et
    if (requiredPermissions.length > 0) {
      const hasAllPermissions = requiredPermissions.every(permission => 
        hasPermission(permission)
      );
      
      if (!hasAllPermissions) {
        nav.forbidden.go(navigate);
        return;
      }
    }
  }, [user, requiredPermissions, hasPermission, navigate]);

  if (!user) {
    return null;
  }

  // İzin kontrolü
  if (requiredPermissions.length > 0) {
    const hasAllPermissions = requiredPermissions.every(permission => 
      hasPermission(permission)
    );
    
    if (!hasAllPermissions) {
      return null;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute; 