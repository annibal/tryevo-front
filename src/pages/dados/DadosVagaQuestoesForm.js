import { Grid, Button, IconButton, Box } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import FormInput from "../commons/form/FormInput";
import { Add, Delete } from "@mui/icons-material";
import FormSelect from "../commons/form/FormSelect";
import FormCheckbox from "../commons/form/FormCheckbox";
import FormDatepicker from "../commons/form/FormDatepicker";
import ManyFormSingle from "../commons/ManyFormSingle";

const DadosVagaQuestoesForm = ({ data, onChange }) => {
  const [dados, setDados] = useState(data?.questoes || []);

  useEffect(() => {
    if (data?.questoes) {
      setDados(data.questoes);
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
        tipo: "",
        isObrigatorio: false,
        minimo: -5,
        maximo: 5,
        escolhas: [],
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
        {dados.map((questao, idx) => (
          <Fragment key={idx}>
            <Grid item xs={10} sm={11}>
              <FormInput
                label={`Titulo ${idx + 1}`}
                name={`questoes[${idx}][titulo]`}
                data={dados}
                getValue={() => questao.titulo}
                onChange={(value) => updateItem(value, "titulo", idx)}
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

            <Grid item xs={12} sm={8}>
              <FormSelect
                label="Tipo da Questao"
                name={`questoes[${idx}][tipo]`}
                data={dados}
                getValue={() => questao.tipo}
                onChange={(value) => updateItem(value, "tipo", idx)}
                options={[
                  { value: "TEXTO", label: "Texto" },
                  { value: "SLIDER", label: "Slider de Valor" },
                  { value: "ESCOLHA", label: "Múltipla Escolha" },
                ]}
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
                label="Obrigatória"
                name={`questoes[${idx}][isObrigatorio]`}
                data={dados}
                getValue={() => questao.isObrigatorio}
                onChange={(value) => updateItem(value, "isObrigatorio", idx)}
              />
            </Grid>

            {questao.tipo === "SLIDER" && (
              <>
                <Grid item xs={6}>
                  <FormInput
                    label={`Valor Mínimo`}
                    name={`questoes[${idx}][minimo]`}
                    data={dados}
                    getValue={() => questao.minimo}
                    onChange={(value) => updateItem(value, "minimo", idx)}
                    type="number"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormInput
                    label={`Valor Máximo`}
                    name={`questoes[${idx}][maximo]`}
                    data={dados}
                    getValue={() => questao.maximo}
                    onChange={(value) => updateItem(value, "maximo", idx)}
                    type="number"
                  />
                </Grid>
              </>
            )}

            {questao.tipo === "ESCOLHA" && (
              <Grid item xs={12}>
                <Box sx={{ px: 2 }}>
                  <ManyFormSingle
                    data={questao}
                    onChange={(value) => updateItem(value, "escolhas", idx)}
                    label="Escolha"
                    name={`questoes[${idx}][escolhas]`}
                    getValue={() => questao.escolhas}
                  />
                </Box>
              </Grid>
            )}
            <Grid item xs={12} sx={{ mb: 3 }} />
          </Fragment>
        ))}

        <Grid item xs={12}>
          <Button variant="outlined" onClick={addItem} startIcon={<Add />}>
            Adicionar Questão
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default DadosVagaQuestoesForm;
