import { Box, Button, Grid, Typography } from "@mui/material";
import useFetch from "../providers/useFetch";
import ResponseWrapper from "../components/ResponseWrapper";
import VagaCard from "../components/VagaCard";
import FormInput from "./commons/form/FormInput";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const VagasPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q');
  const [dados, setDados] = useState({});
  const [listUrl, setListUrl] = useState(`vagas${q ? `?q=${q}` : ''}`);
  const handleChange = (value, name, data) => {
    setDados({ ...data, [name]: value });
  };

  useEffect(() => {
    setListUrl(`vagas${q ? `?q=${q}` : ''}`);
    handleChange(q, 'titulo', dados)
  }, [q])

  const vagasResponse = useFetch("GET", listUrl);

  const handleSubmit = (event) => {
    setListUrl(`vagas?q=${dados.titulo}`);
    event.preventDefault();
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12} sx={{ order: { xs: 2, sm: 1 } }}>
          <ResponseWrapper
            {...vagasResponse}
            list
            dataComponent={({ children }) => (
              <Grid container spacing={2}>
                {children}
              </Grid>
            )}
            dataItemComponent={({ item }) => (
              <Grid item xs={12}>
                <VagaCard {...item} />
              </Grid>
            )}
          />
        </Grid>

        <Grid item sm={4} xs={12} sx={{ order: { xs: 1, sm: 2 } }}>
          <Typography variant="h5" sx={{ mt: 1, mb: 2 }}>
            Encontrar Vagas
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item xs={12}>
                <FormInput
                  label="Texto no título"
                  name="titulo"
                  data={dados}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormInput
                  disabled
                  label="Texto na descrição"
                  name="desc"
                  data={dados}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <FormInput
                  disabled
                  type="number"
                  label="Salário Base"
                  name="salarioMin"
                  data={dados}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <FormInput
                  disabled
                  type="number"
                  label="Salário Máximo"
                  name="salarioMax"
                  data={dados}
                  onChange={handleChange}
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormInput
                  disabled
                  label="Tipo de Contrato"
                  name="tipoContrato"
                  data={dados}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormInput
                  disabled
                  label="Qualificações"
                  name="qualificacoes"
                  data={dados}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  size="large"
                  disableElevation
                  variant="contained"
                  startIcon={<SearchIcon />}
                  sx={{ width: { xs: 'auto', sm: '100%' } }}
                >
                  Buscar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VagasPage;
