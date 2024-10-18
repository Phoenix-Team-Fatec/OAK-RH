import React, { useEffect, useState, useMemo } from 'react';
import { Paper, Checkbox } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SidebarAdmin from '../../components/SidebarAdmin/SidebarAdmin';
import axios from 'axios';
import './EquipeAdmin.css';
import { useUser } from '../../context/UserContext';
import ModalRegisterTeam from '../../components/ModalRegisterTeam/ModalRegisterTeam';
import ModalEditTeams from '../../components/ModalEditTeams/ModalEditTeams';

const EquipesAdmin: React.FC = () => {
    const [rows, setRows] = useState<any[]>([]);
    const [modalRegisterTeam, setModalRegisterTeam] = useState(false);
    const [modalEditTeam, setModalEditTeam] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState<{ id: number; name: string; description: string } | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const { id } = useUser();
    
    // Listagem de equipes do administrador
    const fetchTeams = async () => {
        if (id) {
            try {
                const response = await axios.get(`http://localhost:3000/equipe/listar/${id}`);
                
                // Verifique se os dados têm a propriedade id. Caso contrário, mapeie para adicionar.
                const dataWithId = response.data.map((item: any, index: number) => ({
                    ...item,
                    id: item.id || index, // Adicione um id caso não exista.
                }));

                setRows(dataWithId);
            } catch (error) {
                console.error("Error in fetching team", error);
                alert("Erro ao buscar equipes");
            }
        }
    };

    useEffect(() => {
        fetchTeams();
    }, [id]);

    // Função para cadastrar uma equipe uma equipe
    const handleAddTeam = () => {
        setModalRegisterTeam(false)
        fetchTeams();
    }

    // Funçãoo para editar uma equipe
    const handleEditTeam = (teamId: number) => {
        const team = rows.find((row) => row.id === teamId);
        if (team) {
            setSelectedTeam(team);
            setModalEditTeam(true)
        }
    }

    // Função para deletar uma equipe
    const handleDelete = async () => {
        if (selectedIds.length === 0) {
            alert("Selecione pelo menos uma equipe para deletar");
            return;
        }
        if (confirm("Tem certeza que deseja deletar essa equipe?")) return;

        setIsDeleting(true);
        try {
            await Promise.all(
                selectedIds.map(async (teamId) => {
                    await axios.delete(`http://localhost:3000/equipe/${teamId}`);
                })
            );
            setRows(prevRows => prevRows.filter(row => !selectedIds.includes(row.id)))
            setSelectedIds([]);
            alert("Equipes deletadas com sucesso");
        }catch (error) {
            console.error("Erro ao deletar equipes", error);
            alert("Erro ao deletar equipes. Tente novamente");
        }finally {
            setIsDeleting(false)
        }
    }

    const handleSelect = (id: number) => {
        setSelectedIds(prevSelectedIds =>
            prevSelectedIds.includes(id)
                ? prevSelectedIds.filter(selectedId => selectedId !== id)
                : [...prevSelectedIds, id]
        );
    };

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedIds(event.target.checked ? rows.map(row => row.id) : []);
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
            width: 180,
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
        { field: 'id', headerName: 'ID', width: 120 },
        { field: 'nome', headerName: 'Nome', width: 200 },
        { field: 'descricao', headerName: 'Descrição', width:  498 },
    ], [selectedIds, rows, isDeleting]);

    return (
        <>
            <SidebarAdmin />
            <div className='admin_teams_container'>
                <h2 className='h2_admin_teams'>Gerenciamento de Equipes</h2>
                <div style={{ marginBottom: '20px', width: '1000px' }}>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-start', width: '100%' }}>
                        <button 
                            className='button_register_teams'
                            onClick={() => setModalRegisterTeam(true)}
                            disabled={isDeleting}
                        >
                            Cadastrar
                        </button>
                        <button
                            onClick={() => {
                                if (selectedIds.length === 1) {
                                    handleEditTeam(selectedIds[0]);
                                } else {
                                    alert("Selecione uma equipe para editar.");
                                }
                            }}
                            className='button_edit_teams'
                            disabled={isDeleting}
                        >
                            Editar
                        </button>
                        <button 
                            className='button_delete_teams' 
                            onClick={handleDelete} 
                            disabled={isDeleting}
                        >
                            {isDeleting ? <span className="spinner"></span> : 'Deletar'}
                        </button>
                    </div>
                    <div className='dataGridContainer'>
                        <Paper style={{ height: 600, width: '100%', marginTop: '10px' }}>
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
                <ModalRegisterTeam
                    open={modalRegisterTeam}
                    onClose={() => setModalRegisterTeam(false)}
                    onSubmit={handleAddTeam}
                    onFetchTeams={(fetchTeams)}
                />
                <ModalEditTeams
                    open={modalEditTeam}
                    onClose={() => setModalEditTeam(false)}
                    onFetchTeams={fetchTeams}
                    editingTeam={selectedTeam}
                />
            </div>
        </>
    );
};

export default EquipesAdmin;
