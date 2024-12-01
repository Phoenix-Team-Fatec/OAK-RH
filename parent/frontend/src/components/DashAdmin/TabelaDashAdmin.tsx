import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { getFormsUserAdmin } from './index';
import useUserData from '../../hooks/useUserData';
import './DashAdmin.css';


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 170, align: 'center', headerAlign: 'center' },
  { field: 'user_nome', headerName: 'Nome', width: 220, align: 'center', headerAlign: 'center' },
  { field: 'equipe_nome', headerName: 'Equipe', width: 220, align: 'center', headerAlign: 'center' },
  { field: 'status', headerName: 'Status', width: 170, align: 'center', headerAlign: 'center' },
  { 
    field: 'formulario', 
    headerName: 'Formulário', 
    width: 470, 
    align: 'center', 
    headerAlign: 'center',
  },
];

  

const paginationModel = { page: 0, pageSize: 11 }; // linhas por página

const TabelaDashAdmin: React.FC = () => {

    const [rows, setRows] = React.useState([]);
    const {id} = useUserData()


    const fetchFormsData = async () =>{
      try{
        const response = await getFormsUserAdmin(id)
        setRows(response)

      }catch(error){
        alert("Erro ao listar formulários")
        console.log("Erro ao listar todos os formulário", error)

      }

    }


    React.useEffect( () => {
      fetchFormsData()
    }, []) 



  return (
    <Paper sx={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[3, 5]} //  3 ou 5 linhas por página
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
};



export default TabelaDashAdmin;
