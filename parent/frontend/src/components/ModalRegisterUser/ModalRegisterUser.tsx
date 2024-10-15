// ModalRegisterUser.tsx
import React, { useState } from 'react';
import './ModalRegisterUser.css';
import { useUser } from '../../context/UserContext';
import axios from 'axios';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string }) => void;
  onFetchUsers: () => void;
}

const ModalRegisterUser: React.FC<ModalProps> = ({ open, onClose, onSubmit, onFetchUsers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { id } = useUser(); // Obtém o ID do admin

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) {
      alert("Admin ID not found. Please login.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/users/create', {
        nome: name,
        email,
        id_admin: id,
      });

      console.log("User created", response.data);
      onSubmit({ name, email });
      onFetchUsers();
      setName('');
      setEmail('')
      onClose();
    } catch (error) {
      console.log("Error creating user:", error);
      alert("Error creating user, please try again.");
    }
  };

  if (!open) return null;

  return (
    <div className="modal_overlay_register">
      <div className="modal_content_register">
        <h2>Cadastrar Funcionário</h2>
        <form onSubmit={handleSubmit}>
          <input
            id="name"
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className='container_button_register'>
            <button type="submit" className='button_register_user_modal'>Cadastrar</button>
            <button type="button" onClick={onClose} className='button_close_user_modal'>Fechar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalRegisterUser;
