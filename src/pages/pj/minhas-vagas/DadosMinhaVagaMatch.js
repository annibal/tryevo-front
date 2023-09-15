import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DadosHabilidadesForm from "../../dados/DadosHabilidadesForm";
import FormQualificacoes from "../../commons/form/FormQualificacoes";

const DadosMinhaVagaMatch = ({ data, onChange, loading }) => {
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
      <Grid item xs={12}>
        <FormQualificacoes
          label="Competências Desejadas"
          name="qualificacoes"
          data={dados}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ mb: 2 }} fontWeight="bold">Habilidades Desejadas</Typography>
        <DadosHabilidadesForm
          data={dados}
          onChange={(newHabilidades) =>
            handleChange(newHabilidades, "habilidades", dados)
          }
        />
      </Grid>
    </Grid>
  );
};
export default DadosMinhaVagaMatch;
