import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Alert } from '@mui/material';
import Sidebar from '../SideBar/sidebar';
import './index.css';  // Importando o CSS
import { registerTeam, registerUser } from './cadastro';
import TopMenu from '../Menu/menu';

const CadastroUser: React.FC = () => {

  //cadastro de equipes
  const [open, setOpen] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [teamNameError, setTeamNameError] = useState(false);

  // Modal de confirmação
  const [modalMessage, setModalMessage] = useState('');
  const [modalSeverity, setModalSeverity] = useState<'success' | 'error'>('success'); // Define a severidade da mensagem


  //cadastro user
  const[nome,setNome] = useState('');
  const[senha,setSenha] = useState('');
  const[email,setEmail] = useState('');
  const[userError,setError] = useState(false);



  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  //handle cadastro user
  const handleUserRegister = async() =>{
    if(!nome.trim() || !senha.trim() || !email.trim()){
      setError(true);
      return;
    }
    setError(false);
    try{
      const response = await registerUser(nome,email,senha);
      if(response){
        setModalMessage("Usuário cadastrado com sucesso!");
        setModalSeverity('success');
        setNome("");
        setEmail("");
        setSenha("");
      }

    }catch(error){
      setModalMessage("Erro ao cadastrar usuário. Tente novamente.");
      setModalSeverity('error');
    }
    handleOpen();
  }


  //handle para cadastro de equipe
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
    } catch (error){
      setModalMessage("Erro ao cadastrar equipe. Tente novamente.");
      setModalSeverity('error');
    }
    handleOpen(); // Abre o modal após a tentativa de registro
  };

  return (
    <> 
      <TopMenu/>
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
