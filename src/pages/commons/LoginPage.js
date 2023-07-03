import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../base/AuthContext";
import { Box, Button, Grid, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import allRoutesData from "../../base/routes_data";

const LoginPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username")
    const password = formData.get("password")

    auth.logIn({ user: username, pass: password }).then(() => {
      setTimeout(() => {
        if (auth.user) {
          navigate(`/app/${allRoutesData.vagas.path}`);
        }
      }, 1000)
    })
  }

  return (
    <>
      <h2>Login</h2>
      {!auth.loading && auth.error && (
        <Box sx={{ pb: 2}}>
          <Typography color="error">
            {String(auth.error)}
          </Typography>
        </Box>
      )}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <input placeholder="Nome de usuário" name="username" />
          </Grid>
          <Grid item xs={12}>
            <input placeholder="Senha" name="password" type="password" />
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
}

export default LoginPage;
