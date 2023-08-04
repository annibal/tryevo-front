import { Link } from "react-router-dom";
import allRoutesData from "../../../base/routes_data";
import { Box, Button, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ResponseWrapper from "../../../components/ResponseWrapper";
import useFetch from "../../../providers/useFetch";

const vagasData = [
  'Analista de Sistemas',
  'Programador Web',
  'Vendedor de Coxinha',
]

const MinhasVagasPage = () => {
  const minhasVagasResponse = useFetch('GET', 'minhas-vagas');

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 6 }}>
        Vagas da Empresa
      </Typography>

      <Box sx={{ mb: 6 }}>
        <Button
          variant="contained"
          color="success"
          LinkComponent={Link}
          to={'/app/' + allRoutesData.pjNovaMinhaVaga.path}
          startIcon={<AddIcon />}
        >
          Nova Vaga
        </Button>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs>
          <input type="search" placeholder="Buscar" />
        </Grid>
        <Grid item>
          <button>Buscar</button>
        </Grid>

        <ResponseWrapper
          {...minhasVagasResponse}
          list
          dataComponent={({ children }) => children}
          dataItemComponent={({ item }) => (
            <Grid item xs={12}>
              <Typography variant="h5">
                <Link to={'/app/' + allRoutesData.pjMinhaVaga.path + item._id + '/' + item.titulo}>
                  {item.titulo}
                </Link>
              </Typography>
              <Typography>
                {item.tipoContrato}
              </Typography>
              <Typography>
                {item.desc}
              </Typography>
            </Grid>
          )}
        />

      </Grid>
    </Box>
  );
};

export default MinhasVagasPage;
