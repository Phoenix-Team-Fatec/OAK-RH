import React, { useState } from "react";
import "./EquipeAdmin.css";
import SidebarAdmin from "../../../components/SidebarAdmin/SidebarAdmin";
import Modal from "../../../components/ModalTeamMore/Modal"; 
import UpdateModal from "../../../components/ModalUpdateTeam/UpdateModal";
import AddTeamModal from "../../../components/AddTeamModal/AddTeamModal";

// Sample static data for teams
const initialTeams = [
  { 
    id: 1, 
    name: "Team Alpha", 
    description: "This is the Alpha team.", 
    info: "Additional info about Team Alpha.",
    members: [
      { name: "John Doe", role: "Leader" },
      { name: "Jane Smith", role: "Developer" },
      { name: "Alice Johnson", role: "Designer" }
    ]
  },
  { 
    id: 2, 
    name: "Team Beta", 
    description: "Beta team is working on project X.", 
    info: "Additional info about Team Beta.",
    members: [
      { name: "Bob Brown", role: "Leader" },
      { name: "Charlie Davis", role: "Developer" }
    ]
  },
  { 
    id: 3, 
    name: "Team Gamma", 
    description: "Gamma team handles operations.", 
    info: "Additional info about Team Gamma.",
    members: [
      { name: "Eve Adams", role: "Leader" },
      { name: "Frank White", role: "Operations Manager" }
    ]
  },
  { 
    id: 4, 
    name: "Team Delta", 
    description: "Delta team focuses on research.", 
    info: "Additional info about Team Delta.",
    members: [
      { name: "George Clark", role: "Leader" },
      { name: "Helen Green", role: "Research Analyst" }
    ]
  },
  { 
    id: 5, 
    name: "Team Omega", 
    description: "Omega team is our support team.", 
    info: "Additional info about Team Omega.",
    members: [
      { name: "Isaac Bell", role: "Leader" },
      { name: "Jackie Lee", role: "Support Specialist" }
    ]
  },
];

function EquipeAdmin() {
  const [teams, setTeams] = useState(initialTeams);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false)

  // Handlers for delete, update actions
  const handleDelete = (id) => {
    setTeams(teams.filter((team) => team.id !== id));
  };

  const handleUpdateTeam = (updatedTeam) => {
    setTeams(
      teams.map((team) => (team.id === updatedTeam.id ? updatedTeam : team))
    );
    handleCloseUpdateModal(); // Close the modal after update
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
  }

  return (
    <div style={{ display: "flex", position: "relative" }}>
      {/* Sidebar */}
      <SidebarAdmin />

      {/* Main content area */}
      <div className="content-wrapper">
        <div className="main-content">
          <h2 style={{ textAlign: "center", margin: "20px 0" }}>Team Grid</h2>

          {/* Team grid container */}
          <div className="equipe-container">
            {teams.map((team) => (
              <div key={team.id} className="equipe-item">
                <div className="equipe-name">{team.name}</div>
                <div className="equipe-description">{team.description}</div>

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
                    onClick={() => handleDelete(team.id)}
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
