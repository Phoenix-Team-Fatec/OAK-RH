import React, { useEffect, useState, useMemo } from 'react';
import Paper from '@mui/material/Paper';
import Modal from "../../../components/ModalRegisterUser/ModalRegisterUser";
import './MemberAdmin.css';
import SidebarAdmin from '../../../components/SidebarAdmin/SidebarAdmin';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ModalEditUser from '../../../components/ModalEditUser/ModalEditUser';
import { Checkbox } from '@mui/material';
import useUserData from '../../../hooks/useUserData';

const MembersAdmin = () => {
    const [rows, setRows] = useState<any[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<{ id: number; nome: string; email: string } | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const { id } = useUserData();

    // Estados de carregamento
    const [isDeleting, setIsDeleting] = useState(false);

    // Listagem de usuários do administrador
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
            if (id != 0) {
                await fetchUsers();
            }
        };
        loadUserData();
    }, [id]);

    // Função para cadastrar um novo usuário
    const handleAddMember = (data: { name: string; email: string; }) => {
        const newId = rows.length > 0 ? Math.max(...rows.map(row => row.id)) + 1 : 1;
        setRows([...rows, { id: newId, nome: data.name, email: data.email }]);
    };

    // Função para deletar usuário
    const handleDelete = async () => {
        if (selectedIds.length === 0) {
            alert("Selecione pelo menos um usuário para deletar.");
            return;
        }

        if (confirm('Tem certeza que deseja deletar esses usuários ?')) {

        } else {

        }

        setIsDeleting(true)

        try {
            await Promise.all(
                selectedIds.map(async (userId) => {
                    await axios.delete(`http://localhost:3000/users/${userId}`);
                })
            );
            const updatedRows = rows.filter(row => !selectedIds.includes(row.id));
            setRows(updatedRows);
            setSelectedIds([]);
            alert("Usuários deletados com sucesso.");
        } catch (error) {
            console.error("Error in deleting user", error);
            alert("Erro ao deletar usuário. Tente novamente.");
        } finally {
            setIsDeleting(false);
        }
    }

    const handleEdit = () => {
        if (selectedIds.length === 0) {
            alert("Selecione um usuário para editar"); // Caso não tenha selecionado nenhum usuário
            return
        } else if (selectedIds.length > 1) { // Caso tenha selecionado mais de um usuário
            alert("Selecione apenas um usuário para editar")
        }

        const userToEdit = rows.find(row => row.id === selectedIds[0]);
        if (userToEdit) {
            setEditingUser(userToEdit);
            setEditModalOpen(true);
        }
    };

    // Função para selecionar o usuário e ser direcionado para o id 
    const handleSelect = (id: number) => {
        setSelectedIds(prevSelectedIds => {
            if (prevSelectedIds.includes(id)) {
                return prevSelectedIds.filter(selectedId => selectedId !== id);
            } else {
                return [...prevSelectedIds, id];
            }
        });
    };

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const allIds = rows.map(row => row.id);
            setSelectedIds(allIds);
        } else {
            setSelectedIds([]);
        }
    };

    const isAllSelected = rows.length > 0 && selectedIds.length === rows.length;
    const isSomeSelected = selectedIds.length > 0 && selectedIds.length < rows.length;

    const columns: GridColDef[] = useMemo(() => [
        {
            field: 'select',
            headerName: 'Selecionar',
            renderHeader: () => (
                <Checkbox
                    indeterminate={isSomeSelected}
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    inputProps={{ 'aria-label': 'select all rows' }}
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
                    inputProps={{ 'aria-label': `select row ${params.row.id}` }}
                    disabled={isDeleting}
                />
            )
        },
        { field: 'id', headerName: 'ID', width: 80 },
        { field: 'nome', headerName: 'Nome', width: 298 },
        { field: 'email', headerName: 'Email', width: 340 },
    ], [selectedIds, rows, isAllSelected, isSomeSelected, isDeleting]);

    return (
        <>
            <SidebarAdmin />
            <div className='admin_members_container'>
                <h2 className='h2_admin_members_register'>Gerenciamento de Funcionários</h2>
                <div style={{ marginBottom: '20px', width: "800px" }}>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-start', width: "100%" }}>
                        <button
                            className='button_register_user'
                            onClick={() => setModalOpen(true)}
                            disabled={isDeleting}
                        >
                            Cadastrar
                        </button>
                        <button
                            className='button_edit_member'
                            onClick={handleEdit}
                            disabled={isDeleting}
                        >
                            Editar
                        </button>
                        <button
                            className='button_delete_member'
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? <span className="spinner"></span> : 'Deletar'}
                        </button>
                    </div>
                    <div className='dataGridContainer'>
                        <Paper style={{ height: 500, width: '100%', marginTop: '10px' }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSizeOptions={[10, 25, 30]}
                                checkboxSelection={false}
                                initialState={{
                                    pagination: { paginationModel: { pageSize: 10 } },
                                    sorting: {
                                        sortModel: [
                                            { field: 'id', sort: 'asc' }
                                        ],
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
                    onClose={() => setModalOpen(false)}
                    onSubmit={handleAddMember}
                    onFetchUsers={fetchUsers}
                />
                <ModalEditUser
                    open={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    onFetchUsers={fetchUsers}
                    editingUser={editingUser}
                />
            </div>
        </>
    );
};

export default MembersAdmin;
