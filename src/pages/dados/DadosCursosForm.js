import { Grid, Button, IconButton } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import FormInput from "../commons/form/FormInput";
import { Add, Delete } from "@mui/icons-material";
import FormDatepicker from "../commons/form/FormDatepicker";
import FormCheckbox from "../commons/form/FormCheckbox";

// Titulo do Curso (já tem)
// Descrição do Curso (já tem)
// Nome da Escola
// Início (mês e ano)
// Cursando (Sim/Não)
// Carga Horária (Número de horas)
// Possui Diploma (Sim/Não)

const DadosCursosForm = ({ data, onChange }) => {
  const [dados, setDados] = useState(data?.cursos || []);

  useEffect(() => {
    if (data?.cursos) {
      setDados(data.cursos);
    }
  }, [data]);

  const removeItem = (itemIndex) => {
    const newItems = dados.filter((i, idx) => idx !== itemIndex);
    setDados(newItems);
    onChange();
  };

  const addItem = () => {
    const newItems = [
      ...dados,
      {
        titulo: "",
        descricao: "",
        nomeEscola: "",
        inicio: "",
        isCursando: false,
        cargaHoraria: 0,
        hasDiploma: false,
      },
    ];
    setDados(newItems);
    onChange();
  };

  const updateItem = (itemVal, itemName, itemIndex) => {
    const newItems = dados.map((item, idx) =>
      idx === itemIndex ? { ...item, [itemName]: itemVal } : item
    );
    setDados(newItems);
    onChange();
  };

  return (
    <>
      <Grid container spacing={2}>
        {dados.map((curso, idx) => {
          return (
            <Fragment key={idx}>
              <Grid item xs={10}>
                <FormInput
                  label={`Título do Curso ${idx + 1}`}
                  name={`cursos[${idx}][titulo]`}
                  data={dados}
                  required
                  getValue={() => curso.titulo}
                  onChange={(value) => updateItem(value, "titulo", idx)}
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton onClick={() => removeItem(idx)} tabIndex={-1}>
                  <Delete />
                </IconButton>
              </Grid>

              <Grid item xs={12}>
                <FormInput
                  label={`Descrição do curso`}
                  name={`cursos[${idx}][descricao]`}
                  data={dados}
                  getValue={() => curso.descricao}
                  onChange={(value) => updateItem(value, "descricao", idx)}
                  multiline
                  rows={4}
                />
              </Grid>

              <Grid item xs={6}>
                <FormInput
                  label={`Nome da Escola`}
                  name={`cursos[${idx}][nomeEscola]`}
                  data={dados}
                  getValue={() => curso.nomeEscola}
                  onChange={(value) => updateItem(value, "nomeEscola", idx)}
                />
              </Grid>
              <Grid item xs={6}>
                <FormInput
                  label={`Carga Horária`}
                  name={`cursos[${idx}][cargaHoraria]`}
                  data={dados}
                  getValue={() => curso.cargaHoraria}
                  onChange={(value) => updateItem(value, "cargaHoraria", idx)}
                  type="number"
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormDatepicker
                  label="Início"
                  name={`cursos[${idx}][inicio]`}
                  data={dados}
                  getValue={() => curso.inicio}
                  onChange={(value) => updateItem(value, "inicio", idx)}
                />
              </Grid>
              <Grid
                item
                xs={6}
                sm={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormCheckbox
                  label="Cursando"
                  name={`cursos[${idx}][isCursando]`}
                  data={dados}
                  getValue={() => curso.isCursando}
                  onChange={(value) => updateItem(value, "isCursando", idx)}
                />
              </Grid>
              <Grid
                item
                xs={6}
                sm={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormCheckbox
                  label="Tem Diploma"
                  name={`cursos[${idx}][hasDiploma]`}
                  data={dados}
                  getValue={() => curso.hasDiploma}
                  onChange={(value) => updateItem(value, "hasDiploma", idx)}
                />
              </Grid>

              <Grid item xs={12} sx={{ mb: 3 }} />
            </Fragment>
          );
        })}

        <Grid item xs={12}>
          <Button variant="outlined" onClick={addItem} startIcon={<Add />}>
            Adicionar Curso
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default DadosCursosForm;
