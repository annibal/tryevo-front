
import { LoadingButton } from '@mui/lab';
import { TextField, Grid, FormControlLabel, Checkbox, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useState } from 'react';

const DadosMinhaVagaForm = ({ onSubmit }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSubmit();
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField label="Nome da vaga" name="name" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Descrição" name="description" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Contrato</InputLabel>
            <Select name="contractType">
              <MenuItem value="" selected disabled>- Selecione- </MenuItem>
              <MenuItem value="clt">CLT</MenuItem>
              <MenuItem value="pj">PJ</MenuItem>
              <MenuItem value="other">Outro</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox name="showPublicData" color="primary" />}
            label="Mostra dados para clientes com plano básico"
          />
        </Grid>

        <Grid item xs={12}>
          <LoadingButton loading={loading} variant="contained" color="primary" type="submit">
            Salvar
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  )
}

export default DadosMinhaVagaForm;