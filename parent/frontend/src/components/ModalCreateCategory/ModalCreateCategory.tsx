import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import './ModalCreateCategory.css'; 
import { createCategory } from './categoria';
import useUserData from '../../hooks/useUserData';


interface ModalCreateCategoryProps {
  open: boolean;
  onClose: () => void;
}

const ModalCreateCategory: React.FC<ModalCreateCategoryProps> = ({ open, onClose }) => {
  const [categoryName, setCategoryName] = useState('');
  const { id } = useUserData();

  // Função para lidar com o envio do formulário
  const handleSubmit = async () => {
    if (!categoryName.trim()) {
      alert('Por favor, insira o nome da categoria.');
      return;
    }

    try {
      if(id){
      await createCategory(categoryName, id);
      alert('Categoria cadastrada com sucesso!');
      setCategoryName('');
      onClose(); // Fechar o modal após o envio
      }
    } catch (error) {
      console.error('Erro ao cadastrar categoria', error);
      alert('Erro ao cadastrar a categoria. Tente novamente.');
    }
  };

  return (
    
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" className='modal_register_category'>
      <DialogTitle className='title_new_category'>Cadastrar Nova Categoria</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Nome da Categoria"
          className='inputCategory'
          fullWidth
          variant="outlined"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center'}}>
      <div className='modalCategory'>
        <Button  onClick={onClose} color="secondary">
          Fechar
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Cadastrar
        </Button>
        </div>
      </DialogActions>
    </Dialog>
    
  );
};

export default ModalCreateCategory;
