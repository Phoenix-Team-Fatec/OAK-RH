import React, { useState, useMemo, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { Checkbox, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import SidebarAdmin from "../../../components/ComponentsAdmin/SidebarAdmin/SidebarAdmin";
import ModalCreateCategory from "../../../components/ModalCreateCategory/ModalCreateCategory"; // Importa o Modal
import "./adminFormulario.css"; // Certifique-se de que o caminho do CSS está correto
import { getFormularios, deleteFormulario } from "./formsAdminBackend";
import { useNavigate } from "react-router-dom";
import ModalSendForm from "../../../components/modalSendFormsTeam/ModalSendFormsTeam";

import useUserData from "../../../hooks/useUserData";

interface Forms {
  id: number;
  nome: string;
  descricao: string;
  criado_em: string;
}

const FormsAdmin: React.FC = () => {
  const [rows, setRows] = useState<Forms[]>([]);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar o modal
  const [isModalOpenSend, setIsModalOpenSend] = useState(false); // Estado para controlar o modal de envio
  const { id } = useUserData();
  
  const [isExpanded, setIsExpanded] = useState(true); // State for sidebar

  const navigate = useNavigate();

  //Listando formulários
  const fetchForms = async () => {
    if (id) {
      try {
        const id_admin = id;
        const response = await getFormularios(id_admin);

        setRows(response);
      } catch (error) {
        console.error("Erro ao buscar formulários", error);
        alert("Erro ao buscar formulários");
      }
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      if (id != 0) {
        try {
          await fetchForms();
        } catch (error) {
          console.log("Erro ao buscar formulários", error);
        }
      }
    };
    loadUserData();
  }, [id]);

  const handleSelect = (id: number) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allIds = rows.map((row) => row.id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const isAllSelected = rows?.length > 0 && selectedIds.length === rows.length;
  const isSomeSelected =
    selectedIds?.length > 0 && selectedIds.length < rows?.length;

  // Deletando -
  const handleDelete = async () => {
    if (selectedIds.length === 0) {
      alert("Selecione pelo menos um formulário para deletar.");
      return;
    }

    if (
      !confirm("Tem certeza que deseja deletar os formulários selecionados?")
    ) {
      return;
    }

    setIsDeleting(true);

    try {
      // Faz a requisição de deletar para cada formulário selecionado
      await Promise.all(
        selectedIds.map(async (formularioId) => {
          await deleteFormulario(formularioId);
        })
      );

      // Remove os formulários deletados da lista exibida na tabela
      const updatedRows = rows.filter((row) => !selectedIds.includes(row.id));
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

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "select",
        headerName: "Selecionar",
        renderHeader: () => (
          <Checkbox
            indeterminate={isSomeSelected}
            checked={isAllSelected}
            onChange={handleSelectAll}
            inputProps={{ "aria-label": "select all rows" }}
            disabled={isDeleting}
          />
        ),
        width: 80,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: (params: any) => (
          <Checkbox
            checked={selectedIds.includes(params.row.id)}
            onChange={() => handleSelect(params.row.id)}
            inputProps={{ "aria-label": `select row ${params.row.id}` }}
            disabled={isDeleting}
          />
        ),
      },
      { field: "id", headerName: "ID", width: 100 },
      { field: "nome", headerName: "Título", width: 300 },
      { field: "descricao", headerName: "Descrição", width: 300 },
      { field: "criado_em", headerName: "Criado em", width: 264 },
    ],
    [selectedIds, rows, isAllSelected, isSomeSelected, isDeleting]
  );

  const toggleSidebar = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <>
      <SidebarAdmin isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      <div className={`content ${isExpanded ? "expanded" : "collapsed"}`}>
        <h2 className="h2-content-forms-admin">Gerenciamento de Formulários</h2>

        <div className="actions-forms-admin">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/forms-admin-create")}
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
            {isDeleting ? "Deletando..." : "Deletar"}
          </Button>
          <Button
            variant="contained"
            color="info"
            onClick={() => setIsModalOpen(true)} // Abre o modal ao clicar
          >
            Categoria +
          </Button>

          <Button
            variant="contained"
            className="button-enviar"
            color="secondary"
            onClick={() => {
              if (selectedIds.length > 1) {
                alert("Selecione apenas um formulário para enviar.");
              } else {
                setIsModalOpenSend(true);
              }
            }}
            disabled={selectedIds.length === 0 || isDeleting}
          >
            Enviar
          </Button>
        </div>

        <Paper style={{ height: 500, width: "100%" }}>
          <DataGrid
            className="tabela-formularios"
            rows={rows}
            columns={columns}
            pageSizeOptions={[10, 25, 30]}
            checkboxSelection={false}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
              sorting: {
                sortModel: [{ field: "id", sort: "asc" }],
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

        <ModalSendForm
          open={isModalOpenSend}
          onClose={() => setIsModalOpenSend(false)}
          formId={selectedIds[0]}
        />
      </div>
    </>
  );
};

export default FormsAdmin;
