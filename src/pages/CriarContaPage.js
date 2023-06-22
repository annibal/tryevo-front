import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../base/AuthContext";
import { Grid } from "@mui/material";

const CriarContaPage = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/";

  function handleSubmit(event) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get("username")

    auth.signin(username, () => {
      navigate(from, { replace: true });
    });
  }

  return (
    <>
      <h2>Criar Conta</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item sm={6} xs={12}>
            <input placeholder="Nome de usuário" name="username" />
          </Grid>
          <Grid item sm={6} xs={12}>
            <input placeholder="Cargo" />
          </Grid>
          <Grid item sm={6} xs={12}>
            <input placeholder="Email" />
          </Grid>
          <Grid item sm={6} xs={12}>
            <input placeholder="Senha" />
          </Grid>
          <Grid item sm={12} xs={12}>
            <button type="submit">Criar</button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default CriarContaPage;
