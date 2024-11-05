import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 150, align: 'center', headerAlign: 'center' },
  { field: 'Nome', headerName: 'Nome', width: 200, align: 'center', headerAlign: 'center' },
  { field: 'Equipe', headerName: 'Equipe', width: 200, align: 'center', headerAlign: 'center' },
  { field: 'Respondido', headerName: 'Respondido', width: 150, align: 'center', headerAlign: 'center' },
  { 
    field: 'formulario', 
    headerName: 'Formulário', 
    width: 385, 
    align: 'center', 
    headerAlign: 'center',
    renderCell: (params) => (
      <a 
        href={`https://exemplo.com/formularios/${params.row.id}`}  //Link para o formulário
        target="_blank" 
        rel="noopener noreferrer"
        style={{ color: 'inherit', textDecoration: 'none' }} // Remove o azul e o sublinhado
      >
        {params.value}
      </a>
    ),
  },
];

const rows = [
  { id: 1001, Nome: 'Lucas Silva', Equipe: 'Administração', Respondido: 'Sim', formulario: 'Formulário de Avaliação de Desempenho' },
  { id: 1002, Nome: 'Ana Souza', Equipe: 'Financeiro', Respondido: 'Não', formulario: 'Formulário de Solicitação de Reembolso' },
  { id: 1003, Nome: 'Marcos Oliveira', Equipe: 'Desenvolvimento', Respondido: 'Sim', formulario: 'Formulário de Feedback de Projeto' },
  { id: 1004, Nome: 'Fernanda Costa', Equipe: 'Administração', Respondido: 'Não', formulario: 'Formulário de Solicitação de Férias' },
  { id: 1005, Nome: 'Carlos Almeida', Equipe: 'Financeiro', Respondido: 'Sim', formulario: 'Formulário de Aprovação de Orçamento' },
  { id: 1006, Nome: 'Patrícia Lima', Equipe: 'Desenvolvimento', Respondido: 'Sim', formulario: 'Formulário de Relatório de Bug' },
  { id: 1007, Nome: 'João Pereira', Equipe: 'Administração', Respondido: 'Não', formulario: 'Formulário de Atualização de Dados Pessoais' },
  { id: 1008, Nome: 'Juliana Martins', Equipe: 'Financeiro', Respondido: 'Sim', formulario: 'Formulário de Solicitação de Pagamento' },
  { id: 1009, Nome: 'Felipe Rocha', Equipe: 'Desenvolvimento', Respondido: 'Não', formulario: 'Formulário de Planejamento de Sprint' },
  { id: 1010, Nome: 'Mariana Dias', Equipe: 'Administração', Respondido: 'Sim', formulario: 'Formulário de Avaliação de Treinamento' },
  { id: 1011, Nome: 'Gustavo Santos', Equipe: 'Financeiro', Respondido: 'Não', formulario: 'Formulário de Relatório Financeiro' },
  { id: 1012, Nome: 'Aline Ferreira', Equipe: 'Desenvolvimento', Respondido: 'Sim', formulario: 'Formulário de Solicitação de Equipamento' },
  { id: 1013, Nome: 'Roberto Mendes', Equipe: 'Administração', Respondido: 'Não', formulario: 'Formulário de Pesquisa de Satisfação' },
  { id: 1014, Nome: 'Sofia Ribeiro', Equipe: 'Financeiro', Respondido: 'Sim', formulario: 'Formulário de Controle de Despesas' },
  { id: 1015, Nome: 'Eduardo Martins', Equipe: 'Desenvolvimento', Respondido: 'Não', formulario: 'Formulário de Revisão de Código' },
  { id: 1016, Nome: 'Tatiane Lima', Equipe: 'Administração', Respondido: 'Sim', formulario: 'Formulário de Solicitação de Transferência' },
  { id: 1017, Nome: 'Diego Alves', Equipe: 'Financeiro', Respondido: 'Não', formulario: 'Formulário de Análise de Investimentos' },
  { id: 1018, Nome: 'Vanessa Gomes', Equipe: 'Desenvolvimento', Respondido: 'Sim', formulario: 'Formulário de Documentação Técnica' },
  { id: 1019, Nome: 'Roberta Nascimento', Equipe: 'Administração', Respondido: 'Não', formulario: 'Formulário de Solicitação de Aumento' },
  { id: 1020, Nome: 'Rafael Santos', Equipe: 'Financeiro', Respondido: 'Sim', formulario: 'Formulário de Planejamento Orçamentário' },
];
  

const paginationModel = { page: 0, pageSize: 11 }; // linhas por página

const TabelaDashAdmin: React.FC = () => {
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
