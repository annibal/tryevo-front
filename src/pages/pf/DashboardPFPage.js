import React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { ACCOUNT_FEATURES, useAuth } from "../../base/AuthContext";
import LoaderTryEvo from "../../components/LoaderTryEvo";
import SimpleBarChart from "../../components/SimpleBarChart";

const DashboardPFPage = () => {
  const auth = useAuth();

  const hasChartDash = true; //(auth?.features || {})[ACCOUNT_FEATURES.PF_DASH];

  const barChartData = [
    { name: "A", value: 10 },
    { name: "B", value: 20 },
    { name: "C", value: 30 },
    { name: "D", value: 15 },
  ];

  const donutChartData = [
    { name: "Category 1", value: 25 },
    { name: "Category 2", value: 30 },
    { name: "Category 3", value: 45 },
  ];

  const dataQtdVagas = [
    { name: "Mar", value: 119889 },
    { name: "Abr", value: 81722 },
    { name: "Mai", value: 103426 },
    { name: "Jun", value: 57168 },
    { name: "Jul", value: 106490 },
    { name: "Ago", value: 68938 },
    { name: "Set", value: 65789 },
  ];
  const dataContratacoes = [
    { name: "Mar", value: 16243 },
    { name: "Abr", value: 11871 },
    { name: "Mai", value: 19986 },
    { name: "Jun", value: 25470 },
    { name: "Jul", value: 24779 },
    { name: "Ago", value: 20403 },
    { name: "Set", value: 18507 },
  ];
  const dataEmpresas = [
    { name: "Mar", value: 2988 },
    { name: "Abr", value: 3840 },
    { name: "Mai", value: 4313 },
    { name: "Jun", value: 5327 },
    { name: "Jul", value: 5939 },
    { name: "Ago", value: 6092 },
    { name: "Set", value: 7183 },
  ];
  const dataVagasCompetencia = [
    { name: "Javascript", value: 119889 },
    { name: "Excel", value: 81722 },
    { name: "Análise", value: 103426 },
    { name: "Gerência", value: 57168 },
    { name: "CSS", value: 106490 },
    { name: "MySQL", value: 68938 },
    { name: "ABAP", value: 65789 },
  ]
  const dataVagasEstado = [
    { name: "SP", value: 93876 },
    { name: "RJ", value: 61559 },
    { name: "BA", value: 101266 },
    { name: "BH", value: 78323 },
    { name: "ES", value: 97901 },
    { name: "RS", value: 69897 },
    { name: "RN", value: 74242 },
  ]

  return (
    <div>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" align="center">
          Dashboard do Candidato
        </Typography>
      </Box>

      {/* <Box sx={{ border: '1px solid black' }}>
        <LoaderTryEvo />
      </Box> */}

      {hasChartDash && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quantidade de Vagas
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    height: "200px",
                  }}
                >
                  <ResponsiveContainer>
                    <AreaChart width={500} height={200} data={dataQtdVagas}>
                      <XAxis dataKey="name" />
                      <Tooltip />
                      <Area type="monotone" dataKey="value" fill="#8884d8" />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Contratações
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    height: "200px",
                  }}
                >
                  <ResponsiveContainer>
                    <AreaChart width={500} height={200} data={dataContratacoes}>
                      <XAxis dataKey="name" />
                      <Tooltip />
                      <Area type="monotone" dataKey="value" fill="#8884d8" />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Empresas Cadastradas
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    height: "200px",
                  }}
                >
                  <ResponsiveContainer>
                    <AreaChart width={500} height={200} data={dataEmpresas}>
                      <XAxis dataKey="name" />
                      <Tooltip />
                      <Area type="monotone" dataKey="value" fill="#8884d8" />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Vagas por Competências mais comuns
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    height: "250px",
                  }}
                >
                  <SimpleBarChart
                    data={dataVagasCompetencia}
                    xKey="name"
                    yKey="value"
                    fill="#8884d8"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Vagas por Estado
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    height: "250px",
                  }}
                >
                  <SimpleBarChart
                    data={dataVagasEstado}
                    xKey="name"
                    yKey="value"
                    fill="#8884d8"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quantidade de Vagas
                </Typography>
                <Box sx={{ display:'flex', justifyContent:'center' }}>
                  <BarChart width={500} height={200} data={barChartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Widget 2
                </Typography>
                <Box sx={{ display:'flex', justifyContent:'center' }}>
                  <PieChart width={500} height={200}>
                    <Pie data={donutChartData} dataKey="value" nameKey="name" innerRadius="50%" outerRadius="80%" />
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Widget 3
                </Typography>
                <Box sx={{ display:'flex', justifyContent:'center' }}>
                  <LineChart width={500} height={200} data={lineChartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
                </Box>
              </CardContent>
            </Card>
          </Grid> */}
        </Grid>
      )}
    </div>
  );
};

export default DashboardPFPage;
