
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField, Grid,Select, MenuItem, FormControl, InputLabel, Button, FormControlLabel, Checkbox } from '@mui/material';
import { Fragment, useState } from 'react';

const DadosEscolaridadeForm = () => {
  const [loading, setLoading] = useState(false);
  const [schools, setSchools] = useState([0]);
  const [schoolsComplete, setSchoolsComplete] = useState([false]);

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

        {schools.map((school, idx) => (
          <Fragment key={school}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Tipo (Escolaridade {idx + 1})</InputLabel>
                <Select name={`schoolLevel${school}`}>
                  <MenuItem value="" selected disabled>- Selecione- </MenuItem>
                  <MenuItem value="fundamental">Fundamental</MenuItem>
                  <MenuItem value="medio">Ensino Médio</MenuItem>
                  <MenuItem value="superior">Superior (Faculdade)</MenuItem>
                  <MenuItem value="mestrado">Mestrado</MenuItem>
                  <MenuItem value="doutorado">Doutorado</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Checkbox
                  name={`schoolLevelComplete${school}`}
                  color="primary"
                  checked={Boolean(schoolsComplete[idx])}
                  onChange={ (e) => setSchoolsComplete(schools.map((s, i) => i === idx ? e.target.checked : schoolsComplete[s])) }
                />}
                label={`Escolaridade ${idx + 1} Completa`}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Data de Início"
                name={`schoolStartDate${school}`}
                fullWidth
                clearable
                inputVariant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Data de Término"
                name={`schoolEndDate${school}`}
                fullWidth
                clearable
                inputVariant="outlined"
                disabled={schoolsComplete[idx] === false}
              />
            </Grid>

            <Grid item xs={10}>
              <TextField label={`Nome da Escola ${idx + 1}`} name={`schoolName${idx}`} fullWidth />
            </Grid>
            
            <Grid item xs={12}>
              <Button variant="outlined" color="primary" onClick={() => setSchools(schools.filter((p, i) => i !== idx))} sx={{ mb: 2 }} tabIndex={-1} >
                Remover
              </Button>
            </Grid>
          </Fragment>
        ))}

        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={() => setSchools([...schools, schools.length])}>
            Adicionar Escolaridade
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

export default DadosEscolaridadeForm;