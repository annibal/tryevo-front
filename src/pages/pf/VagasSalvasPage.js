import { Box, Divider, Grid, Typography } from "@mui/material";
import { useState } from "react";
import useFetch from "../../providers/useFetch";
import ResponseWrapper from "../../components/ResponseWrapper";
import VagaCard from "../../components/VagaCard";

const VagasSalvasPage = () => {
  const [dados, setDados] = useState({});

  const vagasSalvasResponse = useFetch("GET", '/vagas-salvas');

  return (
    <div className="vagas-salvas">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 2}}>
          Vagas Salvas
        </Typography>
        <Divider />
      </Box>
      <Grid container>
        <ResponseWrapper
          {...vagasSalvasResponse}
          list
          dataComponent={({ children }) => (
            <Grid container spacing={2}>
              {children}
            </Grid>
          )}
          dataItemComponent={({ item }) => (
            <Grid item xs={12}>
              <VagaCard vaga={item} />
            </Grid>
          )}
        />
      </Grid>
    </div>
  );
}

export default VagasSalvasPage;
