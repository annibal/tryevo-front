import { Box, Grid, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import * as authProvider from "../providers/authProvider";
import { useState } from "react";
import { ACCOUNT_FEATURES, useAuth } from "../base/AuthContext";
import { useNavigate } from "react-router-dom";

const AlterarTipoContaForm = () => {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  function handleSubmit(type) {
    if (!window.confirm('Certeza que deseja alterar o tipo de conta?')) return;

    setLoading(true);
    setError(null);
    setSuccess("");

    authProvider
      .changeTipoConta({ tipo: type })
      .then((data) => {
        setLoading(false);
        if (data) {
          setSuccess("Tipo de conta alterada com sucesso");
          setTimeout(() => {
            auth.logOut();
          }, 2000)
        } else {
          setError("Falha ao alterar tipo de conta");
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }

  let tipoConta = {
    name: "indefinido",
    tipo: "",
  };

  if (auth.features[ACCOUNT_FEATURES.PF]) {
    tipoConta.name = "Candidato (PF)";
    tipoConta.tipo = "pf";
  }
  if (auth.features[ACCOUNT_FEATURES.PJ]) {
    tipoConta.name = "Empresa (PJ)";
    tipoConta.tipo = "pj";
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

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="caption" component="p">Tipo de conta atual:</Typography>
          <Typography variant="h6">{tipoConta.name}</Typography>
        </Grid>
        <Grid item xs={12}>
          {!auth.features[ACCOUNT_FEATURES.PF] && (
            <LoadingButton
              loading={loading}
              onClick={() => handleSubmit("pf")}
              variant="contained"
            >
              Mudar para conta de Candidato (PF)
            </LoadingButton>
          )}
          {!auth.features[ACCOUNT_FEATURES.PJ] && (
            <LoadingButton
              loading={loading}
              onClick={() => handleSubmit("pj")}
              variant="contained"
            >
              Mudar para conta de Empresa (PJ)
            </LoadingButton>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default AlterarTipoContaForm;
