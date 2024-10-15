import React, { useState, useEffect } from 'react';
import './ModalEditUser.css';
import axios from 'axios';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onFetchUsers: () => void;
  editingUser: { id: number; nome: string; email: string } | null;
}

const ModalEditUser: React.FC<ModalProps> = ({ open, onClose, onFetchUsers, editingUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Preenche os campos com os dados do usuário em edição, caso exista
  useEffect(() => {
    if (editingUser) {
      setName(editingUser.nome);
      setEmail(editingUser.email);
    } else {
      resetFields();
    }
  }, [editingUser]);

  const resetFields = () => {
    setName('');
    setEmail('');
  };

  // Função que lida com o envio do formulário para edição
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingUser) {
        alert('Nenhum usuário selecionado para edição.');
        return;
    }

    try {
        // Envia uma solicitação PUT para atualizar o usuário, passando o ID na URL
        await axios.put(`http://localhost:3000/users/${editingUser.id}`, {
            nome: name,
            email: email,
        });
        alert('Usuário atualizado com sucesso!');

        // Atualiza a lista de usuários
        onFetchUsers();
        onClose();
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        alert('Erro ao atualizar usuário, tente novamente.');
    }
};

  // Retorna null se o modal estiver fechado
  if (!open) return null;

  return (
    <div className="modal_overlay_edit">
      <div className="modal_content_edit">
        <h2>Editar Funcionário</h2>
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
          <div className='container_button_edit'>
            <button type="submit" className='button_save_user_modal'>Salvar</button>
            <button type="button" onClick={onClose} className='button_close_user_modal'>Fechar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditUser;
