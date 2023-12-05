import { Grid, Typography, Box } from "@mui/material";
import { ACCOUNT_FEATURES as FEAT, useAuth } from "../../base/AuthContext";
import DashBarChart from "../../components/dash/DashBarChart";
import UpsellWidget from "../../components/UpsellWidget";
import DashChartWrapper from "../../components/dash/DashChartWrapper";
import DashAreaChart from "../../components/dash/DashAreaChart";
import { useTheme } from "@emotion/react";
import DashLineChart from "../../components/dash/DashLineChart";
import useChartDash from "../../components/dash/useChartDash";

const DashboardPJPage = () => {
  const auth = useAuth();
  const userFeatures = auth?.features || {};
  const theme = useTheme();

  const hasChartDash =
    userFeatures[FEAT.VER_DASHBOARD] && userFeatures[FEAT.PJ];
  //

  const resCompetenciasVagas = useChartDash({
    chartFeature: FEAT.VER_G_VAGAS_MES,
    accountType: FEAT.PJ,
    params: {
      limit: 7,
    },
  });
  const resCompetenciasCandidatos = useChartDash({
    chartFeature: FEAT.VER_G_VAGAS_MES,
    accountType: FEAT.PJ,
    params: {
      limit: 7,
    },
  });
  const resHabilidadesVagas = useChartDash({
    chartFeature: FEAT.VER_G_VAGAS_MES,
    accountType: FEAT.PJ,
    params: {
      limit: 7,
    },
  });
  const resHabilidadesCandidatos = useChartDash({
    chartFeature: FEAT.VER_G_VAGAS_MES,
    accountType: FEAT.PJ,
    params: {
      limit: 7,
    },
  });
  const resCandidatosFinalistas = useChartDash({
    chartFeature: FEAT.VER_G_VAGAS_MES,
    accountType: FEAT.PJ,
    params: {
      limit: 12,
    },
  });
  const resEvoCandidatura = useChartDash({
    chartFeature: FEAT.VER_G_VAGAS_MES,
    accountType: FEAT.PJ,
    params: {
      limit: 12,
    },
  });
  const resContratacoesCargos = useChartDash({
    chartFeature: FEAT.VER_G_VAGAS_MES,
    accountType: FEAT.PJ,
    params: {
      limit: 7,
    },
  });

  return (
    <div>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" align="center">
          Dashboard da Empresa
        </Typography>
      </Box>

      {hasChartDash ? (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <DashChartWrapper
              title="Competências com mais Vagas"
              {...resCompetenciasVagas}
            >
              <DashBarChart
                data={resCompetenciasVagas.data}
                xKey="name"
                yKey="value"
                fill={theme.palette.primary.main}
                valueName="Vagas"
              />
            </DashChartWrapper>
          </Grid>
          <Grid item xs={12} md={6}>
            <DashChartWrapper
              title="Competências mais comuns entre Candidatos"
              {...resCompetenciasCandidatos}
            >
              <DashBarChart
                data={resCompetenciasCandidatos.data}
                xKey="name"
                yKey="value"
                fill={theme.palette.primary.main}
                valueName="Candidatos"
              />
            </DashChartWrapper>
          </Grid>

          <Grid item xs={12} md={6}>
            <DashChartWrapper
              title="Habilidades com mais Vagas"
              {...resHabilidadesVagas}
            >
              <DashBarChart
                data={resHabilidadesVagas.data}
                xKey="name"
                yKey="value"
                fill={theme.palette.primary.main}
                valueName="Vagas"
              />
            </DashChartWrapper>
          </Grid>
          <Grid item xs={12} md={6}>
            <DashChartWrapper
              title="Habilidades mais comuns entre Candidatos"
              {...resHabilidadesCandidatos}
            >
              <DashBarChart
                data={resHabilidadesCandidatos.data}
                xKey="name"
                yKey="value"
                fill={theme.palette.primary.main}
                valueName="Candidatos"
              />
            </DashChartWrapper>
          </Grid>

          <Grid item xs={12}>
            <DashChartWrapper
              title="Candidatos Finalistas"
              {...resCandidatosFinalistas}
            >
              <DashAreaChart
                data={resCandidatosFinalistas.data}
                xKey="time"
                yKey="value"
                fill={theme.palette.primary.main}
                valueName="Candidatos"
              />
            </DashChartWrapper>
          </Grid>

          <Grid item xs={12}>
            <DashChartWrapper
              title="Evolução da Candidatura"
              {...resEvoCandidatura}
            >
              <DashLineChart
                data={resEvoCandidatura.data}
                xKey="time"
                yKeys={["candidaturas", "contratacoes"]}
                colors={[
                  theme.palette.primary.main,
                  theme.palette.secondary.main,
                ]}
                valueNames={["Candidaturas", "Contratações"]}
              />
            </DashChartWrapper>
          </Grid>
          <Grid item xs={12}>
            <DashChartWrapper
              title="Cargos mais contratados"
              {...resContratacoesCargos}
            >
              <DashBarChart
                data={resContratacoesCargos.data}
                xKey="name"
                yKey="value"
                fill={theme.palette.primary.main}
                valueName="Contratações"
              />
            </DashChartWrapper>
          </Grid>
        </Grid>
      ) : (
        <UpsellWidget>Dashboard</UpsellWidget>
      )}
    </div>
  );
};

export default DashboardPJPage;
