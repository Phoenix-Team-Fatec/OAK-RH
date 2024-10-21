import React, { useEffect, useState } from "react";
import "./EquipeAdmin.css";
import SidebarAdmin from "../../../components/SidebarAdmin/SidebarAdmin";
import Modal from "../../../components/ModalTeamMore/Modal"; 
import UpdateModal from "../../../components/ModalUpdateTeam/UpdateModal";
import AddTeamModal from "../../../components/AddTeamModal/AddTeamModal";
import useUserData from '../../../hooks/useUserData';
import axios from "axios";

function EquipeAdmin() {
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false);
  const { id } = useUserData();

  // Função para listar equipes do administrador
  useEffect(() => {
    const fetchTeams = async () => {
      if (id !== null) {
        try {
          const response = await axios.get(`http://localhost:3000/equipe/listar/${id}`);
          setTeams(response.data);
        } catch (error) {
          console.error("Erro ao carregar equipes", error);
        }
      }
    };
    fetchTeams();
  }, [id]);
  
  // Função para deletar equipe
  const handleDelete = async (teamId) => {
    // Exibe um alerta de confirmação
    const confirmDelete = window.confirm("Você realmente deseja deletar esta equipe?");
    if (!confirmDelete) {
      return; // Se o usuário cancelar, não faz nada
    }

    try {
      await axios.delete(`http://localhost:3000/equipe/${teamId}`); 
      setTeams(teams.filter((team) => team.id !== teamId)); 
      alert("Equipe excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir equipe", error);
      alert("Erro ao excluir equipe");
    }
  };

  const handleUpdateTeam = (updatedTeam) => {
    setTeams(
      teams.map((team) => (team.id === updatedTeam.id ? updatedTeam : team))
    );
    handleCloseUpdateModal(); // Fecha o modal após atualização
  };

  const handleOpenUpdateModal = (team) => {
    setSelectedTeam(team);
    setUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedTeam(null);
  };

  const handleMoreInfo = (team) => {
    setSelectedTeam(team);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTeam(null);
  };

  // Handler for adding a new team
  const handleAddTeam = (newTeam) => {
    setTeams([...teams, newTeam]);
  };

  return (
      <div style={{ display: "flex", position: "relative"}}>
        {/* Sidebar */}
        <SidebarAdmin />

          <div className="content-wrapper">
            <div className="main-content">
              <h2 style={{ textAlign: "center", margin: "20px 0", fontSize: "24px"}}>Gerenciamento de Equipes</h2>

              {/* Team grid container */}
              <div className="equipe-container">
                {teams.map((team) => (
                  <div key={team.id} className="equipe-item">
                    <div className="equipe-name">{team.nome}</div>
                    <div className="equipe-description">{team.descricao}</div>

                    {/* Buttons inside each team card */}
                    <div className="team-buttons">
                      <button
                        className="more-info-btn"
                        onClick={() => handleMoreInfo(team)}
                      >
                        More Info
                      </button>
                      <button
                        className="update-btn"
                        onClick={() => handleOpenUpdateModal(team)}
                      >
                        Update
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(team.id)} // Chama a função de deletar
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}

                {/* Empty card for adding a new team */}
                <div className="equipe-item add-team" onClick={() => setIsAddTeamModalOpen(true)}>
                  <div className="equipe-name">+ Add New Team</div>
                  <div className="equipe-description">Click here to add a new team.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal for team information */}
          {selectedTeam && (
            <Modal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              team={selectedTeam} // Pass the selected team data to the Modal component
            />
          )}

          {/* Update Modal */}
          {selectedTeam && (
            <UpdateModal
              isOpen={isUpdateModalOpen}
              onClose={handleCloseUpdateModal}
              team={selectedTeam}
              onUpdate={handleUpdateTeam}
            />
          )}

          {/* Add Team Modal */}
          <AddTeamModal 
            isOpen={isAddTeamModalOpen}
            onClose={() => setIsAddTeamModalOpen(false)}
            onAdd={handleAddTeam}
          />
        </div>
  );
}

export default EquipeAdmin;
