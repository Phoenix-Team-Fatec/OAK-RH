import React, { useState, useMemo, useEffect } from "react";
import { Paper, Checkbox, Button, Chip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

import SidebarAdmin from "../../../components/ComponentsAdmin/SidebarAdmin/SidebarAdmin";
import NavbarMobileAdmin from "../../../components/ComponentsAdmin/NavbarMobileAdmin/NavbarMobileAdmin";
import ModalCreateCategory from "../../../components/ModalCreateCategory/ModalCreateCategory";
import ModalSendForm from "../../../components/modalSendFormsTeam/ModalSendFormsTeam";
import AlertNotification from "../../../components/ComponentsAdmin/Modal/ModalAlertNotification/AlertNotification";

import { getFormularios, deleteFormulario } from "./formsAdminBackend";
import useUserData from "../../../hooks/useUserData";

import "./adminFormulario.css";

interface Forms {
  id: number;
  nome: string;
  descricao: string;
  criado_em: string;
  enviado: string;
}

const FormsAdmin: React.FC = () => {
  const [rows, setRows] = useState<Forms[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertDelete, setShowAlertDelete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenSend, setIsModalOpenSend] = useState(false);

  const { id } = useUserData();
  const navigate = useNavigate();

  // Carregar formulários
  useEffect(() => {
    const fetchForms = async () => {
      if (id) {
        try {
          const response = await getFormularios(id);
          setRows(response);
        } catch (error) {
          console.error("Erro ao buscar formulários", error);
          alert("Erro ao buscar formulários");
        }
      }
    };

    fetchForms();
  }, [id]);

  const handleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? rows.map((row) => row.id) : []);
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) {
      setShowAlert(true);
      return;
    }

    if (!confirm("Tem certeza que deseja deletar os formulários selecionados?")) {
      return;
    }

    setIsDeleting(true);

    try {
      await Promise.all(selectedIds.map(deleteFormulario));
      setRows((prevRows) => prevRows.filter((row) => !selectedIds.includes(row.id)));
      setSelectedIds([]);
      setShowAlertDelete(true);
    } catch (error) {
      console.error("Erro ao deletar formulários", error);
      alert("Erro ao deletar formulários. Tente novamente.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    if (selectedIds.length !== 1) {
      alert("Selecione apenas um formulário para editar.");
      return;
    }

    const form = rows.find((row) => row.id === selectedIds[0]);
    if (form?.enviado === "Enviado") {
      alert("Formulário já enviado, não é possível editar.");
      return;
    }

    sessionStorage.setItem("formulario_id", selectedIds[0].toString());
    navigate(`/forms-admin-edit`);
  };

  const colorChip = (status: string) => (status === "Enviado" ? "#80ed99" : "#f9626c");

  const columns: GridColDef[] = useMemo(() => [
    {
      field: "select",
      headerName: "Selecionar",
      width: 80,
      sortable: false,
      filterable: false,
      renderHeader: () => (
        <Checkbox
          indeterminate={selectedIds.length > 0 && selectedIds.length < rows.length}
          checked={rows.length > 0 && selectedIds.length === rows.length}
          onChange={(e) => handleSelectAll(e.target.checked)}
          disabled={isDeleting}
        />
      ),
      renderCell: (params) => (
        <Checkbox
          checked={selectedIds.includes(params.row.id)}
          onChange={() => handleSelect(params.row.id)}
          disabled={isDeleting}
        />
      ),
    },
    { field: "id", headerName: "ID", width: 100, align: "center", headerAlign: "center" },
    { field: "nome", headerName: "Título", width: 300, align: "center", headerAlign: "center" },
    { field: "descricao", headerName: "Descrição", width: 300 },
    {
      field: "enviado",
      headerName: "Enviado",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Chip
          label={params.value}
          variant="outlined"
          sx={{ backgroundColor: colorChip(params.value), color: "white" }}
        />
      ),
    },
    {
      field: "criado_em",
      headerName: "Criado em",
      width: 264,
      align: "center",
      headerAlign: "center",
    },
  ], [selectedIds, rows, isDeleting]);

  return (
    <>
      <SidebarAdmin isExpanded={isExpanded} toggleSidebar={() => setIsExpanded(!isExpanded)} />
      <NavbarMobileAdmin />
      <div className={`content ${isExpanded ? "expanded" : "collapsed"}`}>
        <h2 className="h2-content-forms-admin">Gerenciamento de Formulários</h2>
        <div className="actions-forms-admin">
          <Button variant="contained" onClick={() => navigate("/forms-admin-create")} disabled={isDeleting}>Cadastrar</Button>
          <Button variant="contained" color="secondary" onClick={handleEdit} disabled={selectedIds.length !== 1 || isDeleting}>Editar</Button>
          <Button variant="contained" color="error" onClick={handleDelete} disabled={isDeleting}>{isDeleting ? "Deletando..." : "Deletar"}</Button>
          <Button variant="contained" onClick={() => setIsModalOpen(true)}>Categoria +</Button>
          <Button variant="contained" onClick={() => setIsModalOpenSend(true)} disabled={selectedIds.length !== 1 || isDeleting}>Enviar</Button>
        </div>
        <Paper style={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[10, 25, 30]}
            checkboxSelection={false}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } }, sorting: { sortModel: [{ field: "id", sort: "asc" }] } }}
            getRowId={(row) => row.id}
          />
        </Paper>
        <ModalCreateCategory open={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <ModalSendForm open={isModalOpenSend} onClose={() => setIsModalOpenSend(false)} formId={selectedIds[0]} />
        <AlertNotification message="Selecione pelo menos um formulário para deletar" open={showAlert} onClose={() => setShowAlert(false)} />
        <AlertNotification message="Formulário deletado com sucesso" open={showAlertDelete} onClose={() => setShowAlertDelete(false)} />
      </div>
    </>
  );
};

export default FormsAdmin;
