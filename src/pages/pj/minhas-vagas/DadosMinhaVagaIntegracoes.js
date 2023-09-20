import { Box, Grid, Typography } from "@mui/material";
import FormCheckbox from "../../commons/form/FormCheckbox";
import { useEffect, useState } from "react";
import FormInput from "../../commons/form/FormInput";

const DadosMinhaVagaIntegracoes = ({ data, onChange, loading }) => {
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
      <Grid
        item
        xs={12}
        sm={4}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <FormCheckbox
          label="LinkedIn"
          name="integrarLinkedin"
          data={dados}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={8}>
        {dados.integrarLinkedin && (
          <FormInput
            label="Configurações da Integração com LinkedIn"
            name="integrarLinkedinConfig"
            data={dados}
            onChange={handleChange}
          />
        )}
      </Grid>

      <Grid
        item
        xs={12}
        sm={4}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <FormCheckbox
          label="Catho"
          name="integrarCatho"
          data={dados}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={8}>
        {dados.integrarCatho && (
          <FormInput
            label="Configurações da Integração com Catho"
            name="integrarCathoConfig"
            data={dados}
            onChange={handleChange}
          />
        )}
      </Grid>

      <Grid
        item
        xs={12}
        sm={4}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <FormCheckbox
          label="Curriculos.com"
          name="integrarCurriculos"
          data={dados}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={8}>
        {dados.integrarCurriculos && (
          <FormInput
            label="Configurações da Integração com Curriculos.com"
            name="integrarCurriculosConfig"
            data={dados}
            onChange={handleChange}
          />
        )}
      </Grid>

      <Grid
        item
        xs={12}
        sm={4}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <FormCheckbox
          label="Info Jobs"
          name="integrarInfojobs"
          data={dados}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={8}>
        {dados.integrarInfojobs && (
          <FormInput
            label="Configurações da Integração com Info Jobs"
            name="integrarInfojobsConfig"
            data={dados}
            onChange={handleChange}
          />
        )}
      </Grid>
    </Grid>
  );
};
export default DadosMinhaVagaIntegracoes;
