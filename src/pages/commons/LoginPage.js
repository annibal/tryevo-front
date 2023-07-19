import { Link, useNavigate } from "react-router-dom";
import {
  ACCOUNT_FEATURES,
  getFeaturesFromPlano,
  useAuth,
} from "../../base/AuthContext";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import allRoutesData from "../../base/routes_data";

const LoginPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

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
        }
      }
    });
  }

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
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
            <TextField
              label="Email"
              name="email"
              type="email"
              placeholder="Email"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Senha"
              name="senha"
              type="password"
              placeholder="Senha"
              required
              fullWidth
            />
          </Grid>
          <Grid item sm={6}>
            <LoadingButton
              loading={auth.loading}
              type="submit"
              variant="contained"
            >
              Login
            </LoadingButton>
          </Grid>
          <Grid item sm={6}>
            <div className="text-right">
              <Button
                variant="text"
                LinkComponent={Link}
                to={`/app/${allRoutesData.esqueciSenha.path}`}
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

export default LoginPage;
