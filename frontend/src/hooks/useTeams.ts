
import { getEquipe_user } from "../components/UserSelectionModal/index";

import { useState, useEffect } from 'react';


// Define o tipo para usuário
interface User {
  id: number;
  nome: string;
  email: string;
}

// Define o tipo para membro, agora com `is_lider`
interface Member {
  id: number;
  name: string;
  role: 'Líder' | 'Liderado';
}

// Define o tipo para a equipe
interface Team {
  id: number;
  name: string;
  members: Member[];
}

// Hook customizado para gerenciar equipes e membros
const useTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar as equipes do servidor
  const fetchTeams = async () => {
    try {
      setLoading(true);
      const teamId = localStorage.getItem('teamId');
      const response = getEquipe_user(Number(teamId)); // Substitua pela URL correta da sua API
      
      // Transforma a resposta da API no formato esperado
      const transformedTeams: Team[] = response.data.map((team: any) => ({
        id: team.id,
        name: team.nome,
        members: team.users.map((userObject: any) => ({
          id: userObject.user.id,
          name: userObject.user.nome,
          role: userObject.is_lider ? 'Líder' : 'Liderado',
        }))
      }));

      setTeams(transformedTeams);
      setLoading(false);
    } catch (err) {
      setError('Erro ao buscar as equipes');
      setLoading(false);
    }
  };

  // Atualiza as equipes quando o hook é montado
  useEffect(() => {
    fetchTeams();
  }, []);

  return { teams, loading, error, fetchTeams };
};

export default useTeams;



