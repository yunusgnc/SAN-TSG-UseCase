import React from "react";
import { useAuthContext } from "../contexts/AuthContext";
import Header from "./Header";

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ children }) => {
  const { user } = useAuthContext();

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
};

export default AuthenticatedLayout; 