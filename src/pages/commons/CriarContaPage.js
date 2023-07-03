import { useNavigate } from "react-router-dom";
import { useAuth } from "../../base/AuthContext";
import { Button, FormControlLabel, Grid, Switch, TextField } from "@mui/material";
import { useState } from "react";
import allRoutesData from "../../base/routes_data";

const CriarContaPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ pf: true });

  function handleSubmit(event) {
    event.preventDefault();

    auth.signIn(userData).then(() => {
      setTimeout(() => {
        if (auth.user) {
          navigate(`/app/${allRoutesData.vagas.path}`);
        }
      }, 1000)
    })
  }

  return (
    <>
      <h2>Criar Conta</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              fullWidth
              value={userData.username}
              onChange={(e) => setUserData({...userData, username: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Senha"
              fullWidth
              value={userData.password}
              onChange={(e) => setUserData({...userData, password: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Nome"
              fullWidth
              value={userData.firstName}
              onChange={(e) => setUserData({...userData, firstName: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Sobrenome"
              fullWidth
              value={userData.lastName}
              onChange={(e) => setUserData({...userData, lastName: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel control={<Switch
              checked={userData.pf}
              onChange={(e) => setUserData({...userData, pf: e.target.checked })}
            />} label="Pessoa Física" />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default CriarContaPage;
