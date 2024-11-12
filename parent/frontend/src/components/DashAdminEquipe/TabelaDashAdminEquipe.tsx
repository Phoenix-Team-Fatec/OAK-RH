import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { getUserFormularioEquipe } from '.';

interface TabelaDashAdminEquipeProps {
  selectedForm: number;
  equipe_id: number;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 240, align: 'center', headerAlign: 'center' },
  { field: 'user_nome', headerName: 'Nome', width: 240, align: 'center', headerAlign: 'center' },
  { field: 'status', headerName: 'Status', width: 245, align: 'center', headerAlign: 'center' },
];



const paginationModel = { page: 0, pageSize: 5 };

const TabelaDashAdminEquipe: React.FC<TabelaDashAdminEquipeProps> = ({ selectedForm, equipe_id }) => {

  const [rows, setRows] = useState([]);

  const fetchFormsUserEqupe = async () => {
    try{
      const response = await getUserFormularioEquipe(equipe_id, selectedForm)
      console.log(response)
      setRows(response)


    }catch(error){
      alert("Erro ao listar os formulários")
      console.log(error)
    }
  }


  React.useEffect( () => {
    fetchFormsUserEqupe()
  }, [selectedForm, equipe_id])

  return (
    <Paper sx={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={rows}
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
