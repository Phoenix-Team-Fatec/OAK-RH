import React, { useEffect, useState } from 'react';
import './selecaoFormularioMembro.css';
import useUserData from '../../../hooks/useUserData';
import SidebarUser from '../../../components/SidebarUser/SidebarUser';
import { listFormularios, listUser_Teams } from './index';

interface Formulario {
  id: number;
  nome: string;
  equipe: string;
  nivel: string;
}

interface Equipe {
  id: number;
  nome: string;
  isLider: boolean;
}

const SelecaoFormularioMembro: React.FC = () => {
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [nivel, setNivel] = useState<string>('');
  const [nomeEquipe, setNomeEquipe] = useState<string>('');
  const [selectedEquipe, setSelectedEquipe] = useState<number | null>(null);
  const [formularios, setFormularios] = useState<Formulario[]>([]);
  const [activeButton, setActiveButton] = useState('Pendentes');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useUserData();
  const [isLider, setIsLider] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserTeams = async () => {
      try {
        const response = await listUser_Teams(id);

        const equipesData = response.flatMap((userItem: any) =>
          userItem.user.map((userTeam: any) => ({
            id: userTeam.equipes.id,
            nome: userTeam.equipes.nome,
            isLider: userTeam.is_lider,
          }))
        );

        setEquipes(equipesData);
      } catch (error) {
        console.log(error);
        setError("Erro ao carregar equipes.");
      }
    };

    fetchUserTeams();
  }, [id]);

  useEffect(() => {
    const fetchFormularios = async () => {
      if (selectedEquipe === null) return;
      setLoading(true);
      setError(null);

      try {
        const response = await listFormularios(selectedEquipe);

        // Filtra os formulários conforme o nível de acesso (Líderes, Liderados, Ambos)
        const formulariosData = response
          .filter((item: any) => {
            if (item.nivel === "ambos") return true;
            if (item.nivel === "lideres" && isLider) return true;
            if (item.nivel === "liderados" && !isLider) return true;
            return false;
          })
          .map((item: any) => ({
            id: item.id,
            nome: item.formularios.nome,
            equipe: item.equipes.nome,
            nivel: item.nivel,
          }));

        setFormularios(formulariosData);
      } catch (error: any) {
        setError("Erro ao buscar os formulários.");
      } finally {
        setLoading(false);
      }
    };

    fetchFormularios();
  }, [selectedEquipe, activeButton, isLider]);

  const handleEquipeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const equipeId = Number(event.target.value);
    setSelectedEquipe(equipeId);

    const equipeSelecionada = equipes.find((equipe) => equipe.id === equipeId);
    setNomeEquipe(equipeSelecionada ? equipeSelecionada.nome : '');
    setIsLider(equipeSelecionada ? equipeSelecionada.isLider : false);
    setNivel(equipeSelecionada ? (equipeSelecionada.isLider ? 'Líder' : 'Liderado') : '');
  };

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
  };

  return (
    <div className="main-container">
      <SidebarUser />
      <div className="header">
        <button
          className={activeButton === 'Pendentes' ? 'active' : ''}
          onClick={() => handleButtonClick('Pendentes')}
        >
          Pendentes
        </button>
        <button
          className={activeButton === 'Respondidos' ? 'active' : ''}
          onClick={() => handleButtonClick('Respondidos')}
        >
          Respondidos
        </button>
        <select value={selectedEquipe || ''} onChange={handleEquipeChange}>
          <option value="" disabled>Selecione uma equipe</option>
          {equipes.map((equipe) => (
            <option key={equipe.id} value={equipe.id}>
              {equipe.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="container-forms-user">
        <h3>{nomeEquipe} - {nivel}</h3>
        {loading ? (
          <p>Carregando formulários...</p>
        ) : error ? (
          <p className="error">Erro: {error}</p>
        ) : activeButton === 'Pendentes' ? (
          formularios.length > 0 ? (
            formularios.map((formulario) => (
              <div key={formulario.id} className="card-userForms">
                <div className="card-header">{formulario.nome}</div>
              </div>
            ))
          ) : (
            <p>Nenhum formulário pendente encontrado.</p>
          )
        ) : (
          <div>Não há formulários respondidos ainda.</div>
        )}
      </div>
    </div>
  );
};

export default SelecaoFormularioMembro;
