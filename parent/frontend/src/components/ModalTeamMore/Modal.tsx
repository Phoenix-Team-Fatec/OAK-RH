import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Modal.css";

function Modal({ isOpen, onClose, team }) {
  const [members, setMembers] = useState([]);

  // Função para buscar os membros da equipe
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/equipe_user/${team.id}`);
        const equipeData = response.data;

        // Formata os membros para exibir nome e papel
        const formattedMembers = equipeData.users.map((userEntry) => ({
          name: userEntry.user.nome,
          role: userEntry.is_lider ? 'Líder' : 'Liderado',
        }));

        setMembers(formattedMembers);
      } catch (error) {
        console.error('Erro ao buscar membros da equipe:', error);
        alert('Erro ao buscar membros da equipe. Tente novamente.');
      }
    };

    // Se o modal estiver aberto, buscar os membros
    if (isOpen && team?.id) {
      fetchTeamMembers();
    }
  }, [isOpen, team]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{team.nome}</h2>
        </div>
        <div className="modal-body">
          <p><strong>Team Description:</strong> {team.descricao}</p>
          <h4>Team Members</h4>
          <ul>
            {members.length > 0 ? (
              members.map((member, index) => (
                <li key={index}>
                  <strong>{member.name}</strong> - {member.role}
                </li>
              ))
            ) : (
              <li>No members available.</li>
            )}
          </ul>
        </div>
        <div className="modal-footer">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
