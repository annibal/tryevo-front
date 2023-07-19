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

const CriarContaPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(event.currentTarget));

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
      <Typography variant="h4" sx={{ mb: 2 }}>
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
          <Grid item xs={12}>
            <TextField
              label="Validar Senha"
              name="checksenha"
              type="password"
              placeholder="Senha de novo"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              name="isEmpresa"
              control={<Switch />}
              label="Pessoa Jurídica"
            />
          </Grid>

          <Grid item sm={6}>
            <LoadingButton
              loading={auth.loading}
              type="submit"
              variant="contained"
            >
              Criar Conta
            </LoadingButton>
          </Grid>
          <Grid item sm={6}>
            <div className="text-right">
              <Button
                variant="text"
                LinkComponent={Link}
                to={`/app/${allRoutesData.login.path}`}
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
