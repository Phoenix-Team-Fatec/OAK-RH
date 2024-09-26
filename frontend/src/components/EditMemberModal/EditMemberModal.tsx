import React, { useState } from 'react';
import { Modal, Box, Button, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import './EditMemberModal.css'; // Importa o arquivo CSS

interface Member {
  name: string;
  role: 'Líder' | 'Liderado';
}

interface EditMemberModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (updatedMember: Member) => void;
  member: Member | null;
}

const EditMemberModal: React.FC<EditMemberModalProps> = ({ open, onClose, onSave, member }) => {
  const [newRole, setNewRole] = useState<'Líder' | 'Liderado' | undefined>(member?.role);

  const handleSave = () => {
    if (member && newRole) {
      onSave({ ...member, role: newRole });
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-box">
        <Typography variant="h6" gutterBottom>
          Editar {member?.name}
        </Typography>

        <RadioGroup
          value={newRole}
          onChange={(e) => setNewRole(e.target.value as 'Líder' | 'Liderado')}
        >
          <FormControlLabel value="Líder" control={<Radio />} label="Líder" />
          <FormControlLabel value="Liderado" control={<Radio />} label="Liderado" />
        </RadioGroup>

        <div className="modal-buttons">
          <Button variant="contained" color="primary" onClick={handleSave}>
            Salvar
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default EditMemberModal;
