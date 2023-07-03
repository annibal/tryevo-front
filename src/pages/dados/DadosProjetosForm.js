
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField, Grid, Button } from '@mui/material';
import { Fragment, useState } from 'react';

const DadosProjetosForm = () => {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([0]);

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

        {projects.map((project, idx) => (
          <Fragment key={project}>
            <Grid item xs={12} sm={6}>
              <TextField label={`Projeto ${idx + 1}`} name={`project${idx}`} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="URL" name={`projectLink${idx}`} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Descrição" name={`projectDescription${idx}`} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Data do Projeto"
                name={`projectDate${project}`}
                fullWidth
                clearable
                inputVariant="outlined"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Button variant="outlined" color="primary" onClick={() => setProjects(projects.filter((p, i) => i !== idx))} sx={{ mb: 2 }} tabIndex={-1} >
                Remover
              </Button>
            </Grid>
          </Fragment>
        ))}

        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={() => setProjects([...projects, projects.length])}>
            Adicionar Projeto
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

export default DadosProjetosForm;