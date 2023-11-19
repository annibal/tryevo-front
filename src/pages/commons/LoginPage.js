import { Link, useNavigate } from "react-router-dom";
import {
  ACCOUNT_FEATURES,
  getFeaturesFromPlano,
  useAuth,
} from "../../base/AuthContext";
import { Box, Button, Grid, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import allRoutesData from "../../base/routes_data";
import FormPassword from "./form/FormPassword";
import { useEffect, useState } from "react";
import FormInput from "./form/FormInput";

const LoginPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [dados, setDados] = useState({});

  useEffect(() => {
    auth.clearError();
  }, []);

  const handleChange = (value, name, data) => {
    setDados({
      ...data,
      [name]: value,
    });
  };

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const senha = formData.get("senha");

    auth.logIn({ email, senha }).then((objUser) => {
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
          if (features[ACCOUNT_FEATURES.MASTER_ADMIN]) {
            navigate(`/app/${allRoutesData.masterAdminHome.path}`);
          }
        }
      }
    });
  }

  return (
    <>
      <Typography variant="h4" sx={{ mb: 6 }}>
        Login
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
          <Grid item xs={6}>
            <LoadingButton
              loading={auth.loading}
              type="submit"
              variant="contained"
              fullWidth
            >
              Login
            </LoadingButton>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              LinkComponent={Link}
              to={`/app/${allRoutesData.esqueciSenha.path}`}
              fullWidth
            >
              Esqueci a senha
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default LoginPage;
