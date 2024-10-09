import React, { useState } from 'react';
import './ModalRegisterUser.css';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: { name: string; email: string; cpf: string; phone: string }) => void;
}

const ModalRegisterUser: React.FC<ModalProps> = ({ open, onClose, onSubmit }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name, email, cpf, phone });
        onClose();
    };

    if (!open) return null;

    return (
        <div className="modal_overlay_register">
            <div className="modal_content_register">
                <h2 className='modal_register_user'>Cadastrar Funcionário</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="CPF"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Telefone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <button type="submit" className='button_register_user_modal'>Cadastrar</button>
                    <button type="button" onClick={onClose} className='button_close_user_modal'>Fechar</button>
                </form>
            </div>
        </div>
    );
};

export default ModalRegisterUser;
