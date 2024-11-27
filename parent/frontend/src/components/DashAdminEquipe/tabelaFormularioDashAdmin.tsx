import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { getFormulariosEquipe } from './index';
import './tabelaFormularioDashAdmin.css';
import Chip from '@mui/material/Chip';

interface TabelaFormularioDashAdminProps {
  onFormSelect: (formulario_id: number) => void;
  equipe_id: number;
}



const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 80, align: 'center', headerAlign: 'center' },
  { // Coluna que exibe o nome do formulário, clicavel e já puxando id do formulário a ser exibido
    field: 'formulario', 
    headerName: 'Formulário', 
    width: 210, 
    align: 'left', 
    // Integrar com back-end
    renderCell: (params) => (
      <Chip
        label={params.value}
        variant="outlined"
        sx={{ color: 'black' }}
        onClick={() => window.location.href = `/forms-responses/${params.row.id}`}
      />
    )
//<a href={`/forms-responses/${params.row.id}`} target="_blank" rel="noopener noreferrer">
//       {params.value}
// </a>
    
  }, 
];



const paginationModel = { page: 0, pageSize: 5 };

const TabelaFormularioDashAdmin: React.FC<TabelaFormularioDashAdminProps> = ({ onFormSelect, equipe_id }) => {
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [rows, setRows] = useState([])


  const fetchFormsEquipe = async () => {
    try{
      
      const response = await getFormulariosEquipe(equipe_id)
      console.log(equipe_id)
      console.log(response)
      setRows(response)

    }catch(error){
      console.log(error)
    }

  }



  React.useEffect( () => {
    setRows([])
    fetchFormsEquipe()
  }, [equipe_id])




  const handleRowSelection = (newSelection: number[]) => {
    const selectedId = newSelection.length > 0 ? newSelection[0] : null;
    setSelectedRowId(selectedId);
    
    if (selectedId !== null) {
      const selectedRow = rows.find(row => row.id === selectedId);
      if (selectedRow) {
        onFormSelect(selectedRow.formulario_id);
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
