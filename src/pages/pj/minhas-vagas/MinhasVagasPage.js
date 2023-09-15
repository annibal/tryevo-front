import { Link } from "react-router-dom";
import allRoutesData from "../../../base/routes_data";
import { Box, Button, Grid, Tooltip, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import AddIcon from "@mui/icons-material/Add";
import ResponseWrapper from "../../../components/ResponseWrapper";
import useFetch from "../../../providers/useFetch";
import SearchMinhasVagas from "./components/SearchMinhasVagas";
import useUrlWithParams from "../../../components/useUrlWithParams";
import { DataGrid } from "@mui/x-data-grid";

const MinhasVagasPage = () => {
  const [searchDados, setSearchDados, minhasVagasUrl] = useUrlWithParams(
    "minhas-vagas",
    { from: 0, to: 30 }
  );
  const minhasVagasResponse = useFetch("GET", minhasVagasUrl);

  // '_id',
  // 'titulo',
  // 'apelido',
  // 'cargo',
  // 'active',
  // 'descricao',
  // 'desc',
  // 'tipoContrato',
  // 'qualificacoes'

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 90,
      renderCell: (params) => (
        <Link
          to={
            "/app/" +
            allRoutesData.pjMinhaVaga.path +
            params.row._id
          }
        >
          {params.row._id}
        </Link>
      )
    },
    {
      field: "nome",
      headerName: "Nome",
      description: "Apelido, ou Título da Vaga",
      renderCell: (params) => (
        <Link
          to={
            "/app/" +
            allRoutesData.pjMinhaVaga.path +
            params.row._id
          }
        >
          {params.row.apelido || params.row.titulo}
        </Link>
      ),
      flex: 5,
      sortable: false,
    },
    {
      field: "desc",
      headerName: "Descrição",
      flex: 12,
    },
    {
      field: "cargo",
      headerName: "Cargo",
      flex: 4,
    },
    {
      field: "tipoContrato",
      headerName: "Contrato",
      width: 90,
    },
    {
      field: "active",
      headerName: "Ativa",
      width: 90,
      align: "center",
      headerAlign: "center",
      renderCell: (params) =>
        params.row.active ? (
          <Tooltip title="Ativa">
            <CheckCircleIcon color="primary" />
          </Tooltip>
        ) : (
          <Tooltip title="Inativa">
            <UnpublishedIcon sx={{ opacity: 0.6 }} />
          </Tooltip>
        ),
    },
  ];

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
          dataComponent={() => (
            <Grid item xs={12}>
              <DataGrid
                rows={minhasVagasResponse?.data}
                columns={columns}
                getRowId={(row) => row._id}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 50,
                    },
                  },
                }}
                pageSizeOptions={[5, 10, 25, 50, 100, 250]}
                checkboxSelection
                disableRowSelectionOnClick
              />
            </Grid>
          )}
          dataItemComponent={() => ""}
        />
        {/* <ResponseWrapper
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
                      encodeURIComponent(item.titulo)
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
        /> */}
      </Grid>
    </Box>
  );
};

export default MinhasVagasPage;
