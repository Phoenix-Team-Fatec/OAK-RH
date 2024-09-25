import { Typography, Box } from '@mui/material';
import Sidebar from '../SideBar/sidebar';
import TeamMembers from '../Listagem/listagem';

function EquipeAdmin() {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo da página */}
      <Box sx={{ flexGrow: 1, mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>Equipes Admin!</Typography>
        
        {/* Componente de Listagem de Membros */}
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          <TeamMembers />
        </Box>
      </Box>
    </Box>
  );
}

export default EquipeAdmin;