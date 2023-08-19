import {
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import FormInput from "../commons/form/FormInput";

const DadosResumo = ({ data, onChange }) => {
  const [dados, setDados] = useState(data || {});

  useEffect(() => {
    if (data) {
      setDados(data);
    }
  }, [data]);

  const handleChange = (value, name, data) => {
    setDados({
      ...data,
      [name]: value,
    });
    onChange();
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormInput
            label="Resumo"
            name="resumo"
            data={dados}
            onChange={handleChange}
            multiline
            rows={5}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default DadosResumo;
