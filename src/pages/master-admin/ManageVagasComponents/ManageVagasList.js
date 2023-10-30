import { DataGrid } from "@mui/x-data-grid";
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
import { Link } from "react-router-dom";
import allRoutesData from "../../../base/routes_data";
import { optionsTipoContrato } from "../../../providers/enumProvider";
import formatDate from "../../../utils/formatDate";

const ManageVagasList = ({
  data,
  loading,
  count,
  page,
  params = {},
  rowsPerPageOptions,
  onPaginationModelChange,
}) => {
  const mapTipoContrato = optionsTipoContrato.reduce(
    (all, curr) => ({
      ...all,
      [curr.value]: curr.label,
    }),
    {}
  );

  const columns = [
    {
      field: "active",
      headerName: "Status",
      width: 90,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return params.row.active ? (
          <Tooltip title="Ativa" placement="left">
            <CheckCircleIcon color="primary" />
          </Tooltip>
        ) : (
          <Tooltip title="Inativa" placement="left">
            <UnpublishedIcon sx={{ opacity: 0.6 }} />
          </Tooltip>
        );
      },
    },
    {
      field: "nome",
      headerName: "Nome",
      description: "Apelido, ou Título da Vaga",
      renderCell: (params) => (
        <Link
          to={`/app/${allRoutesData.masterAdminVaga.path}${params.row._id}`}
        >
          {params.row.titulo}
        </Link>
      ),
      flex: 10,
      sortable: false,
    },
    {
      field: "empresa",
      headerName: "Empresa",
      flex: 6,
      renderCell: (params) => params.row.empresa?.nome,
    },
    {
      field: "endereco",
      headerName: "Endereco",
      flex: 4,
      renderCell: (params) =>
        params.row.endereco
          ? `${params.row.endereco?.cidade}, ${params.row.endereco?.estado}`
          : "??",
    },
    {
      field: "contract",
      headerName: "Contrato",
      flex: 4,
      renderCell: (params) => mapTipoContrato[params.row.tipoContrato] || "??",
    },
    {
      field: "createdAt",
      headerName: "Data Criação",
      flex: 4,
      renderCell: (params) => formatDate(params.row.createdAt, "DD MMM YYYY"),
    },
  ];

  return (
    <DataGrid
      loading={loading}
      rows={data}
      columns={columns}
      density="compact"
      getRowId={(row) => row._id}

      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 20,
          },
        },
      }}
      pageSizeOptions={rowsPerPageOptions}
      paginationMode="server"
      paginationModel={{
        pageSize: params.perPage,
        page: page,
      }}
      rowCount={count}
      onPaginationModelChange={onPaginationModelChange}      

      disableRowSelectionOnClick
    />
  );
};

export default ManageVagasList;
