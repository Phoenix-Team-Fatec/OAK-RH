import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface UserContextType {
  id: number | null;
  setId: (id: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Recupera o ID do localStorage, se disponível, ou inicia como null
  const [id, setId] = useState<number | null>(() => {
    const savedId = localStorage.getItem('adminId');
    return savedId ? JSON.parse(savedId) : null;
  });

  // Função para atualizar o ID e também salvar no localStorage
  const handleSetId = (newId: number) => {
    setId(newId);
    localStorage.setItem('adminId', JSON.stringify(newId)); // Salva o ID no localStorage
  };

  // Efeito para limpar o ID do localStorage se for nulo
  useEffect(() => {
    if (id === null) {
      localStorage.removeItem('adminId'); // Remove o ID do localStorage se for nulo
    }
  }, [id]);

  return (
    <UserContext.Provider value={{ id, setId: handleSetId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
