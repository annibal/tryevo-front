import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import Section from "../../components/Section";
import FormInput from "../commons/form/FormInput";
import { LoadingButton } from "@mui/lab";

import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { doCall } from "../../providers/baseProvider";
import ManageCBOList from "./ManageCBOcomponents/ManageCBOList";

const ManageCBO = () => {
  const [dadosEdit, setDadosEdit] = useState({});
  const [dadosImport, setDadosImport] = useState({});
  const [cboEdit, setCboEdit] = useState();
  const [saveError, setSaveError] = useState(null);
  const [importError, setImportError] = useState(null);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingImport, setLoadingImport] = useState(false);
  const [cboListUrl, setCboListUrl] = useState("cbo?valid=any&to=300");

  const handleChangeEdit = (value, name, data) => {
    setDadosEdit({ ...data, [name]: value });
  };
  const handleChangeImport = (value, name, data) => {
    setDadosImport({ ...data, [name]: value });
  };

  const handleEdit = (cbo) => {
    setCboEdit(cbo);
    setDadosEdit(cbo);
  };
  const handleEditOff = () => {
    setCboEdit(null);
    setDadosEdit({});
  };


  const handleEditSubmit = (event) => {
    event.preventDefault();
    setLoadingEdit(true);
    setSaveError(null);
    const path = cboEdit ? `cbo/${cboEdit._id}` : "cbo";
    doCall(path, { method: "POST", body: dadosEdit }).then(({ error }) => {
      if (error) {
        setSaveError(error?.message || error);
      } else {
        setCboListUrl(cboListUrl + '&cache2=' + (+new Date()) );
        handleEditOff();
      }
      setLoadingEdit(false);
    });
  };
  const handleImportSubmit = (event) => {
    event.preventDefault();
    setLoadingImport(true);
    setImportError(null);
    doCall("cbo-import", { method: "POST", body: dadosImport }).then(
      ({ error }) => {
        if (error) {
          setImportError(error?.message || error);
        } else {
          setCboListUrl(cboListUrl + '&cache2=' + (+new Date()) );
        }
        setLoadingImport(false);
      }
    );
  };


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
                  loading={loadingImport}
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

      <ManageCBOList onEdit={handleEdit} cboListUrl={cboListUrl} setCboListUrl={setCboListUrl} />
    </div>
  );
};

export default ManageCBO;
