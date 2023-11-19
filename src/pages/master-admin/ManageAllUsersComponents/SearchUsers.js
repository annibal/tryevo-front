import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, Grid, Typography } from "@mui/material";
import FormInput from "../../commons/form/FormInput";
import FormCheckbox from "../../commons/form/FormCheckbox";
import getPlanColor from "../ManagePlanosAssinaturaComponents/getPlanColor";


const SearchUsers = ({ dados, onSubmit, planos }) => {
  const [dadosSearch, setDadosSearch] = useState(dados);

  useEffect(() => {
    setDadosSearch(dados);
  }, [dados]);

  const handleChangeSearch = (value, name, data) => {
    const newDados = { ...data, [name]: value };
    setDadosSearch(newDados);
    return newDados;
  };
  const handleSearchSubmit = (event) => {
    if (event) event.preventDefault();
    onSubmit(dadosSearch);
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Typography>Buscar por plano do usuário</Typography>
          {planos.map((plano) => (
            <div>
              <FormCheckbox
                color={getPlanColor(plano.tipo)}
                key={plano._id}
                label={`${plano.tipo} - ${plano.nome}`}
                name={plano._id}
                data={dadosSearch}
                onChange={handleChangeSearch}
              />
            </div>
          ))}
        </Grid>
        <Grid item xs>
          <FormInput
            label="Buscar por email do usuário"
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
  );
};

export default SearchUsers;
