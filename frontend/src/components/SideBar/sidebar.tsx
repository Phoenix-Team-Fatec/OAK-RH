import * as React from 'react';
import { Box, Drawer, List, ListItemText, Toolbar, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.css'; // Importe o arquivo CSS

const drawerWidth = 240;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {/* Botão Dashboard */}
          <Button
            onClick={() => navigate('/dashboard')}
            fullWidth
            className={`sidebar-button ${location.pathname === '/dashboard' ? 'active' : ''}`}
          >
            <ListItemText primary="Dashboard" />
          </Button>

         

          {/* Botão Formulários */}
          <Button
            onClick={() => navigate('/formularios')}
            fullWidth
            className={`sidebar-button ${location.pathname === '/formularios' ? 'active' : ''}`}
          >
            <ListItemText primary="Formulários" />
          </Button>


          {/* Botão Cadastro */}
          <Button
            onClick={() => navigate('/equipes')}
            fullWidth
            className={`sidebar-button ${location.pathname === '/equipes' ? 'active' : ''}`}
          >
            <ListItemText primary="Equipes" />
          </Button>






           {/* Botão Cadastro */}
           <Button
            onClick={() => navigate('/cadastro')}
            fullWidth
            className={`sidebar-button ${location.pathname === '/cadastro' ? 'active' : ''}`}
          >
            <ListItemText primary="Cadastro" />
          </Button>
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;