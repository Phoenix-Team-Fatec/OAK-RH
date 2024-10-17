import React from 'react';
import { Navigate } from 'react-router-dom';
import useUserData from '../../hooks/useUserData';

// Componente para proteger rotas
const ProtectedRoute: React.FC<{ children: JSX.Element, adminOnly?: boolean }> = ({ children, adminOnly = false }) => {
  const userData = useUserData();

  if (!userData) {
    // Se não estiver autenticado, redireciona para a página de login
    return <Navigate to="/" replace />;
  }

  if (adminOnly && !userData.isAdmin) {
    // Se for uma rota de admin e o usuário não for admin, redireciona
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
