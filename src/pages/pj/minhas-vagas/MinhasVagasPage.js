import { Link } from "react-router-dom";
import allRoutesData from "../../../base/routes_data";
import { Box, Button, Grid, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import AddIcon from "@mui/icons-material/Add";
import ResponseWrapper from "../../../components/ResponseWrapper";
import useFetch from "../../../providers/useFetch";
import SearchMinhasVagas from "./components/SearchMinhasVagas";
import useUrlWithParams from "../../../components/useUrlWithParams";

const MinhasVagasPage = () => {
  const [searchDados, setSearchDados, minhasVagasUrl] = useUrlWithParams(
    "minhas-vagas",
    { from: 0, to: 30 }
  );
  const minhasVagasResponse = useFetch("GET", minhasVagasUrl);

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
          to={"/app/" + allRoutesData.pjNovaMinhaVaga.path}
          startIcon={<AddIcon />}
        >
          Nova Vaga
        </Button>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SearchMinhasVagas dados={searchDados} onSubmit={setSearchDados} />
        </Grid>

        <ResponseWrapper
          {...minhasVagasResponse}
          list
          dataComponent={({ children }) => children}
          dataItemComponent={({ item }) => (
            <Grid item xs={12} container spacing={2}>
              <Grid item xs>
                <Typography variant="h5">
                  <Link
                    to={
                      "/app/" +
                      allRoutesData.pjMinhaVaga.path +
                      item._id +
                      "/" +
                      item.titulo
                    }
                  >
                    {item.titulo}
                  </Link>
                </Typography>
                <Typography>{item.tipoContrato}</Typography>
                <Typography>{item.desc}</Typography>
              </Grid>
              <Grid item>
                {item.active ? (
                  <CheckCircleIcon color="primary" />
                  ) : (
                  <UnpublishedIcon sx={{ opacity: 0.6 }} />
                )}
              </Grid>
            </Grid>
          )}
        />
      </Grid>
    </Box>
  );
};

export default MinhasVagasPage;
