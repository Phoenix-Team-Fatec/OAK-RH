import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remover o token e informações do localStorage ao fazer logout
    localStorage.removeItem('token');
    localStorage.removeItem('is_admin');
    
    // Redireciona para a página de login
    navigate('/');
  }, [navigate]);

  return null; // O componente não precisa renderizar nada
};

export default Logout;