import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Modal from "../../components/ModalRegisterUser/ModalRegisterUser"; // Importe o modal
import './AdminMember.css'; // Não esqueça de importar seu CSS

const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'cpf', headerName: 'CPF', width: 130 },
    { field: 'phone', headerName: 'Telefone', width: 150 },
];

const initialRows = [
    { id: 1, name: 'Jon Snow', email: 'jon@example.com', cpf: '123.456.789-00', phone: '(11) 91234-5678' },
    { id: 2, name: 'Cersei Lannister', email: 'cersei@example.com', cpf: '987.654.321-00', phone: '(11) 98765-4321' },
    { id: 3, name: 'Jaime Lannister', email: 'jaime@example.com', cpf: '456.789.123-00', phone: '(11) 93456-7890' },
    { id: 4, name: 'Arya Stark', email: 'arya@example.com', cpf: '321.654.987-00', phone: '(11) 90123-4567' },
    { id: 5, name: 'Daenerys Targaryen', email: 'daenerys@example.com', cpf: '654.321.987-00', phone: '(11) 94567-8901' },
];

const AdminMembers = () => {
    const [rows, setRows] = useState(initialRows);
    const [modalOpen, setModalOpen] = useState(false);

    const handleAddMember = (data: { name: string; email: string; cpf: string; phone: string }) => {
        const newId = rows.length + 1;
        setRows([...rows, { id: newId, ...data }]);
    };

    return (
        <div className='admin_members_container'>
            <h2 className='h2_admin_members_register'>Gerenciamento de Funcionários</h2>
            <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '1px', justifyContent: 'flex-start', width: "100%"}}>
                <button className='button_register_user' onClick={() => setModalOpen(true)}>+</button>
                <button className='button_edit_member'>Editar</button>
                <button className='button_delete_member'>Deletar</button>
                </div>
                <div className='dataGridContainer'>
                    <Paper className='dataGridPaper'>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={4}
                            rowsPerPageOptions={[4]}
                            checkboxSelection
                            disableSelectionOnClick
                            sx={{
                                '& .MuiDataGrid-cell': {
                                    fontSize: '0.875rem',
                                },
                            }}
                        />
                    </Paper>
                </div>
            </div>
            <Modal 
                open={modalOpen} 
                onClose={() => setModalOpen(false)} 
                onSubmit={handleAddMember} 
            />
        </div>
    );
};

export default AdminMembers;
