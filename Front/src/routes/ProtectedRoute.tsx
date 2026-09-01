import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../services/authContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { User, Loading } = useAuth();

  if (Loading) {
    return (
      <div className="min-h-screen bg-[#0A071B] flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!User) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
