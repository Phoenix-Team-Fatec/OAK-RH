import React, { useState, useMemo } from 'react';
import Paper from '@mui/material/Paper';
import { Checkbox, Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SidebarAdmin from '../../components/SidebarAdmin/SidebarAdmin';
import ModalCreateCategory from '../../components/ModalCreateCategory/ModalCreateCategory'; // Importa o Modal
import './adminFormulario.css'; // Certifique-se de que o caminho do CSS está correto
import axios from 'axios'; // Importa o axios

const Formularios: React.FC = () => {
  const [rows, setRows] = useState<any[]>([
    // Dados estáticos de exemplo
    { id: 1, nome: 'Formulário 1', descricao: 'Descrição do Formulário 1', criado_em: '2023-01-01' },
    { id: 2, nome: 'Formulário 2', descricao: 'Descrição do Formulário 2', criado_em: '2023-02-01' },
    { id: 3, nome: 'Formulário 3', descricao: 'Descrição do Formulário 3', criado_em: '2023-03-01' },
    { id: 4, nome: 'Formulário 4', descricao: 'Descrição do Formulário 4', criado_em: '2023-04-01' },
    { id: 5, nome: 'Formulário 5', descricao: 'Descrição do Formulário 5', criado_em: '2023-05-01' },
    { id: 6, nome: 'Formulário 6', descricao: 'Descrição do Formulário 6', criado_em: '2023-06-01' },
    { id: 7, nome: 'Formulário 7', descricao: 'Descrição do Formulário 7', criado_em: '2023-07-01' },
    { id: 8, nome: 'Formulário 8', descricao: 'Descrição do Formulário 8', criado_em: '2023-08-01' },
    { id: 9, nome: 'Formulário 9', descricao: 'Descrição do Formulário 9', criado_em: '2023-09-01' },
    { id: 10, nome: 'Formulário 10', descricao: 'Descrição do Formulário 10', criado_em: '2023-10-01' },
    { id: 11, nome: 'Formulário 11', descricao: 'Descrição do Formulário 11', criado_em: '2023-11-01' }
  ]);
    // ... os outros formulários
    
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar o modal

  const handleSelect = (id: number) => {
    setSelectedIds(prevSelectedIds => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter(selectedId => selectedId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allIds = rows.map(row => row.id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const isAllSelected = rows.length > 0 && selectedIds.length === rows.length;
  const isSomeSelected = selectedIds.length > 0 && selectedIds.length < rows.length;

// Deletando -  
  const handleDelete = async () => {
    if (selectedIds.length === 0) {
      alert("Selecione pelo menos um formulário para deletar.");
      return;
    }
  
    if (!confirm('Tem certeza que deseja deletar os formulários selecionados?')) {
      return;
    }
  
    setIsDeleting(true);
  
    try {
      // Faz a requisição de deletar para cada formulário selecionado
      await Promise.all(
        selectedIds.map(async (formularioId) => {
          await axios.delete(`http://localhost:3000/formulario/${formularioId}`);
        })
      );
  
      // Remove os formulários deletados da lista exibida na tabela
      const updatedRows = rows.filter(row => !selectedIds.includes(row.id));
      setRows(updatedRows);
      setSelectedIds([]); // Limpa as seleções
      alert("Formulários deletados com sucesso.");
    } catch (error) {
      console.error("Erro ao deletar formulários", error);
      alert("Erro ao deletar formulários. Tente novamente.");
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: GridColDef[] = useMemo(() => [
    {
      field: 'select',
      headerName: 'Selecionar',
      renderHeader: () => (
        <Checkbox
          indeterminate={isSomeSelected}
          checked={isAllSelected}
          onChange={handleSelectAll}
          inputProps={{ 'aria-label': 'select all rows' }}
          disabled={isDeleting}
        />
      ),
      width: 180,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: any) => (
        <Checkbox
          checked={selectedIds.includes(params.row.id)}
          onChange={() => handleSelect(params.row.id)}
          inputProps={{ 'aria-label': `select row ${params.row.id}` }}
          disabled={isDeleting}
        />
      )
    },
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'nome', headerName: 'Título', width: 300 },
    { field: 'descricao', headerName: 'Descrição', width: 400 },
    { field: 'criado_em', headerName: 'Criado em', width: 200 },
  ], [selectedIds, rows, isAllSelected, isSomeSelected, isDeleting]);

  return (
    <>
      <SidebarAdmin />
      <div className="content">
        <h2>Gerenciamento de Formulários</h2>

        <div className="actions">
          <Button
            variant="contained"
            color="primary"
            onClick={() => alert("Redirecionar para página de cadastro")}
            disabled={isDeleting}
          >
            Cadastrar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => alert("Redirecionar para página de edição")}
            disabled={selectedIds.length !== 1 || isDeleting}
          >
            Editar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deletando...' : 'Deletar'}
          </Button>
          <Button
            variant="contained"
            color="info"
            onClick={() => setIsModalOpen(true)} // Abre o modal ao clicar
          >
            Categoria +
          </Button>
        </div>

        <Paper style={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[10, 25, 30]}
            checkboxSelection={false}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
              sorting: {
                sortModel: [{ field: 'id', sort: 'asc' }]
              },
            }}
            pagination
            getRowId={(row) => row.id}
          />
        </Paper>

        {/* Modal para criar nova categoria */}
        <ModalCreateCategory
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)} // Fecha o modal ao clicar
        />
      </div>
    </>
  );
};

export default Formularios;
