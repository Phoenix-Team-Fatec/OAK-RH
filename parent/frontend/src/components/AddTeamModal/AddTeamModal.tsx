import React, { useState } from 'react';
import axios from 'axios';
import useUserData from '../../hooks/useUserData';
import SuccessNotification from '../ComponentsAdmin/Modal/ModalSuccessNotification/SuccessNotification';
import './AddTeamModal.css'; // Importa o CSS

const AddTeamModal = ({ isOpen, onClose, onAdd }) => {
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado para o carregamento
  const { id } = useUserData();

  if (!isOpen) return null;

  // Função para cadastrar uma nova equipe
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!id) {
      alert("Admin ID not found. Please Login");
      return;
    }

    setIsLoading(true); // Inicia o carregamento

    try {
      const response = await axios.post('http://localhost:3000/equipe/criar', {
        nome: teamName,
        descricao: teamDescription,
        id_admin: id,
      });

      console.log("Team created", response.data);
      setTeamName('');
      setTeamDescription('');
      onAdd(response.data);

      setShowSuccessNotification(true);
      setTimeout(() => {
        setShowSuccessNotification(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.log("Error creating team", error);
      alert("Erro ao criar equipe, tente novamente");
    } finally {
      setIsLoading(false); // Finaliza o carregamento
    }
  };

  const handleClose = () => {
    setTeamName('');
    setTeamDescription('');
    onClose();
  };

  return (
    <>
      <div className="modal-overlay" onClick={handleClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header-add-team">
            <h2 className='h2-modal-add-team'>Adicionar nova equipe</h2>
          </div>
          <div className="modal-body">
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Nome da Equipe" // Substitui o rótulo por um placeholder
              required
            />
            <textarea
              value={teamDescription}
              onChange={(e) => setTeamDescription(e.target.value)}
              placeholder="Descrição da equipe" // Substitui o rótulo por um placeholder
              required
            />
          </div>
          <div className="modal-footer-add-team">
            <button className="save-btn-add-team" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? (
                <span className="spinner"></span>
              ) : (
                'Adicionar'
              )}
            </button>
            <button className="cancel-btn-add-team" onClick={handleClose} disabled={isLoading}>
              Fechar
            </button>
          </div>
        </div>
        {showSuccessNotification && (
          <SuccessNotification
            message="Equipe criada com sucesso!"
            onClose={() => setShowSuccessNotification(false)}
          />
        )}
      </div>
    </>
  );
};

export default AddTeamModal;
