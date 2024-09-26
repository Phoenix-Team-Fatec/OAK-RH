import React, { useState } from 'react';
import { Typography, Box, Button, Modal } from '@mui/material';
import Sidebar from '../SideBar/sidebar';
import TeamMembers from '../TeamMembers/TeamMembers';
import { Delete, Edit } from '@mui/icons-material';
import './EquipeAdmin.css'; // Importa o arquivo CSS
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModalTeam';
import EditMemberModal from '../EditMemberModal/EditMemberModal';

const teams = [
  {
    name: 'Equipe Alpha',
    members: [
      { name: 'Raquel Simões', role: 'Líder' },
      { name: 'Katia Silva', role: 'Liderado' },
      { name: 'Matheus Santos', role: 'Líder' },
      { name: 'Vinicius Masanori', role: 'Liderado' },
    ],
  },
  {
    name: 'Equipe Beta',
    members: [
      { name: 'Matheus Santos', role: 'Líder' },
      { name: 'Vinicius Masanori', role: 'Liderado' },
    ],
  },
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
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false); // Estado para abrir modal de edição
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // Estado para abrir modal de exclusão
  const [selectedMember, setSelectedMember] = useState(null); // Membro selecionado para editar ou excluir

  const handleOpen = (team) => {
    setSelectedTeam(team);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenEditModal(false);
    setOpenDeleteModal(false);
  };

  // Função para abrir o modal de edição de um membro
  const handleEdit = (member) => {
    setSelectedMember(member);
    setOpenEditModal(true);
  };

  // Função para abrir o modal de exclusão de um membro
  const handleDelete = (member) => {
    setSelectedMember(member);
    setOpenDeleteModal(true);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo da página */}
      <Box sx={{ flexGrow: 1, mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>Equipes Admin!</Typography>
        
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

              {/* Botões de Excluir e Editar */}
              <Box sx={{ position: 'absolute', top: 0, display:'flex', gap:"25px"}}>
                <Button onClick={() => handleEdit(team.members[0])} sx={{color:"white"}}><Edit /></Button>
                <Button onClick={() => handleDelete(team.members[0])} sx={{color:"white"}}><Delete /></Button>
              </Box>
            </Box>
          ))}             
          
        </Box>

        {/* Modal para exibir os membros da equipe */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="team-members-modal"
          aria-describedby="team-members-list"
          sx={{ backdropFilter: 'blur(8px)', bgcolor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <Box
            sx={{
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
            }}
          >
            {selectedTeam ? (
              <>
                <Typography id="team-members-modal" variant="h5" gutterBottom>
                  {selectedTeam.name} - Membros
                </Typography>
                <TeamMembers members={selectedTeam.members} />
                <Button sx={{ mt: 2 }} variant="contained" onClick={handleClose} id="Fechar">
                  Fechar
                </Button>
              </>
            ) : (
              <Typography variant="h6">Nenhuma equipe selecionada</Typography>
            )}
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}

export default EquipeAdmin;
