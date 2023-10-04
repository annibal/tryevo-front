import { Box, Button, Grid, Typography } from "@mui/material";
import useFetch from "../providers/useFetch";
import ResponseWrapper from "../components/ResponseWrapper";
import VagaCard from "../components/VagaCard";
import FormInput from "./commons/form/FormInput";
import FormSelect from "./commons/form/FormSelect";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect, useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import {
  optionsJornada,
  optionsModeloContrato,
  optionsTipoContrato,
} from "../providers/enumProvider";
import leanObject from "../utils/leanObject";

const pageSize = 15;
const defaultDados = { from: 0, to: pageSize };

const VagasPage = () => {
  const createListUrl = (dados) => {
    const dadosParam = createSearchParams(leanObject(dados)).toString();
    return dadosParam === "" ? "vagas" : `vagas?${dadosParam}`;
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const [dados, setDados] = useState(defaultDados);
  const [listUrl, setListUrl] = useState(createListUrl(dados));
  const vagasResponse = useFetch("GET", listUrl);
  const totalResults = vagasResponse?.meta?.total;

  const hasDados = (() => {
    const keys = Object.keys(dados);
    const formKeys = keys.filter((k) => !["from", "to"].includes(k));
    return formKeys.length > 0;
  })();
  const handleChange = (value, name, data) => {
    setDados({ ...data, [name]: value });
  };

  useEffect(() => {
    const newDados = {
      ...defaultDados,
      ...Object.fromEntries(searchParams),
    };
    setListUrl(createListUrl(newDados));
    setDados(newDados);
  }, [searchParams]);

  const handleSubmit = (event) => {
    setSearchParams(
      leanObject({
        ...dados,
        ...defaultDados,
      })
    );
    if (event) {
      event.preventDefault();
    }
  };

  const setFromTo = (amount) => {
    const from = +dados.from;
    const to = +dados.to;
    let newDados;
    if (isNaN(from) || isNaN(to) || from >= to) {
      newDados = { ...dados, from: defaultDados.from, to: defaultDados.to };
    } else {
      const newFrom = Math.max(from + amount, 0);
      const newTo = to + amount;
      newDados = { ...dados, from: newFrom, to: newTo };
    }
    setSearchParams(leanObject(newDados));
  };

  const handleReset = () => {
    setDados(defaultDados);
    setSearchParams("");
    setListUrl(`vagas`);
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
                {dados.from > 0 && (
                  <Grid item xs={12}>
                    <Box sx={{ p: 4, textAlign: "center" }}>
                      <Button
                        onClick={() => setFromTo(-pageSize)}
                        disableElevation
                        variant="outlined"
                      >
                        Anteriores
                      </Button>
                    </Box>
                  </Grid>
                )}
                {children}
                {dados.to < totalResults && (
                  <Grid item xs={12}>
                    <Box sx={{ p: 4, textAlign: "center" }}>
                      <Button
                        onClick={() => setFromTo(pageSize)}
                        disableElevation
                        variant="outlined"
                      >
                        Carregar Mais
                      </Button>
                    </Box>
                  </Grid>
                )}
              </Grid>
            )}
            dataItemComponent={({ item }) => (
              <Grid item xs={12}>
                <VagaCard vaga={item} />
              </Grid>
            )}
          />
        </Grid>

        <Grid item sm={4} xs={12} sx={{ order: { xs: 1, sm: 2 } }}>
          <Box sx={{ mt: 1, mb: 2 }}>
            <Typography variant="h5" sx={{ mb: 0 }}>
              Encontrar Vagas
            </Typography>
            <Typography variant="caption" sx={{}}>
              Mostrando {dados.from} a {Math.min(totalResults, dados.to)} de{" "}
              {totalResults}
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item xs={12}>
                <FormInput
                  label="Texto no título"
                  name="q"
                  data={dados}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormInput
                  label="Texto na descrição"
                  name="descricao"
                  data={dados}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <FormInput
                  type="number"
                  label="Salário Base"
                  name="salarioMinimo"
                  data={dados}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <FormInput
                  type="number"
                  label="Salário Máximo"
                  name="salarioMaximo"
                  data={dados}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <FormSelect
                  allowDefault
                  label="Tipo de Contrato"
                  name="tipoContrato"
                  data={dados}
                  onChange={handleChange}
                  options={optionsTipoContrato}
                />
              </Grid>
              <Grid item xs={12}>
                <FormSelect
                  allowDefault
                  label="Modelo de Contrato"
                  name="modeloContrato"
                  data={dados}
                  onChange={handleChange}
                  options={optionsJornada}
                />
              </Grid>
              <Grid item xs={12}>
                <FormSelect
                  allowDefault
                  label="Jornada"
                  name="jornada"
                  data={dados}
                  onChange={handleChange}
                  options={optionsModeloContrato}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  size="large"
                  disableElevation
                  variant="contained"
                  startIcon={<SearchIcon />}
                  sx={{ width: { xs: "auto", sm: "100%" } }}
                >
                  Buscar
                </Button>
              </Grid>

              {hasDados && (
                <Grid item xs={12}>
                  <Button
                    type="reset"
                    onClick={handleReset}
                    size="large"
                    disableElevation
                    variant="outlined"
                    startIcon={<ClearIcon />}
                    sx={{ width: { xs: "auto", sm: "100%" } }}
                  >
                    Limpar
                  </Button>
                </Grid>
              )}
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VagasPage;
