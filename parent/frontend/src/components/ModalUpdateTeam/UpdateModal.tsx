import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateModal.css';
import useUserData from '../../hooks/useUserData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface User {
  id: number;
  nome: string;
}

interface Member {
  name: string;
  role: string;
}

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  team: {
    id: number;
    nome: string;
    descricao: string;
    members?: Member[];
  };
  onUpdate: (updatedTeam: any) => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ isOpen, onClose, team, onUpdate }) => {
  const [teamName, setTeamName] = useState<string>(team.nome || '');
  const [teamDescription, setTeamDescription] = useState<string>(team.descricao || '');
  const [members, setMembers] = useState<Member[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const { id } = useUserData();

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/equipe_user/${team.id}`);
        const equipeData = response.data;
  
        const formattedMembers = equipeData.users.map((userEntry: any) => ({
          id: userEntry.user.id, // Use ID para melhor precisão
          name: userEntry.user.nome,
          role: userEntry.is_lider ? 'Líder' : 'Liderado',
        }));
  
        setMembers(formattedMembers);
        
        // Chama fetchUsers depois que os membros são definidos
        await fetchUsers(formattedMembers);
      } catch (error) {
        console.error('Erro ao buscar membros da equipe:', error);
        alert('Erro ao buscar membros da equipe. Tente novamente.');
      }
    };
  
    const fetchUsers = async (teamMembers: Member[]) => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${id}`);
        const userWithOutTeam = response.data.filter((user: User) =>
          !teamMembers.some((member) => member.id === user.id) // Use teamMembers atualizado
        );
        setUsers(userWithOutTeam);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        alert('Erro ao buscar usuários. Tente novamente.');
      }
    };
  
    if (isOpen) {
      fetchTeamMembers();  // Carrega membros da equipe e depois usuários
      setTeamName(team.nome);
      setTeamDescription(team.descricao);
    }
  }, [isOpen, id, team]);
  
  const handleMemberChange = (index: number, field: keyof Member, value: string) => {
    setMembers((prevMembers) => {
      const updatedMembers = [...prevMembers];
      const currentMember = updatedMembers[index];
      const previousRole = currentMember.role;
  
      // Atualizando o campo do membro (nome ou função)
      updatedMembers[index] = { ...currentMember, [field]: value };
  
      // Se o campo alterado for a role (função) e ela mudou
      if (field === 'role' && value !== previousRole) {
        const isNewLeader = value === 'Líder';
        
        // Verifica se está removendo o último líder
        const remainingLeaders = updatedMembers.filter((m) => m.role === 'Líder').length;
        
        // Impede a remoção do último líder
        if (remainingLeaders === 0 && previousRole === 'Líder' && !isNewLeader) {
          alert('A equipe deve ter pelo menos um líder.');
          return prevMembers; // Retorna sem modificar o estado
        }
  
        // Chama função para mudar o líder no backend usando o ID
        handleChangeLeader(currentMember.id, isNewLeader); // Passa o ID do membro
      }
  
      return updatedMembers;
    });
  };
  
  const handleAddMember = () => {
    setMembers((prevMembers) => [...prevMembers, { name: '', role: '' }]);
  };

  const handleDeleteMember = async (memberId) => {
    const confirmDelete = window.confirm(`Você realmente deseja excluir este membro da equipe?`);
    
    if (confirmDelete) {
      try {
        // Chamando a API para remover o membro pelo ID do usuário e da equipe
        await axios.delete('http://localhost:3000/equipe_user/remover', {
          data: {
            userId: memberId, 
            equipeId: team.id
          }
        });
        
        // Atualiza o estado para remover o membro da lista de membros
        setMembers((prevMembers) => prevMembers.filter((m) => m.id !== memberId)); 

        // Encontrar o usuário removido e adiciona-lo de volta em 
        const removerUser = members.find((m) => m.id === memberId);
        if(removerUser) {
          setUsers((prevUsers) => [ ...prevUsers, { id: memberId, nome: removerUser.name}])
        }
        
        console.log(`Membro com ID ${memberId} foi removido da equipe.`);
      } catch (error) {
        console.error('Erro ao deletar membro da equipe', error);
        alert('Erro ao deletar membro. Tente novamente.');
      }
    }
  };

  const handleUpdate = async () => {
    if (!teamName || !teamDescription) {
      alert('Por favor, preencha o nome e a descrição da equipe.');
      return;
    }

    try {
      await updateTeam();
      await associateUsersToTeam();
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar a equipe e associar usuários:', error);
      alert('Erro ao atualizar a equipe e associar usuários. Tente novamente.');
    }
  };

  const updateTeam = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/equipe/${team.id}`, {
        nome: teamName,
        descricao: teamDescription,
      });
      onUpdate(response.data);
    } catch (error) {
      console.error('Erro ao atualizar a equipe:', error);
      alert('Erro ao atualizar a equipe. Tente novamente.');
    }
  };

  const associateUsersToTeam = async () => {
    const currentMemberIds = team.members?.map(member => {
      return users.find(user => user.nome === member.name)?.id;
    }) || [];
  
    const promises = members.map(async (member) => {
      if (member.name && member.role) {
        const user = users.find((u) => u.nome === member.name);
        if (user) {
          const isAlreadyMember = currentMemberIds.includes(user.id);
          const isDuplicate = members.filter(m => m.name === member.name).length > 1;
  
          if (!isAlreadyMember && !isDuplicate) {
            return handleAssociateUser(user.id, member.role === 'Líder');
          } else {
            console.warn(`Usuário ${member.name} já está associado ou duplicado. Ignorando...`);
          }
        } else {
          console.warn(`Usuário não encontrado para o membro: ${member.name}`);
        }
      } else {
        console.warn(`Membro ${JSON.stringify(member)} não possui nome ou função. Ignorando...`);
      }
    });
    await Promise.all(promises);
  };
  
  const handleAssociateUser = async (userId: number, isLider: boolean) => {
    if (userId === undefined) {
        console.warn('userId não pode ser undefined');
        return;
    }

    try {
        const response = await axios.post('http://localhost:3000/equipe_user/associar', {
            user_id: userId,
            equipe_id: team.id,
            is_lider: isLider,
        });
        console.log('Usuário associado com sucesso', response.data);
    } catch (error) {
        console.error('Erro ao associar usuário:', error);
        alert('Erro ao associar usuário. Tente novamente.');
    }
  };

  const handleChangeLeader = async (memberId: number, isLeader: boolean) => {
    try {
      await axios.post('http://localhost:3000/equipe_user/mudarLider', {
        userId: memberId, // Utilize o ID do membro
        equipeId: team.id,
        isLider: isLeader,
      });
      
      console.log(`Membro com ID ${memberId} agora é ${isLeader ? "líder" : "liderado"} da equipe.`);
    } catch (error) {
      console.error('Erro ao mudar líder:', error);
      if (error.response && error.response.data.message === "A equipe deve ter pelo menos um líder.") {
        alert('Não é possível remover o último líder da equipe. Adicione outro líder antes de remover este.');
      }
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      onClose(); 
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Editar {teamName}</h2>
        </div>

        <div className="modal-body">
          <label htmlFor="team-name">Nome da Equipe</label>
          <input
            type="text"
            id="team-name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />

          <label htmlFor="team-description">Descrição da Equipe</label>
          <textarea
            id="team-description"
            value={teamDescription}
            onChange={(e) => setTeamDescription(e.target.value)}
          />

          <h4>Membros da Equipe</h4>
          {members.map((member, index) => (
            <div key={index} className="member-row">
              {member.name ? (
                <span className='nomes'>{member.name}</span>
              ) : (
                <select
                  value={member.name}
                  onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                >
                  <option value="" disabled>Selecione um membro</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.nome}>{user.nome}</option>
                  ))}
                </select>
              )}
              <select
                value={member.role}
                onChange={(e) => handleMemberChange(index, 'role', e.target.value)}
              >
                <option value="" disabled>Selecione uma função</option>
                <option value="Líder">Líder</option>
                <option value="Liderado">Liderado</option>
              </select>
              <button onClick={() => handleDeleteMember(member.id)} className="remove-member-btn">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}

          <button className="add-member-btn" onClick={handleAddMember}>
            + Adicionar Membro
          </button>
        </div>

        <div className="modal-footer">
          <button className="save-btn" onClick={handleUpdate}>
            Salvar
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;