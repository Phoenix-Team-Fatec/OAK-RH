import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, Modal, TextField, Fab } from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';
import Sidebar from '../SideBar/sidebar';
import TeamMembers from '../TeamMembers/TeamMembers';
import './EquipeAdmin.css';
import TopMenu from '../Menu/menu';
import { listEquipe, deleteEquipeById, updateEquipe } from './equipes';

const equipes = async () => {
  try {
    const response = await listEquipe();
    return response;
  } catch (error) {
    console.log("Error in equipe_user function:", error);
    return error;
  }
};

// Mapear os dados da resposta
 const listEquipes = async () => {
  try {
    const response = await equipes();
    
    const teams = response.map((equipe: any) => {
      return {
        id: equipe.id, //ID da equipe
        name: equipe.nome, // Nome da equipe
       
      };
    });
  
    return teams;
  } catch (error) {
    console.log("Error in listEquipe function:", error);
    return [];
  }
}

function EquipeAdmin() {
  const [teams, setTeams] = useState([]); // Inicializa com um array vazio
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false); 
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [newTeamName, setNewTeamName] = useState(''); 


  const fetchTeams = async () => {
    const teamsData = await listEquipes();
    setTeams(teamsData); // Atualiza o estado com os dados retornados de listEquipe
  };

  // Utiliza o useEffect para chamar listEquipe ao montar o componente
  useEffect(() => {
    
    fetchTeams();
  }, []); // [] significa que só será chamado uma vez, ao montar o componente

  const handleOpen = async (team) => {
    setSelectedTeam(team);
    localStorage.setItem('teamId', team.id);
    setOpen(true);
};

  const handleClose = () => {
    localStorage.removeItem('teamId');
    setOpen(false);
    fetchTeams();
  };

  const handleEdit = (team) => {
    setSelectedTeam(team);
    setOpenEditModal(true);
  };

  const handleDelete = (team) => {
    setSelectedTeam(team);
    setOpenDeleteModal(true);
  };

  const handleSaveEdit = () => {
    if(selectedTeam){
      updateEquipe(selectedTeam.id, newTeamName); // Faz a requisição para atualizar o nome da equipe no banco de dados
      try{

        //requisição para atualizar o nome da equipe
        updateEquipe(selectedTeam.id, newTeamName);

        setTeams(teams.map(t => t.id === selectedTeam.id ? { ...t, name: newTeamName } : t)); // Atualiza o estado local com o novo nome
        setOpenEditModal(false); // Fecha o modal

      }catch(error){
        console.log("Error updating team:", error);
      }
      
    }
   
   
  };

// Função para confirmar exclusão da equipe
const handleConfirmDelete = async () => {
  if (selectedTeam) {
      try {
          // Faz a requisição para excluir a equipe no banco de dados
          await deleteEquipeById(selectedTeam.id);

          // Remove a equipe do estado local após a exclusão no banco
          setTeams(teams.filter(t => t.id !== selectedTeam.id));
          setOpenDeleteModal(false);
      } catch (error) {
          console.log("Error deleting team:", error);
      }
  }
};

  const handleAddTeam = () => {
    // Adiciona a nova equipe ao estado sem recarregar a página
  const newTeam = { id: teams.length + 1, name: newTeamName }; // Criando a nova equipe com um ID único e nome
  setTeams([...teams, newTeam]); // Atualiza o estado com a nova equipe
  


  setOpenAddModal(false); // Fecha o modal
  setNewTeamName(''); // Limpa o campo de entrada
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar /> 
      <TopMenu />
      <Box sx={{ flexGrow: 1, mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ margin: 5 }} variant="h4" gutterBottom>Equipes Admin!</Typography>
        
        {/* Lista de Equipes */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
          {teams.map((team, index) => (
            <Box key={index} sx={{ position: 'relative' }}>
              <Button
                variant="contained"
                sx={{
                  width: 150,
                  height: 150,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'grey.500',
                  '&:hover': {
                    backgroundColor: 'grey.700',
                  },
                }}
                onClick={() => handleOpen(team)}
              >
                {team.name}
              </Button>

              <Box sx={{ position: 'absolute', top: 0, display: 'flex', gap: '25px' }}>
                <Button onClick={() => handleEdit(team)} sx={{ color: 'white' }}><Edit /></Button>
                <Button onClick={() => handleDelete(team)} sx={{ color: 'white' }}><Delete /></Button>
              </Box>
            </Box>
          ))}
        </Box>
        
{/* É NECESSÁRIO REFATORAR ESTE CÓDIGO ABAIXO PARA OS COMPONENTES A FIM DE FACILITAR A LEGIBILIDADE */}
        {/* Modal para adicionar equipe */}
        <Modal
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
        >
          <Box sx={{ ...modalStyles }}>
            <Typography variant="h6">Adicionar Nova Equipe</Typography>
            <TextField
              label="Nome da Equipe"
              fullWidth
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
            />
            <Button variant="contained" sx={{ mt: 2 }} onClick={handleAddTeam}>Adicionar</Button>
          </Box>
        </Modal>

        {/* Modal para editar equipe */}
        <Modal
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
        >
          <Box sx={{ ...modalStyles }}>
            <Typography variant="h6">Editar Nome da Equipe</Typography>
            <TextField
              label="Novo Nome"
              fullWidth
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
            />
            <Button variant="contained" sx={{ mt: 2 }} onClick={handleSaveEdit}>Salvar</Button>
          </Box>
        </Modal>

        {/* Modal para confirmar exclusão */}
        <Modal
          open={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
        >
          <Box sx={{ ...modalStyles }}>
            <Typography variant="h6">Tem certeza que deseja excluir a equipe?</Typography>
            <Button variant="contained" sx={{ mt: 2 }} onClick={handleConfirmDelete}>Excluir</Button>
          </Box>
        </Modal>

        {/* Modal para exibir membros da equipe */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="team-members-modal"
          aria-describedby="team-members-list"
          sx={{ backdropFilter: 'blur(8px)', bgcolor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <Box sx={{ ...modalStyles }}>
            {selectedTeam ? (
              <>
                <Typography id="team-members-modal" variant="h5" gutterBottom>
                  {selectedTeam.name} - Membros
                </Typography>
                <TeamMembers/>
                <Button sx={{ mt: 2 }} variant="contained" onClick={handleClose}>Fechar</Button>
              </>
            ) : (
              <Typography variant="h6">Nenhuma equipe selecionada</Typography>
            )}
          </Box>
        </Modal>

       
      </Box>
    </Box>
  );
};

const modalStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  backdropFilter: 'blur(5px)',
  opacity: 0.9,
};

export default EquipeAdmin;
