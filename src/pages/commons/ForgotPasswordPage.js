import { Link } from "react-router-dom";
import { Box, Button, Grid, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import allRoutesData from "../../base/routes_data";
import { useState } from "react";
import * as authProvider from "../../providers/authProvider";

const ForgotPasswordPage = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [response, setResponse] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username")

    try {
      const response = await authProvider.forgotPassword({ user: username });
      setResponse(response);
      if (!response.success) {
        setError('Nenhuma senha existe para este usuário');
      }
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  }

  return (
    <>
      <h2>Esqueci a Senha</h2>
      {!loading && error && (
        <Box sx={{ pb: 2}}>
          <Typography color="error">
            {String(error)}
          </Typography>
        </Box>
      )}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <input placeholder="Nome de usuário" name="username" />
          </Grid>

          {response?.success && (
            <Grid item xs={12}>
              <Typography>
                A senha de <b>{response.foundUser.user}</b> é <b>"{response.foundUser.pass}"</b>
              </Typography>
            </Grid>
          )}

          <Grid item sm={6}>
            <LoadingButton
              loading={loading}
              type="submit"
              variant="contained"
            >
              Recuperar Senha
            </LoadingButton>
          </Grid>
          <Grid item sm={6}>
            <div className="text-right">
              <Button
                variant="text"
                LinkComponent={Link}
                to={`/app/${allRoutesData.login.path}`}
              >
                Lembrei
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
      <pre>
        {JSON.stringify(response, null, 2)}
      </pre>
    </>
  );
}

export default ForgotPasswordPage;
