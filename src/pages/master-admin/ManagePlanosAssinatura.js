import { Box, Button, Chip, Tooltip, Typography } from "@mui/material";
import useFetch from "../../providers/useFetch";
import { DataGrid } from "@mui/x-data-grid";
import formatDate from "../../utils/formatDate";
import allRoutesData from "../../base/routes_data";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import { Link } from "react-router-dom";
import Section from "../../components/Section";
import unslugifyFeatureChave from "./ManagePlanosAssinaturaComponents/unslugifyFeatureChave";
import getPlanColor from "./ManagePlanosAssinaturaComponents/getPlanColor";

const featureLineHeight = 16;
const featureRowPadding = 4;
const defaultRowHeight = 52;

const ManagePlanosAssinaturaPage = () => {
  const planAssResponse = useFetch("GET", "planos-assinatura");

  const columns = [
    {
      field: "active",
      headerName: "Status",
      width: 70,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return params.row.active ? (
          <Tooltip title="Ativo" placement="left">
            <CheckCircleIcon color="success" />
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
      width: 70,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Chip color={getPlanColor(params.row.tipo)} label={params.row.tipo} size="small" />
      ),
    },
    {
      field: "detaultForTipo",
      headerName: "Padrão",
      width: 70,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return params.row.defaultForTipo ? (
          <Tooltip
            title={`Padrão para usuários do tipo "${params.row.tipo}"`}
            placement="left"
          >
            <CheckCircleIcon color={getPlanColor(params.row.tipo)} />
          </Tooltip>
        ) : "";
      },
    },
    {
      field: "nome",
      headerName: "Nome",
      renderCell: (params) => (
        <Link
          to={`/app/${allRoutesData.masterAdminPlanoAssinatura.path}${params.row._id}`}
          style={{
            width: "100%",
            flex: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          {params.row.nome}
        </Link>
      ),
      flex: 10,
      sortable: false,
    },
    {
      field: "features",
      headerName: "Features",
      flex: 14,
      renderCell: (params) => {
        return (
          <div>
            {(params.row.features || []).map((feat) => (
              <Typography
                variant="caption"
                component="p"
                sx={{
                  lineHeight: 1,
                  margin: 0,
                  fontSize: featureLineHeight + "px",
                }}
              >
                <Typography
                  component="span"
                  color="text.secondary"
                  sx={{ lineHeight: "inherit", fontSize: "inherit" }}
                >
                  {unslugifyFeatureChave(feat.chave)}:{" "}
                </Typography>
                <Typography
                  component="span"
                  color="text.primary"
                  sx={{ lineHeight: "inherit", fontSize: "inherit" }}
                >
                  {feat.valor}
                </Typography>
              </Typography>
            ))}
          </div>
        );
      },
    },
    {
      field: "modosDePagamento",
      headerName: "Modos Pagto",
      flex: 10,
      renderCell: (params) => {
        return (
          <div>
            {(params.row.modosDePagamento || []).map((modoPagto) => (
              <Typography
                variant="caption"
                component="p"
                sx={{
                  lineHeight: 1,
                  margin: 0,
                  fontSize: featureLineHeight + "px",
                }}
              >
                <Typography
                  component="span"
                  color="text.secondary"
                  sx={{ lineHeight: "inherit", fontSize: "inherit" }}
                >
                  {modoPagto.nome}:{" "}
                </Typography>
                <Typography
                  component="span"
                  color="text.primary"
                  sx={{ lineHeight: "inherit", fontSize: "inherit" }}
                >
                  {modoPagto.preco}
                </Typography>
                <Typography
                  component="span"
                  color="text.secondary"
                  sx={{ lineHeight: "inherit", fontSize: "inherit" }}
                >
                  {" ("}{+modoPagto.meses}{" meses)"}
                </Typography>
              </Typography>
            ))}
          </div>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Criado Em",
      flex: 4,
      renderCell: (params) => formatDate(params.row.createdAt, "DD MMM YYYY"),
    },
  ];

  return (
    <Box>
      <Section title="Planos de Assinatura" withoutDivider>
        <Box sx={{ mb: 2 }}>
          <Button
            color="primary"
            variant="contained"
            LinkComponent={Link}
            to={"/app/" + allRoutesData.masterAdminNovoPlanoAssinatura.path}
          >
            Criar Plano de Assinatura
          </Button>
        </Box>
        <DataGrid
          getRowHeight={(params) => {
            const h1 =
              (params.model.features || []).length * featureLineHeight +
              featureRowPadding * 2;
            const h2 =
              (params.model.modosDePagamento || []).length * featureLineHeight +
              featureRowPadding * 2;
            return Math.max(h1, h2, defaultRowHeight * params.densityFactor);
          }}
          loading={planAssResponse.loading}
          rows={planAssResponse.data || []}
          columns={columns}
          density="compact"
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 100,
              },
            },
          }}
          pageSizeOptions={[5, 10, 20, 50, 100]}
          disableRowSelectionOnClick
        />
      </Section>
    </Box>
  );
};

export default ManagePlanosAssinaturaPage;
