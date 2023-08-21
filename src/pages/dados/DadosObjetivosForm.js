import { Grid, Button, IconButton } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import FormInput from "../commons/form/FormInput";
import { Add, Delete } from "@mui/icons-material";
import FormCBO from "../commons/form/FormCBO";
import FormSelect from "../commons/form/FormSelect";

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
    const newItems = [...dados, {
      cargo: "",
      remuneracao: "",
      tipoContrato: "",
      jornada: "",
      modeloContrato: "",
    }];
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
        {dados.map((objetivo, idx) => (
          <Fragment key={idx}>
            <Grid item xs={10} sm={11}>
              <FormCBO
                label={`${idx + 1}° Cargo Desejado`}
                name={`objetivos[${idx}][cargo]`}
                required
                data={dados}
                getValue={() => objetivo.cargo}
                onChange={(value) => updateItem(value, "cargo", idx)}
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

            <Grid item xs={12} sm={4}>
              <FormInput
                label={`Salário Pretendido`}
                name={`objetivos[${idx}][remuneracao]`}
                data={dados}
                required
                getValue={() => objetivo.remuneracao}
                onChange={(value) => updateItem(value, "remuneracao", idx)}
                type="number"
              />
            </Grid>

            <Grid item xs={12} sm={8}>
              <FormSelect
                label="Tipo de Contrato"
                name={`objetivos[${idx}][tipoContrato]`}
                required
                data={dados}
                getValue={() => objetivo.tipoContrato}
                onChange={(value) => updateItem(value, "tipoContrato", idx)}
                type="number"
                options={[
                  { value: "CLT", label: "CLT" },
                  { value: "PJ", label: "PJ" },
                  { value: "ESTAGIO", label: "Estágio" },
                  { value: "TEMPORARIO", label: "Temporário" },
                  { value: "PRAZO_DETERMINADO", label: "Prazo Determinado" },
                  {
                    value: "CONTRATO_INTERMITENTE",
                    label: "Contrato Intermitente",
                  },
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormSelect
                label="Jornada"
                name={`objetivos[${idx}][jornada]`}
                required
                data={dados}
                getValue={() => objetivo.jornada}
                onChange={(value) => updateItem(value, "jornada", idx)}
                type="number"
                options={[
                  // { value: "DIURNO", label: "Diurno" },
                  // { value: "VESPERTINO", label: "Vespertino" },
                  // { value: "NOTURNO", label: "Noturno" },
                  // {
                  //   value: "HORARIO_DE_TRABALHO",
                  //   label: "Horário de Trabalho",
                  // },
                  // { value: "ESCALA", label: "Escala" },
                  { value: "INTEGRAL", label: "Integral" },
                  { value: "MANHA", label: "Manhã" },
                  { value: "TARDE", label: "Tarde" },
                  { value: "NOITE", label: "Noite" },
                  { value: "ESCALA_DE_REVEZAMENTO", label: "Escala de Revezamento" },
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormSelect
                label="Modelo de Contrato"
                name={`objetivos[${idx}][modeloContrato]`}
                required
                data={dados}
                getValue={() => objetivo.modeloContrato}
                onChange={(value) => updateItem(value, "modeloContrato", idx)}
                type="number"
                options={[
                  { value: "PRESENCIAL", label: "Presencial" },
                  { value: "HOME_OFFICE", label: "Home Office" },
                  { value: "HIBRIDO", label: "Hibrido" },
                ]}
              />
            </Grid>

            <Grid item xs={12} sx={{ mb: 3 }} />
          </Fragment>
        ))}

        <Grid item xs={12}>
          <Button
            variant="outlined"
            onClick={addItem}
            startIcon={<Add />}
            disabled={dados.length >= 3}
          >
            Adicionar Objetivo
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default DadosObjetivosForm;
