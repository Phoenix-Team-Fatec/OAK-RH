import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';
import './ModalCreateCategory.css'; 

interface ModalCreateCategoryProps {
  open: boolean;
  onClose: () => void;
}

const ModalCreateCategory: React.FC<ModalCreateCategoryProps> = ({ open, onClose }) => {
  const [categoryName, setCategoryName] = useState('');

  // Função para lidar com o envio do formulário
  const handleSubmit = async () => {
    if (!categoryName.trim()) {
      alert('Por favor, insira o nome da categoria.');
      return;
    }

    try {
      // Simula envio ao backend
      await axios.post('http://localhost:3000/formulario/criar', { nome: categoryName });
      alert('Categoria cadastrada com sucesso!');
      setCategoryName('');
      onClose(); // Fechar o modal após o envio
    } catch (error) {
      console.error('Erro ao cadastrar categoria', error);
      alert('Erro ao cadastrar a categoria. Tente novamente.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Cadastrar Nova Categoria</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Nome da Categoria"
          fullWidth
          variant="outlined"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Fechar
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Cadastrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalCreateCategory;
