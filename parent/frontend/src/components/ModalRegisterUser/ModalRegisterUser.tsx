// ModalRegisterUser.tsx
import React, { useState } from 'react';
import './ModalRegisterUser.css';
import axios from 'axios';
import useUserData from '../../hooks/useUserData';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string }) => void;
  onFetchUsers: () => void;
}

const ModalRegisterUser: React.FC<ModalProps> = ({ open, onClose, onSubmit, onFetchUsers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { id } = useUserData(); // Obtém o ID do admin
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) {
      alert("Admin ID not found. Please login.");
      return;
    }

    setIsAdding(true)

    try {
      const response = await axios.post('http://localhost:3000/users/create', {
        nome: name,
        email,
        id_admin: id,
      });

      console.log("User created", response.data);

      alert("Usuário criado com sucesso!")

      onSubmit({ name, email });
      onFetchUsers();
      setName('');
      setEmail('')
      onClose();
    } catch (error) {
      console.log("Error creating user:", error);
      alert("Error creating user, please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  if (!open) return null;

  return (
    <div className="modal_overlay_register" onClick={onClose}>
      <div className="modal_content_register" onClick={(e) => e.stopPropagation()}>
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
            <button type="submit" className='button_register_user_modal' disabled={isAdding}>{isAdding ? <span className="spinner"></span> : 'Cadastrar'}</button>
            <button type="button" onClick={onClose} className='button_close_user_modal' disabled={isAdding}>{isAdding ? <span className="spinner"></span> : 'Fechar'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalRegisterUser;
