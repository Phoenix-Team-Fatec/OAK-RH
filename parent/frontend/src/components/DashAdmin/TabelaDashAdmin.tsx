import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns: GridColDef[] = [
  { field: 'Nome', headerName: 'Nome', width: 200, align: 'center', headerAlign: 'center' },
  { field: 'Equipe', headerName: 'Equipe', width: 200, align: 'center', headerAlign: 'center' },
  { field: 'Respondido', headerName: 'Respondido', width: 200, align: 'center', headerAlign: 'center' },
  { field: 'Data', headerName: 'Data', type: 'number', width: 200, align: 'center', headerAlign: 'center' },
];

const rows = [
    { id: 1, Nome: 'Lucas Silva', Equipe: 'Administração', Respondido: 'Sim', Data: '2024-11-01' },
    { id: 2, Nome: 'Ana Souza', Equipe: 'Financeiro', Respondido: 'Não', Data: '2024-10-30' },
    { id: 3, Nome: 'Marcos Oliveira', Equipe: 'Desenvolvimento', Respondido: 'Sim', Data: '2024-11-01' },
    { id: 4, Nome: 'Fernanda Costa', Equipe: 'Administração', Respondido: 'Não', Data: '2024-10-29' },
    { id: 5, Nome: 'Carlos Almeida', Equipe: 'Financeiro', Respondido: 'Sim', Data: '2024-10-28' },
    { id: 6, Nome: 'Patrícia Lima', Equipe: 'Desenvolvimento', Respondido: 'Sim', Data: '2024-10-27' },
    { id: 7, Nome: 'João Pereira', Equipe: 'Administração', Respondido: 'Não', Data: '2024-10-26' },
    { id: 8, Nome: 'Juliana Martins', Equipe: 'Financeiro', Respondido: 'Sim', Data: '2024-10-25' },
    { id: 9, Nome: 'Felipe Rocha', Equipe: 'Desenvolvimento', Respondido: 'Não', Data: '2024-10-24' },
    { id: 10, Nome: 'Mariana Dias', Equipe: 'Administração', Respondido: 'Sim', Data: '2024-10-23' },
    { id: 11, Nome: 'Gustavo Santos', Equipe: 'Financeiro', Respondido: 'Não', Data: '2024-10-22' },
    { id: 12, Nome: 'Aline Ferreira', Equipe: 'Desenvolvimento', Respondido: 'Sim', Data: '2024-10-21' },
    { id: 13, Nome: 'Roberto Mendes', Equipe: 'Administração', Respondido: 'Não', Data: '2024-10-20' },
    { id: 14, Nome: 'Sofia Ribeiro', Equipe: 'Financeiro', Respondido: 'Sim', Data: '2024-10-19' },
    { id: 15, Nome: 'Eduardo Martins', Equipe: 'Desenvolvimento', Respondido: 'Não', Data: '2024-10-18' },
    { id: 16, Nome: 'Tatiane Lima', Equipe: 'Administração', Respondido: 'Sim', Data: '2024-10-17' },
    { id: 17, Nome: 'Diego Alves', Equipe: 'Financeiro', Respondido: 'Não', Data: '2024-10-16' },
    { id: 18, Nome: 'Vanessa Gomes', Equipe: 'Desenvolvimento', Respondido: 'Sim', Data: '2024-10-15' },
    { id: 19, Nome: 'Roberta Nascimento', Equipe: 'Administração', Respondido: 'Não', Data: '2024-10-14' },
    { id: 20, Nome: 'Rafael Santos', Equipe: 'Financeiro', Respondido: 'Sim', Data: '2024-10-13' },
  ];
  

const paginationModel = { page: 0, pageSize: 10 }; // linhas por página

const TabelaDashAdmin: React.FC = () => {
  return (
    <Paper sx={{ height: 650, width: '100%' }}>
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
