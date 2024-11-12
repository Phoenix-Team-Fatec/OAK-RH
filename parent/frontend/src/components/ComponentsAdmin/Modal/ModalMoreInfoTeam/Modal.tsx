import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Modal.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';


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
          email: userEntry.user.email,
        }));

        // Orndeas os membros para que líderem apareçam primeiro
        const sortedMembers = formattedMembers.sort((a, b) => {
          if (a.role == 'Líder' && b. role === 'Liderado') {
            return - 1;
          }if (a.role === 'Liderado' && b.role === 'Líder'){
            return 1;
          }
          return 0;
        });

        setMembers(sortedMembers);
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

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      onClose(); 
    }
  };

  return (
    <div className="modal-overlay-more-info" onClick={handleOverlayClick}>
      <div className="modal-content-more-info">
        <div className="modal-header-more-info">
          <h2>{team.nome}</h2>
        </div>
        <div className="modal-body">
          <p><strong>Descrição da Equipe</strong> {team.descricao}</p>
          <h4>Membros da Equipe</h4>
          <ul>
            {members.length > 0 ? (
              members.map((member, index) => (
                <li key={index}>
                  <div className="member-details">
                    <div>
                      <strong>{member.name}</strong> - {member.role}
                    </div>
                    {member.role === 'Líder' && <FontAwesomeIcon icon={faUserTie} />}
                  </div>
                  <small className="member-email">{member.email}</small>
                </li>
              ))
            ) : (
              <li>Não existe membros nessa equipe.</li>
            )}
          </ul>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="cancel-btn-team-more-info">Fechar</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
