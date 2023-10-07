import { Navigate, useParams } from "react-router-dom";
import useFetch from "../../../providers/useFetch";
import { useState } from "react";
import { doCall } from "../../../providers/baseProvider";
import { Box, Grid, Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import ResponseWrapper from "../../../components/ResponseWrapper";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import TodayIcon from "@mui/icons-material/Today";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import CandidatoCard from "../../../components/CandidatoCard";
import VagaCard from "../../../components/VagaCard";
import { useAuth } from "../../../base/AuthContext";
import InlineIconInfo from "../../../components/InlineIconInfo";
import { LoadingButton } from "@mui/lab";
import allRoutesData from "../../../base/routes_data";

export const getStatusCandidatura = (candidatura) => {
  let statusCandidatura = { color: "inherit", label: "???" };
  if (candidatura?._id)
    statusCandidatura = { color: "inherit", label: "Em Aberto" };
  if (candidatura?.viuDados)
    statusCandidatura = { color: "primary", label: "Visualizada pela Empresa" };
  if (candidatura?.contratou)
    statusCandidatura = { color: "secondary", label: "Contratado!" };

  return statusCandidatura;
};

const CandidaturaPage = () => {
  const { userInfo } = useAuth();
  let { candidaturaId } = useParams();
  const [actionError, setActionError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const candidaturaResponse = useFetch("GET", `candidatura/${candidaturaId}`);
  const candidatura = candidaturaResponse.data || {};
  const statusCandidatura = getStatusCandidatura(candidatura);

  // const vagaResponse = useFetch(
  //   "GET",
  //   candidatura.vagaId != null ? `vaga/${candidatura.vagaId}` : null
  // );
  // const vaga = vagaResponse.data || {}
  const vaga = candidatura.vaga || {};

  const handleDelete = () => {
    doCall(`candidatura/${candidaturaId}`, { method: "DELETE" }).then(
      (response) => {
        if (response.error) {
          setActionError(response.error?.message || response.error);
        } else {
          alert("Candidatura excluída.");
        }
        setActionLoading(false);
        setIsDeleted(true);
      }
    );
  };

  return (
    <Box>
      <Helmet>
        <title>Candidatura - TryEvo</title>
      </Helmet>

      <ResponseWrapper {...candidaturaResponse}>
        <Box sx={{ mt: 2, mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={7} md={8} lg={9}>
              <Typography variant="h4">Candidatura</Typography>
            </Grid>
            <Grid item xs={12} sm={5} md={4} lg={3} sx={{ textAlign: "right" }}>
              <LoadingButton
                loading={actionLoading}
                onClick={handleDelete}
                disableElevation
                color="error"
                startIcon={<DeleteForeverIcon />}
                variant="outlined"
                sx={{ width: { xs: "auto", sm: "100%" } }}
              >
                Excluir Candidatura
              </LoadingButton>

              {!actionLoading && actionError && (
                <Box sx={{ pb: 2 }}>
                  <Typography color="error">{String(actionError)}</Typography>
                </Box>
              )}

              {isDeleted && (
                <Navigate to={"/app/" + allRoutesData.pfCandidaturas.path} />
              )}
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mb: 4 }}>
          <InlineIconInfo
            Icon={TodayIcon}
            className="candidatura-created-at"
            sx={{ mb: 4 }}
            title="Criada em"
          >
            <Typography>
              {new Date(candidatura.createdAt).toLocaleDateString()}
            </Typography>
          </InlineIconInfo>

          <InlineIconInfo
            Icon={LabelImportantIcon}
            className="candidatura-status"
            sx={{ mb: 4 }}
            title="Status"
          >
            <Typography color={statusCandidatura.color}>
              {statusCandidatura.label}
            </Typography>
          </InlineIconInfo>
        </Box>

        <Box sx={{ mb: 8 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5.5}>
              <CandidatoCard
                pf={userInfo || {}}
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
                sx={{ border: "1px solid #88888888", p: 4, pb: 0 }}
              />

              {/* {vagaResponse.isLoading ? (
                <>Vaga...</>
              ) : (
                <VagaCard
                  vaga={vaga}
                  disableFavorite
                  sx={{ border: "1px solid #88888888", p: 4, pb: 0 }}
                />
              )} */}
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Respostas enviadas na Candidatura:
          </Typography>
          {(candidatura.questoes || []).map((questao, idx) => (
            <InlineIconInfo
              key={idx}
              Icon={ArrowCircleRightIcon}
              className="vaga-created-at"
              sx={{ mb: 4 }}
              title={questao.pergunta}
            >
              <Typography sx={{ whiteSpace: "pre-line" }}>
                {questao.resposta}
              </Typography>
            </InlineIconInfo>
          ))}
        </Box>
      </ResponseWrapper>
    </Box>
  );
};

export default CandidaturaPage;
