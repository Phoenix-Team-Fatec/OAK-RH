import React, { useState } from 'react';
import './UpdateModal.css';

interface Member {
  name: string;
  role: string;
}

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  team: {
    id: number;
    name: string;
    description: string;
    members: Member[];
  };
  onUpdate: (updatedTeam: any) => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ isOpen, onClose, team, onUpdate }) => {
  const [teamName, setTeamName] = useState(team.name);
  const [teamDescription, setTeamDescription] = useState(team.description);
  const [members, setMembers] = useState(team.members);

  const handleMemberChange = (index: number, field: string, value: string) => {
    const updatedMembers = [...members];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setMembers(updatedMembers);
  };

  const handleAddMember = () => {
    setMembers([...members, { name: '', role: '' }]);
  };

  const handleUpdate = () => {
    const updatedTeam = {
      id: team.id,
      name: teamName,
      description: teamDescription,
      members,
    };
    onUpdate(updatedTeam);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Update {team.name}</h2>
        </div>

        <div className="modal-body">
          <label htmlFor="team-name">Team Name:</label>
          <input
            type="text"
            id="team-name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />

          <label htmlFor="team-description">Team Description:</label>
          <textarea
            id="team-description"
            value={teamDescription}
            onChange={(e) => setTeamDescription(e.target.value)}
          />

          <h4>Team Members</h4>
          {members.map((member, index) => (
            <div key={index} className="member-row">
              <input
                type="text"
                placeholder="Member Name"
                value={member.name}
                onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
              />
              <input
                type="text"
                placeholder="Role"
                value={member.role}
                onChange={(e) => handleMemberChange(index, 'role', e.target.value)}
              />
            </div>
          ))}

          <button className="add-member-btn" onClick={handleAddMember}>
            + Add Member
          </button>
        </div>

        <div className="modal-footer">
          <button className="save-btn" onClick={handleUpdate}>
            Save
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
