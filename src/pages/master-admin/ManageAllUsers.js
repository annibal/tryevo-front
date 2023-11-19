import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TablePagination,
  Typography,
} from "@mui/material";
import Section from "../../components/Section";
import useFetch from "../../providers/useFetch";
import { FixedSizeList } from "react-window";
import LoaderTryEvo from "../../components/LoaderTryEvo";
import SearchUsers from "./ManageAllUsersComponents/SearchUsers";
import allRoutesData from "../../base/routes_data";
import { Link } from "react-router-dom";
import getPlanColor from "./ManagePlanosAssinaturaComponents/getPlanColor";

const ManageAllUsers = () => {
  const [listUsuariosUrl, setListUsuariosUrl] = useState("auth/users");
  const [searchData, setSearchData] = useState({ valid: "any", perPage: 10 });

  const planAssResponse = useFetch("GET", "planos-assinatura");
  const planAssData = planAssResponse.data || [];

  const planAssTiposQuery = useFetch("GET", `tipos-planos-assinatura`);
  const mapTipoPlanAssLabel = (planAssTiposQuery.data || []).reduce(
    (all, curr) => ({
      ...all,
      [curr.tipo]: curr.nome,
    }),
    {}
  );

  const handleSetUrl = (args) => {
    let perPage = args.perPage ? args.perPage : 10;
    const params = {
      from: 0,
      to: perPage,
      cache: +new Date(),
    };
    if (args.q) params.q = args.q;
    if (args.valid) params.valid = args.valid;
    if (args.page) params.from = perPage * (args.page + 0);
    if (args.page) params.to = perPage * (args.page + 1);

    params.planos = planAssData
      .filter((plano) => args[plano._id])
      .map((plano) => plano._id);

    const query = new URLSearchParams(params).toString();
    console.log(params, query, args);
    setListUsuariosUrl(`auth/users?${query}`);
  };
  const listHeight = searchData.perPage * 60 + 15;

  const handleRowsPerPageChange = (evt) => {
    const newPerPage = parseInt(evt.target.value, 10);
    const newSearchData = { ...searchData, perPage: newPerPage };
    setSearchData(newSearchData);
    handleSetUrl(newSearchData);
  };

  const handleSearchSubmit = (newSearchData) => {
    setSearchData(newSearchData);
    handleSetUrl(newSearchData);
  };

  useEffect(() => {
    if (!listUsuariosUrl) {
      handleSetUrl(searchData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listUsuariosResponse = useFetch("GET", listUsuariosUrl);

  const renderRow = ({ index, style }) => {
    const item = listUsuariosResponse.data?.[index];
    if (!item) return null;

    let planColor = getPlanColor(item.plano?.tipo);
    if (planColor === "inherit") {
      planColor = `grey.500`;
    } else {
      planColor = `${planColor}.main`;
    }

    const planText = mapTipoPlanAssLabel[item.plano?.tipo];

    const avatarText = (item.email || "")
      .split("@")[0]
      .split(".")
      .slice(0, 2)
      .map((x) => x[0])
      .join("")
      .toUpperCase();

    return (
      <ListItem style={style} disablePadding secondaryAction={item.plano?.nome}>
        <ListItemButton
          LinkComponent={Link}
          to={`/app/${allRoutesData.masterAdminUsuario.path}${item._id}`}
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: planColor }}>{avatarText}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.email} secondary={planText} />
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <div>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3">Gerenciar Usuários</Typography>
        <Typography variant="body2">
          Visão geral de todos os usuários
        </Typography>
      </Box>

      <SearchUsers
        dados={searchData}
        onSubmit={handleSearchSubmit}
        planos={planAssData}
      />

      <TablePagination
        component="div"
        count={listUsuariosResponse.meta?.total}
        page={listUsuariosResponse.meta?.page}
        rowsPerPage={searchData.perPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 20, 50, 300]}
        onPageChange={(evt, value) =>
          handleSetUrl({ ...searchData, page: value })
        }
      />

      <Box sx={{ width: "100%", height: listHeight }}>
        {listUsuariosResponse.loading ? (
          <LoaderTryEvo />
        ) : (
          <>
            {listUsuariosResponse.error ? (
              <Box sx={{ p: 2 }}>
                <Typography color="error">
                  {String(
                    listUsuariosResponse.error?.message ||
                      listUsuariosResponse.error
                  )}
                </Typography>
              </Box>
            ) : (
              <>
                {!listUsuariosResponse.data ||
                listUsuariosResponse.data.length < 1 ? (
                  <Box sx={{ p: 2 }}>
                    <Typography>Vazio</Typography>
                  </Box>
                ) : (
                  <FixedSizeList
                    dense
                    height={listHeight}
                    width="100%"
                    itemSize={60}
                    itemCount={listUsuariosResponse.data?.length}
                    overscanCount={5}
                  >
                    {renderRow}
                  </FixedSizeList>
                )}
              </>
            )}
          </>
        )}
      </Box>

      <TablePagination
        component="div"
        count={listUsuariosResponse.meta?.total}
        page={listUsuariosResponse.meta?.page}
        rowsPerPage={searchData.perPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 20, 50, 300]}
        onPageChange={(evt, value) =>
          handleSetUrl({ ...searchData, page: value })
        }
      />
    </div>
  );
};

export default ManageAllUsers;
