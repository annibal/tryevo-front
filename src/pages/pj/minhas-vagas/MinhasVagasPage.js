import { Link } from "react-router-dom";
import allRoutesData from "../../../base/routes_data";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import AddIcon from "@mui/icons-material/Add";
import ResponseWrapper from "../../../components/ResponseWrapper";
import useFetch from "../../../providers/useFetch";
import SearchMinhasVagas from "./components/SearchMinhasVagas";
import useUrlWithParams from "../../../components/useUrlWithParams";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { doCall } from "../../../providers/baseProvider";
import { ACCOUNT_FEATURES, useAuth } from "../../../base/AuthContext";
import UpsellWidget from "../../../components/UpsellWidget";

const MinhasVagasPage = () => {
  const [searchDados, setSearchDados, minhasVagasUrl] = useUrlWithParams(
    "minhas-vagas",
    { from: 0, to: 30, cache: 0 }
  );
  const minhasVagasResponse = useFetch("GET", minhasVagasUrl);
  const [toggleActiveLoading, setToggleActiveLoading] = useState(false);

  const auth = useAuth();
  const userFeatures = auth?.features || {};
  const maxMinhasVagas =
    auth?.features == null ? null : userFeatures[ACCOUNT_FEATURES.LIMITE_VAGAS];
  const countMinhasVagasRequest = useFetch("GET", "count-minhas-vagas");
  const countMinhasVagas = countMinhasVagasRequest.data || 0;
  const reachedVagaLimit =
    maxMinhasVagas > 1 && countMinhasVagas >= maxMinhasVagas;

  // '_id',
  // 'titulo',
  // 'apelido',
  // 'cargo',
  // 'active',
  // 'descricao',
  // 'desc',
  // 'tipoContrato',
  // 'qualificacoes'

  const handleSetActive = (id, active) => {
    setToggleActiveLoading(id);
    doCall(`vaga/${id}`, {
      method: "POST",
      body: {
        active: active,
      },
    }).then((response) => {
      if (response.error) {
        // setActionError(response.error?.message || response.error);
      } else {
        setSearchDados({ cache: +new Date() });
      }
      setToggleActiveLoading(false);
    });
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 90,
      renderCell: (params) => (
        <Link to={"/app/" + allRoutesData.pjMinhaVaga.path + params.row._id}>
          {params.row._id}
        </Link>
      ),
    },
    {
      field: "nome",
      headerName: "Nome",
      description: "Apelido, ou Título da Vaga",
      renderCell: (params) => (
        <Link to={"/app/" + allRoutesData.pjMinhaVaga.path + params.row._id}>
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
      headerName: "Status",
      width: 90,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Box sx={{ width: "90px", textAlign: "center" }}>
            {toggleActiveLoading === params.row._id ? (
              <>
                <CircularProgress />
              </>
            ) : (
              <>
                {params.row.active ? (
                  <Tooltip title="Ativa" placement="left">
                    <IconButton
                      aria-label="ativar"
                      onClick={() => handleSetActive(params.row._id, false)}
                    >
                      <CheckCircleIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Inativa" placement="left">
                    <IconButton
                      aria-label="inativar"
                      onClick={() => handleSetActive(params.row._id, true)}
                    >
                      <UnpublishedIcon sx={{ opacity: 0.6 }} />
                    </IconButton>
                  </Tooltip>
                )}
              </>
            )}
          </Box>
        );
      },
    },
    {
      field: "contratou",
      headerName: "Contratou",
      width: 90,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return params.row.contratou ? (
          <Tooltip title="Contratou" placement="right">
            <CheckCircleIcon color="secondary" />
          </Tooltip>
        ) : (
          ""
        );
      },
    },
  ];

  return (
    <Box>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Vagas da Empresa
        </Typography>
        {maxMinhasVagas > 1 && (
          <Typography variant="caption" color="text.secondary">
            Você já criou {countMinhasVagas} de {maxMinhasVagas} vagas
            permitidas por seu Plano de Assinatura.
          </Typography>
        )}
      </Box>

      <Box sx={{ mb: 6 }}>
        <Grid container spacing={2}>
          <Grid item xs>
            <Button
              variant="contained"
              color="success"
              LinkComponent={Link}
              disabled={reachedVagaLimit}
              to={"/app/" + allRoutesData.pjNovaMinhaVaga.path}
              startIcon={<AddIcon />}
            >
              Nova Vaga
            </Button>
          </Grid>
          <Grid item>
            {reachedVagaLimit && (
              <UpsellWidget>Limite de {maxMinhasVagas} vagas</UpsellWidget>
            )}
          </Grid>
        </Grid>
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
