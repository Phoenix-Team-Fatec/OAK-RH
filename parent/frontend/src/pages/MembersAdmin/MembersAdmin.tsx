import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Modal from "../../components/ModalRegisterUser/ModalRegisterUser";
import './MemberAdmin.css';
import SidebarAdmin from '../../components/SidebarAdmin/SidebarAdmin';
import axios from 'axios';
import { useUser } from '../../context/UserContext';
import { DataGrid } from '@mui/x-data-grid';
import ModalEditUser from '../../components/ModalEditUser/ModalEditUser';

const MembersAdmin = () => {
    const [rows, setRows] = useState<any[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<{id: number; nome: string; email: string} | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const { id } = useUser();

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
        fetchUsers();
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

        try {
            await Promise.all(
                selectedIds.map(async (userId) => {
                    await axios.delete(`http://localhost:3000/users/${userId}`);
                })
            );
            const updatedRows = rows.filter(row => !selectedIds.includes(row.id));
            setRows(updatedRows);
            setSelectedIds([]);
            alert("Usuário deletados com sucesso.");
        } catch (error) {
            console.error("Error in deleting user", error);
            alert("Erro ao deletar usuário. Tente novamente");
        }
    };

    const handleEdit = () => {
        if(selectedIds.length !== 1) {
            alert("Selecione apenas um usuário para editar");
            return;
        }

        const userToEdit = rows.find(row => row.id === selectedIds[0]);
        if(userToEdit) {
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

    const columns = [
        { field: 'select', headerName: 'Selecionar', width: 120, renderCell: (params) => (
            <input
                type="checkbox"
                checked={selectedIds.includes(params.row.id)}
                onChange={() => handleSelect(params.row.id)}
            />
        )},
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'nome', headerName: 'Nome', width: 200 },
        { field: 'email', headerName: 'Email', width: 300 },
    ];

    return (
        <>
            <SidebarAdmin />
            <div className='admin_members_container'>
                <h2 className='h2_admin_members_register'>Gerenciamento de Funcionários</h2>
                <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', gap: '1px', justifyContent: 'flex-start', width: "100%" }}>
                        <button className='button_register_user' onClick={() => setModalOpen(true)}>Cadastrar</button>
                        <button className='button_edit_member' onClick={handleEdit}>Editar</button>
                        <button className='button_delete_member' onClick={handleDelete}>Deletar</button>
                    </div>
                    <div className='dataGridContainer'>
                        <Paper style={{ height:600, width: '100%', marginTop: '10px' }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                checkboxSelection={false}
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
