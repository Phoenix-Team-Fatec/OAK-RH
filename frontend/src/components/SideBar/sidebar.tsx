import * as React from 'react';
import { Box, Drawer, List, ListItemText, Toolbar, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.css';
// Ícones
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupsIcon from '@mui/icons-material/Groups';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import FeedIcon from '@mui/icons-material/Feed';

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
            sx={{
              width: '80%',  // Define a largura dos botões em 80% da sidebar
              margin: '10px auto',  // Centraliza os botões e define espaçamento
              display: 'flex',
              justifyContent: 'flex-start',
              padding: '12px',
              borderRadius: '20px',
              transition: 'transform 0.3s ease',  // Transição suave para o efeito de hover
            }}
            className={`sidebar-button ${location.pathname === '/dashboardAdmin' ? 'active' : ''}`}
          >
            <GroupAddIcon className='icone_sidebar' />
            <ListItemText primary="Dashboard" />
          </Button>

          {/* Botão Formulários */}
          <Button
            onClick={() => navigate('/formsAdmin')}
            sx={{
              width: '80%',
              margin: '10px auto',
              display: 'flex',
              justifyContent: 'flex-start',
              padding: '12px',
              borderRadius: '20px',
              transition: 'transform 0.3s ease',
            }}
            className={`sidebar-button ${location.pathname === '/formsAdmin' ? 'active' : ''}`}
          >
            <GroupsIcon className='icone_sidebar' />
            <ListItemText primary="Formulários" />
          </Button>

          {/* Botão Equipes */}
          <Button
            onClick={() => navigate('/equipesAdmin')}
            sx={{
              width: '80%',
              margin: '10px auto',
              display: 'flex',
              justifyContent: 'flex-start',
              padding: '12px',
              borderRadius: '20px',
              transition: 'transform 0.3s ease',
            }}
            className={`sidebar-button ${location.pathname === '/equipesAdmin' ? 'active' : ''}`}
          >
            <SpaceDashboardIcon className='icone_sidebar' />
            <ListItemText primary="Equipes" />
          </Button>

          {/* Botão Cadastro */}
          {is_admin && (
            <Button
              onClick={() => navigate('/cadastro')}
              sx={{
                width: '80%',
                margin: '10px auto',
                display: 'flex',
                justifyContent: 'flex-start',
                padding: '12px',
                borderRadius: '20px',
                transition: 'transform 0.3s ease',
              }}
              className={`sidebar-button ${location.pathname === '/cadastro' ? 'active' : ''}`}
            >
              <FeedIcon className='icone_sidebar' />
              <ListItemText primary="Cadastro" />
            </Button>
          )}
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
