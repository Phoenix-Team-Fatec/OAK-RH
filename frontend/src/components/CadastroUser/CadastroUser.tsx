import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Alert } from '@mui/material';
import Sidebar from '../SideBar/sidebar';
import './index.css';  // Importando o CSS
import { registerTeam } from './cadastro';

const CadastroUser: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [teamNameError, setTeamNameError] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalSeverity, setModalSeverity] = useState<'success' | 'error'>('success'); // Define a severidade da mensagem

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTeamRegister = async () => {
    if (!teamName.trim()) {
      setTeamNameError(true);
      return;
    }
    setTeamNameError(false);

    try {
      const response = await registerTeam(teamName);
      if (response) {
        setModalMessage("Equipe cadastrada com sucesso!");
        setModalSeverity('success');
        setTeamName(""); // Limpa o campo após sucesso
      }
    } catch (error) {
      setModalMessage("Erro ao cadastrar equipe. Tente novamente.");
      setModalSeverity('error');
    }
    handleOpen(); // Abre o modal após a tentativa de registro
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
              <Button onClick={handleTeamRegister} variant="contained" size="medium" className="button">Confirmar</Button>
            </Box>

            {/* Coluna direita - Campo de Equipes */}
            <Box className="form-column2">
              <TextField
                id="cadastro_equipes"
                label="Cadastro de equipes"
                variant="outlined"
                fullWidth
                value={teamName} 
                onChange={(e) => setTeamName(e.target.value)} 
                error={teamNameError}
                helperText={teamNameError ? "Por favor, preencha este campo." : ""}
              />
              <Button onClick={handleTeamRegister} variant="contained" size="medium" className="button">Confirmar</Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Modal de confirmação */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cadastro de Equipe</DialogTitle>
        <DialogContent>
          <Alert severity={modalSeverity}>{modalMessage}</Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Fechar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CadastroUser;
