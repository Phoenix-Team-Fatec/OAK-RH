import React, { useState } from 'react';
import './TeamMembers.css';
import { Edit, Delete, Add } from '@mui/icons-material';
import UserSelectionModal from '../UserSelectionModal/UserSelectionModal';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal'; // Importa o modal de confirmação de exclusão
import EditMemberModal from '../EditMemberModal/EditMemberModal'; // Importa o modal de edição

// Definição de tipo para Member
interface Member {
  name: string;
  role: 'Líder' | 'Liderado'; // Pode ser Líder ou Liderado
}

// Definição de tipo para as props recebidas
interface TeamMembersProps {
  members: Member[]; // Array de membros que é recebido inicialmente
}

const TeamMembers: React.FC<TeamMembersProps> = ({ members: initialMembers }) => {
  const [members, setMembers] = useState<Member[]>(initialMembers); // Define estado para membros
  const [selectedMember, setSelectedMember] = useState<Member | null>(null); // Define estado para o membro selecionado
  const [openModal, setOpenModal] = useState<boolean>(false); // Estado para controlar abertura do modal de seleção de membros
  const [roleToAdd, setRoleToAdd] = useState<'Líder' | 'Liderado'>(); // Estado para o papel do membro a ser adicionado
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false); // Estado para controlar abertura do modal de exclusão
  const [openEditModal, setOpenEditModal] = useState<boolean>(false); // Estado para controlar abertura do modal de edição

  // Função para adicionar um membro
  const handleAddMember = (newMember: Member): void => {
    setMembers([...members, newMember]);
  };

  // Função para confirmar a exclusão
  const handleConfirmDelete = (): void => {
    if (selectedMember) {
      setMembers(members.filter(m => m.name !== selectedMember.name));
      setOpenDeleteModal(false); // Fecha o modal de exclusão
    }
  };

  // Função para salvar a edição
  const handleSaveEdit = (updatedMember: Member): void => {
    setMembers(
      members.map(m => (m.name === updatedMember.name ? updatedMember : m))
    );
    setOpenEditModal(false); // Fecha o modal de edição
  };

  // Função para abrir o modal de exclusão
  const handleRemove = (member: Member): void => {
    setSelectedMember(member);
    setOpenDeleteModal(true);
  };

  // Função para abrir o modal de edição
  const handleEdit = (member: Member): void => {
    setSelectedMember(member);
    setOpenEditModal(true);
  };

  const leaders: Member[] = members.filter(member => member.role === 'Líder');
  const ledMembers: Member[] = members.filter(member => member.role === 'Liderado');

  return (
    <div className="team-members-container">
      <div className='team-members-cabecalho'>
        <h3>Membros da Equipe</h3>
      </div>

      {/* Líderes */}
      <div className="team-leaders">
        <div className='team-members-cabecalho'>
          <h4>Líderes</h4>
          <button onClick={() => { setRoleToAdd('Líder'); setOpenModal(true); }}>
            <Add />
          </button>
        </div>
        <ul>
          {leaders.map((leader, index) => (
            <li key={index} className="member-item">
              <div className="member-info">
                <span>{leader.name}</span><br />
                <span className="member-role">{leader.role}</span>
              </div>
              <div className="member-actions">
                <button onClick={() => handleEdit(leader)}><Edit /></button>
                <button onClick={() => handleRemove(leader)}><Delete /></button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Liderados */}
      <div className="team-led">
        <div className='team-members-cabecalho'>
          <h4>Liderados</h4>
          <button onClick={() => { setRoleToAdd('Liderado'); setOpenModal(true); }}>
            <Add />
          </button>
        </div>
        <ul>
          {ledMembers.map((ledMember, index) => (
            <li key={index} className="member-item">
              <div className="member-info">
                <span>{ledMember.name}</span><br />
                <span className="member-role">{ledMember.role}</span>
              </div>
              <div className="member-actions">
                <button onClick={() => handleEdit(ledMember)}><Edit /></button>
                <button onClick={() => handleRemove(ledMember)}><Delete /></button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal para seleção de novo membro */}
      <UserSelectionModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSelect={handleAddMember}
        role={roleToAdd}
      />

      {/* Modal de confirmação de exclusão */}
      <ConfirmDeleteModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        member={selectedMember}
      />

      {/* Modal de edição */}
      <EditMemberModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        onSave={handleSaveEdit}
        member={selectedMember}
      />
    </div>
  );
};

export default TeamMembers;
