import React, { useState, useMemo, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { Checkbox, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import SidebarAdmin from "../../../components/ComponentsAdmin/SidebarAdmin/SidebarAdmin";
import ModalCreateCategory from "../../../components/ModalCreateCategory/ModalCreateCategory"; // Importa o Modal
import AlertNotification from "../../../components/ComponentsAdmin/Modal/ModalAlertNotification/AlertNotification";
import "./adminFormulario.css"; // Certifique-se de que o caminho do CSS está correto
import { getFormularios, deleteFormulario } from "./formsAdminBackend";
import { useNavigate } from "react-router-dom";
import ModalSendForm from "../../../components/modalSendFormsTeam/ModalSendFormsTeam";
import {Chip} from "@mui/material";
import useUserData from "../../../hooks/useUserData";
import NavbarMobileAdmin from "../../../components/ComponentsAdmin/NavbarMobileAdmin/NavbarMobileAdmin";

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
  const [showAlert, setShowAlert] = useState(false)
  const [showAlertDelete, setShowAlertDelete] = useState(false)
  const { id } = useUserData();
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  
  const [isExpanded, setIsExpanded] = useState(true); 

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

  const handleDelete = () => {
    if (selectedIds.length === 0 ) {
      setAlertMessage("Selecione pelo menos um formulário para deletar");
      setAlertModalOpen(true);
    } else {
      setConfirmDeleteOpen(true);
    }
  }

  const closeAlertModal = () => {
    setAlertModalOpen(false);
    setSelectedIds([]);
  };

  const isAllSelected = rows?.length > 0 && selectedIds.length === rows.length;
  const isSomeSelected =
    selectedIds?.length > 0 && selectedIds.length < rows?.length;

  // Deletando -
  const handleDelete = async () => {
    if (selectedIds.length === 0) {
      setShowAlert(true)
      return
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
      
      setShowAlertDelete(true)
    } catch (error) {
      console.error("Erro ao deletar formulários", error);
      alert("Erro ao deletar formulários. Tente novamente.");
    } finally {
      setIsDeleting(false);
    }
  };



  const handleGoToEdit = () => {
    //Não navegar para a página se o formulário já foi enviado
    const formulario = rows.find((row) => row.id === selectedIds[0]);
    if (formulario.enviado === "Enviado") {
      alert("Formulário já enviado, não é possível editar.");
      return;
    }
    if (selectedIds.length !== 1) {
      alert("Selecione apenas um formulário para editar.");
      return;
    }else{
       sessionStorage.setItem("formulario_id",selectedIds[0].toString());
      
    navigate(`/forms-admin-edit`);
  }
    
  }

  const colorChip = (enviado: string) => {
    if (enviado === "Enviado") {
      return "#80ed99";
    } else {
      return "#f9626c";
    }
  }

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
      { field: "id", headerName: "ID", width: 100,
        headerAlign: "center",
        align: "center",
       },
      { field: "nome", headerName: "Título", width: 300,
        headerAlign: "center",
        align: "center",
       },
      { field: "descricao", headerName: "Descrição", width: 300,
       
       },
      {field:"enviado",
       headerName:"Enviado", 
       width:200,
       headerAlign: "center",
        align: "center",
      renderCell: (params) => (
        <Chip
        label={params.value}
        variant="outlined"
        sx={{ backgroundColor: `${colorChip(params.value)}`, color:"white" }}
        />
      )
      
      },
      { field: "criado_em", headerName: "Criado em", width: 264,
        headerAlign: "center",
        align: "center",
       },
    ],
    [selectedIds, rows, isAllSelected, isSomeSelected, isDeleting]
  );

  const toggleSidebar = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <>
      <div className="Sidebar-Formularios-Admin">
      <SidebarAdmin isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      </div>
      <div className="Navbar-Equipe-Admin">
      <NavbarMobileAdmin />
      </div>
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
            onClick={() => handleGoToEdit()}
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

        <Paper style={{ height: 600, width: "100%" }}>
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

        <AlertNotification
          message="Selecione pelo menos um formulário para deletar"
          open={showAlert}
          onClose={() => setShowAlert(false)}
        />

        <AlertNotification
          message="Formulário deletado com sucesso"
          open={showAlertDelete}
          onClose={() => setShowAlertDelete(false)}
        />
      </div>
    </>
  );
};

export default FormsAdmin;
