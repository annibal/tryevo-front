import { Box, Chip, Divider, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import allRoutesData from "../../base/routes_data";
import useFetch from "../../providers/useFetch";
import { Helmet } from "react-helmet";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ResponseWrapper from "../../components/ResponseWrapper";
import {
  optionsGenero,
  optionsTipoContrato,
} from "../../providers/enumProvider";
import { Fragment } from "react";
import { getStatusCandidatura } from "../pf/candidatura/CandidaturaPage";
import getYears from "../../utils/getYears";
import formatPercent from "../../utils/formatPercent";

const PropostasFeitasPage = () => {
  const candidaturasResponse = useFetch("GET", `propostas`);

  //

  return (
    <Box>
      <Helmet>
        <title>Propostas - TryEvo</title>
      </Helmet>

      <ResponseWrapper
        {...candidaturasResponse}
        list
        dataComponent={({ children }) => (
          <>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h5">
                Propostas feitas para as minhas Vagas
              </Typography>
            </Box>
            <Box sx={{ mt: 4 }}>
              <Grid container spacing={2}>
                {children}
              </Grid>
            </Box>
          </>
        )}
        dataItemComponent={({ item, rowIndex }) => {
          const status = getStatusCandidatura(item);
          const vaga = item.vaga || {};
          const strTipoContrato = optionsTipoContrato.find(
            (o) => o.value === vaga.tipoContrato
          );
          const cargo = vaga.cargo;
          const titulo = vaga.titulo;
          const candidato = item.candidato || {};
          let nome = candidato.nomePreferido;
          if (nome == null || nome.length < 1) {
            nome = candidato.nomePrimeiro;
            if (
              candidato.nomeUltimo != null &&
              candidato.nomeUltimo.length > 0
            ) {
              nome += " " + candidato.nomeUltimo;
            }
          }
          const optGenero = optionsGenero.find(
            (o) => o.value === candidato.genero
          );
          const anos = getYears(new Date(), new Date(candidato.nascimento));
          const match = (item.matchResult || {}).match;

          const partsVaga = [
            strTipoContrato ? (
              <Typography variant="span" fontWeight="500" color="textSecondary">
                {strTipoContrato.label}
              </Typography>
            ) : null,
            cargo ? (
              <Typography variant="span" color="textSecondary">
                {cargo}
              </Typography>
            ) : null,
          ].filter((x) => x);

          return (
            <Grid item xs={12}>
              {rowIndex > 0 && <Divider sx={{ mb: 2 }} />}
              <Grid container spacing={2}>
                <Grid item xs={8} sm={5} md={5} order={{ xs: 1, sm: 1 }}>
                  <Link
                    to={"/app/" + allRoutesData.pjPropostaFeita.path + item._id}
                  >
                    <Typography color="primary">{nome}</Typography>
                  </Link>
                  <Box sx={{ mb: 1 }}>
                    {optGenero && (
                      <Typography
                        variant="span"
                        fontWeight="500"
                        color="textSecondary"
                      >
                        {optGenero.labelTiny}
                        {" - "}
                      </Typography>
                    )}
                    <Typography variant="span" color="textSecondary">
                      {anos} anos
                    </Typography>
                    {match != null && (
                      <Typography variant="span" color="text.primary">
                        {" - Match: "}
                        <Typography variant="span" fontWeight="bold">
                          {formatPercent(match)}
                        </Typography>
                      </Typography>
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12} sm={4} md={5} order={{ xs: 3, sm: 2 }}>
                  <Typography color="text.secondary">
                    vaga{" "}
                    <ArrowForwardIcon
                      color="inherit"
                      fontSize="inherit"
                      sx={{ verticalAlign: "-2px" }}
                    />{" "}
                    <Link
                      to={
                        "/app/" + allRoutesData.pjMinhaVaga.path + item.vagaId
                      }
                    >
                      <Typography color="primary" component="span">
                        {titulo}
                      </Typography>
                    </Link>
                  </Typography>
                  <Box sx={{ mb: 1 }}>
                    {partsVaga.map((part, idx) => (
                      <Fragment key={idx}>
                        {idx > 0 && " - "}
                        {part}
                      </Fragment>
                    ))}
                  </Box>
                </Grid>

                <Grid item xs={4} sm={3} md={2} order={{ xs: 2, sm: 3 }}>
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
            </Grid>
          );
        }}
      />
    </Box>
  );
};

export default PropostasFeitasPage;
