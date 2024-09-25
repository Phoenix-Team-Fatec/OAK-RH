import * as React from 'react';
import { Box, Drawer, List, ListItemText, Toolbar, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.css'; // Importe o arquivo CSS

const drawerWidth = 240;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const is_admin = localStorage.getItem('is_admin') === 'true';

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100vh',

          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {/* Botão Dashboard */}
          <Button
            onClick={() => navigate('/dashboardAdmin')}
            fullWidth
            className={`sidebar-button ${location.pathname === '/dashboardAdmin' ? 'active' : ''}`}
          >
            <ListItemText primary="Dashboard" />
          </Button>

          {/* Botão Formulários */}
          <Button
            onClick={() => navigate('/formsAdmin')}
            fullWidth
            className={`sidebar-button ${location.pathname === '/formsAdmin' ? 'active' : ''}`}
          >
            <ListItemText primary="Formulários" />
          </Button>

          {/* Botão Equipes */}
          <Button
            onClick={() => navigate('/equipesAdmin')}
            fullWidth
            className={`sidebar-button ${location.pathname === '/equipesAdmin' ? 'active' : ''}`}
          >
            <ListItemText primary="Equipes" />
          </Button>

          {/* Botão Cadastro */}
         
         { is_admin && (
          <Button
            onClick={() => navigate('/cadastro')}
            fullWidth
            className={`sidebar-button ${location.pathname === '/cadastro' ? 'active' : ''}`}
          >
            <ListItemText primary="Cadastro" />
          </Button>
         )
}
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
