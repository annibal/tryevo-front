import { Link, useParams } from "react-router-dom";
import allRoutesData from "../../../base/routes_data";
import useFetch from "../../../providers/useFetch";
import ResponseWrapper from "../../../components/ResponseWrapper";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Box, Button, Typography, Grid, Divider, Chip } from "@mui/material";
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
import InfoTable from "../../../components/InfoTable";
import VagaCard from "../../../components/VagaCard";

const MinhaVagaPage = () => {
  const auth = useAuth();
  let { vagaId, vagaNome } = useParams();
  const baseVagaApiUrl = `vaga/${vagaId}`;
  const [vagaApiUrl, setVagaApiUrl] = useState(baseVagaApiUrl);
  const [actionError, setActionError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const vagaResponse = useFetch("GET", vagaApiUrl);

  const propostasResponse = useFetch("GET", `propostas`, { vaga: vagaId });

  const isCreatedByMe = auth.user?._id === vagaResponse.data?.ownerId;
  if (!isCreatedByMe) {
    console.log(auth, vagaResponse);
  }

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

  const strApelido = vagaResponse?.data?.apelido
    ? `Apelido: ${vagaResponse?.data?.apelido}`
    : null;

  return (
    <Box>
      <Section
        title={vagaResponse?.data?.titulo || vagaNome}
        subtitle={strApelido}
        spacing={4}
      >
        <Grid container spacing={2} wrap="nowrap">
          <Grid item xs={12} sm={6} lg={8}>
            <InfoTable
              data={[
                { name: "ID da vaga", value: vagaId },
                {
                  name: "Status",
                  value: vagaResponse.data?.active ? (
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
                  ),
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <ResponseWrapper {...vagaResponse}>
              {isCreatedByMe ? (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
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

                  <Grid item xs={12}>
                    {actionError && (
                      <Typography color="error">
                        {String(actionError)}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              ) : (
                <Typography color="error">
                  Essa vaga foi criada por outra empresa.
                </Typography>
              )}
            </ResponseWrapper>
          </Grid>
        </Grid>
      </Section>

      <ResponseWrapper {...vagaResponse}>
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
                            <Typography variant="span" fontWeight="500">
                              {formatPercent(match)}
                            </Typography>
                          </Typography>
                        )}
                      </Box>
                    </Grid>

                    <Grid item xs>
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
        </Section>

        <Section
          title="Pré-visualização da Vaga"
          subtitle="Como a vaga vai aparecer para o candidato"
          withoutDivider
        >
          {vagaResponse.data && (
            <Grid container spacing={2}>
              <Grid item sm={8} xs={12}>
                <VagaCard
                  vaga={vagaResponse.data}
                  disableFavorite
                  showCandidatarBtn={false}
                  sx={{ border: "1px solid #88888888", p: 4, pb: 0 }}
                />
              </Grid>
            </Grid>
          )}
        </Section>
      </ResponseWrapper>
    </Box>
  );
};

export default MinhaVagaPage;
