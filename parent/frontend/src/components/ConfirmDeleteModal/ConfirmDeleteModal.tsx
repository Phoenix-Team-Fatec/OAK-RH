import React from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';
import './ConfirmDeleteModal.css'; // Importa o arquivo CSS

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  member: { name: string } | null;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ open, onClose, onConfirm, member }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-box">
        <Typography variant="h6" gutterBottom>
          Você realmente deseja excluir {member?.name}?
        </Typography>
        <div className="modal-content">
          <Button variant="contained" color="secondary" onClick={onConfirm}>
            Sim
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ConfirmDeleteModal;
