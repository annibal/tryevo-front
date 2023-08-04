import { Link, useNavigate } from "react-router-dom";
import { ACCOUNT_FEATURES, getFeaturesFromPlano, useAuth } from "../../base/AuthContext";
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import allRoutesData from "../../base/routes_data";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import FormInput from "./form/FormInput";
import FormPassword from "./form/FormPassword";

const CriarContaPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [dados, setDados] = useState({});

  const handleChange = (value, name, data) => {
    setDados({
      ...data,
      [name]: value,
    });
  };

  function handleSubmit(isEmpresa) {
    // event.preventDefault();
    // const formData = Object.fromEntries(new FormData(event.currentTarget));

    const formData = {
      email: dados.email,
      senha: dados.senha,
      checksenha: dados.checksenha,
      isEmpresa,
    }

    auth.signIn(formData).then((objUser) => {
      if (objUser && objUser.plano) {
        const features = getFeaturesFromPlano(objUser.plano);
        if (features[ACCOUNT_FEATURES.LOGGED]) {
          // TODO: if data not complete go to meus dados
          if (features[ACCOUNT_FEATURES.PF]) {
            navigate(`/app/${allRoutesData.pfVagas.path}`);
          }
          if (features[ACCOUNT_FEATURES.PJ]) {
            navigate(`/app/${allRoutesData.pjDashboard.path}`);
          }
        }
      }
    });
  }

  return (
    <>
      <Typography variant="h4" sx={{ mb: 6 }}>
        Criar Conta
      </Typography>

      {!auth.loading && auth.error && (
        <Box sx={{ pb: 2 }}>
          <Typography color="error">{String(auth.error)}</Typography>
        </Box>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormInput
              label="Email"
              name="email"
              type="email"
              placeholder="Email"
              data={dados}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormPassword
              label="Senha"
              name="senha"
              placeholder="Senha"
              data={dados}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormPassword
              label="Validar Senha"
              name="checksenha"
              placeholder="Senha de novo"
              data={dados}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={4}>
            <LoadingButton
              loading={auth.loading}
              onClick={() => handleSubmit(false)}
              variant="contained"
              color="primary"
              fullWidth
            >
              Criar conta Candidato
            </LoadingButton>
          </Grid>
          <Grid item xs={4}>
            <LoadingButton
              loading={auth.loading}
              onClick={() => handleSubmit(true)}
              variant="contained"
              color="secondary"
              fullWidth
            >
              Criar conta Empresa
            </LoadingButton>
          </Grid>
          <Grid item xs={4}>
            <div className="text-right">
              <Button
                variant="outlined"
                LinkComponent={Link}
                to={`/app/${allRoutesData.login.path}`}
                fullWidth
                disabled
              >
                Esqueci a senha
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default CriarContaPage;
