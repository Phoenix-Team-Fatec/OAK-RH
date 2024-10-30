import React, { useState, useEffect } from "react";
import "./ModalEditUser.css";
import axios from "axios";
import SuccessNotification from "../ComponentsAdmin/Modal/ModalSuccessNotification/SuccessNotification";
import ErrorNotification from "../ComponentsAdmin/Modal/ModalErrorNotifcation/ErrorNotification";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onFetchUsers: () => void;
  editingUser: { id: number; nome: string; email: string } | null;
}

const ModalEditUser: React.FC<ModalProps> = ({
  open,
  onClose,
  onFetchUsers,
  editingUser,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [originalUserData, setOriginalUserData] = useState<{
    nome: string; 
    email: string;
  } | null>(null)
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  // Preenche os campos com os dados do usuário em edição, caso exista
  useEffect(() => {
    if (editingUser) {
      setName(editingUser.nome);
      setEmail(editingUser.email);
      setOriginalUserData({ nome: editingUser.nome, email: editingUser.email })
    } else {
      // Se não houver um usuário em edição, limpe os campos
      setName("");
      setEmail("");
      setOriginalUserData(null)
    }
  }, [editingUser]);

  // Função que lida com o envio do formulário para edição
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingUser) {
      alert("Nenhum usuário selecionado para edição.");
      return;
    }

    if (!confirm("Tem certeza que deseja atualizar o usuário?")) {
      return;
    }

    setIsEditing(true);
    setShowSuccess(false);
    setShowError(false);

    try {
      // Envia uma solicitação PUT para atualizar o usuário, passando o ID na URL
      await axios.put(`http://localhost:3000/users/${editingUser.id}`, {
        nome: name,
        email: email,
      });

      // Exibe notificação de sucesso após a atualização
      setShowSuccess(true);

      // Atualiza a lista de usuários
      onFetchUsers();

      // Limpa os campos após a edição
      setTimeout(() => {
        setShowSuccess(false); 
        onClose(); 
      }, 2000);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      setShowError(true);
    } finally {
      setIsEditing(false);
    }
  };

  const handleClose = () => {
    if (originalUserData) {
      setName(originalUserData.nome)
      setEmail(originalUserData.email);
    }
    onClose();
  }

  // Retorna null se o modal estiver fechado
  if (!open) return null;

  return (
    <div className="modal_overlay_edit" onClick={handleClose}>
      <div className="modal_content_edit" onClick={(e) => e.stopPropagation()}>
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
          <div className="container_button_edit">
            <button
              type="submit"
              className="button_save_user_modal"
              disabled={isEditing}
            >
              {isEditing ? <span className="spinner"></span> : "Salvar"}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="button_close_user_modal"
              disabled={isEditing}
            >
              Fechar
            </button>
          </div>
        </form>
        {showSuccess && (
          <SuccessNotification
            message="Usuário atualizado com sucesso!"
            onClose={() => setShowSuccess(false)}
          />
        )}
        {showError && (
          <ErrorNotification
            message="Erro ao atualizar usuário. Tente novamente."
            onClose={() => setShowError(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ModalEditUser;
