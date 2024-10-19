import React from 'react';
import { Navigate } from 'react-router-dom';
import useUserData from '../../hooks/useUserData';

// Componente para proteger rotas
const ProtectedRoute: React.FC<{ children: JSX.Element, adminOnly?: boolean }> = ({ children, adminOnly = false }) => {
  const userData = useUserData();

  if (adminOnly && !userData.isAdmin) {
    return <Navigate to="/" replace />;
  } else if (!adminOnly && userData.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
