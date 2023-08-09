import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TablePagination,
  Typography,
} from "@mui/material";
import Section from "../../components/Section";
import FormInput from "../commons/form/FormInput";
import useFetch from "../../providers/useFetch";
import { LoadingButton } from "@mui/lab";

import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import ResponseWrapper from "../../components/ResponseWrapper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import SearchIcon from "@mui/icons-material/Search";
import { doCall } from "../../providers/baseProvider";

const ManageHabilidades = () => {
  const [dadosEdit, setDadosEdit] = useState({});
  const [dadosSearch, setDadosSearch] = useState({});
  const [cboEdit, setCboEdit] = useState();
  const [listActionError, setListActionError] = useState(null);
  const [saveError, setSaveError] = useState(null);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const handleChangeEdit = (value, name, data) => {
    setDadosEdit({ ...data, [name]: value });
  };
  const handleChangeSearch = (value, name, data) => {
    setDadosSearch({ ...data, [name]: value });
  };

  const [habilidadesListUrl, setHabilidadesListUrl] = useState("habilidade?&to=300");

  const handleSetCboUrl = (args) => {
    const params = {
      from: 0,
      to: 300,
      cache: +new Date(),
    };
    if (args.q) params.q = args.q;
    if (args.page)
      params.from = habilidadesResponse.meta?.perPage * (args.page + 0);
    if (args.page)
      params.to = habilidadesResponse.meta?.perPage * (args.page + 1);
    const query = new URLSearchParams(params).toString();
    setHabilidadesListUrl(`habilidade?${query}`);
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    setLoadingEdit(true);
    setSaveError(null);
    const path = cboEdit ? `habilidade/${cboEdit._id}` : "habilidade";
    doCall(path, { method: "POST", body: dadosEdit }).then(
      ({ error }) => {
        if (error) {
          setSaveError(error?.message || error);
        } else {
          handleSetCboUrl(dadosSearch);
          handleEditOff();
        }
        setLoadingEdit(false);
      }
    );
  };
  const handleSearchSubmit = (event) => {
    if (event) event.preventDefault();
    handleSetCboUrl(dadosSearch);
  };
  const handleEdit = (habilidade) => {
    setCboEdit(habilidade);
    setDadosEdit(habilidade);
  };
  const handleEditOff = () => {
    setCboEdit(null);
    setDadosEdit({});
  };
  const handleDelete = (habilidade) => {
    setListActionError(false);
    doCall(`habilidade/${habilidade._id}`, { method: "DELETE" }).then(
      ({ error }) => {
        if (error) {
          setListActionError(error?.message || error);
        } else {
          handleSetCboUrl(dadosSearch);
        }
      }
    );
  };

  const habilidadesResponse = useFetch("GET", habilidadesListUrl);

  return (
    <div>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3">Gerenciar Habilidades</Typography>
        <Typography variant="body2">
          Lista controlada apenas pelo admin tryevo
        </Typography>
      </Box>

      <Section title="Todas as Habilidades">
        {listActionError && (
          <Box sx={{ pb: 2 }}>
            <Typography color="error">{String(listActionError)}</Typography>
          </Box>
        )}

        <form onSubmit={handleSearchSubmit}>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs>
              <FormInput
                label="Buscar Habilidade por nome"
                name="q"
                type="search"
                data={dadosSearch}
                onChange={handleChangeSearch}
              />
            </Grid>
            <Grid item>
              <Box sx={{ justifyContent: "flex-end", display: "flex" }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disableElevation
                  startIcon={<SearchIcon />}
                >
                  Buscar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
        <ResponseWrapper
          {...habilidadesResponse}
          list
          dataComponent={({ children }) => <List dense>{children}</List>}
          dataItemComponent={({ item }) => (
            <ListItem
              secondaryAction={
                <>
                  <IconButton
                    aria-label="editar"
                    onClick={() => handleEdit(item)}
                  >
                    <DriveFileRenameOutlineIcon color="action" />
                  </IconButton>

                  <IconButton
                    aria-label="excluir"
                    onClick={() => handleDelete(item)}
                  >
                    <DeleteForeverIcon color="error" />
                  </IconButton>
                </>
              }
            >
              <ListItemText primary={item.nome} />
            </ListItem>
          )}
        />

        <TablePagination
          component="div"
          count={habilidadesResponse.meta?.total}
          page={habilidadesResponse.meta?.page}
          rowsPerPage={habilidadesResponse.meta?.perPage}
          rowsPerPageOptions={[300]}
          onPageChange={(evt, value) =>
            handleSetCboUrl({ ...dadosSearch, page: value })
          }
        />
      </Section>
      
      <Section
        title={cboEdit ? "Editar Habilidade" : "Criar Habilidade"}
        subtitle={cboEdit ? `Editando ${cboEdit._id} - ${cboEdit.nome}` : null}
      >
        {saveError && (
          <Box sx={{ pb: 2 }}>
            <Typography color="error">{String(saveError)}</Typography>
          </Box>
        )}
        <form onSubmit={handleEditSubmit}>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs>
              <FormInput
                label="Habilidade"
                name="nome"
                data={dadosEdit}
                onChange={handleChangeEdit}
              />
            </Grid>
            <Grid item>
              <LoadingButton
                type="submit"
                loading={loadingEdit}
                variant="contained"
                size="large"
                disableElevation
                startIcon={<SaveIcon />}
              >
                Salvar
              </LoadingButton>
              {cboEdit && (
                <Button
                  sx={{ ml: 1 }}
                  type="reset"
                  color="secondary"
                  variant="contained"
                  size="large"
                  disableElevation
                  startIcon={<ClearIcon />}
                  onClick={handleEditOff}
                >
                  Cancelar
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </Section>
    </div>
  );
};

export default ManageHabilidades;
