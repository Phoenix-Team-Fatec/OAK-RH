import React, { useState } from 'react';
import './ModalRegisterTeam.css';
import { useUser } from '../../context/UserContext';
import axios from 'axios'

interface ModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: { name: string, description: string }) => void;
    onFetchTeams: () => void;
}

const ModalRegisterTeam: React.FC<ModalProps> = ({ open, onClose, onSubmit, onFetchTeams }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const { id } = useUser();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) {
            alert("Admin ID not found. Please login.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/equipe/criar', {
                nome: name,
                descricao: description,
                id_admin: id,
            });

            console.log("Team created", response.data);
            onSubmit({ name, description });
            onFetchTeams();
            setName('');
            onClose();
            setDescription('');
        }catch (error) {
            console.log("Error creating team", error);
            alert("Erro ao criar equipe, tente novamente.");
        }
    };

    if(!open) return null;

    return (
        <div className='modal_overlay_register_team'>
            <div className='modal_content_register_team'>
                <h2>Cadastrar Equipe</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        id='name'
                        type='text'
                        placeholder='Nome'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        id='description'
                        type='text'
                        placeholder='Descrição'
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <div className='container_button_register_team'>
                        <button type='submit' className='button_register_team_modal'>Cadastrar</button>
                        <button type='button' onClick={onClose} className='button_close_team_modal'>Fechar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModalRegisterTeam;