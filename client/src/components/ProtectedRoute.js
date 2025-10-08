import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // Si requiere autenticación y el usuario no está autenticado
  if (requireAuth && !isAuthenticated) {
    // Redirigir al login con la ruta actual como state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si el usuario está autenticado pero no tiene nivel suficiente (opcional)
  // if (requireAuth && user && user.level === 'banned') {
  //   return <Navigate to="/unauthorized" replace />;
  // }

  return children;
};

export default ProtectedRoute;
