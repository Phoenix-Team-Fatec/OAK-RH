import { Typography, Box } from '@mui/material';
import Sidebar from '../SideBar/sidebar';

function DashboardAdmin() {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo da página */}
      <Box sx={{ flexGrow: 1, mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4">Dashboard Admin!</Typography>
      </Box>
    </Box>
  );
}

export default DashboardAdmin;
