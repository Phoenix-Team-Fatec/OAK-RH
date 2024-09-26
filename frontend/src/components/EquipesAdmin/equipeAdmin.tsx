import React, { useState } from 'react';
import { Typography, Box, Button, Modal, TextField, Fab } from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';
import Sidebar from '../SideBar/sidebar';
import TeamMembers from '../TeamMembers/TeamMembers';
import './EquipeAdmin.css';
import TopMenu from '../Menu/menu';

const initialTeams = [
  {
    name: 'Equipe Gamma',
    members: [
      { name: 'Carlos Silva', role: 'Líder' },
      { name: 'Ana Paula', role: 'Liderado' },
      { name: 'Matheus Santos', role: 'Líder' },
      { name: 'Vinicius Masanori', role: 'Liderado' },
    ],
  },
];

function EquipeAdmin() {
  const [teams, setTeams] = useState(initialTeams);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false); // Modal para editar equipe
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // Modal para excluir equipe
  const [openAddModal, setOpenAddModal] = useState(false); // Modal para adicionar equipe
  const [newTeamName, setNewTeamName] = useState(''); // Novo nome da equipe
  const [selectedMember, setSelectedMember] = useState(null); // Membro selecionado

  const handleOpen = (team) => {
    setSelectedTeam(team);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
    setTeams(teams.map(t => t === selectedTeam ? { ...t, name: newTeamName } : t));
    setOpenEditModal(false);
  };

  const handleConfirmDelete = () => {
    setTeams(teams.filter(t => t !== selectedTeam));
    setOpenDeleteModal(false);
  };

  const handleAddTeam = () => {
    setTeams([...teams, { name: newTeamName, members: [] }]);
    setOpenAddModal(false);
    setNewTeamName('');
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
                <TeamMembers members={selectedTeam.members} />
                <Button sx={{ mt: 2 }} variant="contained" onClick={handleClose}>Fechar</Button>
              </>
            ) : (
              <Typography variant="h6">Nenhuma equipe selecionada</Typography>
            )}
          </Box>
        </Modal>

        {/* Botão flutuante para adicionar nova equipe */}
        <Fab
          color="primary"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          onClick={() => setOpenAddModal(true)}
        >
          <Add />
        </Fab>
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
