import { Grid, Button, IconButton, Box } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { Add, Delete } from "@mui/icons-material";
import FormInput from "../../commons/form/FormInput";

const PlanAssFormModosPagto = ({ data, onChange }) => {
  const [dados, setDados] = useState(data?.modosDePagamento || []);

  useEffect(() => {
    if (data?.modosDePagamento) {
      setDados(data.modosDePagamento);
    }
  }, [data]);

  const removeItem = (itemIndex) => {
    const newItems = dados.filter((i, idx) => idx !== itemIndex);
    // setDados(newItems);
    onChange(newItems, "modosDePagamento", data);
  };

  const addItem = () => {
    const newItems = [
      ...dados,
      {
        nome: "",
        preco: "",
        meses: "",
      },
    ];
    // setDados(newItems);
    onChange(newItems, "modosDePagamento", data);
  };

  const updateItem = (itemVal, itemName, itemIndex) => {
    const newItems = dados.map((item, idx) =>
      idx === itemIndex ? { ...item, [itemName]: itemVal } : item
    );
    // setDados(newItems);
    onChange(newItems, "modosDePagamento", data);
  };

  return (
    <>
      <Grid container spacing={2}>
        {dados.map((modoPagto, idx) => (
          <Fragment key={idx}>
            <Grid item xs={10} sm={11}>
              <FormInput
                label={`Nome ${idx + 1}`}
                name={`modosDePagamento[${idx}][nome]`}
                data={dados}
                getValue={() => modoPagto.nome}
                onChange={(value) => updateItem(value, "nome", idx)}
                placeholder="Mensal | Anual | Trimestral"
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
              <FormInput
                label={`Período (Qtd de Meses)`}
                type="number"
                min={1}
                name={`modosDePagamento[${idx}][meses]`}
                data={dados}
                getValue={() => modoPagto.meses}
                onChange={(value) => updateItem(value, "meses", idx)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormInput
                label={`Preço (pelo período total)`}
                type="number"
                min={0}
                name={`modosDePagamento[${idx}][preco]`}
                data={dados}
                getValue={() => modoPagto.preco}
                onChange={(value) => updateItem(value, "preco", idx)}
              />
            </Grid>

            <Grid item xs={12} sx={{ mb: 2 }} />

          </Fragment>
        ))}

        <Grid item xs={12}>
          <Button variant="outlined" onClick={addItem} startIcon={<Add />}>
            Adicionar Modo de Pagamento
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default PlanAssFormModosPagto;
