import React, { useEffect, useState } from 'react';
import './TeamMembers.css';
import { Edit, Delete, Add } from '@mui/icons-material';
import UserSelectionModal from '../UserSelectionModal/UserSelectionModal';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal'; // Importa o modal de confirmação de exclusão
import EditMemberModal from '../EditMemberModal/EditMemberModal'; // Importa o modal de edição
import { removeUserFromEquipe, getEquipe_user } from './index';// Importa a função para excluir membro da equipe


// Definição de tipo para Member
interface Member {
  id: number;
  name: string;

  role: 'Líder' | 'Liderado'; // Pode ser Líder ou Liderado
}

const equipes = async () => {
  try {
    const teamId = localStorage.getItem('teamId'); // Recupera o 'teamId' do localStorage
    if (!teamId) {
      console.log("teamId not found in localStorage");
    }
    const response = await getEquipe_user(Number(teamId)); // Chama a função getEquipe_user passando o 'teamId'
    return response;
  } catch (error) {
    console.log("Error in equipe_user function:", error);
    return error;
  }
};

// Mapear os dados da resposta
// Mapear os dados da resposta
const listMembers = async () => {
  try {
    const response = await equipes();
    
    // Verifique se response.users existe
    const members = response.users.map((user: any) => ({
      id: user.user.id, // ID do membro
      name: user.user.nome, // Nome do membro
      role: user.is_lider ? 'Líder' : 'Liderado', // Definir o papel como 'Líder' ou 'Liderado'
    }));
 
    return members; // Retorna os membros diretamente
  } catch (error) {
    console.log('Error in listMembers function:', error);
    return [];
  }
};




const TeamMembers: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]); // Define estado para membros
  const [selectedMember, setSelectedMember] = useState<Member | null>(null); // Define estado para o membro selecionado
  const [openModal, setOpenModal] = useState<boolean>(false); // Estado para controlar abertura do modal de seleção de membros
  const [roleToAdd, setRoleToAdd] = useState<'Líder' | 'Liderado'>(); // Estado para o papel do membro a ser adicionado
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false); // Estado para controlar abertura do modal de exclusão
  const [openEditModal, setOpenEditModal] = useState<boolean>(false); // Estado para controlar abertura do modal de edição
  const [lider, setLider] = useState(false); // Estado para controlar se o membro é líder

  const fetchMembers = async () => {
    const membersData = await listMembers();
    setMembers(membersData); // Atualiza o estado com os dados retornados de listMembers
  }



  useEffect(() => {
    fetchMembers();
 
  }, []);

  // Função para adicionar um membro
  const handleAddMember = async (newMember: Member) => {
    setMembers([...members, newMember]);
  };

  // Função para confirmar a exclusão
  const handleConfirmDelete = async () => {
    try{
      const teamId = localStorage.getItem('teamId'); // Recupera o 'teamId' do localStorage
      //pega o id do usuário selecionado
      const userId = selectedMember?.id;
      // Remove o usuário da equipe
      await removeUserFromEquipe(Number(userId), Number(teamId));
    
      setOpenDeleteModal(false); // Fecha o modal de exclusão
      fetchMembers()

    }catch(error){
      console.log('Erro ao excluir membro:', error);
    }
};

  // Função para salvar a edição
  const handleSaveEdit = async (updatedMember: Member) => {
    setMembers(
      members.map(m => (m.name === updatedMember.name ? updatedMember : m))
    );
    setOpenEditModal(false); // Fecha o modal de edição
    fetchMembers()
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
          <button onClick={() => { setRoleToAdd('Líder'); setOpenModal(true); setLider(true) }}>
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
          <button onClick={() => { setRoleToAdd('Liderado'); setOpenModal(true); setLider(false) }}>
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
        onClose={() => {setOpenModal(false); fetchMembers()}}
        onSelect={handleAddMember}
        isLider={lider}
      />

      {/* Modal de confirmação de exclusão */}
      <ConfirmDeleteModal
        open={openDeleteModal}
        onClose={() => {setOpenDeleteModal(false); fetchMembers()}}
        onConfirm={handleConfirmDelete}
        member={selectedMember}
      />

      {/* Modal de edição */}
      <EditMemberModal
        open={openEditModal}
        onClose={() => {setOpenEditModal(false); fetchMembers()}}
        onSave={handleSaveEdit}
        member={selectedMember}
      />
    </div>
  );
};

export default TeamMembers;
