import { useState } from 'react';
import { Typography, Box, Button, Modal} from '@mui/material';
import Sidebar from '../SideBar/sidebar';
import TeamMembers from '../Listagem/listagem';
import './EquipeAdmin.css'; // Importa o arquivo CSS

// Dados das equipes com membros
const teams = [
  {
    name: 'Equipe Alpha',
    members: [
      { name: 'Raquel Simões', role: 'Líder' },
      { name: 'Katia Silva', role: 'Liderado' },

    ],
  },
  {
    name: 'Equipe Beta',
    members: [
      { name: 'Matheus Santos', role: 'Lider' },
      { name: 'Vinicius Masanori', role: 'Liderado' },
    ],
  },
  {
    name: 'Equipe Gamma',
    members: [
      { name: 'Carlos Silva', role: 'Líder' },
      { name: 'Ana Paula', role: 'Liderado' },
    ],
  },
  {
    name: 'Equipe Delta',
    members: [
      { name: 'Fernanda Costa', role: 'Líder' },
      { name: 'Roberto Lopes', role: 'Liderado' },
    ],
  },
  {
    name: 'Equipe Epsilon',
    members: [
      { name: 'Gabriel Oliveira', role: 'Líder' },
      { name: 'Maria Souza', role: 'Liderado' },
    ],
  },
  {
    name: 'Equipe Zeta',
    members: [
      { name: 'Paulo Henrique', role: 'Líder' },
      { name: 'Lara Mendes', role: 'Liderado' },
    ],
  },
  {
    name: 'Equipe Eta',
    members: [
      { name: 'Bruno Torres', role: 'Líder' },
      { name: 'Luciana Reis', role: 'Liderado' },
    ],
  },
  {
    name: 'Equipe Theta',
    members: [
      { name: 'Carolina Rocha', role: 'Líder' },
      { name: 'Felipe Cardoso', role: 'Liderado' },
    ],
  },
  {
    name: 'Equipe Iota',
    members: [
      { name: 'Pedro Marques', role: 'Líder' },
      { name: 'Juliana Costa', role: 'Liderado' },
    ],
  },
  {
    name: 'Equipe Kappa',
    members: [
      { name: 'Rafael Duarte', role: 'Líder' },
      { name: 'Marcela Alves', role: 'Liderado' },
    ],
  },
];

function EquipeAdmin() {
  const [selectedTeam, setSelectedTeam] = useState(null); // Armazena a equipe selecionada
  const [open, setOpen] = useState(false); // Controle do modal

  // Função para abrir o modal e definir a equipe selecionada
  const handleOpen = (team) => {
    setSelectedTeam(team);
    setOpen(true);
  };

  // Função para fechar o modal
  const handleClose = () => {
    setOpen(false);
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
            <Button
              key={index}
              variant="contained"
              sx={{
                width: 150,
                height: 150,
                display: 'flex',
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
          ))}
        </Box>

        {/* Modal para exibir os membros da equipe */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="team-members-modal"
          aria-describedby="team-members-list"
          sx={{ backdropFilter: 'blur(8px)', bgcolor: 'rgba(0, 0, 0, 0.5)' }} // Opacidade no fundo
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              backdropFilter: 'blur(5px)',
              opacity: 0.9, // Aplicando opacidade ao modal
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
