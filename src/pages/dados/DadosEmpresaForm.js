
import { LoadingButton } from '@mui/lab';
import { TextField, Grid, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import { Fragment, useState } from 'react';

const DadosEmpresaForm = () => {
  const [loading, setLoading] = useState(false);
  const [phones, setPhones] = useState(['mainPhone']);
  const [socialNetworks, setSocialNetworks] = useState([0]);

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
        <Grid item xs={12}>
          <TextField label="Razão Social" name="razaoSocial" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Nome Fantasia" name="nomeFantasia" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="CNPJ" name="cnpj" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Email" name="email" type="email" fullWidth />
        </Grid>

        {phones.map((phone, idx) => (
          <Fragment key={phone}>
            <Grid item xs={6}>
              <TextField label={phone === 'mainPhone' ? 'Telefone Principal' : `Telefone ${idx + 1}`} name={phone} type="phone" fullWidth />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Tipo do Telefone {idx + 1}</InputLabel>
                <Select name={`${phone}Type`}>
                  <MenuItem value="" selected disabled>- Selecione- </MenuItem>
                  <MenuItem value="fixo">Fixo</MenuItem>
                  <MenuItem value="celular">Celular</MenuItem>
                  <MenuItem value="whatsapp">Whatsapp</MenuItem>
                  <MenuItem value="telegram">Telegram</MenuItem>
                  <MenuItem value="outro">Outro</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {phone !== 'mainPhone' && (
              <Grid item xs={12}>
                <Button variant="outlined" color="primary" onClick={() => setPhones(phones.filter((p, i) => i !== idx))} sx={{ mb: 2 }} tabIndex={-1} >
                  Remover
                </Button>
              </Grid>
            )}
          </Fragment>
        ))}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={() => setPhones([...phones, `phone-${phones.length}`])}>
            Adicionar Telefone
          </Button>
        </Grid>

        {socialNetworks.map((socialNetwork, idx) => (
          <Fragment key={socialNetwork}>
            <Grid item xs={7}>
              <TextField label={`Link ${idx + 1}`} name={`socialNetwork${idx}`} fullWidth />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Tipo do Link {idx + 1}</InputLabel>
                <Select name={`${socialNetwork}Type`}>
                  <MenuItem value="" selected disabled>- Selecione- </MenuItem>
                  <MenuItem value="website">WebSite</MenuItem>
                  <MenuItem value="linkedin">Linkedin</MenuItem>
                  <MenuItem value="facebook">Facebook</MenuItem>
                  <MenuItem value="instagram">Instagram</MenuItem>
                  <MenuItem value="twitter">Twitter</MenuItem>
                  <MenuItem value="tiktok">TikTok</MenuItem>
                  <MenuItem value="youtube">Youtube</MenuItem>
                  <MenuItem value="outro">Outro</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" color="primary" onClick={() => setSocialNetworks(socialNetworks.filter((p, i) => i !== idx))} sx={{ mb: 2 }} tabIndex={-1} >
                Remover
              </Button>
            </Grid>
          </Fragment>
        ))}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={() => setSocialNetworks([...socialNetworks, socialNetworks.length])}>
            Adicionar Link
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

export default DadosEmpresaForm;