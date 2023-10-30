import React, { useState } from "react";
import { FixedSizeList } from "react-window";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import {
  Box,
  IconButton,
  ListItem,
  ListItemText,
  TablePagination,
  Tooltip,
  Typography,
} from "@mui/material";
import Section from "../../../components/Section";
import useFetch from "../../../providers/useFetch";
import { doCall } from "../../../providers/baseProvider";
import LoaderTryEvo from "../../../components/LoaderTryEvo";
import ManageCBOListSearch from "./ManageCBOListSearch";

const ManageCBOList = ({ onEdit, cboListUrl, setCboListUrl }) => {
  const [dSearch, setDSearch] = useState({ valid: "any" });
  const [listActionError, setListActionError] = useState(null);
  const handleSetCboUrl = (dadosSearch) => {
    const params = {
      from: 0,
      to: 300,
      cache: +new Date(),
    };
    if (dadosSearch.valid) params.valid = dadosSearch.valid;
    if (dadosSearch.q) params.q = dadosSearch.q;
    if (dadosSearch.page)
      params.from = cbosResponse.meta?.perPage * (dadosSearch.page + 0);
    if (dadosSearch.page)
      params.to = cbosResponse.meta?.perPage * (dadosSearch.page + 1);
    const query = new URLSearchParams(params).toString();
    setCboListUrl(`cbo?${query}`);
  };
  const handleToggleValid = (cbo) => {
    setListActionError(false);
    const path = cbo.valid ? "invalidate" : "validate";
    doCall(`cbo/${path}/${cbo._id}`).then(({ error }) => {
      if (error) {
        setListActionError(error?.message || error);
      } else {
        handleSetCboUrl(dSearch);
      }
    });
  };
  const handleDelete = (cbo) => {
    setListActionError(false);
    doCall(`cbo/${cbo._id}`, { method: "DELETE" }).then(({ error }) => {
      if (error) {
        setListActionError(error?.message || error);
      } else {
        handleSetCboUrl(dSearch);
      }
    });
  };

  const handleSearchSubmit = (newDadosSearch) => {
    setDSearch(newDadosSearch);
    handleSetCboUrl(newDadosSearch);
  };

  const cbosResponse = useFetch("GET", cboListUrl);

  const renderCboItem = ({ index, style }) => {
    const item = cbosResponse.data?.[index];
    if (!item) return null;

    const rawText = (item.codigo ? item.codigo + " - " : "") + item.nome;
    let strText = <>{rawText}</>;

    const regexpResult = new RegExp(dSearch.q, "i").exec(rawText);
    if (regexpResult && regexpResult.index !== -1) {
      const parts = [
        rawText.slice(0, regexpResult.index),
        regexpResult[0],
        rawText.slice(regexpResult.index + regexpResult[0].length),
      ];
      strText = (
        <>
          <span>{parts[0]}</span>
          <strong>{parts[1]}</strong>
          <span>{parts[2]}</span>
        </>
      );
    }

    return (
      <ListItem
        style={style}
        className="virtualized-list-item"
        secondaryAction={
          <>
            <Tooltip
              placement="left"
              title={
                item.valid
                  ? "Permitido, clique para invalidar"
                  : "Bloqueado, clique para validar"
              }
            >
              <IconButton
                aria-label="alterar permitido"
                onClick={() => handleToggleValid(item)}
              >
                {item.valid ? (
                  <CheckCircleIcon color="success" />
                ) : (
                  <UnpublishedIcon />
                )}
              </IconButton>
            </Tooltip>

            <IconButton aria-label="editar" onClick={() => onEdit(item)}>
              <DriveFileRenameOutlineIcon color="action" />
            </IconButton>

            <IconButton aria-label="excluir" onClick={() => handleDelete(item)}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </>
        }
      >
        <ListItemText primary={strText} />
      </ListItem>
    );
  };

  return (
    <Section title="Todos os CBOs">
      {listActionError && (
        <Box sx={{ pb: 2 }}>
          <Typography color="error">{String(listActionError)}</Typography>
        </Box>
      )}

      <ManageCBOListSearch dados={dSearch} onSubmit={handleSearchSubmit} />

      <Box sx={{ width: "100%", height: 420 }}>
        {cbosResponse.loading ? (
          <LoaderTryEvo />
        ) : (
          <>
            {cbosResponse.error ? (
              <Box sx={{ p: 2 }}>
                <Typography color="error">
                  {String(cbosResponse.error?.message || cbosResponse.error)}
                </Typography>
              </Box>
            ) : (
              <>
                {!cbosResponse.data || cbosResponse.data.length < 1 ? (
                  <Box sx={{ p: 2 }}>
                    <Typography>Vazio</Typography>
                  </Box>
                ) : (
                  <FixedSizeList
                    height={400}
                    width="100%"
                    itemSize={46}
                    itemCount={cbosResponse.data?.length}
                    overscanCount={5}
                  >
                    {renderCboItem}
                  </FixedSizeList>
                )}
              </>
            )}
          </>
        )}
      </Box>

      <TablePagination
        component="div"
        count={cbosResponse.meta?.total}
        page={cbosResponse.meta?.page}
        rowsPerPage={cbosResponse.meta?.perPage}
        rowsPerPageOptions={[300]}
        onPageChange={(evt, value) =>
          handleSetCboUrl({ ...dSearch, page: value })
        }
      />
    </Section>
  );
};

export default ManageCBOList;
