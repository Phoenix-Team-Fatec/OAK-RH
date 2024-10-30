import React from 'react';

interface User {
  nome: string;
  equipe: string;
  respondeu: boolean;
}

const users: User[] = [
  { nome: 'Matheus', equipe: 'Desenvolvimento', respondeu: true },
  { nome: 'Ana', equipe: 'Design', respondeu: false },
  { nome: 'Carlos', equipe: 'Marketing', respondeu: true },
  { nome: 'Carlos', equipe: 'Marketing', respondeu: true },
  { nome: 'Bianca', equipe: 'Financeiro', respondeu: false },
  { nome: 'Lucas', equipe: 'Desenvolvimento', respondeu: true },
  { nome: 'Fernanda', equipe: 'RH', respondeu: true },
  { nome: 'João', equipe: 'Design', respondeu: false },
  { nome: 'Paulo', equipe: 'Financeiro', respondeu: true },
  { nome: 'Marina', equipe: 'Marketing', respondeu: false },
  { nome: 'Gustavo', equipe: 'Desenvolvimento', respondeu: true },
  { nome: 'Carlos', equipe: 'Marketing', respondeu: true },
  { nome: 'Bianca', equipe: 'Financeiro', respondeu: false },
  { nome: 'Lucas', equipe: 'Desenvolvimento', respondeu: true },
  
  // Adicione mais registros conforme necessário
];

const SimpleTable: React.FC = () => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nome</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Equipe</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Respondeu</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.nome}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.equipe}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
              {user.respondeu ? 'Sim' : 'Não'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SimpleTable;