import React, { useState } from 'react';
import './AddTeamModal.css'; // Add your CSS file for styling

const AddTeamModal = ({ isOpen, onClose, onAdd }) => {
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');

  const handleSubmit = () => {
    if (teamName) {
      const newTeam = {
        id: Date.now(), // Use timestamp for a unique ID
        name: teamName,
        description: teamDescription,
      };
      onAdd(newTeam);
      setTeamName('')
      setTeamDescription('')
      onClose(); // Close the modal after adding the team
    } else {
      alert('Please enter a team name.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add New Team</h2>
        </div>
        <div className="modal-body">
          <label>Team Name</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
          <label>Team Description</label>
          <textarea
            value={teamDescription}
            onChange={(e) => setTeamDescription(e.target.value)}
          />
        </div>
        <div className="modal-footer">
          <button className="save-btn" onClick={handleSubmit}>
            Add Team
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTeamModal;
