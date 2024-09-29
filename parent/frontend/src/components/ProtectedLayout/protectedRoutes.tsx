import React from 'react';
import { Navigate } from 'react-router-dom';

// Componente para proteger rotas
const ProtectedRoute: React.FC<{ children: JSX.Element, adminOnly?: boolean }> = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('is_admin') === 'true';

  if (!token) {
    // Se não estiver autenticado, redireciona para a página de login
    return <Navigate to="/" replace />;
  }

  if (adminOnly && !isAdmin) {
    // Se for uma rota de admin e o usuário não for admin, redireciona
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
