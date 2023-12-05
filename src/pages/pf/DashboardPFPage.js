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
import formatPreco from "../../utils/formatPreco";

const DashboardPFPage = () => {
  const auth = useAuth();
  const userFeatures = auth?.features || {};
  const theme = useTheme();
  const [regionIn, setRegionIn] = useState(false);

  const hasChartDash =
    userFeatures[FEAT.VER_DASHBOARD] && userFeatures[FEAT.PF];
  //

  const resVagasRegiao = useChartDash({
    chartFeature: FEAT.VER_G_VAGAS_REGIAO,
    accountType: FEAT.PF,
    params: {
      ...(regionIn ? { estado: regionIn.name } : {}),
      limit: 7,
    },
  });
  const resEvoVagas = useChartDash({
    chartFeature: FEAT.VER_G_EVO_VAGAS,
    accountType: FEAT.PF,
    params: {
      limit: 12,
    },
  });
  const resTopCargos = useChartDash({
    chartFeature: FEAT.VER_G_TOP_CARGOS,
    accountType: FEAT.PF,
    params: {
      limit: 7,
    },
  });
  const resEvoEmpresas = useChartDash({
    chartFeature: FEAT.VER_G_EVO_EMPRESAS,
    accountType: FEAT.PF,
    params: {
      limit: 12,
    },
  });
  const resSalarioCargos = useChartDash({
    chartFeature: FEAT.VER_G_SALARIO_CARGOS,
    accountType: FEAT.PF,
    params: {
      limit: 7,
    },
  });

  // console.log({
  //   resVagasRegiao,
  //   resEvoVagas,
  //   resTopCargos,
  //   resEvoEmpresas,
  //   resSalarioCargos,
  // });

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
            <DashChartWrapper title="Evolução de Vagas" {...resEvoVagas}>
              <DashAreaChart
                data={resEvoVagas.data}
                xKey="time"
                yKey="value"
                fill={theme.palette.primary.main}
                formatValue={val => `${val.toLocaleString()} Vagas`}
              />
            </DashChartWrapper>
          </Grid>
          <Grid item xs={12} lg={6}>
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
                formatValue={val => `${val.toLocaleString()} Vagas`}
                onClick={regionIn ? null : (payload) => (regionIn ? null : setRegionIn(payload))}
              />
            </DashChartWrapper>
          </Grid>


          <Grid item xs={12} lg={6}>
            <DashChartWrapper title="Evolução de Empresas" {...resEvoEmpresas}>
              <DashAreaChart
                data={resEvoEmpresas.data}
                xKey="time"
                yKey="value"
                fill={theme.palette.primary.main}
                formatValue={val => `${val.toLocaleString()} Empresas`}
              />
            </DashChartWrapper>
          </Grid>

          <Grid item xs={12} lg={6}>
            <DashChartWrapper
              title="Top Cargos mais procurados"
              {...resTopCargos}
            >
              <DashBarChart
                data={resTopCargos.data}
                xKey="name"
                yKey="value"
                fill={theme.palette.primary.main}
                formatValue={val => `${val.toLocaleString()} Vaga${val === 1 ? "" : "s"}`}
              />
            </DashChartWrapper>
          </Grid>
          <Grid item xs={12} lg={6}>
            <DashChartWrapper
              title="Cargos com maior Salário"
              {...resSalarioCargos}
            >
              <DashBarChart
                data={resSalarioCargos.data}
                xKey="name"
                yKey="value"
                fill={theme.palette.primary.main}
                formatValue={val => `R$ ${formatPreco(val)}`}
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
