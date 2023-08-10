import { Grid, Button, IconButton, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import FormInput from "../commons/form/FormInput";
import { Add, Delete } from "@mui/icons-material";
import FormCBO from "../commons/form/FormCBO";

const DadosObjetivosForm = ({ data, onChange }) => {
  const [dados, setDados] = useState(data?.objetivos || []);

  useEffect(() => {
    if (data?.objetivos) {
      setDados(data.objetivos);
    }
  }, [data]);

  const removeItem = (itemIndex) => {
    const newItems = dados.filter((i, idx) => idx !== itemIndex);
    setDados(newItems);
    onChange();
  };

  const addItem = () => {
    if (dados.length >= 3) return;
    const newItems = [
      ...dados,
      { cargo: '', remuneracao: '' },
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
      <Typography variant="h6" sx={{ mt: 4, mb: 3 }}>
        Objetivos ({dados.length} / 3)
      </Typography>
      <Grid container spacing={2}>
        {dados.map((objetivo, idx) => (
          <Fragment key={idx}>
            <Grid item xs={10} sm={11}>
              <FormCBO
                label={`${idx + 1}° Cargo Desejado`}
                name={`objetivos[${idx}][cargo]`}
                data={dados}
                getValue={() => objetivo.cargo}
                onChange={(value) => updateItem(value, "cargo", idx)}
              />
            </Grid>
            <Grid item xs={2} sm={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconButton onClick={() => removeItem(idx)} tabIndex={-1}>
                <Delete />
              </IconButton>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormInput
                label={`Remuneração Desejada`}
                name={`objetivos[${idx}][remuneracao]`}
                data={dados}
                getValue={() => objetivo.remuneracao}
                onChange={(value) => updateItem(value, "remuneracao", idx)}
                type="number"
              />
            </Grid>

            <Grid item xs={12} sx={{ mb: 3 }} />
          </Fragment>
        ))}

        <Grid item xs={12}>
          <Button variant="outlined" onClick={addItem} startIcon={<Add />} disabled={dados.length >= 3}>
            Adicionar Objetivo
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default DadosObjetivosForm;
