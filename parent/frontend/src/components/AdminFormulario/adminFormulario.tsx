import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Para navegação
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TopMenu from '../Menu/menu';
import Sidebar from '../SideBar/sidebar';

interface Formulario {
  id: number;
  nome: string;
  equipe: string;
  data: string;
}

const AdminFormulario: React.FC = () => {
  const [formularios, setFormularios] = useState<Formulario[]>([]);
  const navigate = useNavigate(); // Para redirecionar para a página de edição

  // Simulação de busca de dados do backend
  useEffect(() => {
    const fetchFormularios = async () => {
      try {
        const response = await fetch('/api/formularios'); // Substituir pelo endpoint real do back
        if (!response.ok) {
          throw new Error('Erro ao buscar dados');
        }
        const data = await response.json();
        setFormularios(data);
      } catch (error) {
        console.error('Erro ao buscar formulários:', error);
      }
    };

    fetchFormularios();
  }, []);

  // Função para redirecionar à página de edição de um formulário
  const handleEdit = (id: number) => {
    navigate(`/admin/formularios/editar/${id}`); // Substituir pela rota de edição do form
  };

  // Função para excluir um formulário do backend
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/formularios/${id}`, { //substituir a rota pra excluir
        method: 'DELETE',
      });

      if (response.ok) {
        setFormularios(formularios.filter(form => form.id !== id)); // Remove o formulário localmente
        console.log(`Formulário com ID: ${id} excluído`);
      } else {
        console.error('Erro ao excluir formulário');
      }
    } catch (error) {
      console.error('Erro ao excluir formulário:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <TopMenu />
        <Box sx={{ p: 2 }}>
          <h1>Formulários</h1>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Formulário</TableCell>
                  <TableCell>Equipe</TableCell>
                  <TableCell>Data</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formularios.map((formulario) => (
                  <TableRow key={formulario.id}>
                    <TableCell>{formulario.nome}</TableCell>
                    <TableCell>{formulario.equipe}</TableCell>
                    <TableCell>{formulario.data}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(formulario.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(formulario.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminFormulario;



//FALTA  um end point pra cada : Rota de busca dos formulários ; Rota de edição dos Formulário ; Rota de Exclusão dos formulários