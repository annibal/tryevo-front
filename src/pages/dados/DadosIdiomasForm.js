
import { LoadingButton } from '@mui/lab';
import { TextField, Grid,Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import { Fragment, useState } from 'react';

const DadosIdiomasForm = () => {
  const [loading, setLoading] = useState(false);
  const [languages, setLanguages] = useState([0]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>

        {languages.map((language, idx) => (
          <Fragment key={language}>
            <Grid item xs={6}>
              <TextField label={`Linguagem ${idx + 1}`} name={`linguagem${idx}`} fullWidth />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Fluência da Linguagem {idx + 1}</InputLabel>
                <Select name={`${language}Type`}>
                  <MenuItem value="" selected disabled>- Selecione- </MenuItem>
                  <MenuItem value="0">Nenhuma</MenuItem>
                  <MenuItem value="1">Básica</MenuItem>
                  <MenuItem value="2">Intermediária</MenuItem>
                  <MenuItem value="3">Proficiente</MenuItem>
                  <MenuItem value="4">Nativo / Fluente</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" color="primary" onClick={() => setLanguages(languages.filter((p, i) => i !== idx))} sx={{ mb: 2 }} tabIndex={-1} >
                Remover
              </Button>
            </Grid>
          </Fragment>
        ))}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={() => setLanguages([...languages, languages.length])}>
            Adicionar Linguagem
          </Button>
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

export default DadosIdiomasForm;