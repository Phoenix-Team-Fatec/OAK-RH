import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

interface TabelaFormularioDashAdminProps {
  onFormSelect: (formulario: string) => void;
}

const columns: GridColDef[] = [
  { field: 'formulario', headerName: 'Formulário', width: 290, align: 'left', headerAlign: 'left' },
];

const rows = [
  { id: 1, formulario: 'Formulário de Inscrição' },
  { id: 2, formulario: 'Formulário de Avaliação' },
  { id: 3, formulario: 'Formulário de Feedback' },
  { id: 4, formulario: 'Formulário de Registro' },
  { id: 5, formulario: 'Formulário de Satisfação' },
];

const paginationModel = { page: 0, pageSize: 5 };

const TabelaFormularioDashAdmin: React.FC<TabelaFormularioDashAdminProps> = ({ onFormSelect }) => {
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

  const handleRowSelection = (newSelection: number[]) => {
    const selectedId = newSelection.length > 0 ? newSelection[0] : null;
    setSelectedRowId(selectedId);
    
    if (selectedId !== null) {
      const selectedRow = rows.find(row => row.id === selectedId);
      if (selectedRow) {
        onFormSelect(selectedRow.formulario);
      }
    }
  };

  return (
    <Paper sx={{ height: 700, width: '100%' }}>
      <DataGrid
        initialState={{ pagination: { paginationModel } }}
        rows={rows}
        columns={columns}
        pageSizeOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        onRowSelectionModelChange={handleRowSelection}
        rowSelectionModel={selectedRowId ? [selectedRowId] : []}
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

export default TabelaFormularioDashAdmin;
