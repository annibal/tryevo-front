import { Link } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import allRoutesData from "../../base/routes_data";

const ForgotPasswordPage = () => {

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Esqueci a Senha
      </Typography>

      <form onSubmit={() => {}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            Não Implementado ainda
          </Grid>

          <Grid item sm={6}>
            <div className="text-left">
              <Button
                variant="text"
                LinkComponent={Link}
                to={`/app/${allRoutesData.login.path}`}
              >
                Voltar
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default ForgotPasswordPage;
