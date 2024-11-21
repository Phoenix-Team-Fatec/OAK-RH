import React, { useEffect, useState, useMemo } from "react";
import Paper from "@mui/material/Paper";
import Modal from "../../../components/ComponentsAdmin/Modal/ModalRegisterUser/ModalRegisterUser";
import AlertNotification from "../../../components/ComponentsAdmin/Modal/ModalAlertNotification/AlertNotification";
import "./MemberAdmin.css";
import SidebarAdmin from "../../../components/ComponentsAdmin/SidebarAdmin/SidebarAdmin";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ModalEditUser from "../../../components/ComponentsAdmin/Modal/ModalEditUser/ModalEditUser";
import ModalConfirmDeleteUser from "../../../components/ComponentsAdmin/Modal/ModalConfirmDeleteUser/ModalConfirmDeleteUser";
import { Checkbox } from "@mui/material";
import useUserData from "../../../hooks/useUserData";
import NavbarMobileAdmin from "../../../components/ComponentsAdmin/NavbarMobileAdmin/NavbarMobileAdmin";

const MembersAdmin = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<{
    id: number;
    nome: string;
    email: string;
  } | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { id } = useUserData();
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [isExpanded, setIsExpanded] = useState(true); // State for sidebar

  const fetchUsers = async () => {
    if (id) {
      try {
        const response = await axios.get(`http://localhost:3000/users/${id}`);
        setRows(response.data);
      } catch (error) {
        console.error("Error in fetching users", error);
        alert("Erro ao buscar usuários");
      }
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      if (id !== 0) {
        await fetchUsers();
      }
    };
    loadUserData();
  }, [id]);

  const handleAddMember = (data: { name: string; email: string }) => {
    const newId =
      rows.length > 0 ? Math.max(...rows.map((row) => row.id)) + 1 : 1;
    setRows([...rows, { id: newId, nome: data.name, email: data.email }]);
    setSelectedIds([]);
  };

  const handleAddMemberOpen = () => {
    setModalOpen(true);
    setSelectedIds([]);
  };

  const closeAddMemberModal = () => {
    setModalOpen(false);
    setSelectedIds([]);
  };

  const handleDelete = () => {
    if (selectedIds.length === 0) {
      setAlertMessage("Selecione pelo menos um usuário para deletar");
      setAlertModalOpen(true);
    } else {
      setConfirmDeleteOpen(true);
    }
  };

  const handleEdit = () => {
    if (selectedIds.length === 0) {
      setAlertMessage("Selecione pelo menos um usuário para editar");
      setAlertModalOpen(true);
      return;
    } else if (selectedIds.length > 1) {
      setAlertMessage("Selecione apenas um usuário para editar");
      setAlertModalOpen(true);
      return;
    }

    const userToEdit = rows.find((row) => row.id === selectedIds[0]);
    if (userToEdit) {
      setEditingUser(userToEdit);
      closeAlertModal(); // Fecha o modal de alerta antes de abrir o modal de edição
      setEditModalOpen(true);
      setSelectedIds([userToEdit.id]);
    }
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedIds([]);
  };

  const closeAlertModal = () => {
    setAlertModalOpen(false);
    setSelectedIds([]);
  };

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

  const isAllSelected = rows.length > 0 && selectedIds.length === rows.length;
  const isSomeSelected =
    selectedIds.length > 0 && selectedIds.length < rows.length;

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
      { field: "id", headerName: "ID", width: 80 },
      { field: "nome", headerName: "Nome", width: 298 },
      { field: "email", headerName: "Email", width: 340 },
    ],
    [selectedIds, rows, isAllSelected, isSomeSelected, isDeleting]
  );

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="Sidebar-Funcionarios-Mobile">
      <SidebarAdmin isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      </div>
      <div className="Navbar-Equipe-Admin">
      <NavbarMobileAdmin />
      </div>
      <div className={`admin_members_container ${isExpanded ? "expanded" : "collapsed"}`}>
        
        <h2 className="h2_admin_members_register">
          Gerenciamento de Funcionários
        </h2>
        <div className="Tabela-Funcionarios">
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <button
              className="button_register_user"
              onClick={handleAddMemberOpen}
              disabled={isDeleting}
            >
              Cadastrar
            </button>
            <button
              className="button_edit_member"
              onClick={handleEdit}
              disabled={isDeleting}
            >
              Editar
            </button>
            <button
              className="button_delete_member"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              Deletar
            </button>
          </div>
          <div className="dataGridContainer">
            <Paper style={{ height: 500, width: "100%", marginTop: "10px" }}>
              <DataGrid
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
          </div>
        </div>
        <Modal
          open={modalOpen}
          onClose={closeAddMemberModal}
          onSubmit={handleAddMember}
          onFetchUsers={fetchUsers}
        />
        <ModalEditUser
          open={editModalOpen}
          onClose={closeEditModal}
          onFetchUsers={fetchUsers}
          editingUser={editingUser}
        />
        <ModalConfirmDeleteUser
          open={confirmDeleteOpen}
          onClose={() => {
            setConfirmDeleteOpen(false);
            setSelectedIds([]);
          }}
          onConfirm={() => fetchUsers()}
          selectedIds={selectedIds}
          selectedUserNames={selectedIds.map(
            (id) => rows.find((row) => row.id === id)?.nome || ""
          )}
        />
        <AlertNotification
          open={alertModalOpen}
          message={alertMessage}
          onClose={closeAlertModal}
        />
      </div>
    </>
  );
};

export default MembersAdmin;
