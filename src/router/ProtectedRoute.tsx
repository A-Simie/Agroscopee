import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem("AgroAccessToken");
  const rawUser = localStorage.getItem("AgroScopeUser");

  if (!token || !rawUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
