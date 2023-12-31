import { Navigate, useParams } from "react-router-dom";
import useFetch from "../../providers/useFetch";
import { getStatusCandidatura } from "../pf/candidatura/CandidaturaPage";
import { Helmet } from "react-helmet";
import { Box, Grid, Typography } from "@mui/material";
import InlineIconInfo from "../../components/InlineIconInfo";
import CandidatoCard from "../../components/CandidatoCard";
import VagaCard from "../../components/VagaCard";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import JoinInnerIcon from "@mui/icons-material/JoinInner";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import TodayIcon from "@mui/icons-material/Today";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LinkIcon from "@mui/icons-material/Link";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import ResponseWrapper from "../../components/ResponseWrapper";
import Section from "../../components/Section";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import formatPercent from "../../utils/formatPercent";
import formatTelefone from "../../utils/formatTelefone";
import {
  optionsJornada,
  optionsLinks,
  optionsModeloContrato,
  optionsTelefone,
  optionsTipoContrato,
} from "../../providers/enumProvider";
import { doCall } from "../../providers/baseProvider";
import allRoutesData from "../../base/routes_data";
import FullCVBtn from "../../components/FullCVBtn";
import { ACCOUNT_FEATURES, useAuth } from "../../base/AuthContext";
import UpsellWidget from "../../components/UpsellWidget";

