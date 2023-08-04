import {
  Box,
  Grid,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import * as authProvider from "../providers/authProvider";
import { useState } from "react";
import FormPassword from "../pages/commons/form/FormPassword";

const AlterarSenhaForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [dados, setDados] = useState({});

  const handleChange = (value, name, data) => {
    setDados({
      ...data,
      [name]: value,
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess('');

    // const formData = Object.fromEntries(new FormData(event.currentTarget));

    if (dados.senha !== dados.checksenha) {
      setError('Senhas não conferem');
    }

    authProvider.changePassword({ senha: dados.senha }).then((data) => {
      setLoading(false);
      if (data) {
        setSuccess('Senha alterada com sucesso');
      } else {
        setError('Falha ao alterar a senha');
      }
      setDados({});
    }).catch((err) => {
      setLoading(false);
      setError(err);
      setDados({});
    });
  }

  return (
    <>
      {!loading && error && (
        <Box sx={{ pb: 2 }}>
          <Typography color="error">{String(error)}</Typography>
        </Box>
      )}
      {!loading && success && (
        <Box sx={{ pb: 2 }}>
          <Typography color="success.main">{String(success)}</Typography>
        </Box>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormPassword
              label="Nova Senha"
              name="senha"
              placeholder="Nova Senha"
              data={dados}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormPassword
              label="Validar Nova Senha"
              name="checksenha"
              placeholder="Senha de novo"
              data={dados}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item sm={6}>
            <LoadingButton
              loading={loading}
              type="submit"
              variant="contained"
            >
              Alterar Senha
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AlterarSenhaForm;
