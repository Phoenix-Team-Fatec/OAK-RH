import React from "react";
import "./Modal.css"; // Assuming you have styles for the modal

// Modal component receives the 'team' prop now
function Modal({ isOpen, onClose, team }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{team.name}</h2>
        </div>
        <div className="modal-body">
          <p><strong>Team Description:</strong> {team.info}</p>
          <h4>Team Members</h4>
          <ul>
            {team.members.length > 0 ? (
              team.members.map((member, index) => (
                <li key={index}>
                  <strong>{member.name}</strong> - {member.role}
                </li>
              ))
            ) : (
              <li>No members available.</li>
            )}
          </ul>
        </div>
        <div className="modal-footer">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
