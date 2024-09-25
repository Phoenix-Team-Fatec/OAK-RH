import React from 'react';
import { Box, IconButton, Avatar, Typography, Select, InputLabel, FormControl, MenuItem } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, useLocation } from 'react-router-dom';

export default function TopMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation(); // Obter a localização atual

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('is_admin');
    navigate('/');
  };

  // Verifica se a rota atual é a DashboardAdmin
  const isDashboardAdmin = location.pathname === '/dashboardAdmin';

  return (
    <Box
      sx={{
        position: 'fixed', // Fixa no topo
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1300, // Garante que o TopMenu sobreponha a Sidebar
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff', // Adiciona cor de fundo para sobrepor
        p: 2,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Opcional: Adiciona sombra para destaque
      }}
    >
      {/* Logo e Botão Voltar */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'green', mr: 1 }}>OAK</Typography>
        <Typography variant="h5" sx={{ color: 'grey', mr: 3 }}>RH</Typography>
      </Box>

      {/* Seletores de Data - Apenas na DashboardAdmin */}
      {isDashboardAdmin && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FormControl sx={{ mr: 2, minWidth: 120 }}>
            <InputLabel>Data Início</InputLabel>
            <Select label="Data Início" defaultValue="">
              <MenuItem value="">Selecione</MenuItem>
              <MenuItem value={10}>10/09/2024</MenuItem>
              <MenuItem value={20}>20/09/2024</MenuItem>
              <MenuItem value={30}>30/09/2024</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ mr: 2, minWidth: 120 }}>
            <InputLabel>Data Fim</InputLabel>
            <Select label="Data Fim" defaultValue="">
              <MenuItem value="">Selecione</MenuItem>
              <MenuItem value={10}>10/09/2024</MenuItem>
              <MenuItem value={20}>20/09/2024</MenuItem>
              <MenuItem value={30}>30/09/2024</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}

      {/* Ícones de Ação */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton>
          <DownloadIcon />
        </IconButton>

        <IconButton onClick={handleClick}>
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
        </IconButton>
        <Typography sx={{ ml: 1, mr: 2 }}>Admin</Typography>

        <IconButton onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
