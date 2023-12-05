import { useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { ACCOUNT_FEATURES as FEAT, useAuth } from "../../base/AuthContext";
import DashBarChart from "../../components/dash/DashBarChart";
import UpsellWidget from "../../components/UpsellWidget";
import DashChartWrapper from "../../components/dash/DashChartWrapper";
import DashAreaChart from "../../components/dash/DashAreaChart";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useTheme } from "@emotion/react";
import useChartDash from "../../components/dash/useChartDash";

const DashboardPFPage = () => {
  const auth = useAuth();
  const userFeatures = auth?.features || {};
  const theme = useTheme();
  const [regionIn, setRegionIn] = useState(false);

  const hasChartDash =
    userFeatures[FEAT.VER_DASHBOARD] && userFeatures[FEAT.PF];
  //

  const dataQtdVagas = [
    { time: "2023-03-01", value: 119889 },
    { time: "2023-04-01", value: 81722 },
    { time: "2023-05-01", value: 103426 },
    { time: "2023-06-01", value: 57168 },
    { time: "2023-07-01", value: 106490 },
    { time: "2023-08-01", value: 68938 },
    { time: "2023-09-01", value: 65789 },
  ];
  const dataContratacoes = [
    { time: "2023-03-01", value: 16243 },
    { time: "2023-04-01", value: 11871 },
    { time: "2023-05-01", value: 19986 },
    { time: "2023-06-01", value: 25470 },
    { time: "2023-07-01", value: 24779 },
    { time: "2023-08-01", value: 20403 },
    { time: "2023-09-01", value: 18507 },
  ];
  const dataEmpresas = [
    { time: "2023-03-01", value: 2988 },
    { time: "2023-04-01", value: 3840 },
    { time: "2023-05-01", value: 4313 },
    { time: "2023-06-01", value: 5327 },
    { time: "2023-07-01", value: 5939 },
    { time: "2023-08-01", value: 6092 },
    { time: "2023-09-01", value: 7183 },
  ];
  const dataVagasCompetencia = [
    { name: "Javascript", value: 119889 },
    { name: "Excel", value: 81722 },
    { name: "Análise", value: 103426 },
    { name: "Gerência", value: 57168 },
    { name: "CSS", value: 106490 },
    { name: "MySQL", value: 68938 },
    { name: "ABAP", value: 65789 },
  ];
  const dataVagasEstado = [
    { name: "SP", value: 93876 },
    { name: "RJ", value: 61559 },
    { name: "BA", value: 101266 },
    { name: "BH", value: 78323 },
    { name: "ES", value: 97901 },
    { name: "RS", value: 69897 },
    { name: "RN", value: 74242 },
  ];
  const dataEvoCandidaturas = [
    { time: "2023-01-01", candidaturas: 0, contratacoes: 0 },
    { time: "2023-02-01", candidaturas: 0, contratacoes: 0 },
    { time: "2023-03-01", candidaturas: 12, contratacoes: 1 },
    { time: "2023-04-01", candidaturas: 11, contratacoes: 0 },
    { time: "2023-05-01", candidaturas: 53, contratacoes: 32 },
    { time: "2023-06-01", candidaturas: 0, contratacoes: 15 },
    { time: "2023-07-01", candidaturas: 22, contratacoes: 7 },
    { time: "2023-08-01", candidaturas: 102, contratacoes: 65 },
    { time: "2023-09-01", candidaturas: 63, contratacoes: 42 },
    { time: "2023-10-01", candidaturas: 96, contratacoes: 78 },
    { time: "2023-11-01", candidaturas: 73, contratacoes: 15 },
    { time: "2023-12-01", candidaturas: 114, contratacoes: 67 },
  ];

  const resVagasRegiao = useChartDash({
    chartFeature: FEAT.VER_G_VAGAS_MES,
    accountType: FEAT.PF,
    params: {
      ...(regionIn ? { state: regionIn.name } : {}),
      limit: 7,
    },
  });
  const resEvoVagas = useChartDash({
    chartFeature: FEAT.VER_G_VAGAS_MES,
    accountType: FEAT.PF,
    params: {
      limit: 12,
    },
  });
  const resCargos = useChartDash({
    chartFeature: FEAT.VER_G_VAGAS_MES,
    accountType: FEAT.PF,
    params: {
      limit: 7,
    },
  });
  const resEvoEmpresas = useChartDash({
    chartFeature: FEAT.VER_G_VAGAS_MES,
    accountType: FEAT.PF,
    params: {
      limit: 12,
    },
  });
  const resSalarioCargos = useChartDash({
    chartFeature: FEAT.VER_G_VAGAS_MES,
    accountType: FEAT.PF,
    params: {
      limit: 7,
    },
  });

  return (
    <div>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" align="center">
          Dashboard do Candidato
        </Typography>
      </Box>

      {hasChartDash ? (
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <DashChartWrapper
              title="Evolução de Vagas"
              {...resEvoVagas}
            >
              <DashAreaChart
                data={resEvoVagas.data}
                xKey="time"
                yKey="value"
                fill={theme.palette.primary.main}
                valueName="Vagas"
              />
            </DashChartWrapper>
          </Grid>
          <Grid item xs={12} lg={6}>
            <DashChartWrapper
              title="Evolução de Empresas"
              {...resEvoEmpresas}
            >
              <DashAreaChart
                data={resEvoEmpresas.data}
                xKey="time"
                yKey="value"
                fill={theme.palette.primary.main}
                valueName="Vagas"
              />
            </DashChartWrapper>
          </Grid>
          
          <Grid item xs={12} lg={4}>
            <DashChartWrapper
              title={
                regionIn
                  ? `Vagas por Cidade (${regionIn.name})`
                  : "Vagas por Estado"
              }
              {...resVagasRegiao}
              titleButtonContent={
                regionIn ? (
                  <>
                    <ArrowUpwardIcon sx={{ mr: 1, fontSize: "1.5em" }} />{" "}
                    Estados
                  </>
                ) : (
                  false
                )
              }
              onClick={() => setRegionIn(false)}
            >
              <DashBarChart
                data={resVagasRegiao.data}
                xKey="name"
                yKey="value"
                fill={theme.palette.secondary.main}
                valueName="Vagas"
                onClick={(payload) => (regionIn ? null : setRegionIn(payload))}
              />
            </DashChartWrapper>
          </Grid>
          <Grid item xs={12} lg={4}>
            <DashChartWrapper
              title="Top Cargos mais procurados"
              {...resCargos}
            >
              <DashBarChart
                data={resCargos.data}
                xKey="name"
                yKey="value"
                fill={theme.palette.primary.main}
                valueName="Vagas"
              />
            </DashChartWrapper>
          </Grid>
          <Grid item xs={12} lg={4}>
            <DashChartWrapper
              title="Cargos com maior Salário"
              {...resSalarioCargos}
            >
              <DashBarChart
                data={resSalarioCargos.data}
                xKey="name"
                yKey="value"
                fill={theme.palette.primary.main}
                valueName="Vagas"
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

export default DashboardPFPage;