const PropostaFeitaPage = () => {
  let { propostaId } = useParams();
  const auth = useAuth();
  const userFeatures = auth?.features || {};

  const hasVerDadosFeature = userFeatures[ACCOUNT_FEATURES.VER_DADOS_CANDIDATO];

  const propostaResponse = useFetch("GET", `proposta/${propostaId}`);
  const proposta = propostaResponse.data || {};
  const statusProposta = getStatusCandidatura(proposta);

  const [verDadosLoading, setVerDadosLoading] = useState(false);
  const [verDadosError, setVerDadosError] = useState();
  const [verDadosData, setVerDadosData] = useState();

  const [contratarLoading, setContratarLoading] = useState(false);
  const [contratarError, setContratarError] = useState();
  const [contratarData, setContratarData] = useState();

  const handleVerDados = () => {
    if (!hasVerDadosFeature) {
      alert("Não da pra ver dados do candidato sem comprar o plano");
      return;
    }
    setVerDadosLoading(true);
    setVerDadosError(null);
    doCall(`/proposta/${propostaId}/ver-candidato`, {
      method: "POST",
    }).then((response) => {
      if (response.error) {
        setVerDadosError(response.error?.message || response.error);
      } else {
        setVerDadosData(response.data);
      }
      setVerDadosLoading(false);
    });
  };
  const handleContratar = () => {
    setContratarLoading(true);
    setContratarError(null);
    doCall(`/proposta/${propostaId}/set-contratado`, {
      method: "POST",
    }).then((response) => {
      if (response.error) {
        setContratarError(response.error?.message || response.error);
      } else {
        alert("Contrato feito com sucesso!");
        setContratarData(response.data);
      }
      setContratarLoading(false);
    });
  };

  // const vagaResponse = useFetch(
  //   "GET",
  //   proposta.vagaId != null ? `vaga/${proposta.vagaId}` : null
  // );
  // const vaga = vagaResponse.data || {}

  const vaga = proposta.vaga || {};
  const candidato = proposta.candidato || {};

  const showDadosCandidato = proposta.viuDados || verDadosData != null;
  const dadosCandidato = verDadosData == null ? candidato : verDadosData;

  const match = formatPercent(proposta.matchResult?.match, 3);
  const matchParts = match.split(".");
  const matchInt = matchParts[0];
  const matchDecimals = (matchParts[1] ? `,${matchParts[1]}` : "").replace(
    "%",
    ""
  );
  const matchPercent = matchParts[1] ? " %" : "";

  return (
    <Box>
      <Helmet>
        <title>Proposta - TryEvo</title>
      </Helmet>

      <ResponseWrapper {...propostaResponse}>
        <Box sx={{ mt: 2, mb: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs>
              <Typography variant="h4">Proposta</Typography>
            </Grid>
            <Grid item>
              <InlineIconInfo
                Icon={JoinInnerIcon}
                className="proposta-match"
                sx={{ mb: 4 }}
                title="Match"
              >
                <Typography fontWeight="bold">
                  {matchInt}
                  <Typography color="textSecondary" variant="caption">
                    {matchDecimals}
                  </Typography>
                  {matchPercent}
                </Typography>
              </InlineIconInfo>
            </Grid>
            <Grid item>
              <InlineIconInfo
                Icon={LabelImportantIcon}
                className="proposta-status"
                sx={{ mb: 4 }}
                title="Status"
              >
                <Typography color={statusProposta.color}>
                  {statusProposta.label}
                </Typography>
              </InlineIconInfo>
            </Grid>
            <Grid item>
              <InlineIconInfo
                Icon={TodayIcon}
                className="proposta-created-at"
                sx={{ mb: 4 }}
                title="Criada em"
              >
                <Typography>
                  {new Date(proposta.createdAt).toLocaleDateString()}
                </Typography>
              </InlineIconInfo>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mb: 8 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5.5}>
              <CandidatoCard
                pf={candidato || {}}
                sx={{ border: "1px solid #88888888", p: 4, pb: 0, mb: 2 }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={1}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ArrowForwardIcon />
            </Grid>
            <Grid item xs={12} sm={5.5}>
              <VagaCard
                vaga={vaga}
                disableFavorite
                isPJ
                showCandidatarBtn={false}
                sx={{ border: "1px solid #88888888", p: 4, pb: 0 }}
              />
            </Grid>
          </Grid>
        </Box>

        <Section title="Respostas enviadas pelo Candidato:">
          <Box sx={{ maxHeight: "500px", overflow: "auto" }}>
            {(proposta.questoes || []).map((questao, idx) => (
              <InlineIconInfo
                key={idx}
                Icon={ArrowCircleRightIcon}
                sx={{ mb: 4 }}
                title={questao.pergunta}
              >
                <Typography sx={{ whiteSpace: "pre-line" }}>
                  {questao.resposta}
                </Typography>
              </InlineIconInfo>
            ))}
          </Box>
        </Section>

        <Section title="Dados do Candidato">
          {showDadosCandidato ? (
            <>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6">
                  {dadosCandidato.nomePrimeiro} {dadosCandidato.nomeUltimo}
                </Typography>
                {dadosCandidato.nomePreferido && (
                  <Typography color="text.secondary">
                    Prefere ser chamado por "{dadosCandidato.nomePreferido}"
                  </Typography>
                )}
              </Box>

              <InlineIconInfo Icon={EmailIcon} sx={{ mb: 4 }} title="Email">
                <Typography>{dadosCandidato.email}</Typography>
              </InlineIconInfo>

              <InlineIconInfo
                Icon={LocalPhoneIcon}
                sx={{ mb: 4 }}
                title="Telefone"
              >
                {(dadosCandidato.telefones || []).map((telefone) => {
                  const tipoTelefone = optionsTelefone.find(
                    (x) => x.value === telefone.tipo
                  );
                  return (
                    <Typography key={telefone.valor}>
                      {formatTelefone(telefone.valor)}
                      {tipoTelefone && (
                        <Typography color="textSecondary" component="span">
                          {" - "}
                          {tipoTelefone.label}
                        </Typography>
                      )}
                    </Typography>
                  );
                })}
              </InlineIconInfo>

              <InlineIconInfo Icon={LinkIcon} sx={{ mb: 4 }} title="Links">
                {(dadosCandidato.links || []).map((link) => {
                  const tipoLink = optionsLinks.find(
                    (x) => x.value === link.tipo
                  );
                  return (
                    <a
                      href={link.valor}
                      key={link.valor}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Typography color="primary">
                        {link.valor}
                        {tipoLink && (
                          <Typography color="textSecondary" component="span">
                            {" - "}
                            {tipoLink.label}
                          </Typography>
                        )}
                      </Typography>
                    </a>
                  );
                })}
              </InlineIconInfo>

              <InlineIconInfo
                Icon={TrackChangesIcon}
                sx={{ mb: 4 }}
                title="Objetivos Profissionais"
              >
                {(dadosCandidato.objetivos || []).map((objetivo, idx) => {
                  const tipoContrato = optionsTipoContrato.find(
                    (x) => x.value === objetivo.tipoContrato
                  );
                  const tipoJornada = optionsJornada.find(
                    (x) => x.value === objetivo.jornada
                  );
                  const tipoModelo = optionsModeloContrato.find(
                    (x) => x.value === objetivo.modeloContrato
                  );
                  const strRemuneracao =
                    objetivo?.remuneracao != null
                      ? "R$ " +
                        (+objetivo.remuneracao).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          currency: "BRL",
                        })
                      : null;
                  const arrObjetivo = [
                    objetivo.cargo?.nome,
                    tipoContrato?.label,
                    tipoModelo?.label,
                    tipoJornada?.label,
                    strRemuneracao,
                  ].filter((x) => x != null && x !== "");
                  return (
                    <Typography key={idx}>
                      <Typography
                        align="right"
                        component="span"
                        color="text.secondary"
                        sx={{ display: "inline-block", width: "12px", mr: 1 }}
                      >
                        {idx + 1}
                        {": "}
                      </Typography>
                      {arrObjetivo.join(" - ")}
                    </Typography>
                  );
                })}
              </InlineIconInfo>

              <Box>
                {!contratarLoading && contratarError && (
                  <Box sx={{ pb: 2 }}>
                    <Typography color="error">
                      {String(contratarError)}
                    </Typography>
                  </Box>
                )}

                <LoadingButton
                  loading={contratarLoading}
                  onClick={handleContratar}
                  disableElevation
                  disabled={proposta.contratou}
                  color="primary"
                  variant="contained"
                >
                  {proposta.contratou ? "Contratado" : "Contratar"}
                </LoadingButton>

                {contratarData && (
                  <Navigate
                    to={"/app/" + allRoutesData.pjPropostasFeitas.path}
                  />
                )}

                <FullCVBtn propostaId={propostaId} sx={{ ml: 2 }} />
              </Box>
            </>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs>
                <LoadingButton
                  loading={verDadosLoading}
                  onClick={handleVerDados}
                  disableElevation
                  disabled={!hasVerDadosFeature || verDadosData != null}
                  color="primary"
                  variant="contained"
                >
                  Ver dados do Candidato
                </LoadingButton>

                {!verDadosLoading && verDadosError && (
                  <Box sx={{ pb: 2 }}>
                    <Typography color="error">
                      {String(verDadosError)}
                    </Typography>
                  </Box>
                )}
              </Grid>
              <Grid item>
                {!hasVerDadosFeature && (
                  <UpsellWidget>Ver dados e contratar</UpsellWidget>
                )}
              </Grid>
            </Grid>
          )}
        </Section>
      </ResponseWrapper>
    </Box>
  );
};

export default PropostaFeitaPage;
