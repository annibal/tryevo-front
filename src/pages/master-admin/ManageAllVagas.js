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
import useFetch from "../../providers/useFetch";
import PlaceIcon from "@mui/icons-material/Place";
import BusinessIcon from "@mui/icons-material/Business";
import DescriptionIcon from "@mui/icons-material/Description";
import TodayIcon from "@mui/icons-material/Today";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { FixedSizeList } from "react-window";
import LoaderTryEvo from "../../components/LoaderTryEvo";
import allRoutesData from "../../base/routes_data";
import { Link } from "react-router-dom";
import { optionsTipoContrato } from "../../providers/enumProvider";
import formatDate from "../../utils/formatDate";
import ManageVagasList from "./ManageVagasComponents/ManageVagasList";

const ManageAllVagas = () => {
  const [listVagasUrl, setListVagasUrl] = useState("vagas?showAll=true&to=20");
  const [searchData, setSearchData] = useState({
    showAll: true,
    page: 0,
    perPage: 20,
  });

  const handleSetUrl = (args) => {
    let perPage = args.perPage ? args.perPage : 20;
    const params = {
      from: 0,
      to: perPage,
      showAll: true,
      cache: +new Date(),
    };
    if (args.q) params.q = args.q;
    if (args.page) params.from = perPage * (args.page + 0);
    if (args.page) params.to = perPage * (args.page + 1);

    const query = new URLSearchParams(params).toString();
    setListVagasUrl(`vagas?${query}`);
  };

  // const handleRowsPerPageChange = (evt) => {
  //   const newPerPage = parseInt(evt.target.value, 10);
  //   const newSearchData = { ...searchData, perPage: newPerPage };
  //   setSearchData(newSearchData);
  //   handleSetUrl(newSearchData);
  // };

  const handleSearchSubmit = (newSearchData) => {
    setSearchData(newSearchData);
    handleSetUrl(newSearchData);
  };

  const listVagasResponse = useFetch("GET", listVagasUrl);

  // const listHeight = searchData.perPage * 60 + 15;
  // const renderRow = ({ index, style }) => {
  //   const item = listVagasResponse.data?.[index];
  //   if (!item) return null;

  //   const contrato = optionsTipoContrato.find(
  //     (o) => o.value === item.tipoContrato
  //   );

  //   const color = item.active ? "primary.main" : "text.secondary";
  //   let name = item.titulo;
  //   if (item.apelido) item.titulo += ` (${item.apelido})`;

  //   let dataSecondary = [
  //     {
  //       icon: BusinessIcon,
  //       value: item.empresa?.nome,
  //     },
  //     {
  //       icon: PlaceIcon,
  //       value: item.endereco
  //         ? `${item.endereco?.cidade}, ${item.endereco?.estado}`
  //         : "??",
  //     },
  //     {
  //       icon: DescriptionIcon,
  //       value: contrato ? contrato.label : "??",
  //     },
  //     {
  //       icon: TodayIcon,
  //       value: formatDate(item.createdAt, "DD MMMM YYYY"),
  //     },
  //   ];

  //   return (
  //     <ListItem style={style} disablePadding secondaryAction={item.plano}>
  //       <ListItemButton
  //         LinkComponent={Link}
  //         to={`/app/${allRoutesData.masterAdminVaga.path}${item._id}`}
  //       >
  //         <ListItemAvatar>
  //           <Avatar sx={{ bgcolor: color }}>
  //             <HandshakeIcon />
  //           </Avatar>
  //         </ListItemAvatar>
  //         <ListItemText
  //           primary={name}
  //           secondary={dataSecondary.map(({ icon: Icon, value }, idx) => (
  //             <span style={{ marginInlineEnd: "8px" }}>
  //               {idx > 0 && " - "}
  //               <Icon
  //                 color="inherit"
  //                 fontSize="inherit"
  //                 sx={{ verticalAlign: "-2px", mr: 1 }}
  //               />
  //               {value}
  //             </span>
  //           ))}
  //         />
  //       </ListItemButton>
  //     </ListItem>
  //   );
  // };

  return (
    <div>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3">Gerenciar Vagas</Typography>
        <Typography variant="body2">Todas as Vagas</Typography>
      </Box>

      {/* <SearchUsers
        dados={searchData}
        onSubmit={handleSearchSubmit}
        planos={USUARIO_PLANOS}
      /> */}

      <ManageVagasList
        loading={listVagasResponse.loading}
        data={listVagasResponse.data || []}
        count={listVagasResponse.meta?.total}
        page={listVagasResponse.meta?.page}
        params={searchData}
        onPaginationModelChange={({ page, pageSize }) => {
          const newSearchData = {
            ...searchData,
            perPage: pageSize,
            page: page,
          };
          setSearchData(newSearchData);
          handleSetUrl(newSearchData);
        }}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
      />

      {/* <TablePagination
        component="div"
        count={listVagasResponse.meta?.total}
        page={listVagasResponse.meta?.page}
        rowsPerPage={searchData.perPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 20, 50, 300]}
        onPageChange={(evt, value) =>
          handleSetUrl({ ...searchData, page: value })
        }
      />

      <Box sx={{ width: "100%", height: listHeight }}>
        {listVagasResponse.loading ? (
          <LoaderTryEvo />
        ) : (
          <>
            {listVagasResponse.error ? (
              <Box sx={{ p: 2 }}>
                <Typography color="error">
                  {String(
                    listVagasResponse.error?.message || listVagasResponse.error
                  )}
                </Typography>
              </Box>
            ) : (
              <>
                {!listVagasResponse.data ||
                listVagasResponse.data.length < 1 ? (
                  <Box sx={{ p: 2 }}>
                    <Typography>Vazio</Typography>
                  </Box>
                ) : (
                  <FixedSizeList
                    dense
                    height={listHeight}
                    width="100%"
                    itemSize={60}
                    itemCount={listVagasResponse.data?.length}
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
        count={listVagasResponse.meta?.total}
        page={listVagasResponse.meta?.page}
        rowsPerPage={searchData.perPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 20, 50, 300]}
        onPageChange={(evt, value) =>
          handleSetUrl({ ...searchData, page: value })
        }
      /> */}
    </div>
  );
};

export default ManageAllVagas;
