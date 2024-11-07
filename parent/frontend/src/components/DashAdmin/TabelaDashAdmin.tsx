import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { getFormsUserAdmin } from './index';
import useUserData from '../../hooks/useUserData';


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 150, align: 'center', headerAlign: 'center' },
  { field: 'user_nome', headerName: 'Nome', width: 200, align: 'center', headerAlign: 'center' },
  { field: 'equipe_nome', headerName: 'Equipe', width: 200, align: 'center', headerAlign: 'center' },
  { field: 'status', headerName: 'Status', width: 150, align: 'center', headerAlign: 'center' },
  { 
    field: 'formulario', 
    headerName: 'Formulário', 
    width: 385, 
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
        localeText={{
          // Traduções para português
          noRowsLabel: 'Nenhuma linha',
          noResultsOverlayLabel: 'Nenhum resultado encontrado',
          errorOverlayDefaultLabel: 'Ocorreu um erro',
          footerRowSelected: (count) => `${count} linha(s) selecionada(s)`,
          footerTotalRows: 'Total de linhas:',
          filterPanelInputLabel: 'Filtrar',
          filterPanelAddFilter: 'Adicionar filtro',
          filterPanelDeleteIconLabel: 'Excluir',
          filterPanelOperators: 'Operadores',
          filterPanelOperatorAnd: 'E',
          filterPanelOperatorOr: 'Ou',
          filterPanelOperatorLessThan: 'Menor que',
          filterPanelOperatorLessThanOrEqual: 'Menor ou igual a',
          filterPanelOperatorGreaterThan: 'Maior que',
          filterPanelOperatorGreaterThanOrEqual: 'Maior ou igual a',
          filterPanelOperatorEquals: 'Igual a',
          filterPanelOperatorContains: 'Contém',
          filterPanelOperatorStartsWith: 'Começa com',
          filterPanelOperatorEndsWith: 'Termina com',
          filterPanelOperatorIs: 'É',
          filterPanelOperatorIsNot: 'Não é',
          filterPanelClearButtonLabel: 'Limpar',
          filterPanelSubmitButtonLabel: 'Aplicar',
          filterPanelCloseButtonLabel: 'Fechar',
          columnMenuLabel: 'Menu',
          columnMenuShowColumns: 'Mostrar colunas',
          columnMenuFilter: 'Filtrar',
          columnMenuHideColumn: 'Ocultar coluna',
          columnMenuUnsort: 'Desordenar',
          columnMenuSortAsc: 'Ordenar Crescente',
          columnMenuSortDesc: 'Ordenar Decrescente',
          columnHeaderFiltersTooltip: 'Filtrar',
          columnHeaderSortTooltip: 'Ordenar',
          columnHeaderFilters: 'Filtros',
          columnHeaderSort: 'Ordenação',
          columnHeaderSortBy: 'Ordenar por',
          columnHeaderSortAsc: 'Ordenar Crescente',
          columnHeaderSortDesc: 'Ordenar Decrescente',
        }}
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default TabelaDashAdmin;
