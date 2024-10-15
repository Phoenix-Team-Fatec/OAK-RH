import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { UserProvider } from  './context/UserContext.tsx'; 

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider> 
        <App />
      </UserProvider>
    </ThemeProvider>
  </StrictMode>
);
