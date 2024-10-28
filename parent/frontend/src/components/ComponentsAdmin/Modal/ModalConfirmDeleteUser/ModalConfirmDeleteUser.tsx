// src/components/ModalConfirmDeleteUser/ModalConfirmDeleteUser.tsx
import React from 'react';
import './ModalConfirmDeleteUser.css';

interface ModalConfirmDeleteUserProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedUserNames: string[];
}

const ModalConfirmDeleteUser: React.FC<ModalConfirmDeleteUserProps> = ({ open, onClose, onConfirm, selectedUserNames }) => {
  if (!open) return null;

  const message = selectedUserNames.length === 1 
    ? `Tem certeza que deseja excluir o usuário ${selectedUserNames[0]}?`
    : `Tem certeza que deseja excluir esses ${selectedUserNames.length} usuários?`;

  return (
    <div className="modal-confirm-delete-user">
      <div className="modal-delete-user">
        <h2 className='h2-modal-delete-user'>Confirmação de Exclusão</h2>
        <p>{message}</p>
        <div className="modal-action-delete-user">
          <button onClick={onConfirm} className="confirm-button-delete-user">Confirmar</button>
          <button onClick={onClose} className="cancel-button-delete-user">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmDeleteUser;
