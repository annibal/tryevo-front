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

export const USUARIO_PLANOS = [
  { value: "PF_FREE", label: "PF_FREE", type: "Candidato", color: "primary" },
  { value: "PF_SMART", label: "PF_SMART", type: "Candidato", color: "primary" },
  {
    value: "PF_PREMIUM",
    label: "PF_PREMIUM",
    type: "Candidato",
    color: "primary",
  },
  { value: "PJ_FREE", label: "PJ_FREE", type: "Empresa", color: "secondary" },
  { value: "PJ_SMART", label: "PJ_SMART", type: "Empresa", color: "secondary" },
  {
    value: "PJ_PREMIUM",
    label: "PJ_PREMIUM",
    type: "Empresa",
    color: "secondary",
  },
  {
    value: "PJ_ENTERPRISE",
    label: "PJ_ENTERPRISE",
    type: "Empresa",
    color: "secondary",
  },
  {
    value: "MASTER_ADMIN",
    label: "MASTER_ADMIN",
    type: "Candidato",
    color: "default",
  },
];

const ManageAllUsers = () => {
  const [listUsuariosUrl, setListUsuariosUrl] = useState("auth/users");
  const [searchData, setSearchData] = useState({ valid: "any", perPage: 10 });


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

    params.planos = USUARIO_PLANOS.filter((plano) => args[plano.value]).map((plano) => plano.value);
    
    const query = new URLSearchParams(params).toString();
    console.log(params, query, args)
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

    let type = "";
    let color = "";
    if (item.plano.startsWith("PJ")) {
      type = "Empresa";
      color = "secondary";
    }
    if (item.plano.startsWith("PF")) {
      type = "Candidato";
      color = "primary";
    }
    if (item.plano.startsWith("MASTER")) type = "Admin TryEvo";

    const avatarText = item.email
      .split("@")[0]
      .split(".")
      .slice(0, 2)
      .map((x) => x[0])
      .join("")
      .toUpperCase();

    return (
      <ListItem style={style} disablePadding secondaryAction={item.plano}>
        <ListItemButton
          LinkComponent={Link}
          to={`/app/${allRoutesData.masterAdminUsuario.path}${item._id}`}
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: `${color}.main` }}>{avatarText}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.email} secondary={type} />
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
        planos={USUARIO_PLANOS}
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
                    width={780}
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
