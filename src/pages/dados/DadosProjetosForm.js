import { Grid, Button, IconButton } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import FormInput from "../commons/form/FormInput";
import { Add, Delete } from "@mui/icons-material";
import FormDatepicker from "../commons/form/FormDatepicker";

// projetosPessoais: [
//   {
//     titulo: "",
//     url: "",
//     descricao: "",
//     quando: "",
//   },
// ],

const DadosProjetosForm = ({ data, onChange }) => {
  const [dados, setDados] = useState(data?.projetosPessoais || []);

  useEffect(() => {
    if (data?.projetosPessoais) {
      setDados(data.projetosPessoais);
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
      { titulo: "", descricao: "" },
      // { titulo: "", descricao: "", url: "", quando: "" },
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
        {dados.map((projeto, idx) => {
          return (
            <Fragment key={idx}>
              <Grid item xs={10}>
                <FormInput
                  label={`Título do Projeto ${idx + 1}`}
                  name={`projetosPessoais[${idx}][titulo]`}
                  data={dados}
                  required
                  getValue={() => projeto.titulo}
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
                  label={`Informações Complementares`}
                  name={`projetosPessoais[${idx}][descricao]`}
                  data={dados}
                  getValue={() => projeto.descricao}
                  onChange={(value) => updateItem(value, "descricao", idx)}
                  multiline
                  rows={4}
                />
              </Grid>

              {/* <Grid item xs={12} sm={6}>
                <FormInput
                  label={`Link URL`}
                  name={`projetosPessoais[${idx}][url]`}
                  data={dados}
                  getValue={() => projeto.url}
                  onChange={(value) => updateItem(value, "url", idx)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormDatepicker
                  label="Quando foi feito"
                  name={`projetosPessoais[${idx}][quando]`}
                  data={dados}
                  getValue={() => projeto.quando}
                  onChange={(value) => updateItem(value, "quando", idx)}
                />
              </Grid> */}
              <Grid item xs={12} sx={{ mb: 3 }} />
            </Fragment>
          );
        })}

        <Grid item xs={12}>
          <Button variant="outlined" onClick={addItem} startIcon={<Add />}>
            Adicionar Projeto
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default DadosProjetosForm;
