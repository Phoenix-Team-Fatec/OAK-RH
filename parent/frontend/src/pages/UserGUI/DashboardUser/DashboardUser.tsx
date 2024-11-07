import React, { useState, useEffect } from "react";
import "./DashboardUser.css";
import SidebarUser from "../../../components/SidebarUser/SidebarUser";
import {
  listUser_Teams,
  getAnsweredFormsPercentage,
  listFormularios,
} from "../FormsUser/index";
import useUserData from "../../../hooks/useUserData";
import { useNavigate } from "react-router-dom";

interface Equipe {
  id: number;
  nome: string;
  isLider: boolean;
}

const DashboardUser: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [setError] = useState<string | null>(null);
  const { id } = useUserData();
  const [answeredFormsPercentage, setAnsweredFormsPercentage] =
    useState<number>(0);
  const [selectedEquipeId, setSelectedEquipeId] = useState<number | null>(null);
  const [pendentes, setPendentes] = useState<any[]>([]);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsExpanded((prevState) => !prevState);
  };

  // Função para listar os dados do usuário
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

        // Carrega o ID da equipe do sessionStorage
        const storedEquipeId = sessionStorage.getItem("selectedEquipeId");
        const initialEquipeId = storedEquipeId
          ? Number(storedEquipeId)
          : equipesData[0]?.id;

        // Seleciona a primeira equipe automaticamente,
        if (initialEquipeId) {
          setSelectedEquipeId(initialEquipeId);
          fetchAnsweredFormsPercentage(initialEquipeId);
          fetchPendentes(id, initialEquipeId);
        }
      } catch (error) {
        console.log(error);
        setError("Erro ao carregar equipes.");
      }
    };
    fetchUserTeams();
  }, [id]);

  // Função para listar porcentagem de formulários respondidos
  const fetchAnsweredFormsPercentage = async (equipeId: number) => {
    if (equipeId && id) {
      const result = await getAnsweredFormsPercentage(id, equipeId);
      setAnsweredFormsPercentage(result.percentage);
    }
  };

  // Função para listar formulários pendentes
  const fetchPendentes = async (id: number, equipeId: number) => {
    try {
      const response = await listFormularios(id, equipeId, "Pendentes");
      setPendentes(response);
    } catch (error: any) {
      console.error(
        "Erro ao carregar formulários pendentes:",
        error.response || error.message
      );
      setError("Erro ao carregar formulários pendentes.");
    }
  };

  // Função para trocar a equipe e mudar de acordo com o id da equipe
  const handleEquipeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(event.target.value);
    setSelectedEquipeId(selectedId);
    sessionStorage.setItem("selectedEquipeId", selectedId.toString());
    fetchAnsweredFormsPercentage(selectedId);
    if (selectedId) {
      fetchPendentes(id, selectedId); // Busca os formulários pendentes da equipe
    }
  };

  // Função para formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}`;
  };

  // Função para redireionar para formulários respondidos
  const handleViewFormsAswered = () => {
    navigate(`/forms-user?tab=Respondidos&equipeId=${selectedEquipeId}`, {
      state: {
        equipeId: selectedEquipeId,
        filter: 'Respondidos',
      },
    });
  };
  return (
    <div className="dashboard-user-wrapper">
      <SidebarUser isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      <div
        className={`navbar-user-dashboard ${
          isExpanded ? "expanded" : "collapsed"
        }`}
      >
        <span className="navbar-title-user-dashboard">
          {isExpanded ? "Dashboard" : "Dashboard"}
        </span>
        <select
          className={`navbar-select-user-dashboard ${
            isExpanded ? "expanded" : "collapsed"
          }`}
          onChange={handleEquipeChange}
          value={selectedEquipeId ?? ""}
        >
          <option value="" disabled>
            Selecione uma equipe
          </option>
          {equipes.map((equipe) => (
            <option key={equipe.id} value={equipe.id}>
              {equipe.nome}
            </option>
          ))}
        </select>
      </div>

      <div
        className={`dashboard-user-container ${
          isExpanded ? "expanded" : "collapsed"
        }`}
      >
        <div className="dashboard-user-cards">
          <div className="upper-dashboard-user-card">
            <div className="dashboard-card-header">
              <h3 className="dashboard-user-card-title">Total de Usuários</h3>
              <button className="dashboard-card-btn">Ver Todos</button>
            </div>
            <hr className="divider-line" />
            <div className="dashboard-card-value-container1">
              <p className="dashboard-user-card-value">
                Acompanhe sua <br /> autoavaliação mensal <br /> e veja sua
                evolução ao longo <br /> do tempo!
              </p>
              <svg
                className="bar-chart"
                width="300"
                height="100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  className="bar"
                  width="30"
                  height="0"
                  x="10"
                  fill="#65A281"
                />
                <rect
                  className="bar"
                  width="30"
                  height="0"
                  x="50"
                  fill="#91E2B6"
                />
                <rect
                  className="bar"
                  width="30"
                  height="0"
                  x="90"
                  fill="#65A281"
                />
                <rect
                  className="bar"
                  width="30"
                  height="0"
                  x="130"
                  fill="#91E2B6"
                />
                <rect
                  className="bar"
                  width="30"
                  height="0"
                  x="170"
                  fill="#65A281"
                />
                <rect
                  className="bar"
                  width="30"
                  height="0"
                  x="210"
                  fill="#91E2B6"
                />
              </svg>
            </div>
          </div>
          <div className="upper-dashboard-user-card">
            <div className="dashboard-card-header">
              <h3 className="dashboard-user-card-title">
                Formulários respondidos
              </h3>
              <button onClick={handleViewFormsAswered} className="dashboard-card-btn">Ver Todos</button>
            </div>
            <hr className="divider-line" />
            <div className="dashboard-card-value-container2">
              <p className="dashboard-user-card-value">
                Visualize o total de <br /> formulários respondidos <br /> e
                acompanhe seu progresso!
              </p>
              <svg
                className="doughnut-chart"
                width="120px"
                height="120px"
                viewBox="0 0 36 36"
              >
                <circle
                  className="doughnut-segment"
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="transparent"
                  stroke="#91E2B6"
                  strokeWidth="4"
                />
                <circle
                  className="doughnut-segment"
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="transparent"
                  stroke="#65A281"
                  strokeWidth="4"
                  strokeDasharray={`${answeredFormsPercentage} ${
                    100 - answeredFormsPercentage
                  }`}
                  strokeDashoffset="25"
                />
                <text
                  x="18"
                  y="20.5"
                  textAnchor="middle"
                  fontSize="8"
                  fill="#333"
                  fontWeight={600}
                >
                  {`${answeredFormsPercentage.toFixed(1)}%`}
                </text>
              </svg>
            </div>
          </div>
          <div className="dashboard-user-card">
            <div className="dashboard-card-header">
              <h3 className="dashboard-user-card-title">Projetos Concluídos</h3>
            </div>
            <hr className="divider-line" />
            <p className="dashboard-user-card-value">120</p>
          </div>
          <div className="dashboard-user-card">
            <div className="dashboard-card-header">
              <h3 className="dashboard-user-card-title">
                Formulários a serem respondidos
              </h3>
            </div>
            <hr className="divider-line" />
            <div className="dashboard-user-card-value">
              {/* Exibindo os formulários pendentes */}
              {pendentes.length > 0 ? (
                <ul>
                  {pendentes.map((form) => (
                    <li key={form.id} className="card-pending-forms-user">
                      <div className="form-card-pending">
                        <span className="form-name-pending-forms">
                          {form.nome}
                        </span>
                        <span className="form-date-pending-forms">
                          {formatDate(form.criado_em)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Não há formulários pendentes.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
