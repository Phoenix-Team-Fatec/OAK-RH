import React, { useState, useEffect } from "react";
import { Modal, Box, Button, Typography, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, OutlinedInput, FormControlLabel } from "@mui/material";
import { listAllTeams, sendFormsTeam, sendFormsAllTeams } from "./index"; // Importe as funções de API que você criou
import useUserData from "../../hooks/useUserData";
import './index.css'



interface ModalProps {
  open: boolean;
  onClose: () => void;
  formId: number;
}

const ModalSendForm: React.FC<ModalProps> = ({ open, onClose, formId}) => {
  const [teams, setTeams] = useState<any[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<number[]>([]);
  const [nivel, setNivel] = useState<string>("");
  const [sendToAll, setSendToAll] = useState<boolean>(false); // Controle para enviar a todas as equipes
  const { id } = useUserData();

  useEffect(() => {
    if (open) {
      fetchTeams();
    }
  }, [open]);

  // Função para buscar equipes
  const fetchTeams = async () => {
    try {
      const result = await listAllTeams(id);
      setTeams(result);
    } catch (error) {
      console.error("Erro ao listar equipes:", error);
    }
  };

  // Função para lidar com a seleção das equipes
  const handleSelectTeams = (event: any) => {
    const value = event.target.value;
    setSelectedTeams(typeof value === "string" ? value.split(",") : value);
  };


  // Função para enviar o formulário para as equipes selecionadas ou todas
  const handleSendForms = async () => {
    try {
      if (sendToAll) {
        // Enviar para todas as equipes
    
        await sendFormsAllTeams(formId, nivel, id);
    

      } else {
        // Enviar para equipes selecionadas
        await sendFormsTeam(selectedTeams, formId, nivel); // Passa o array de equipes selecionadas
      }
      onClose(); // Fechar modal após o envio
    } catch (error) {
        
      console.error("Erro ao enviar formulário:", error);
    }
  };


 

  return (
    <Modal open={open} onClose={onClose}>
    <Box className="modal-box-sendForms">
      <Typography variant="h6" component="h2" className="modal-title">
        Enviar Formulário
      </Typography>
  
      {/* Checkbox para enviar para todas as equipes */}
      <FormControlLabel
        control={
          <Checkbox
            checked={sendToAll}
            onChange={(e) => setSendToAll(e.target.checked)}
          />
        }
        label="Enviar para todas as equipes"
        className="checkbox-label"
      />
  
      {/* Dropdown para seleção de equipes */}
      {!sendToAll && (
        <FormControl fullWidth className="form-control">
          <InputLabel id="select-teams-label">Selecionar Equipes</InputLabel>
          <Select
            labelId="select-teams-label"
            multiple
            value={selectedTeams}
            onChange={handleSelectTeams}
            input={<OutlinedInput label="Selecionar Equipes" />}
            renderValue={(selected) =>
              selected
                .map((teamId) => {
                  const team = teams.find((team) => team.id === teamId);
                  return team ? team.nome : "";
                })
                .join(", ")
            
              
            }
          >
            {teams.map((team) => (
              <MenuItem key={team.id} value={team.id} className="menuItem-sendForms">
                <Checkbox checked={selectedTeams.indexOf(team.id) > -1} />
                <ListItemText primary={team.nome} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
  
      {/* Dropdown para seleção do nível */}
      <FormControl fullWidth className="form-control">
        <InputLabel id="select-nivel-label">Tipo</InputLabel>
        <Select
          labelId="select-nivel-label"
          value={nivel}
          onChange={(e) => setNivel(e.target.value)}
          input={<OutlinedInput label="Nível" />}
        >
           <MenuItem value="lideres">Avaliação Liderados</MenuItem>
          <MenuItem value="liderados">Avaliação Líderes</MenuItem>
          <MenuItem value="ambos">Autoavaliação</MenuItem>
        </Select>
      </FormControl>
  
      {/* Botão para enviar formulário */}
      <Button
        variant="contained"
        color="primary"
        className="button-submit"
        onClick={handleSendForms}
        disabled={!nivel || (!sendToAll && selectedTeams.length === 0)}
      >
        Enviar Formulário
      </Button>
    </Box>
  </Modal>
  );
};

export default ModalSendForm;
