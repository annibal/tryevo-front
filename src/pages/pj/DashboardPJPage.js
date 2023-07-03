import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ACCOUNT_FEATURES, useAuth } from '../../base/AuthContext';

const DashboardPJPage = () => {
  const auth = useAuth();

  const hasChartDash = (auth?.features || {})[ACCOUNT_FEATURES.PJ_DASH];

  const barChartData = [
    { name: 'A', value: 10 },
    { name: 'B', value: 20 },
    { name: 'C', value: 30 },
    { name: 'D', value: 15 },
  ];

  const donutChartData = [
    { name: 'Category 1', value: 25 },
    { name: 'Category 2', value: 30 },
    { name: 'Category 3', value: 45 },
  ];

  const lineChartData = [
    { name: 'Jan', value: 10 },
    { name: 'Feb', value: 20 },
    { name: 'Mar', value: 15 },
    { name: 'Apr', value: 25 },
    { name: 'May', value: 30 },
    { name: 'Jun', value: 35 },
  ];

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Dashboard PJ
      </Typography>
      {hasChartDash && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Widget 1
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
          <Grid item xs={12}>
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
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default DashboardPJPage;