import React, { useState } from 'react';
import './listagems.css';
import { Edit, Delete, Add } from '@mui/icons-material';

const TeamMembers = ({ members: initialMembers }) => {
  const [members, setMembers] = useState(initialMembers); // Estado da lista de membros
  const [selectedMember, setSelectedMember] = useState(null); // Estado do membro selecionado

  // Função para editar um membro
  const handleEdit = (member) => {
    if (member && member.name) {
      setSelectedMember(member); // Define o membro selecionado
      console.log('Editar', member.name);
    } else {
      console.log('Erro: Membro inválido');
    }
  };

  // Função para remover um membro
  const handleRemove = (member) => {
    if (member && member.name) {
      setMembers(members.filter(m => m.name !== member.name));
      console.log('Remover', member.name);
    } else {
      console.log('Erro: Membro inválido');
    }
  };

  return (
    <div className="team-members-container">
      <div className='team-members-cabecalho'>
        <h3>Membros da Equipe</h3>
        <button onClick={() => {}}><Add /></button>
      </div>
      <div className="team-members">
        <ul>
          {members.map((member, index) => (
            <li
              key={index}
              className={`member-item ${selectedMember === member ? 'selected' : ''}`}
              onClick={() => setSelectedMember(member)}
            >
              <div className="member-info">
                <span>{member.name}</span><br/>
                <span className="member-role">{member.role}</span>
              </div>
              <div className="member-actions">
                <button onClick={() => handleEdit(member)}><Edit /></button>
                <button onClick={() => handleRemove(member)}><Delete /></button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamMembers;
