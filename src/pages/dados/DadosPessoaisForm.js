
import { LoadingButton } from '@mui/lab';
import { TextField, Grid, FormControlLabel, Checkbox, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Fragment, useState } from 'react';

const DadosPessoaisForm = () => {
  const [loading, setLoading] = useState(false);
  const [phones, setPhones] = useState(['mainPhone']);
  const [socialNetworks, setSocialNetworks] = useState([0]);
  const [disabledPerson, setDisabledPerson] = useState(false);
  const [hasCPF, setHasCPF] = useState(false);
  const [hasRG, setHasRG] = useState(false);
  const [hasCNH, setHasCNH] = useState(false);
  const [hasPassport, setHasPassport] = useState(false);
  const [travelAvailable, setTravelAvailable] = useState(false);
  const [changeAvailable, setChangeAvailable] = useState(false);

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
        <Grid item xs={12} sm={6}>
          <TextField label="Nome" name="firstName" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Sobrenome" name="lastName" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Como prefere ser chamado" name="displayName" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Email" name="email" type="email" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Gênero</InputLabel>
            <Select name="gender">
              <MenuItem value="unspecified" selected>Não Especificado</MenuItem>
              <MenuItem value="male">Masculino</MenuItem>
              <MenuItem value="female">Feminino</MenuItem>
              <MenuItem value="other">Outro</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Estado Civil</InputLabel>
            <Select name="maritalStatus">
              <MenuItem value="" selected disabled>- Selecione- </MenuItem>
              <MenuItem value="single" selected>Solteiro</MenuItem>
              <MenuItem value="married" selected>Casado</MenuItem>
              <MenuItem value="union" selected>União Estável</MenuItem>
              <MenuItem value="widow" selected>Viuvo</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField label="Nacionalidade" name="nacionalidade" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Data de Nascimento"
            name="birthDate"
            fullWidth
            clearable
            inputVariant="outlined"
          />
        </Grid>

        {phones.map((phone, idx) => (
          <Fragment key={phone}>
            <Grid item xs={8}>
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
                <Button variant="outlined" color="primary" onClick={() => setPhones(phones.filter((p, i) => i !== idx))} sx={{ mb: 2 }} tabIndex={-1}>
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

        <Grid item xs={12} sm={3}>
          <FormControlLabel
            control={<Checkbox name="hasCPF" checked={hasCPF} onChange={(e) => setHasCPF(e.target.checked)} color="primary" />}
            label="Tem CPF"
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <TextField disabled={!hasCPF} label="CPF" name="cpf" fullWidth />
        </Grid>

        <Grid item xs={12} sm={3}>
          <FormControlLabel
            control={<Checkbox name="hasRG" checked={hasRG} onChange={(e) => setHasRG(e.target.checked)} color="primary" />}
            label="Tem RG"
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <TextField disabled={!hasRG} label="RG" name="rg" fullWidth />
        </Grid>

        <Grid item xs={12} sm={3}>
          <FormControlLabel
            control={<Checkbox name="hasPassport" checked={hasPassport} onChange={(e) => setHasPassport(e.target.checked)} color="primary" />}
            label="Tem Passaporte"
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <TextField disabled={!hasPassport} label="Passaporte" name="passport" fullWidth />
        </Grid>
        
        <Grid item xs={12} sm={3}>
          <FormControlLabel
            control={<Checkbox name="hasCNH" checked={hasCNH} onChange={(e) => setHasCNH(e.target.checked)} color="primary" />}
            label="Tem CNH"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Categoria CNH</InputLabel>
            <Select disabled={!hasCNH} name="cnhCategory">
              <MenuItem value="" selected>Não Tem</MenuItem>
              <MenuItem value="A">A (moto)</MenuItem>
              <MenuItem value="B">B (carro)</MenuItem>
              <MenuItem value="C">C (caminhão)</MenuItem>
              <MenuItem value="D">D (micro ônibus)</MenuItem>
              <MenuItem value="E">E (articulados)</MenuItem>
              <MenuItem value="AB">A e B (moto + carro)</MenuItem>
              <MenuItem value="AC">A e C (moto + caminhão)</MenuItem>
              <MenuItem value="AD">A e D (moto + micro ônibus)</MenuItem>
              <MenuItem value="AE">A e E (moto + articulados)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField disabled={!hasCNH} label="CNH" name="cnh" fullWidth />
        </Grid>

        {socialNetworks.map((socialNetwork, idx) => (
          <Fragment key={socialNetwork}>
            <Grid item xs={7}>
              <TextField label={`Rede Social ${idx + 1}`} name={`socialNetwork${idx}`} fullWidth />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Tipo da Rede Social {idx + 1}</InputLabel>
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
            Adicionar Rede Social
          </Button>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={<Checkbox name="hasDisability" checked={disabledPerson} onChange={(e) => setDisabledPerson(e.target.checked)} color="primary" />}
            label="Portador de Deficiência"
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField disabled={!disabledPerson} label="Informar Deficiência" name="disability" fullWidth />
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={<Checkbox name="travelAvailable" checked={travelAvailable} onChange={(e) => setTravelAvailable(e.target.checked)} color="primary" />}
            label="Disponível para Viagens"
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField disabled={!travelAvailable} label="Quantos KM Aceita Viajar" name="travelAvailableDistance" fullWidth type="number" />
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={<Checkbox name="changeAvailable" checked={changeAvailable} onChange={(e) => setChangeAvailable(e.target.checked)} color="primary" />}
            label="Disponível para Mudança"
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField disabled={!changeAvailable} label="Quantos KM Aceita se Mudar" name="changeAvailableDistance" fullWidth type="number" />
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

export default DadosPessoaisForm;