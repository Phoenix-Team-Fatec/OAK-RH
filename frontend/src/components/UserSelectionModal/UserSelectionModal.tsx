import React, { useState } from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';

// Simulação de usuários disponíveis (normalmente isso viria de uma API)
const availableUsers = [
  { name: 'Marcos Oliveira', role: 'Líder' },
  { name: 'Julia Almeida', role: 'Liderado' },
  { name: 'Gabriel Souza', role: 'Liderado' },
  { name: 'Carla Dias', role: 'Líder' },
  // Adicione mais usuários aqui...
];

const UserSelectionModal = ({ open, onClose, onSelect, role }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  // Filtra os usuários pelo tipo de role (Líder ou Liderado)
  const filteredUsers = availableUsers.filter(user => user.role === role);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Selecionar {role}
        </Typography>

        {/* Lista de usuários disponíveis */}
        <ul>
          {filteredUsers.map((user, index) => (
            <li
              key={index}
              style={{
                cursor: 'pointer',
                padding: '8px',
                backgroundColor: selectedUser === user ? '#e0e0e0' : 'white',
              }}
              onClick={() => setSelectedUser(user)}
            >
              {user.name}
            </li>
          ))}
        </ul>

        {/* Botão para confirmar a seleção */}
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          disabled={!selectedUser}
          onClick={() => {
            onSelect(selectedUser);
            onClose(); // Fecha o modal ao selecionar
          }}
        >
          Adicionar
        </Button>
      </Box>
    </Modal>
  );
};

export default UserSelectionModal;
