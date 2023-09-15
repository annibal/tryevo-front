import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ManyForm from "../../commons/ManyForm";

const DadosMinhaVagaBeneficios = ({ data, onChange, loading }) => {
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
        <ManyForm
          data={dados}
          label="Nome do Benefício"
          labelAdd="Adicionar Benefício"
          tipoLabel="Valor Oferecido"
          name="beneficiosOferecidos"
          typeIsText
          typeType="number"
          valorName="nome"
          tipoName="valor"
          valorRequired={true}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};
export default DadosMinhaVagaBeneficios;
