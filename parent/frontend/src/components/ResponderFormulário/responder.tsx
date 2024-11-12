import React from 'react';
import './responder.css';
import { Radio, RadioGroup, Button, TextField, Box, Typography, FormControl, FormControlLabel, Container, Paper } from '@mui/material';

const Responder: React.FC = () => {
  return (
    <Container className="container-responder">
      <Paper className="form-container-responder" elevation={0} sx={{ border: 'none' }}>
        <header className="form-header-responder">
          <Typography variant="h5">Formulário de satisfação 10/2024</Typography>
          <Typography variant="subtitle1">Matheus Luiz | 1 de 3</Typography>
        </header>

        <Box className="question">
          <Typography variant="h6">1 - Qual sua maior dificuldade na empresa?</Typography>
          <TextField
            placeholder="Escreva sua resposta..."
            multiline
            rows={4}
            variant="outlined"
            fullWidth
          />
        </Box>

        <Box className="question">
          <Typography variant="h6">2 - Como você avalia seu líder?</Typography>
          <FormControl component="fieldset">
            <RadioGroup name="lider" defaultValue="na-media">
              <FormControlLabel value="muito-bom" control={<Radio />} label="Muito bom" />
              <FormControlLabel value="na-media" control={<Radio />} label="Na média" />
              <FormControlLabel value="muito-ruim" control={<Radio />} label="Muito ruim" />
            </RadioGroup>
          </FormControl>
        </Box>

        <Box className="question">
          <Typography variant="h6">3 - Como você avalia seu dia de 0 a 10?</Typography>
          <Box className="radio-group">
            {[...Array(11)].map((_, i) => (
              <label key={i}>
                <Radio name="lider" value={String(i)} /> {i}
              </label>
            ))}
          </Box>
        </Box>

        <Button variant="contained" className="next-button">
          Próximo
        </Button>
      </Paper>
    </Container>
  );
};

export default Responder;
