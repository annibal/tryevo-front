import { Box, Tooltip } from "@mui/material";
import useFetch from "../../providers/useFetch";
import { DataGrid } from "@mui/x-data-grid";
import formatDate from "../../utils/formatDate";
import allRoutesData from "../../base/routes_data";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import { Link } from "react-router-dom";

const ManagePlanosAssinaturaPage = () => {
  const planAssResponse = useFetch("GET", "planos-assinatura");

  const columns = [
    {
      field: "active",
      headerName: "Status",
      width: 90,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return params.row.active ? (
          <Tooltip title="Ativo" placement="left">
            <CheckCircleIcon color="primary" />
          </Tooltip>
        ) : (
          <Tooltip title="Inativo" placement="left">
            <UnpublishedIcon sx={{ opacity: 0.6 }} />
          </Tooltip>
        );
      },
    },
    {
      field: "tipo",
      headerName: "Tipo",
      width: 90,
      renderCell: (params) => params.row.tipo,
    },
    {
      field: "detaultForTipo",
      headerName: "Padrão",
      width: 90,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return params.row.defaultForTipo ? (
          <Tooltip
            title={`Padrão para usuários do tipo "${params.row.tipo}"`}
            placement="left"
          >
            <CheckCircleIcon color="primary" />
          </Tooltip>
        ) : (
          <Tooltip title="Inativa" placement="left">
            <PanoramaFishEyeIcon sx={{ opacity: 0.6 }} />
          </Tooltip>
        );
      },
    },
    {
      field: "nome",
      headerName: "Nome",
      renderCell: (params) => (
        <Link
          to={`/app/${allRoutesData.masterAdminPlanoAssinatura.path}${params.row._id}`}
        >
          {params.row.nome}
        </Link>
      ),
      flex: 10,
      sortable: false,
    },
    {
      field: "preco",
      headerName: "Preço",
      flex: 4,
      renderCell: (params) => params.row.preco,
    },
    {
      field: "features",
      headerName: "Features",
      flex: 10,
      renderCell: (params) => (params.row.features || []).map(f => [f.key, f.value].join(": ")),
    },
    {
      field: "createdAt",
      headerName: "Data Criação",
      flex: 4,
      renderCell: (params) => formatDate(params.row.createdAt, "DD MMM YYYY"),
    },
  ];

  return (
    <Box>
      <DataGrid
        loading={planAssResponse.loading}
        rows={planAssResponse.data}
        columns={columns}
        density="compact"
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 150,
            },
          },
        }}
        pageSizeOptions={[5, 10, 20, 50, 150, 300]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default ManagePlanosAssinaturaPage;
