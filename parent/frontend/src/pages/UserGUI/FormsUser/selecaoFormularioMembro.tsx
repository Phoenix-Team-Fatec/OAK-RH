import React, { useEffect, useState } from 'react';
import './SelecaoFormularioMembro.css';
import useUserData from '../../../hooks/useUserData';
import SidebarUser from '../../../components/SidebarUser/SidebarUser';
import { listFormularios, listUser_Teams } from './index';
import { useNavigate, useLocation } from 'react-router-dom';

interface Formulario {
  id: number;
  nome: string;
  equipe: string;
  nivel: string;
  descricao: string;
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
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Ao carregar a tela, obtemos os parâmetros da URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const initialTab = searchParams.get('tab');
    const equipeId = searchParams.get('equipeId'); // Obtém o equipeId da URL
    
    if (initialTab === 'Respondidos') {
      setActiveButton('Respondidos');
    } else {
      setActiveButton('Pendentes');
    }
    
    // Se houver um equipeId na URL, selecionamos a equipe correspondente
    if (equipeId) {
      setSelectedEquipe(Number(equipeId));
    }
  }, [location.search]);

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

        // Se uma equipe foi selecionada a partir da URL, definimos as informações da equipe
        if (selectedEquipe !== null) {
          const equipeSelecionada = equipesData.find((equipe) => equipe.id === selectedEquipe);
          if (equipeSelecionada) {
            setNomeEquipe(equipeSelecionada.nome);
            setIsLider(equipeSelecionada.isLider);
            setNivel(equipeSelecionada.isLider ? 'Líder' : 'Liderado');
          }
        }
      } catch (error) {
        console.log(error);
        setError("Erro ao carregar equipes.");
      }
    };
    fetchUserTeams();
  }, [id, selectedEquipe]); // Atualiza quando a seleção de equipe mudar

  useEffect(() => {
    const fetchFormularios = async () => {
      if (selectedEquipe === null) return;
      setLoading(true);
      setError(null);
      try {
        const response = await listFormularios(id, selectedEquipe, activeButton);
        const formulariosData = response.map((item: any) => ({
          id: item.id,
          nome: item.nome,
          descricao: item.descricao,
        }));
        setFormularios(formulariosData);
      } catch (error: any) {
        setError("Erro ao buscar os formulários.");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
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

  const handleFormularioClick = (formularioId: number) => {
    let url = '';
    if (activeButton === 'Pendentes') {
      url = `/forms-user/responder?id=${formularioId}&equipe_id=${selectedEquipe}`;
    } else {
      url = `/forms-user/ver?id=${formularioId}`;
    }
    try {
      navigate(url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
  };

  const toggleSidebar = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <div className="selecao-formulario-container">
      <SidebarUser isExpanded={isExpanded} toggleSidebar={toggleSidebar} />

      <div className={`navbar-user-dashboard ${isExpanded ? "expanded" : "collapsed"}`}>
        <span className="navbar-title-user-dashboard">
          {isExpanded ? "Formulários" : "Formulários"}
        </span>
      </div>

      <div className={`selecao-formulario-content ${isExpanded ? "expanded" : "collapsed"}`}>
        <div className="selecao-formulario-header">
          <div className="selecao-formulario-buttons">
            <button
              className={`selecao-formulario-button ${activeButton === 'Pendentes' ? 'active' : ''}`}
              onClick={() => handleButtonClick('Pendentes')}
            >
              Pendentes
            </button>
            <button
              className={`selecao-formulario-button ${activeButton === 'Respondidos' ? 'active' : ''}`}
              onClick={() => handleButtonClick('Respondidos')}
            >
              Respondidos
            </button>
          </div>
          <select
            value={selectedEquipe || ''}
            onChange={handleEquipeChange}
            className="selecao-formulario-select"
          >
            <option value="" disabled>Selecione uma equipe</option>
            {equipes.map((equipe) => (
              <option key={equipe.id} value={equipe.id}>
                {equipe.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="content-forms-user">
          <h3 className="selecao-formulario-team-info">{nomeEquipe} - {nivel}</h3>

          {loading ? (
            <p className="selecao-formulario-loading">Carregando formulários...</p>
          ) : error ? (
            <p className="selecao-formulario-error">Erro: {error}</p>
          ) : activeButton === 'Pendentes' ? (
            formularios.length > 0 ? (
              formularios.map((formulario) => (
                <div key={formulario.id} className="selecao-formulario-card">
                <div className="selecao-formulario-card-header" onClick={() => handleFormularioClick(formulario.id)}>
                  {formulario.nome}
                </div>
                <div>
                  <p className="description-forms-card-user" onClick={() => handleFormularioClick(formulario.id)}>Descrição: {formulario.descricao}</p>
                </div>
              </div>
              
              ))
            ) : (
              <p className="selecao-formulario-no-data">Nenhum formulário pendente encontrado.</p>
            )
          ) : activeButton === 'Respondidos' ? (
            formularios.length > 0 ? (
              formularios.map((formulario) => (
                <div key={formulario.id} className="selecao-formulario-card">
                <div className="selecao-formulario-card-header" onClick={() => handleFormularioClick(formulario.id)}>
                  {formulario.nome}
                </div>
                <div>
                  <p className="description-forms-card-user">Descrição: {formulario.descricao}</p>
                </div>
              </div>
              ))
            ) : (
              <p className="selecao-formulario-no-data">Nenhum formulário respondido encontrado.</p>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SelecaoFormularioMembro;
