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

const DadosEscolaridadeForm = ({ data, onChange }) => {
  const [dados, setDados] = useState(data?.escolaridades || []);

  useEffect(() => {
    if (data?.escolaridades) {
      setDados(data.escolaridades);
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
      { nome: "", nivel: "", isCompleto: false, inicio: "", fim: "" },
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
        {dados.map((escolaridade, idx) => (
          <Fragment key={idx}>
            <Grid item xs={10} sm={11}>
              <FormInput
                label={`Nome da Instituição de Ensino ${idx + 1}`}
                name={`escolaridades[${idx}][nome]`}
                data={dados}
                getValue={() => escolaridade.nome}
                onChange={(value) => updateItem(value, "nome", idx)}
              />
            </Grid>
            <Grid
              item
              xs={2}
              sm={1}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
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
                  { value: "POS_GRADUADO", label: "Pós Graduado" },
                  { value: "MESTRADO", label: "Mestrado" },
                  { value: "DOUTORADO", label: "Doutorado" },
                  { value: "MBA", label: "MBA" },
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormSelect
                label="Status"
                name={`escolaridades[${idx}][status]`}
                data={dados}
                getValue={() => escolaridade.status}
                onChange={(value) => updateItem(value, "status", idx)}
                options={[
                  { value: "COMPLETO", label: "Completo" },
                  { value: "CURSANDO", label: "Cursando" },
                  { value: "INCOMPLETO", label: "Incompleto" },
                ]}
              />
            </Grid>

            {escolaridade.status === "COMPLETO" && (
              <>
                <Grid
                  item
                  xs={6}
                  sx={{ display: { xs: "none", sm: "block" } }}
                />
                <Grid item xs={6}>
                  <FormDatepicker
                    views={["year", "month"]}
                    format="MMMM YYYY"
                    label="Data de Conclusão"
                    name={`escolaridades[${idx}][dataConclusao]`}
                    data={dados}
                    getValue={() => escolaridade.dataConclusao}
                    onChange={(value) =>
                      updateItem(value, "dataConclusao", idx)
                    }
                  />
                </Grid>
              </>
            )}
            {escolaridade.status === "CURSANDO" && (
              <>
                <Grid item xs={6}>
                  <FormDatepicker
                    views={["year", "month"]}
                    format="MMMM YYYY"
                    label="Data de Início"
                    name={`escolaridades[${idx}][dataInicio]`}
                    data={dados}
                    getValue={() => escolaridade.dataInicio}
                    onChange={(value) => updateItem(value, "dataInicio", idx)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormDatepicker
                    views={["year", "month"]}
                    format="MMMM YYYY"
                    label="Previsão de Término"
                    name={`escolaridades[${idx}][dataPrevisaoTermino]`}
                    data={dados}
                    getValue={() => escolaridade.dataPrevisaoTermino}
                    onChange={(value) =>
                      updateItem(value, "dataPrevisaoTermino", idx)
                    }
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12} sx={{ mb: 3 }} />
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
