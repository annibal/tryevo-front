import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ManyForm from "../../commons/ManyForm";
import FormCheckbox from "../../commons/form/FormCheckbox";
import FormSelect from "../../commons/form/FormSelect";
import FormInput from "../../commons/form/FormInput";
import { optionsCategoriaCNH, optionsEscolaridade, optionsGenero } from "../../../providers/enumProvider";

const DadosMinhaVagaRequisitos = ({ data, onChange, loading }) => {
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
      <Grid item xs={12} sm={6}>
        <FormSelect
          label="Escolaridade Mínima"
          name={"escolaridade"}
          data={dados}
          onChange={handleChange}
          options={optionsEscolaridade}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormInput
          label="Experiência Mínima (anos)"
          name="experiencia"
          data={dados}
          onChange={handleChange}
          type="number"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormInput
          label="Salário Mínimo Oferecido"
          name="salarioMinimo"
          data={dados}
          onChange={handleChange}
          type="number"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormInput
          label="Salário Máximo Oferecido"
          name="salarioMaximo"
          data={dados}
          onChange={handleChange}
          type="number"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormInput
          label="Idade Mínima"
          name="idadeMinima"
          data={dados}
          onChange={handleChange}
          type="number"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormInput
          label="Idade Máxima"
          name="idadeMaxima"
          data={dados}
          onChange={handleChange}
          type="number"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormSelect
          label="Categoria de CNH exigida"
          name="categoriaCNH"
          data={dados}
          onChange={handleChange}
          options={optionsCategoriaCNH}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormSelect
          label="Gênero, Apenas para"
          name="genero"
          data={dados}
          onChange={handleChange}
          options={optionsGenero}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormCheckbox
          label="Exige disponibilidade para viajar"
          name="disponivelViagem"
          data={dados}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormCheckbox
          label="Exige disponibilidade para mudança"
          name="disponivelMudanca"
          data={dados}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormCheckbox
          label="Vaga para PCD"
          name="pcd"
          data={dados}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};
export default DadosMinhaVagaRequisitos;
