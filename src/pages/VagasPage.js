import { Box, Button, Grid, Typography } from "@mui/material";
import useFetch from "../providers/useFetch";
import ResponseWrapper from "../components/ResponseWrapper";
import VagaCard from "../components/VagaCard";
import FormInput from "./commons/form/FormInput";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const VagasPage = () => {
  const [dados, setDados] = useState({});
  const [listUrl, setListUrl] = useState('vagas');
  const handleChange = (value, name, data) => {
    setDados({ ...data, [name]: value });
  };
  
  const vagasResponse = useFetch('GET', listUrl);

  const handleSubmit = (event) => {
    setListUrl(`vagas?q=${dados.busca}`);
    event.preventDefault()
  }

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs>
            <FormInput
              label="Buscar vagas"
              name="busca"
              placeholder="Buscar vagas"
              data={dados}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <Button
              type="submit"
              size="large"
              disableElevation
              variant="contained"
              startIcon={<SearchIcon />}
            >
              Buscar
            </Button>
          </Grid>
        </Grid>
      </form>

      <ResponseWrapper
        {...vagasResponse}
        list
        dataComponent={({ children }) => <Grid container spacing={2}>{children}</Grid>}
        dataItemComponent={({ item }) => (
          <Grid item xs={12}>
            <VagaCard {...item} />
          </Grid>
        )}
      />
    </Box>
  );
}

export default VagasPage;
