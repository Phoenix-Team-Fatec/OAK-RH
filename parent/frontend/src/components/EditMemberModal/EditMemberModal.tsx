import React, { useState } from 'react';
import { Modal, Box, Button, Typography, RadioGroup, FormControlLabel, Radio} from '@mui/material';
import './EditMemberModal.css';
import { changeLeader } from '../TeamMembers'; // Importa a função para alterar líder no backend

interface Member {
  id: number;
  name: string;
  isLider: boolean;
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
  const [isLider, setIsLider] = useState<boolean>(member?.isLider ?? false);

  const handleSave = async () => {
    if (member && newRole !== undefined) {
      // Atualiza no backend o campo isLider
      try {
        const teamId = localStorage.getItem('teamId'); // Obtém o ID da equipe
        if (teamId) {
          await changeLeader(member.id, Number(teamId), isLider); // Chama a função para atualizar no backend
        }
      } catch (error) {
        console.log('Erro ao atualizar o status de líder:', error);
      }

      onSave({ ...member, role: newRole, isLider });
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
          <FormControlLabel value="Líder" control={<Radio />} label="Líder" onChange={() =>{setIsLider(true)}}/>
          <FormControlLabel value="Liderado" control={<Radio />} label="Liderado" onChange={() =>{setIsLider(false)}}/>
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
