import { Link, useParams } from "react-router-dom";
import allRoutesData from "../../../base/routes_data";
import useFetch from "../../../providers/useFetch";
import ResponseWrapper from "../../../components/ResponseWrapper";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Box, Button, Typography, Grid, Divider } from "@mui/material";
import { useAuth } from "../../../base/AuthContext";
import PrettyPrint from "../../commons/PrettyPrint";
import Section from "../../../components/Section";
import { doCall } from "../../../providers/baseProvider";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { getStatusCandidatura } from "../../pf/candidatura/CandidaturaPage";
import { optionsGenero } from "../../../providers/enumProvider";
import getYears from "../../../utils/getYears";
import formatPercent from "../../../utils/formatPercent";

const MinhaVagaPage = () => {
  const auth = useAuth();
  let { vagaId, vagaNome } = useParams();
  const baseVagaApiUrl = `vaga/${vagaId}`;
  const [vagaApiUrl, setVagaApiUrl] = useState(baseVagaApiUrl);
  const [actionError, setActionError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const vagaResponse = useFetch("GET", vagaApiUrl);

  const propostasResponse = useFetch("GET", `propostas`, { vaga: vagaId });

  const isCreatedByMe = auth.userInfo?._id === vagaResponse.data?.ownerId;

  const handleToggleActive = () => {
    setActionError(null);
    setActionLoading(false);
    doCall(vagaApiUrl, {
      method: "POST",
      body: {
        active: !vagaResponse.data?.active,
      },
    }).then((response) => {
      if (response.error) {
        setActionError(response.error?.message || response.error);
      } else {
        setVagaApiUrl(baseVagaApiUrl + `?cache=${+new Date()}`);
      }
      setActionLoading(false);
    });
  };
  const handleDelete = () => {
    doCall(vagaApiUrl, { method: "DELETE", body: {} }).then((response) => {
      if (response.error) {
        setActionError(response.error?.message || response.error);
      } else {
        setVagaApiUrl(baseVagaApiUrl + `?cache=${+new Date()}`);
      }
      setActionLoading(false);
    });
  };

  return (
    <Box>
      <Box sx={{ mb: 6 }}>
        <Typography variant="caption">Minha Vaga - {vagaId}</Typography>
        {vagaResponse?.data?.apelido ? (
          <>
            <Typography variant="h3">{vagaResponse?.data?.titulo}</Typography>
            <Typography sx={{ py: 2 }} color="textSecondary">
              Apelido: {vagaResponse?.data?.apelido}
            </Typography>
          </>
        ) : (
          <Typography variant="h3">
            {vagaResponse?.data?.titulo || vagaNome}
          </Typography>
        )}
        <Typography variant="caption">
          {vagaResponse.data?.active ? (
            <>
              <Typography
                component="span"
                color="primary"
                fontSize="inherit"
                fontWeight="bold"
              >
                Ativa
              </Typography>
              {" - "}
              aparece na busca e permite receber candidaturas
            </>
          ) : (
            <>
              <Typography
                component="span"
                color="textSecondary"
                fontSize="inherit"
                fontWeight="bold"
              >
                Inativa
              </Typography>
              {" - "}
              não aparece na busca e não recebe mais propostas
            </>
          )}
        </Typography>
      </Box>

      <ResponseWrapper {...vagaResponse}>
        {isCreatedByMe && (
          <Section title="Ações">
            <Grid container spacing={2}>
              <Grid item xs>
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  LinkComponent={Link}
                  startIcon={<EditNoteIcon />}
                  to={
                    "/app/" +
                    allRoutesData.pjEditarMinhaVaga.path +
                    vagaId +
                    "/" +
                    encodeURIComponent(
                      vagaResponse?.data?.apelido
                        ? vagaResponse?.data?.apelido
                        : vagaResponse?.data?.titulo
                    )
                  }
                >
                  Editar
                </Button>
              </Grid>
              <Grid item xs>
                <LoadingButton
                  fullWidth
                  variant="outlined"
                  onClick={handleToggleActive}
                  loading={actionLoading}
                  color={vagaResponse.data?.active ? "inherit" : "primary"}
                  startIcon={
                    vagaResponse.data?.active ? (
                      <UnpublishedIcon />
                    ) : (
                      <CheckCircleIcon />
                    )
                  }
                >
                  {vagaResponse.data?.active ? "Desativar" : "Ativar"}
                </LoadingButton>
              </Grid>
              <Grid item xs>
                <LoadingButton
                  fullWidth
                  variant="contained"
                  color="error"
                  onClick={handleDelete}
                  loading={actionLoading}
                  startIcon={<DeleteForeverIcon />}
                >
                  Excluir
                </LoadingButton>
              </Grid>
            </Grid>

            {actionError && (
              <Box sx={{ py: 2 }}>
                <Typography color="error">{String(actionError)}</Typography>
              </Box>
            )}
          </Section>
        )}

        <Section
          title="Candidaturas"
          subtitle="Propostas enviadas por candidatos para esta vaga"
        >
          <ResponseWrapper
            {...propostasResponse}
            list
            dataComponent={({ children }) => (
              <Grid container spacing={2}>
                {children}
              </Grid>
            )}
            dataItemComponent={({ item, rowIndex }) => {
              const status = getStatusCandidatura(item);
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

              return (
                <Grid item xs={12}>
                  {rowIndex > 0 && <Divider sx={{ mb: 2 }} />}
                  <Grid container spacing={2}>
                    <Grid item>
                      <Link
                        to={
                          "/app/" +
                          allRoutesData.pjPropostaFeita.path +
                          item._id
                        }
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
                            {optGenero.label}
                            {" - "}
                          </Typography>
                        )}
                        <Typography variant="span" color="textSecondary">
                          {anos} anos
                        </Typography>
                        {match != null && (
                          <Typography variant="span" color="text.primary">
                            {" - Match: "}
                            <Typography
                              variant="span"
                              fontWeight="500"
                            >
                              {formatPercent(match)}
                            </Typography>
                          </Typography>
                        )}
                      </Box>
                    </Grid>

                    <Grid item xs>
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
                </Grid>
              );
            }}
          />
        </Section>

        <Box sx={{ height: "300px", overflow: "auto", mb: 6 }}>
          <PrettyPrint keyName="Dados da Vaga" value={vagaResponse.data} />
        </Box>
      </ResponseWrapper>
    </Box>
  );
};

export default MinhaVagaPage;
