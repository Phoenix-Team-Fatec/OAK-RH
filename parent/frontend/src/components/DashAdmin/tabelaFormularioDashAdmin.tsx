// TabelaFormularioDashAdmin.tsx
import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns: GridColDef[] = [
  { field: 'formulario', headerName: 'Formulário', width: 210, align: 'left', headerAlign: 'left' },
];

const rows = [
    { id: 1, formulario: 'Formulário de Inscrição' },
    { id: 2, formulario: 'Formulário de Avaliação' },
    { id: 3, formulario: 'Formulário de Feedback' },
    { id: 4, formulario: 'Formulário de Registro' },
    { id: 5, formulario: 'Formulário de Satisfação' },
    { id: 6, formulario: 'Formulário de Inscrição' },
    { id: 7, formulario: 'Formulário de Avaliação' },
    { id: 8, formulario: 'Formulário de Feedback' },
    { id: 9, formulario: 'Formulário de Registro' },
    { id: 10, formulario: 'Formulário de Satisfação' },
    { id: 11, formulario: 'Formulário de Inscrição' },
    { id: 12, formulario: 'Formulário de Avaliação' },
    { id: 13, formulario: 'Formulário de Feedback' },
    { id: 14, formulario: 'Formulário de Registro' },
    { id: 15, formulario: 'Formulário de Satisfação' },
];

const paginationModel = { page: 0, pageSize: 11 }; // linhas por página


const TabelaFormularioDashAdmin: React.FC = () => {
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null); // Estado para o ID da linha selecionada

  const handleRowSelection = (newSelection: number[]) => {
    setSelectedRowId(newSelection.length > 0 ? newSelection[0] : null); // Permitir apenas uma seleção
  };

  return (
    <Paper sx={{ height: 700, width: '100%' }}>
      <DataGrid
        initialState={{ pagination: { paginationModel } }}
        rows={rows}
        columns={columns}
        pageSizeOptions={[5]} // 5 linhas por página
        checkboxSelection // Manter as checkboxes das linhas
        disableSelectionOnClick // Desativar seleção ao clicar na linha
        onRowSelectionModelChange={handleRowSelection} // Manipulador de seleção
        rowSelectionModel={selectedRowId ? [selectedRowId] : []} // Somente a linha selecionada
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

export default TabelaFormularioDashAdmin;
