
import { LoadingButton } from '@mui/lab';
import { TextField, Grid  } from '@mui/material';
import { useEffect, useState } from 'react';

const DadosEnderecoForm = ({ type }) => {
  const [loading, setLoading] = useState(false);
  const [isLoadingCEP, setIsLoadingCEP] = useState(false);
  const [CEP, setCEP] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [street, setStreet] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [complement, setComplement] = useState('');

  const getAddressData = async () => {
    setIsLoadingCEP(true);
    const addressData = await fetch(`https://brasilapi.com.br/api/cep/v1/${CEP}`).then(r => r.json());
    if (addressData) {
      if (addressData.state) setState(addressData.state);
      if (addressData.city) setCity(addressData.city);
      if (addressData.neighborhood) setNeighborhood(addressData.neighborhood);
      if (addressData.street) setStreet(addressData.street);
      setStreetNumber('');
      setComplement('');
    }
    setIsLoadingCEP(false);
  }

  useEffect(() => {
    if (CEP && CEP.toString().length === 8) {
      getAddressData()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CEP])

  const handleSubmit = (event) => {
    event.preventDefault();
    type.toString();

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField label="CEP" name="cep" value={CEP} onChange={(e) => setCEP(e.target.value)} type="number" disabled={isLoadingCEP} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Estado" name="state" value={state} onChange={(e) => setState(e.target.value)} fullWidth disabled={isLoadingCEP} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Cidade" name="city" value={city} onChange={(e) => setCity(e.target.value)} fullWidth disabled={isLoadingCEP} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Bairro" name="neighborhood" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} fullWidth disabled={isLoadingCEP} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField label="Nome da Rua" name="street" value={street} onChange={(e) => setStreet(e.target.value)} fullWidth disabled={isLoadingCEP} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Número" name="number" value={streetNumber} onChange={(e) => setStreetNumber(e.target.value)} type="number" fullWidth disabled={isLoadingCEP} />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField label="Complemento" name="address2" value={complement} onChange={(e) => setComplement(e.target.value)} fullWidth disabled={isLoadingCEP} />
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

export default DadosEnderecoForm;