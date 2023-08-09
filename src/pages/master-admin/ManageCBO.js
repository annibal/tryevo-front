import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import Section from "../../components/Section";
import FormInput from "../commons/form/FormInput";
import useFetch from "../../providers/useFetch";
import { LoadingButton } from "@mui/lab";

import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import ResponseWrapper from "../../components/ResponseWrapper";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import SearchIcon from "@mui/icons-material/Search";
import { doCall } from "../../providers/baseProvider";
import FormRadio from "../commons/form/FormRadio";

const ManageCBO = () => {
  const [dadosEdit, setDadosEdit] = useState({});
  const [dadosImport, setDadosImport] = useState({});
  const [dadosSearch, setDadosSearch] = useState({ valid: "any" });
  const [cboEdit, setCboEdit] = useState();
  const [listActionError, setListActionError] = useState(null);
  const [saveError, setSaveError] = useState(null);
  const [importError, setImportError] = useState(null);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingImport, setLoadingImport] = useState(false);
  const handleChangeEdit = (value, name, data) => {
    setDadosEdit({ ...data, [name]: value });
  };
  const handleChangeImport = (value, name, data) => {
    setDadosImport({ ...data, [name]: value });
  };
  const handleChangeSearch = (value, name, data) => {
    setDadosSearch({ ...data, [name]: value });
  };
  const handleSearchTipoChange = (value, name, data) => {
    setDadosSearch({ ...data, [name]: value });
    handleSetCboUrl(false, value);
  };

  const [cboListUrl, setCboListUrl] = useState("cbo?valid=any&to=50");

  const handleSetCboUrl = (cache, sValid) => {
    const params = {
      valid: dadosSearch.valid,
      to: 50,
    };
    if (sValid) params.valid = sValid;
    if (cache) params.cache = (Math.random() * 10 ** 6) | 0;
    if (dadosSearch.q) params.q = dadosSearch.q;
    const query = new URLSearchParams(params).toString();
    setCboListUrl(`cbo?${query}`);
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    setLoadingEdit(true);
    setSaveError(null);
    const path = cboEdit ? `cbo/${cboEdit._id}` : "cbo";
    doCall(path, { method: "POST", body: dadosEdit }).then(
      ({ error }) => {
        if (error) {
          setSaveError(error?.message || error);
        } else {
          handleSetCboUrl(true);
          handleEditOff();
        }
        setLoadingEdit(false);
      }
    );
  };
  const handleImportSubmit = (event) => {
    event.preventDefault();
    setLoadingImport(true);
    setImportError(null);
    doCall('cbo-import', { method: 'POST', body: dadosImport }).then(({ error }) => {
      if (error) {
        setImportError(error?.message || error);
      } else {
        handleSetCboUrl(true);
      }
      setLoadingImport(false);
    });
  };
  const handleSearchSubmit = (event) => {
    if (event) event.preventDefault();
    handleSetCboUrl();
  };

  const handleToggleValid = (cbo) => {
    setListActionError(false);
    const path = cbo.valid ? "invalidate" : "validate";
    doCall(`cbo/${path}/${cbo._id}`).then(({ error }) => {
      if (error) {
        setListActionError(error?.message || error);
      } else {
        handleSetCboUrl(true);
      }
    });
  };
  const handleEdit = (cbo) => {
    setCboEdit(cbo);
    setDadosEdit(cbo);
  };
  const handleEditOff = () => {
    setCboEdit(null);
    setDadosEdit({});
  };
  const handleDelete = (cbo) => {
    setListActionError(false);
    doCall(`cbo/${cbo._id}`, { method: "DELETE" }).then(
      ({ error }) => {
        if (error) {
          setListActionError(error?.message || error);
        } else {
          handleSetCboUrl(true);
        }
      }
    );
  };

  const cbosResponse = useFetch("GET", cboListUrl);

  return (
    <div>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3">Gerenciar CBOs</Typography>
        <Typography variant="body2">
          Classificação Brasileira de Ocupações
        </Typography>
      </Box>

      <Section title="Importar CBOs">
        {importError && (
          <Box sx={{ pb: 2 }}>
            <Typography color="error">{String(importError)}</Typography>
          </Box>
        )}
        <form onSubmit={handleImportSubmit}>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12}>
              <FormInput
                label="Lista de CBOs para importar"
                name="lista"
                data={dadosImport}
                onChange={handleChangeImport}
                multiline
                rows={6}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ justifyContent: "flex-end", display: "flex" }}>
                <LoadingButton
                  type="submit"
                  loading={false}
                  variant="contained"
                  startIcon={<FileUploadIcon />}
                >
                  Importar
                </LoadingButton>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Section>

      <Section
        title={cboEdit ? "Editar CBO" : "Criar CBO"}
        subtitle={cboEdit ? `Editando ${cboEdit._id} - ${cboEdit.nome}` : null}
      >
        {saveError && (
          <Box sx={{ pb: 2 }}>
            <Typography color="error">{String(saveError)}</Typography>
          </Box>
        )}
        <form onSubmit={handleEditSubmit}>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={8}>
              <FormInput
                label="Nome do CBO"
                name="nome"
                data={dadosEdit}
                onChange={handleChangeEdit}
              />
            </Grid>
            <Grid item xs={4}>
              <FormInput
                label="Código"
                placeholder="0000-00"
                name="codigo"
                data={dadosEdit}
                onChange={handleChangeEdit}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ justifyContent: "flex-end", display: "flex" }}>
                <LoadingButton
                  type="submit"
                  loading={loadingEdit}
                  variant="contained"
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
                    startIcon={<ClearIcon />}
                    onClick={handleEditOff}
                  >
                    Cancelar
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </form>
      </Section>

      <Section title="Todos os CBOs">
        {listActionError && (
          <Box sx={{ pb: 2 }}>
            <Typography color="error">{String(listActionError)}</Typography>
          </Box>
        )}

        <form onSubmit={handleSearchSubmit}>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12}>
              <FormRadio
                label="Tipo"
                name="valid"
                row
                data={dadosSearch}
                onChange={handleSearchTipoChange}
                options={[
                  { value: "any", label: "Todos" },
                  { value: "yes", label: "Validos" },
                  { value: "no", label: "Invalidos" },
                ]}
              />
            </Grid>
            <Grid item xs>
              <FormInput
                label="Buscar CBO por nome"
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
          {...cbosResponse}
          list
          dataComponent={({ children }) => <List dense>{children}</List>}
          dataItemComponent={({ item }) => (
            <ListItem
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
              <ListItemText primary={(item.codigo ? (item.codigo + ' - ') : '') + item.nome} />
            </ListItem>
          )}
        />
      </Section>
    </div>
  );
};

export default ManageCBO;
