import { Box, Divider, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import allRoutesData from "../../base/routes_data";
import useFetch from "../../providers/useFetch";
import { Helmet } from "react-helmet";
import ResponseWrapper from "../../components/ResponseWrapper";
import { optionsGenero, optionsTipoContrato } from "../../providers/enumProvider";
import { Fragment } from "react";
import { getStatusCandidatura } from "../pf/candidatura/CandidaturaPage";
import getYears from "../../utils/getYears";

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
              <Typography variant="h5">Propostas feitas para as minhas Vagas</Typography>
            </Box>
            <Box sx={{ mt: 4 }}>
              <Grid container spacing={2}>
                {children}
              </Grid>
            </Box>
          </>
        )}
        dataItemComponent={({ item }) => {
          const status = getStatusCandidatura(item);
          const vaga = item.vaga || {};
          const strTipoContrato = optionsTipoContrato.find(
            (o) => o.value === vaga.tipoContrato
          );
          const cargo = vaga.cargo;
          const titulo = vaga.titulo;
          const candidato = item.candidato || {}
          let nome = candidato.nomePreferido;
          if (nome == null || nome.length < 1) {
            nome = candidato.nomePrimeiro;
            if (candidato.nomeUltimo != null && candidato.nomeUltimo.length > 0) {
              nome += " " + candidato.nomeUltimo;
            }
          }
          const optGenero = optionsGenero.find((o) => o.value === candidato.genero);
          const anos = getYears(new Date(), new Date(candidato.nascimento));

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
              <Box sx={{ mb: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs>
                    <Link
                      to={
                        "/app/" + allRoutesData.pjPropostaFeita.path + item._id
                      }
                    >
                      <Typography color="primary">{nome}</Typography>
                    </Link>
                    <Box sx={{ mb: 1 }}>
                      {optGenero && (
                        <Typography variant="span" fontWeight="500" color="textSecondary">
                          {optGenero.label}
                          {" - "}
                        </Typography>
                      )}
                      <Typography variant="span" color="textSecondary">
                        {anos} anos
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs>
                    <Link to={'/app/' + allRoutesData.pjMinhaVaga.path + item.vagaId}>
                      <Typography color="primary">{titulo}</Typography>
                    </Link>
                    <Box sx={{ mb: 1 }}>
                      {partsVaga.map((part, idx) => (
                        <Fragment key={idx}>
                          {idx > 0 && " - "}
                          {part}
                        </Fragment>
                      ))}
                    </Box>
                  </Grid>
                  
                  <Grid item>
                    <Box sx={{ mr: 2 }}>
                      <Typography align="right" color="textSecondary">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </Typography>
                      <Typography align="right" color={status.color}>
                        {status.label}
                      </Typography>
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

export default PropostasFeitasPage;
