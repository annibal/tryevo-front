import { Box, Chip, Divider, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import allRoutesData from "../../../base/routes_data";
import useFetch from "../../../providers/useFetch";
import { Helmet } from "react-helmet";
import ResponseWrapper from "../../../components/ResponseWrapper";
import PlaceIcon from "@mui/icons-material/Place";
import { getStatusCandidatura } from "./CandidaturaPage";
import { optionsTipoContrato } from "../../../providers/enumProvider";
import { Fragment } from "react";
import { ACCOUNT_FEATURES, useAuth } from "../../../base/AuthContext";

const CandidaturasPage = () => {
  const candidaturasResponse = useFetch("GET", `candidaturas`);

  const auth = useAuth();
  const userFeatures = auth?.features || {};
  const countCandResponse = useFetch("GET", `count-candidaturas`);
  const countCandidaturas = countCandResponse.data || 0;
  const maxCandidaturas =
    auth?.features == null
      ? null
      : userFeatures[ACCOUNT_FEATURES.LIMITE_CANDIDATURAS];
  const reachedCandLimit =
    maxCandidaturas > 1 && countCandidaturas >= maxCandidaturas;

  //

  return (
    <Box>
      <Helmet>
        <title>Candidaturas - TryEvo</title>
      </Helmet>

      <ResponseWrapper
        {...candidaturasResponse}
        list
        dataComponent={({ children }) => (
          <>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h5">Minhas Candidaturas</Typography>
              {maxCandidaturas > 1 && (
                <Typography variant="caption" color="text.secondary">
                  Você já tem {countCandidaturas} de {maxCandidaturas}{" "}
                  candidaturas permitidas por seu Plano de Assinatura.
                </Typography>
              )}
            </Box>
            <Box sx={{ mt: 4 }}>
              <Grid container spacing={2}>
                {children}
              </Grid>
            </Box>
          </>
        )}
        dataItemComponent={({ item }) => {
          if (!item.vaga) return "";

          const status = getStatusCandidatura(item);
          const vaga = item.vaga || {};
          const strTipoContrato = optionsTipoContrato.find(
            (o) => o.value === vaga.tipoContrato
          );
          const cargo = vaga.cargo;
          const titulo = vaga.titulo;
          let strEmpresa = vaga.empresa?.nome;
          if (vaga.ocultarEmpresa) strEmpresa = "";
          const endereco = vaga.endereco;

          const parts = [
            strTipoContrato ? (
              <Typography variant="span" fontWeight="500" color="textSecondary">
                {strTipoContrato.label}
              </Typography>
            ) : null,
            cargo ? (
              <Typography variant="span" color="textSecondary">
                {cargo?.nome}
              </Typography>
            ) : null,
            strEmpresa ? (
              <Typography variant="span" color="textSecondary">
                {strEmpresa}
              </Typography>
            ) : null,
            endereco ? (
              <Typography variant="span" color="textSecondary">
                <PlaceIcon
                  color="inherit"
                  fontSize="inherit"
                  sx={{ verticalAlign: "-2px" }}
                />{" "}
                {endereco.cidade}, {endereco.estado}
              </Typography>
            ) : null,
          ].filter((x) => x);

          return (
            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs>
                    <Link
                      to={
                        "/app/" + allRoutesData.pfCandidaturas.path + item._id
                      }
                    >
                      <Typography color="primary">{titulo}</Typography>
                    </Link>

                    <Box sx={{ mb: 1 }}>
                      {parts.map((part, idx) => (
                        <Fragment key={idx}>
                          {idx > 0 && " - "}
                          {part}
                        </Fragment>
                      ))}
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box sx={{ mr: 2, textAlign: "right" }}>
                      <Typography align="right" color="textSecondary">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </Typography>
                      <Chip
                        label={status.label}
                        sx={{
                          backgroundColor: status.color,
                          color: status.textColor,
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Divider />
            </Grid>
          );
        }}
      />
    </Box>
  );
};

export default CandidaturasPage;
