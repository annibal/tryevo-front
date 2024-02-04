import { Box, Button, Grid, Typography } from "@mui/material";
import ResponseWrapper from "../../components/ResponseWrapper";
import Section from "../../components/Section";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../providers/useFetch";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlanAssForm from "./ManagePlanosAssinaturaComponents/PlanAssForm";
import allRoutesData from "../../base/routes_data";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { doCall } from "../../providers/baseProvider";

const ManageSinglePlanoAssinaturaPage = () => {
  const { planoId } = useParams();
  const planAssResponse = useFetch("GET", `plano-assinatura/${planoId}`);
  const planAssData = planAssResponse.data || {};
  const nav = useNavigate();

  const [deletePlanAssError, setDeletePlanAssError] = useState(null);
  const [deletePlanAssLoading, setDeletePlanAssLoading] = useState(false);
  const handleDeletePlanAss = () => {
    setDeletePlanAssLoading(true);
    setDeletePlanAssError(null);
    doCall(`plano-assinatura/${planoId}`, { method: "DELETE" }).then(
      (response) => {
        if (response.error) {
          setDeletePlanAssError(response.error?.message || response.error);
        } else {
          nav(`/app/${allRoutesData.masterAdminPlanosAssinatura.path}`);
        }
        setDeletePlanAssLoading(false);
      }
    );
  };
  
  const handleSubmit = (data) => {
    nav(`/app/${allRoutesData.masterAdminPlanosAssinatura.path}`);
  }

  let sectionTitle = planoId;
  if (planAssData?.nome) {
    sectionTitle = planAssData.nome;
  }

  const countUsersWithPlan = planAssData.countUsuarios
    ? planAssData.countUsuarios
    : "n/a";

  if (!planAssData?._id && !planAssResponse.loading) {
    return (
      <Box>
        <Section title="Gerenciar Plano de Assinatura" withoutDivider>
          <Typography>Plano não encontrado.</Typography>
        </Section>
      </Box>
    );
  }

  return (
    <Box>
      <Section title={sectionTitle} subtitle="Plano de Assinatura" spacing={4}>
        <Grid container spacing={2}>
          <Grid item xs>
            <Typography>
              Usuários com esse plano: <strong>{countUsersWithPlan}</strong>
            </Typography>
          </Grid>
          <Grid item>
            <Box sx={{ mb: 1 }}>
              <Button
                color="primary"
                variant="outlined"
                LinkComponent={Link}
                fullWidth
                startIcon={<ArrowBackIcon />}
                to={
                  "/app/" +
                  allRoutesData.masterAdminPlanosAssinatura.path
                }
              >
                Todos os Planos
              </Button>
            </Box>
            <Box sx={{ mb: 1 }}>
              <Button
                color="primary"
                variant="contained"
                LinkComponent={Link}
                fullWidth
                to={
                  "/app/" +
                  allRoutesData.masterAdminUsuarios.path +
                  "?plano=" +
                  planoId
                }
              >
                Ver Usuários com este Plano
              </Button>
            </Box>
            <Box>
              <LoadingButton
                loading={deletePlanAssLoading}
                onClick={handleDeletePlanAss}
                disableElevation
                color="error"
                startIcon={<DeleteForeverIcon />}
                variant="outlined"
                fullWidth
              >
                Excluir Plano de Assinatura
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>
        {deletePlanAssError && (
          <Box sx={{ my: 2, textAlign: "right" }}>
            <Typography color="error">{String(deletePlanAssError)}</Typography>
          </Box>
        )}
      </Section>
      <Section title="Editar Plano" spacing={4} withoutDivider>
        <ResponseWrapper {...planAssResponse}>
          {planAssData != null && (
            <Box>
              <PlanAssForm data={planAssData} onSubmit={handleSubmit} />
            </Box>
          )}
        </ResponseWrapper>
      </Section>
    </Box>
  );
};

export default ManageSinglePlanoAssinaturaPage;
