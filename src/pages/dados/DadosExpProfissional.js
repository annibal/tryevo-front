import {
  Grid,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import FormDatepicker from "../commons/form/FormDatepicker";
import FormCheckbox from "../commons/form/FormCheckbox";
import FormInput from "../commons/form/FormInput";
import { Add, Delete } from "@mui/icons-material";
import FormCBO from "../commons/form/FormCBO";
import FormQualificacoes from "../commons/form/FormQualificacoes";

// experienciasProfissionais: [
//   {
//     cargo: "",
//     empresa: "",
//     descricao: "",
//     inicio: "",
//     fim: "",
//     isAtual: "",
//     qualificacoes: "",
//   },
// ],

const DadosExpProfissional = ({ data, onChange }) => {
  const [dados, setDados] = useState(data?.experienciasProfissionais || []);

  useEffect(() => {
    if (data?.experienciasProfissionais) {
      setDados(data.experienciasProfissionais);
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
        cargo: "",
        empresa: "",
        descricao: "",
        inicio: "",
        fim: "",
        isAtual: "",
        qualificacoes: [],
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

  const handleSetAtual = (itemIndex, value) => {
    const newItems = dados.map((item, idx) => ({
      ...item,
      isAtual: itemIndex === idx ? value : false,
    }))
    setDados(newItems);
    onChange();
  }

  return (
    <>
      <Grid container spacing={2}>
        {dados.map((expProf, idx) => {
          return (
            <Grid item xs={12} container spacing={2} key={idx} sx={{ mb: 5 }}>
              <Grid item xs={10} sm={11}>
                <FormInput
                  label={`Nome da Empresa ${idx + 1}`}
                  required
                  name={`experienciasProfissionais[${idx}][empresa]`}
                  data={dados}
                  getValue={() => expProf.empresa}
                  onChange={(value) => updateItem(value, "empresa", idx)}
                />
              </Grid>
              <Grid item xs={2} sm={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton onClick={() => removeItem(idx)} tabIndex={-1}>
                  <Delete />
                </IconButton>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormCBO
                  label={`Seu Cargo`}
                  name={`experienciasProfissionais[${idx}][cargo]`}
                  data={dados}
                  getValue={() => expProf.cargo}
                  onChange={(value) => updateItem(value, "cargo", idx)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInput
                  label={`Ramo de Atividade da Empresa`}
                  required
                  name={`experienciasProfissionais[${idx}][ramoAtividadeEmpresa]`}
                  data={dados}
                  getValue={() => expProf.ramoAtividadeEmpresa}
                  onChange={(value) => updateItem(value, "ramoAtividadeEmpresa", idx)}
                />
              </Grid>

              <Grid item xs={12}>
                <FormInput
                  label={`Descrição do trabalho realizado`}
                  name={`experienciasProfissionais[${idx}][descricao]`}
                  data={dados}
                  getValue={() => expProf.descricao}
                  onChange={(value) => updateItem(value, "descricao", idx)}
                  multiline
                  rows={4}
                />
              </Grid>

              <Grid item xs={6} sm={4}>
                <FormDatepicker
                  label="Início"
                  name={`experienciasProfissionais[${idx}][inicio]`}
                  data={dados}
                  getValue={() => expProf.inicio}
                  onChange={(value) => updateItem(value, "inicio", idx)}
                />
              </Grid>
              <Grid item xs={6} sm={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FormCheckbox
                  label="Trabalho Atual"
                  name={`experienciasProfissionais[${idx}][isAtual]`}
                  data={dados}
                  getValue={() => expProf.isAtual}
                  onChange={(value) => handleSetAtual(idx, value)}
                />
              </Grid>

              <Grid item xs={6} sm={4}>
                {!expProf.isAtual && (
                  <FormDatepicker
                    label="Fim"
                    name={`experienciasProfissionais[${idx}][fim]`}
                    data={dados}
                    getValue={() => expProf.fim}
                    onChange={(value) => updateItem(value, "fim", idx)}
                  />
                )}
              </Grid>

              <Grid item xs={12}>
                <FormQualificacoes
                  label="Competências"
                  name={`experienciasProfissionais[${idx}][qualificacoes]`}
                  data={dados}
                  getValue={() => expProf.qualificacoes}
                  onChange={(value) => updateItem(value, "qualificacoes", idx)}
                />
              </Grid>
            </Grid>
          );
        })}

        <Grid item xs={12}>
          <Button variant="outlined" onClick={addItem} startIcon={<Add />}>
            Adicionar Experiencia Profissional
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default DadosExpProfissional;
