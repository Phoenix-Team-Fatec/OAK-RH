import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { TextField, Autocomplete, Button, Typography, Modal, Card, CardActionArea, Grid } from '@mui/material'; 
import Sidebar from '../SideBar/sidebar';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,  
  height: 600, 
  bgcolor: 'background.paper',
  border: '2px solid #556B2F',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
};

const CadastroUser: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null); // Estado para o card selecionado
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Função que será chamada ao clicar em um card
  const handleCardClick = (team: string) => {
    setSelectedTeam(team); // Atualiza o estado com o card selecionado
    handleClose(); // Fecha o modal após a seleção
  };

  return (
    <>
      <h1>Cadastro</h1>

      

      {/* Estrutura principal usando Flexbox */}
      <Box
        component="form"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          '& > :not(style)': { m: 1 },
          width: '100%',
        }}
        noValidate
        autoComplete="off"
      >
        <Sidebar/>
        {/* Coluna esquerda - Campos principais */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '48%',
            gap: '18px',
          }}
        >
          <TextField id="cadastro_usuario" label="Usuário" variant="outlined" />
          <TextField id="cadastro_email" label="E-Mail" variant="outlined" />
          <TextField id="cadastro_senha" label="Senha" variant="outlined" type="password" />
          <Autocomplete
            disablePortal
            options={['Líder', 'Liderado']} 
            sx={{ width: '100%' }} 
            renderInput={(params) => <TextField {...params} label="Cargo"/>}
          />
        </Box>

        {/* Coluna direita - Campo de Equipes */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '48%',
          }}
        >
          <TextField id="cadastro_equipes" label="Cadastro de equipes" variant="outlined" />
        </Box>
      </Box>

      {/* Botão para abrir o modal */}
      <Button onClick={handleOpen} sx={{ mt: 2, color:'white', backgroundColor:'green'}}>Selecione a equipe:</Button>

      {/* Exibir o card da equipe selecionada fora do modal */}
      {selectedTeam && (
        <Box sx={{ 
              mt: 2,
              p: 2,
              borderRadius:'10px',
              border: '1px solid',
              width: '150px',
              height:'150px',
              backgroundColor: '#556B2F',
              color: 'white',
              display: 'flex',              // Flexbox para centralizar o conteúdo
              justifyContent: 'center',     // Alinha horizontalmente
              alignItems: 'center',         // Alinha verticalmente
              }}>
          <Typography variant="h6">{selectedTeam}</Typography>
        </Box>
      )}

      {/* Modal de seleção das equipes */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            EQUIPES
          </Typography>
          
          {/* Grid para organizar os cards --- length de array controla o número de cards */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {Array.from({ length: 16 }).map((_, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <CardActionArea onClick={() => handleCardClick(`Equipe ${index + 1}`)}>
                  <Card 
                    sx={{ 
                      backgroundColor: '#556B2F', 
                      height: 100, 
                      color: 'white', 
                      border: '20px', 
                      borderRadius: '10px',
                      display: 'flex',              // Flexbox para centralizar o conteúdo
                      justifyContent: 'center',     // Alinha horizontalmente
                      alignItems: 'center',         // Alinha verticalmente
                    }}
                  >
                    <Typography variant="h6" align="center">Equipe {index + 1}</Typography>
                  </Card>
                </CardActionArea>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default CadastroUser;
