import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';
import { listUsers, getEquipe_user, registerEquipe_user } from './index'; // Importe as funções necessárias

const UserSelectionModal = ({ open, onClose, onSelect, isLider }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]); // Estado para armazenar os usuários vindos da API
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento
  

  

 


  // Buscar os usuários e os membros da equipe da API quando o modal abrir
   useEffect(() => {
    if (open) {
      const fetchUsers = async () => {
        setLoading(true); // Exibe um estado de carregamento enquanto busca os dados
        
        try {
          // Recuperar o 'teamId' do localStorage
          const teamId = localStorage.getItem('teamId');
          if (!teamId) {
            console.log('Nenhum teamId encontrado no localStorage');
            setLoading(false);
            return;
          }

          // Buscar todos os usuários
          const allUsers = await listUsers();
          
          // Buscar os membros da equipe específica usando o 'teamId'
          const equipeResponse = await getEquipe_user(Number(teamId));
          const teamMembers = equipeResponse.data.users.map(member => member.user); // Extrair os objetos de usuário dentro de "users"

          // Filtra os usuários para excluir aqueles que já estão na equipe e os que tem admin como true
          const filteredUsers = allUsers.filter(
            user => !teamMembers.some(member => member.id === user.id) && user.is_admin === false
          );
          
          

          setUsers(filteredUsers); // Atualiza a lista com os usuários que não estão na equipe
        } catch (error) {
          console.log("Error fetching users or team members:", error);
        }

        setLoading(false); // Desabilita o estado de carregamento após a busca
      };
      fetchUsers();
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        
        <Typography variant="h6" gutterBottom>
          
        </Typography>

        {/* Exibe uma mensagem enquanto os dados estão sendo carregados */}
        {loading ? (
          <Typography>Carregando usuários...</Typography>
        ) : (
          <ul>
            {users.map((user, index) => (
              <li
                key={index}
                style={{
                  cursor: 'pointer',
                  padding: '8px',
                  backgroundColor: selectedUser === user ? '#e0e0e0' : 'white',
                }}
                onClick={() => setSelectedUser(user)}
              >
                {user.nome} {/* Exibe o nome do usuário */}
              </li>
            ))}
          </ul>
        )}

        {/* Botão para confirmar a seleção */}
        <Button
  sx={{ mt: 2 }}
  variant="contained"
  disabled={!selectedUser}
  onClick={async () => {
    try {
      // Recuperar o 'teamId' do localStorage
      const teamId = localStorage.getItem('teamId');
      if (!teamId) {
        console.log('Nenhum teamId encontrado no localStorage');
        return;
      }

      // Define isLider como true, já que queremos adicionar um líder
     

      // Chama a função para associar o usuário à equipe como líder
      await registerEquipe_user(selectedUser.id, Number(teamId), isLider);

      console.log(`Usuário ${selectedUser.nome} adicionado à equipe ${teamId} como Líder`);

      // Ação de sucesso (pode ser uma mensagem de sucesso, atualização de estado, etc.)
      onSelect(selectedUser);
      onClose(); // Fecha o modal ao selecionar
    } catch (error) {
      console.log('Erro ao associar usuário à equipe:', error);
      // Trate o erro conforme necessário (por exemplo, exibir uma mensagem de erro)
    }
  }}
>
  Adicionar
</Button>

     
      </Box>
    </Modal>
  );
};

export default UserSelectionModal;
