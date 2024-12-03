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
import SelfAssessmentModal from "../../../components/ModalSeeGradesUser/ModalSeeGradesUser";

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
  const [selectedEquipe, setSelectedEquipe] = useState<Equipe | null>(null);
  const [pendentes, setPendentes] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsExpanded((prevState) => !prevState);
  };

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

        const storedEquipeId = sessionStorage.getItem("selectedEquipeId");
        const initialEquipeId = storedEquipeId
          ? Number(storedEquipeId)
          : equipesData[0]?.id;

        if (initialEquipeId) {
          setSelectedEquipeId(initialEquipeId);
          fetchAnsweredFormsPercentage(initialEquipeId);
          fetchPendentes(id, initialEquipeId);

          const equipe = equipesData.find((e) => e.id === initialEquipeId);
          setSelectedEquipe(equipe || null);
        }
      } catch (error) {
        console.log(error);
        setError("Erro ao carregar equipes.");
      }
    };
    fetchUserTeams();
  }, [id]);

  const fetchAnsweredFormsPercentage = async (equipeId: number) => {
    if (equipeId && id) {
      const result = await getAnsweredFormsPercentage(id, equipeId);
      setAnsweredFormsPercentage(result.percentage);
    }
  };

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

  const handleEquipeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(event.target.value);
    setSelectedEquipeId(selectedId);
    sessionStorage.setItem("selectedEquipeId", selectedId.toString());
    fetchAnsweredFormsPercentage(selectedId);

    const equipe = equipes.find((e) => e.id === selectedId);
    setSelectedEquipe(equipe || null);

    if (selectedId) {
      fetchPendentes(id, selectedId);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}`;
  };

  const handleViewFormsAswered = () => {
    navigate(`/forms-user?tab=Respondidos&equipeId=${selectedEquipeId}`, {
      state: {
        equipeId: selectedEquipeId,
        filter: "Respondidos",
      },
    });
  };

  const handlePendingClick = (formId: number) => {
    navigate(
      `/forms-user/responder?id=${formId}&equipe_id=${selectedEquipeId}`
    );
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);  
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
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
          Dashboard{" "}
          {selectedEquipe !== null &&
            `- ${selectedEquipe.isLider ? "Líder" : "Liderado"}`}
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
          {selectedEquipe?.isLider ? (
            <>
              <div className="upper-dashboard-user-card">
                <div className="dashboard-card-header">
                  <h3 className="dashboard-user-card-title">
                    Autoavaliação
                  </h3>
                  <button className="dashboard-card-btn" onClick={handleOpenModal}>Ver Todos</button>
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
                  <button
                    onClick={handleViewFormsAswered}
                    className="dashboard-card-btn"
                  >
                    Ver Todos
                  </button>
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
                      fontSize="7"
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
                  <h3 className="dashboard-user-card-title">
                    Projetos Concluídos
                  </h3>
                </div>
                <hr className="divider-line" />
                <p className="dashboard-user-card-value">120</p>
              </div>
            </>
          ) : null}

          <div className="dashboard-user-card">
            <div className="dashboard-card-header">
              <h3 className="dashboard-user-card-title">
                Formulários a serem respondidos
              </h3>
            </div>
            <hr className="divider-line" />
            <div className="dashboard-user-card-value">
              {pendentes.length > 0 ? (
                <ul>
                  {pendentes.map((form) => (
                    <li key={form.id} className="card-pending-forms-user">
                      <div
                        className="form-card-pending"
                        onClick={() => handlePendingClick(form.id)}
                      >
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

          {selectedEquipe?.isLider === false && (
            <div className="upper-dashboard-user-card">
              <div className="dashboard-card-header">
                <h3 className="dashboard-user-card-title">
                  Formulários respondidos
                </h3>
                <button
                  onClick={handleViewFormsAswered}
                  className="dashboard-card-btn"
                >
                  Ver Todos
                </button>
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
                    fontSize="7"
                    fill="#333"
                    fontWeight={600}
                  >
                    {`${answeredFormsPercentage.toFixed(1)}%`}
                  </text>
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
      <SelfAssessmentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default DashboardUser;
