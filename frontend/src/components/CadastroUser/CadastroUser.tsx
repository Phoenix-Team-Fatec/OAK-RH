import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { TextField, Button } from '@mui/material';
import Sidebar from '../SideBar/sidebar';
import './index.css';  // Importando o CSS

const CadastroUser: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCardClick = (team: string) => {
    setSelectedTeam(team);
    handleClose();
  };

  return (
    <>
      <Box className="container">
        <Sidebar className="sidebar" />
        
        {/* Conteúdo principal */}
        <Box className="main-content">
          <h1>Cadastro</h1>
          
          {/* Estrutura principal usando Flexbox */}
          <Box
            component="form"
            className="form-container"
            noValidate
            autoComplete="off"
          >
            {/* Coluna esquerda - Campos principais */}
            <Box className="form-column">
              <TextField id="cadastro_usuario" label="Usuário" variant="outlined" fullWidth />
              <TextField id="cadastro_email" label="E-Mail" variant="outlined" type="email" fullWidth />
              <TextField id="cadastro_senha" label="Senha" variant="outlined" type="password" fullWidth />
              <Button variant="contained" size="medium" className="button">Confirmar</Button>
            </Box>

            {/* Coluna direita - Campo de Equipes */}
            <Box className="form-column2">
              <TextField id="cadastro_equipes" label="Cadastro de equipes" variant="outlined" fullWidth />
              <Button variant="contained" size="medium" className="button">Confirmar</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CadastroUser;
