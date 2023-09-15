import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ManyForm from "../../commons/ManyForm";
import FormCheckbox from "../../commons/form/FormCheckbox";
import FormSelect from "../../commons/form/FormSelect";
import FormInput from "../../commons/form/FormInput";

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
          options={[
            { value: "FUNDAMENTAL", label: "Fundamental" },
            { value: "ENSINO_MEDIO", label: "Ensino Médio" },
            { value: "SUPERIOR", label: "Superior (Faculdade)" },
            { value: "POS_GRADUADO", label: "Pós Graduado" },
            { value: "MESTRADO", label: "Mestrado" },
            { value: "DOUTORADO", label: "Doutorado" },
            { value: "MBA", label: "MBA" },
          ]}
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
          options={[
            { value: "NONE", label: "Não Tem" },
            { value: "A", label: "A (moto)" },
            { value: "B", label: "B (carro)" },
            { value: "C", label: "C (caminhão)" },
            { value: "D", label: "D (micro ônibus)" },
            { value: "E", label: "E (articulados)" },
            { value: "AB", label: "A e B (moto + carro)" },
            { value: "AC", label: "A e C (moto + caminhão)" },
            { value: "AD", label: "A e D (moto + micro ônibus)" },
            { value: "AE", label: "A e E (moto + articulados)" },
          ]}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormSelect
          label="Gênero, Apenas para"
          name="genero"
          data={dados}
          onChange={handleChange}
          options={[
            { value: "NAO_ESPECIFICADO", label: "Não Especificado" },
            { value: "MASCULINO", label: "Masculino" },
            { value: "FEMININO", label: "Feminino" },
            { value: "OUTRO", label: "Outro" },
          ]}
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
