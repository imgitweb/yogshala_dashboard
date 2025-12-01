import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({
  children,
  allowedRoles,
  isAuthenticated,
  role,
  redirectIfAuth = false,
  redirectPath = "/dashboard", 
}) => {
  const location = useLocation();

  if (!isAuthenticated) {
    if (allowedRoles) {
      return <Navigate to="/auth" replace />;
    }
  }

  if (redirectIfAuth && isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
