import React, { useEffect, useState } from "react";
import "./EquipeAdmin.css";
import SidebarAdmin from "../../../components/ComponentsAdmin/SidebarAdmin/SidebarAdmin";
import Modal from "../../../components/ComponentsAdmin/Modal/ModalMoreInfoTeam/Modal";
import UpdateModal from "../../../components/ComponentsAdmin/Modal/ModalUpdateTeam/UpdateModal";
import AddTeamModal from "../../../components/AddTeamModal/AddTeamModal";
import ModalConfirmDeleteTeam from "../../../components/ComponentsAdmin/Modal/ModalConfirmDeleteTeam/ModalConfirmDeleteTeam"; // Importando o novo modal
import useUserData from "../../../hooks/useUserData";
import axios from "axios";

function EquipeAdmin() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTeamIds, setSelectedTeamIds] = useState([]);
  const { id } = useUserData();

  const [isExpanded, setIsExpanded] = useState(true); // State for sidebar

  // Função para listar equipes do administrador
  useEffect(() => {
    const fetchTeams = async () => {
      if (id !== null) {
        try {
          const response = await axios.get(
            `http://localhost:3000/equipe/listar/${id}`
          );
          setTeams(response.data);
        } catch (error) {
          console.error("Erro ao carregar equipes", error);
        }
      }
    };
    fetchTeams();
  }, [id]);

  const handleDelete = async (teamIds) => {
    setTeams(teams.filter((team) => !teamIds.includes(team.id)));
    setIsDeleteModalOpen(false);
  };

  const handleOpenDeleteModal = (team) => {
    setSelectedTeamIds([team.id]); // Altera para permitir múltiplas seleções no futuro
    setIsDeleteModalOpen(true);
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

  const handleAddTeam = (newTeam) => {
    setTeams([...teams, newTeam]);
  };

  const toggleSidebar = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <div style={{ display: "flex", position: "relative" }}>
      <div className="Sidebar-Equipe-Admin">
      <SidebarAdmin isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      </div>
      <div className={`content-wrapper ${isExpanded ? "expanded" : "collapsed"}`}>
        <div className="main-content">
          <h2 style={{ textAlign: "center", margin: "20px 0", fontSize: "24px" }}>
            Gerenciamento de Equipes
          </h2>

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
                    onClick={() => handleOpenDeleteModal(team)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {/* Empty card for adding a new team */}
            <div
              className="equipe-item add-team"
              onClick={() => setIsAddTeamModalOpen(true)}
            >
              <div className="equipe-name">+ Adicionar nova equipe</div>
              <div className="equipe-description">
                Clique aqui para adicionar uma nova equipe
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for team information */}
      {selectedTeam && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          team={selectedTeam} 
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

      {/* Delete Team Modal */}
      {isDeleteModalOpen && (
        <ModalConfirmDeleteTeam
          open={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
          selectedTeamNames={selectedTeamIds.map(id => teams.find(team => team.id === id)?.nome)}
          selectedIds={selectedTeamIds}
        />
      )}
    </div>
  );
}

export default EquipeAdmin;
