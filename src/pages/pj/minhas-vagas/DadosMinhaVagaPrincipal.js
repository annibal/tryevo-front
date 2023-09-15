import { Box, Grid, Typography } from "@mui/material";
import FormInput from "../../commons/form/FormInput";
import FormSelect from "../../commons/form/FormSelect";
import FormCheckbox from "../../commons/form/FormCheckbox";
import FormCBO from "../../commons/form/FormCBO";
import { useEffect, useState } from "react";
import FormQualificacoes from "../../commons/form/FormQualificacoes";
import DadosHabilidadesForm from "../../dados/DadosHabilidadesForm";

const DadosMinhaVagaPrincipal = ({ data, onChange, loading }) => {
  const [dados, setDados] = useState(data || {});

  useEffect(() => {
    if (data) setDados(data);
  }, [data]);

  const handleChange = (value, name, data) => {
    setDados({
      ...data,
      [name]: value,
    });
    onChange();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Box sx={{ mb: 2}}>
          <FormInput
            label="Apelido"
            name="apelido"
            data={dados}
            onChange={handleChange}
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <FormInput
          required
          label="Titulo da vaga"
          name="titulo"
          data={dados}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          required
          label="Descrição"
          name="descricao"
          data={dados}
          onChange={handleChange}
          multiline
          rows={6}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormCBO
          label="Cargo"
          name="cargo"
          data={dados}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormCheckbox
          label="Ocultar Empresa na listagem"
          name="ocultarEmpresa"
          data={dados}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormSelect
          label="Tipo de Contrato"
          name="tipoContrato"
          data={dados}
          onChange={handleChange}
          type="number"
          options={[
            { value: "CLT", label: "CLT" },
            { value: "PJ", label: "PJ" },
            { value: "ESTAGIO", label: "Estágio" },
            { value: "TEMPORARIO", label: "Temporário" },
            { value: "PRAZO_DETERMINADO", label: "Prazo Determinado" },
            { value: "AUTONOMO", label: "Autônomo" },
            { value: "TRAINEE", label: "Trainee" },
            { value: "JOVEM_APRENDIZ", label: "Jovem Aprendiz" },
          ]}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormSelect
          label="Jornada"
          name="jornada"
          data={dados}
          onChange={handleChange}
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
          name="modeloContrato"
          data={dados}
          onChange={handleChange}
          type="number"
          options={[
            { value: "PRESENCIAL", label: "Presencial" },
            { value: "HOME_OFFICE", label: "Home Office" },
            { value: "HIBRIDO", label: "Hibrido" },
          ]}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        {dados.modeloContrato === "HIBRIDO" && (
          <FormInput
            label="Dias Presenciais"
            name="diasPresencial"
            min={0}
            max={7}
            data={dados}
            onChange={handleChange}
            type="number"
          />
        )}
      </Grid>
    </Grid>
  );
};
export default DadosMinhaVagaPrincipal;
