import React, { useState, useEffect } from 'react';
import { Button, Card, Typography, Radio, RadioGroup, FormControlLabel, TextField } from '@mui/material';

// Exemplo temporário de dados de usuários e respostas
const exampleUsers = [
  {
    id: 1,
    name: 'Usuário 1',
    responses: [
      { id: 1, question: 'Autonomia', type: 'radio', options: ['Bom', 'Médio', 'Ruim'], answer: 'Bom' },
      { id: 2, question: 'Autonomia (avaliação)', type: 'number', options: [1, 2, 3, 4], answer: 3 },
      { id: 3, question: 'Avalie Autonomia', type: 'text', answer: 'Minha autonomia é problemática' }
    ]
  },
  {
    id: 2,
    name: 'Usuário 2',
    responses: [
      { id: 1, question: 'Autonomia', type: 'radio', options: ['Bom', 'Médio', 'Ruim'], answer: 'Médio' },
      { id: 2, question: 'Autonomia (avaliação)', type: 'number', options: [1, 2, 3, 4], answer: 2 },
      { id: 3, question: 'Avalie Autonomia', type: 'text', answer: 'Tenho autonomia razoável' }
    ]
  }
];

const UserFormViewer = () => {
  const [currentUserIndex, setCurrentUserIndex] = useState(0); // Index do usuário atual
  const [users, setUsers] = useState(exampleUsers); // Aqui vai o dado vindo do backend
  
  // Função para avançar para o próximo usuário
  const nextUser = () => {
    if (currentUserIndex < users.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
    }
  };

  // Função para voltar para o usuário anterior
  const prevUser = () => {
    if (currentUserIndex > 0) {
      setCurrentUserIndex(currentUserIndex - 1);
    }
  };

  const renderResponse = (response: any) => {
    switch (response.type) {
      case 'radio':
        return (
          <RadioGroup value={response.answer}>
            {response.options.map((option: string) => (
              <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
            ))}
          </RadioGroup>
        );
      case 'number':
        return (
          <RadioGroup value={response.answer}>
            {response.options.map((option: number) => (
              <FormControlLabel key={option} value={option} control={<Radio />} label={option.toString()} />
            ))}
          </RadioGroup>
        );
      case 'text':
        return (
          <TextField
            fullWidth
            multiline
            value={response.answer}
            variant="outlined"
            InputProps={{
              readOnly: true
            }}
          />
        );
      default:
        return null;
    }
  };

  const currentUser = users[currentUserIndex];

  return (
    <Card style={{ padding: '20px', margin: '20px' }}>
      <Typography variant="h5">Formulário de {currentUser.name}</Typography>
      {currentUser.responses.map((response: any) => (
        <div key={response.id} style={{ margin: '20px 0' }}>
          <Typography variant="h6">{response.question}</Typography>
          {renderResponse(response)}
        </div>
      ))}
      <Button onClick={prevUser} disabled={currentUserIndex === 0}>
        Anterior
      </Button>
      <Button onClick={nextUser} disabled={currentUserIndex === users.length - 1}>
        Próximo
      </Button>
    </Card>
  );
};

export default UserFormViewer;
