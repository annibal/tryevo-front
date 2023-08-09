import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Grid,
} from "@mui/material";
import FormInput from "../../commons/form/FormInput";
import FormRadio from "../../commons/form/FormRadio";

const ManageCBOListSearch = ({ dados, onSubmit }) => {
  const [dadosSearch, setDadosSearch] = useState(dados);

  useEffect(() => {
    setDadosSearch(dados);
  }, [dados])

  const handleChangeSearch = (value, name, data) => {
    const newDados = { ...data, [name]: value };
    setDadosSearch(newDados);
    return newDados;
  };
  const handleSearchSubmit = (event) => {
    if (event) event.preventDefault();
    onSubmit(dadosSearch)
  };
  const handleSearchTipoChange = (value, name, data) => {
    onSubmit(handleChangeSearch(value, name, data));
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <FormRadio
            label="Tipo"
            name="valid"
            row
            data={dadosSearch}
            onChange={handleSearchTipoChange}
            options={[
              { value: "any", label: "Todos" },
              { value: "yes", label: "Válidos" },
              { value: "no", label: "Inválidos" },
            ]}
          />
        </Grid>
        <Grid item xs>
          <FormInput
            label="Buscar CBO por nome"
            name="q"
            type="search"
            data={dadosSearch}
            onChange={handleChangeSearch}
          />
        </Grid>
        <Grid item>
          <Box sx={{ justifyContent: "flex-end", display: "flex" }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disableElevation
              startIcon={<SearchIcon />}
            >
              Buscar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  )
}

export default ManageCBOListSearch;