import { useEffect, useState } from "react";
import Section from "../../../components/Section";
import { Box, Button, Typography, Grid } from "@mui/material";
import FormInput from "../../commons/form/FormInput";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import { doCall } from "../../../providers/baseProvider";

const FormCompetencia = ({ data, onSubmit }) => {
  const [dados, setDados] = useState(data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleChange = (value, name, data) => {
    setDados({ ...data, [name]: value });
  };
  useEffect(() => {
    if (data) {
      setDados(data);
    } else {
      setDados({});
    }
  }, [data]);

  const isEditando = dados._id != null;

  const handleSave = (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const url = isEditando ? `qualificacao/${dados._id}` : "qualificacao";

    doCall(url, { method: "POST", body: dados }).then(({ error }) => {
      if (error) {
        setError(error?.message || error);
      } else {
        setDados({});
        onSubmit();
      }
    });

    setLoading(false);
  };

  return (
    <Section
      title={isEditando ? "Editar Competência" : "Criar Competência"}
      subtitle={isEditando ? `Editando ${dados._id} - ${dados.nome}` : null}
    >
      {error && (
        <Box sx={{ pb: 2 }}>
          <Typography color="error">{String(error)}</Typography>
        </Box>
      )}
      <form onSubmit={handleSave}>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12}>
            <FormInput
              label="Nome"
              name="nome"
              required
              data={dados}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormInput
              label="Descrição"
              name="descricao"
              data={dados}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ textAlign: "right" }}>
              {isEditando && (
                <Button
                  sx={{ mr: 1 }}
                  type="reset"
                  variant="outlined"
                  startIcon={<ClearIcon />}
                  onClick={() => setDados({})}
                >
                  Cancelar
                </Button>
              )}
              <LoadingButton
                type="submit"
                loading={loading}
                variant="contained"
                startIcon={<SaveIcon />}
              >
                {isEditando ? 'Atualizar' : 'Criar'}
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Section>
  );
};

export default FormCompetencia;
