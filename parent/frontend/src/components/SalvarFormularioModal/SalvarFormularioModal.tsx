import React from 'react';
import './SalvarFormularioModal.css'; // Seu CSS para estilização do modal
import { Modal, Box, Typography, Button } from '@mui/material';
import './SalvarFormularioModal.css'; 

// Defina a interface com a nova propriedade isError
interface SalvarFormularioModalProps {
  open: boolean;
  onClose: () => void;
  message: string;
  isError: boolean; // Adicionando a propriedade isError
  onOk: () => void; // Propriedade para lidar com o clique no botão OK
}

const SalvarFormularioModal: React.FC<SalvarFormularioModalProps> = ({
  open,
  onClose,
  message,
  isError, // Recebendo a propriedade isError
  onOk
}) => {
  return (
    
    <Modal open={open} onClose={onClose} className='modalConfirmFormulario'>
      <Box className="modal-box">
        <Typography variant="h6" component="h2">
          {message}
        </Typography>
        <Button onClick={onOk} variant="contained" color={isError ? "error" : "primary"}>
          OK
        </Button>
      </Box>
    </Modal>
  );
};

export default SalvarFormularioModal;
