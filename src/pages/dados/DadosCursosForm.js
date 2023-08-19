
import { Grid, Button, IconButton } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import FormInput from '../commons/form/FormInput';
import { Add, Delete } from '@mui/icons-material';
import FormDatepicker from '../commons/form/FormDatepicker';


// cursos: [
//   {
//     titulo: "",
//     url: "",
//     descricao: "",
//     quando: "",
//   },
// ],

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
      { titulo: "", descricao: "" },
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
              <Grid item xs={11}>
                <FormInput
                  label={`Título do Curso ${idx + 1}`}
                  name={`cursos[${idx}][titulo]`}
                  data={dados}
                  required
                  getValue={() => curso.titulo}
                  onChange={(value) => updateItem(value, "titulo", idx)}
                />
              </Grid>
              <Grid item xs={1}>
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