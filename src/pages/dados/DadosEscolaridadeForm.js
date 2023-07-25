import { Grid, Button, IconButton } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import FormInput from "../commons/form/FormInput";
import { Add, Delete } from "@mui/icons-material";
import FormSelect from "../commons/form/FormSelect";
import FormCheckbox from "../commons/form/FormCheckbox";
import FormDatepicker from "../commons/form/FormDatepicker";

// escolaridades = [
//   {
//     nome: "",
//     nivel: "",
//     isCompleto: "",
//     inicio: "",
//     fim: "",
//   },
// ],

const DadosEscolaridadeForm = ({ data }) => {
  const [dados, setDados] = useState(data?.escolaridades || []);

  useEffect(() => {
    if (data?.escolaridades) {
      setDados(data.escolaridades);
    }
  }, [data]);

  const removeItem = (itemIndex) => {
    const newItems = dados.filter((i, idx) => idx !== itemIndex);
    setDados(newItems);
  };

  const addItem = () => {
    const newItems = [
      ...dados,
      { nome: "", nivel: "", isCompleto: false, inicio: "", fim: "" },
    ];
    setDados(newItems);
  };

  const updateItem = (itemVal, itemName, itemIndex) => {
    const newItems = dados.map((item, idx) =>
      idx === itemIndex ? { ...item, [itemName]: itemVal } : item
    );
    setDados(newItems);
  };

  return (
    <>
      <Grid container spacing={2}>
        {dados.map((escolaridade, idx) => (
          <Fragment key={idx}>
            <Grid item xs={11}>
              <FormInput
                label={`Nome da Instituição de Ensino ${idx + 1}`}
                name={`escolaridades[${idx}][nome]`}
                data={dados}
                getValue={() => escolaridade.nome}
                onChange={(value) => updateItem(value, "nome", idx)}
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={() => removeItem(idx)} tabIndex={-1}>
                <Delete />
              </IconButton>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormSelect
                label="Nível"
                name={`escolaridades[${idx}][nivel]`}
                data={dados}
                getValue={() => escolaridade.nivel}
                onChange={(value) => updateItem(value, "nivel", idx)}
                options={[
                  { value: "FUNDAMENTAL", label: "Fundamental" },
                  { value: "ENSINO_MEDIO", label: "Ensino Médio" },
                  { value: "SUPERIOR", label: "Superior (Faculdade)" },
                  { value: "MESTRADO", label: "Mestrado" },
                  { value: "DOUTORADO", label: "Doutorado" },
                  { value: "POS_DOUTORADO", label: "Pós Doutorado" },
                  { value: "MBA", label: "MBA" },
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormDatepicker
                label="Início"
                name={`escolaridades[${idx}][inicio]`}
                data={dados}
                getValue={() => escolaridade.inicio}
                onChange={(value) => updateItem(value, "inicio", idx)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormCheckbox
                label="Completou"
                name={`escolaridades[${idx}][isCompleto]`}
                data={dados}
                getValue={() => escolaridade.isCompleto}
                onChange={(value) => updateItem(value, "isCompleto", idx)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              {escolaridade.isCompleto && (
                <FormDatepicker
                  label="Fim"
                  name={`escolaridades[${idx}][fim]`}
                  data={dados}
                  getValue={() => escolaridade.fim}
                  onChange={(value) => updateItem(value, "fim", idx)}
                />
              )}
            </Grid>
          </Fragment>
        ))}

        <Grid item xs={12}>
          <Button variant="outlined" onClick={addItem} startIcon={<Add />}>
            Adicionar Escolaridade
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default DadosEscolaridadeForm;
