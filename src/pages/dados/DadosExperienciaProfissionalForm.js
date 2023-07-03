
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField, Grid, Button, FormControlLabel, Checkbox } from '@mui/material';
import { Fragment, useState } from 'react';

const DadosExperienciaProfissionalForm = () => {
  const [loading, setLoading] = useState(false);
  const [professionalExperiences, setProfessionalExperiences] = useState([0]);
  const [currentJob, setCurrentJob] = useState(-1);

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

        {professionalExperiences.map((professionalExperience, idx) => (
          <Fragment key={professionalExperience}>
            <Grid item xs={12}>
              <TextField label={`Empresa ${idx + 1}`} name={`professionalExperience${idx}`} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Descrição" name={`professionalExperienceDescription${idx}`} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Cargo" name={`professionalExperiencePosition${idx}`} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Checkbox
                  name={`professionalExperienceCurrentJob${professionalExperience}`}
                  color="primary"
                  checked={currentJob === idx}
                  onChange={() => setCurrentJob(idx)}
                />}
                label={`Emprego Atual`}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <DatePicker
                label="Data de Início"
                name={`professionalExperienceStartDate${professionalExperience}`}
                fullWidth
                clearable
                inputVariant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <DatePicker
                label="Data de Término"
                name={`professionalExperienceEndDate${professionalExperience}`}
                fullWidth
                clearable
                inputVariant="outlined"
                disabled={currentJob === idx}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Button variant="outlined" color="primary" onClick={() => setProfessionalExperiences(professionalExperiences.filter((p, i) => i !== idx))} sx={{ mb: 2 }} tabIndex={-1} >
                Remover
              </Button>
            </Grid>
          </Fragment>
        ))}

        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={() => setProfessionalExperiences([...professionalExperiences, professionalExperiences.length])}>
            Adicionar Experiencia Profissional
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

export default DadosExperienciaProfissionalForm;