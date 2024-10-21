import React, { useState } from 'react';
import axios from 'axios';
import useUserData from '../../hooks/useUserData';

const AddTeamModal = ({ isOpen, onClose, onAdd }) => {
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const { id } = useUserData();

  if (!isOpen) return null;

  // Função para cadastrar uma nova equipe
  const handleSubmit = async (e: React.FormEvent) => {
    if(!id) {
      alert("Admin ID not found. Please Login");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/equipe/criar', {
        nome: teamName,
        descricao: teamDescription,
        id_admin: id,
      });

      console.log("Team created", response.data);
      alert("Equipe criada com sucesso!")
      setTeamName('');
      setTeamDescription('');

      onAdd(response.data)

      onClose();
    }catch (error) {
      console.log("Error creating team", error);
      alert("Error ao criar equipe, tente novamente")
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add New Team</h2>
        </div>
        <div className="modal-body">
          <label>Team Name</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
          <label>Team Description</label>
          <textarea
            value={teamDescription}
            onChange={(e) => setTeamDescription(e.target.value)}
          />
        </div>
        <div className="modal-footer">
          <button className="save-btn" onClick={handleSubmit}>
            Add Team
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTeamModal;
