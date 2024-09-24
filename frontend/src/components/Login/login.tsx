import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid, Paper } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/', {
        email,
        senha,
      });

      const { token, is_admin } = response.data;
      localStorage.setItem('token', token);

      if (is_admin) {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh', backgroundColor: '#DAD7CD' }}>
      {/* Container centralizado */}
      <Grid 
        container 
        justifyContent="center" 
        alignItems="center" 
        sx={{ height: '100%' }}
      >
        {/* Formulário de Login */}
        <Grid
          item
          xs={12}
          md={3}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            borderRadius: '8px',
            height: '50%',
            maxHeight: '600px', 
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#344E41', fontSize: '40px' }}>
            Entrar
          </Typography>

          <Box component="form" onSubmit={handleLogin} sx={{ width: '100%', mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: <AccountCircleIcon sx={{ mr: 1 }} />,
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              InputProps={{
                startAdornment: <LockIcon sx={{ mr: 1 }} />,
              }}
            />
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <Typography variant="body2" sx={{ textAlign: 'right', mt: 1, color: '#555' }}>
              Esqueceu a senha?
            </Typography>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 2,
                backgroundColor: '#588157',
                ':hover': { backgroundColor: '#45A049' },
              }}
            >
              Entrar
            </Button>
          </Box>
        </Grid>

        {/* Mensagem de Boas-Vindas */}
        <Grid
          item
          xs={false}
          md={2.5}
          sx={{
            backgroundColor: '#588157',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            height: '50%', 
            maxHeight: '600px',
          }}
        >
          <Box sx={{ textAlign: 'center', p: 3 }}>
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold', fontSize: '36px' }}>
              Bem-Vindo!
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 100 }}>
              Coloque seus dados pessoais e comece sua jornada
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
