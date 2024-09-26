import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Alert } from '@mui/material';
import Sidebar from '../SideBar/sidebar';
import './index.css';  // Importando o CSS
import { registerTeam, registerUser } from './cadastro';
import TopMenu from '../Menu/menu';

const CadastroUser: React.FC = () => {

  // Cadastro de equipes
  const [open, setOpen] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [teamNameError, setTeamNameError] = useState(false);

    // Cadastro de usuário
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [userError, setUserError] = useState(false);

  // Modal de confirmação
  const [modalMessage, setModalMessage] = useState('');
  const [modalSeverity, setModalSeverity] = useState<'success' | 'error'>('success');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Função de validação genérica para campos vazios
  const isFieldEmpty = (...fields: string[]) => fields.some(field => !field.trim());

  // Handle cadastro user
  const handleUserRegister = async () => {
    if (isFieldEmpty(nome, email, senha)) {
      setUserError(true);
      return;
    }

    setUserError(false);
    try {
      const response = await registerUser(nome, email, senha);
      if (response) {
        setModalMessage("Usuário cadastrado com sucesso!");
        setModalSeverity('success');
        setNome("");
        setEmail("");
        setSenha("");
      }
    } catch (error) {
      setModalMessage("Erro: Email já cadastrado. Tente novamente!");
      setModalSeverity('error');
    }
    handleOpen();
  }

// Handle para cadastro de equipe
const handleTeamRegister = async () => {
    if (isFieldEmpty(teamName)) {
        setTeamNameError(true); // Define o erro se o campo estiver vazio
        return;
    }

    setTeamNameError(false); // Reseta o erro se o campo não estiver vazio
    try {
        const response = await registerTeam(teamName);

        // Verifique se a resposta está no formato esperado
        if (response) {
            setModalMessage("Equipe cadastrada com sucesso!");
            setModalSeverity('success');
            setTeamName("");
        }
    } catch (error: any) {
        console.log("Erro no cadastro da equipe:", error);

        // Verifique se o erro é uma resposta do Axios
        if (error.response) {
            console.log("Status do erro:", error.response.status);
            console.log("Dados do erro:", error.response.data);

            // Lidar com o status 409 para equipe já cadastrada
            if (error.response.status === 409) {
                const errorMessage = error.response.data.message || error.response.data;
                console.log("Mensagem de erro do servidor:", errorMessage);

                if (errorMessage === "Equipe já cadastrada") {
                    setModalMessage("Erro: A equipe já está cadastrada!");
                    setModalSeverity('error');
                    setTeamNameError(true); // Define o erro se a equipe já estiver cadastrada
                }
            } else {
                setModalMessage("Erro ao cadastrar equipe. Tente novamente.");
                setModalSeverity('error');
            }
        } else {
            // Se não for uma resposta do Axios, é um erro genérico
            setModalMessage("Erro ao cadastrar equipe. Tente novamente.");
            setModalSeverity('error');
        }
    }
    handleOpen(); // Abre o modal com a mensagem de erro ou sucesso
};


return (
    <> 
      <TopMenu />
      <Box className="container">
        <Sidebar />
        
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
              
              <TextField 
                id="cadastro_usuario" 
                label="Usuário"
                variant="outlined" 
                fullWidth  
                onChange={(e) => setNome(e.target.value)} 
                value={nome}
                error={userError}
                helperText={userError ? "Por favor, preencha este campo." : ""} />
                
              <TextField 
                id="cadastro_email" 
                label="E-Mail"
                variant="outlined" 
                type="email" 
                fullWidth 
                onChange={(e) => setEmail(e.target.value)} 
                value={email}
                error={userError}
                helperText={userError ? "Por favor, preencha este campo." : ""} />

              <TextField 
                id="cadastro_senha" 
                label="Senha" 
                variant="outlined" 
                type="password" 
                fullWidth 
                onChange={(e) => setSenha(e.target.value)} 
                value={senha}
                error={userError}
                helperText={userError ? "Por favor, preencha este campo." : ""} />

              <Button onClick={handleUserRegister} variant="contained" size="medium" className="button">Confirmar</Button>
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
                error={teamNameError} // Mostra erro se teamNameError for true
                helperText={teamNameError ? "Por favor, preencha este campo ou a equipe já está cadastrada." : ""} />
              
              <Button onClick={handleTeamRegister} variant="contained" size="medium" className="button">Confirmar</Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Modal de confirmação */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{modalSeverity === 'success' ? 'Sucesso' : 'Erro'}</DialogTitle>
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
