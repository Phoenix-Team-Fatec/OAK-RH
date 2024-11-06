import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

interface TabelaDashAdminEquipeProps {
  selectedForm: string | null;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 170, align: 'center', headerAlign: 'center' },
  { field: 'Nome', headerName: 'Nome', width: 230, align: 'center', headerAlign: 'center' },
  { field: 'Status', headerName: 'Status', width: 230, align: 'center', headerAlign: 'center' },
  { field: 'data', headerName: 'Data', width: 170, align: 'center', headerAlign: 'center' },
];

const rows = [
  { id: 1001, Nome: 'Lucas Silva', Status: 'Respondido', data: '2023-01-01', formulario: 'Formulário de Inscrição' },
  { id: 1002, Nome: 'Ana Souza', Status: 'Pendente', data: '2023-01-02', formulario: 'Formulário de Avaliação' },
  { id: 1003, Nome: 'Marcos Oliveira', Status: 'Respondido', data: '2023-01-03', formulario: 'Formulário de Feedback' },
  { id: 1004, Nome: 'Fernanda Costa', Status: 'Pendente', data: '2023-01-04', formulario: 'Formulário de Registro' },
  { id: 1005, Nome: 'Carlos Almeida', Status: 'Respondido', data: '2023-01-05', formulario: 'Formulário de Satisfação' },
];

const paginationModel = { page: 0, pageSize: 5 };

const TabelaDashAdminEquipe: React.FC<TabelaDashAdminEquipeProps> = ({ selectedForm }) => {
  const filteredRows = rows.filter(row => row.formulario === selectedForm);

  return (
    <Paper sx={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5]}
        checkboxSelection
        localeText={{
          noRowsLabel: 'Nenhuma linha',
          noResultsOverlayLabel: 'Nenhum resultado encontrado',
          errorOverlayDefaultLabel: 'Ocorreu um erro',
          footerRowSelected: (count) => `${count} linha(s) selecionada(s)`,
        }}
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default TabelaDashAdminEquipe;
