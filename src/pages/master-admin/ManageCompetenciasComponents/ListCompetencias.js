import {
  Box,
  IconButton,
  ListItem,
  ListItemText,
  TablePagination,
  Tooltip,
  Typography,
} from "@mui/material";
import { FixedSizeList } from "react-window";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Section from "../../../components/Section";
import { useEffect, useState } from "react";
import useFetch from "../../../providers/useFetch";
import LoaderTryEvo from "../../../components/LoaderTryEvo";
import { doCall } from "../../../providers/baseProvider";
import SearchCompetencias from "./SearchCompetencias";

const ListCompetencias = ({ onEdit, itemEdit }) => {
  const [listCompetenciasUrl, setListCompetenciasUrl] = useState("");
  const [searchData, setSearchData] = useState({ valid: "any" });
  const [listActionError, setListActionError] = useState(null);

  const handleToggleValid = (item) => {
    setListActionError(null);
    doCall(`qualificacao/${item._id}`, {
      method: "POST",
      body: { valid: !item.valid },
    }).then(({ error }) => {
      if (error) {
        setListActionError(error?.message || error);
      } else {
        handleSetUrl(searchData);
      }
    });
  };
  const handleDelete = (item) => {
    setListActionError(null);
    doCall(`qualificacao/${item._id}`, { method: "DELTE" }).then(
      ({ error }) => {
        if (error) {
          setListActionError(error?.message || error);
        } else {
          handleSetUrl(searchData);
        }
      }
    );
  };
  const handleSearchSubmit = (newSearchData) => {
    setSearchData(newSearchData);
    handleSetUrl(newSearchData);
  };

  const handleSetUrl = (args) => {
    const params = {
      from: 0,
      to: 300,
      cache: +new Date(),
    };
    if (args.q) params.q = args.q;
    if (args.valid) params.valid = args.valid;
    if (args.page)
      params.from = listCompetenciasResponse.meta?.perPage * (args.page + 0);
    if (args.page)
      params.to = listCompetenciasResponse.meta?.perPage * (args.page + 1);
    const query = new URLSearchParams(params).toString();
    setListCompetenciasUrl(`qualificacao?${query}`);
  };

  useEffect(() => {
    if (!listCompetenciasUrl) {
      handleSetUrl(searchData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleSetUrl(searchData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemEdit]);

  const listCompetenciasResponse = useFetch("GET", listCompetenciasUrl);

  const renderRow = ({ index, style }) => {
    const item = listCompetenciasResponse.data?.[index];
    if (!item) return null;

    const rawText = (item.codigo ? item.codigo + " - " : "") + item.nome;
    let strText = <>{rawText}</>;

    const regexpResult = new RegExp(searchData.q, "i").exec(rawText);
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

    let strSecondary = item.descricao || "";
    if (strSecondary.length > 62) {
      strSecondary = strSecondary.substr(0, 60).trim() + "...";
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
        <ListItemText primary={strText} secondary={strSecondary} />
      </ListItem>
    );
  };

  return (
    <Section title="Todas as competencias">
      {listActionError && (
        <Box sx={{ pb: 2 }}>
          <Typography color="error">{String(listActionError)}</Typography>
        </Box>
      )}

      <SearchCompetencias dados={searchData} onSubmit={handleSearchSubmit} />

      <Box sx={{ width: "100%", height: 420 }}>
        {listCompetenciasResponse.loading ? (
          <LoaderTryEvo />
        ) : (
          <>
            {listCompetenciasResponse.error ? (
              <Box sx={{ p: 2 }}>
                <Typography color="error">
                  {String(
                    listCompetenciasResponse.error?.message ||
                      listCompetenciasResponse.error
                  )}
                </Typography>
              </Box>
            ) : (
              <>
                {!listCompetenciasResponse.data ||
                listCompetenciasResponse.data.length < 1 ? (
                  <Box sx={{ p: 2 }}>
                    <Typography>Vazio</Typography>
                  </Box>
                ) : (
                  <FixedSizeList
                    height={400}
                    width={780}
                    itemSize={70}
                    itemCount={listCompetenciasResponse.data?.length}
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
        count={listCompetenciasResponse.meta?.total}
        page={listCompetenciasResponse.meta?.page}
        rowsPerPage={listCompetenciasResponse.meta?.perPage}
        rowsPerPageOptions={[300]}
        onPageChange={(evt, value) =>
          handleSetUrl({ ...searchData, page: value })
        }
      />
    </Section>
  );
};

export default ListCompetencias;
