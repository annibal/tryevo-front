import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import FormCheckbox from "../commons/form/FormCheckbox";
import useFetch from "../../providers/useFetch";

const DadosHabilidadesForm = ({ data, onChange }) => {
  const [dados, setDados] = useState({});

  const habilidadesResponse = useFetch("GET", "habilidade?&to=300");

  useEffect(() => {
    if (habilidadesResponse.data && Object.keys(dados).length === 0) {
      const hydratedDados = habilidadesResponse.data.reduce((a, c) => ({
        ...a,
        [c?._id]: Boolean((data?.habilidades || []).find((h) => h?._id === c?._id)),
      }), {});
      setDados(hydratedDados);
    }
  }, [habilidadesResponse, data]);

  const handleChange = (value, id) => {
    const newDados = {
      ...dados,
      [id]: value,
    };
    setDados(newDados);
    onChange(newDados)
  };

  if (habilidadesResponse.loading) return "";
  if (habilidadesResponse.error) {
    return (
      <Box sx={{ pb: 2 }}>
        <Typography color="error">
          {String(
            habilidadesResponse.error?.message || habilidadesResponse.error
          )}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={0} sx={{ mb: 5 }}>
        {(habilidadesResponse.data || []).map((habilidade, idx) => {
          return (
            <Grid item xs={12} sm={4} key={habilidade._id}>
              <FormCheckbox
                label={habilidade.nome}
                name={`habilidades[${idx}][_id]`}
                value={habilidade._id}
                data={dados}
                getValue={() => dados[habilidade._id]}
                onChange={(value) => handleChange(value, habilidade._id)}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default DadosHabilidadesForm;
