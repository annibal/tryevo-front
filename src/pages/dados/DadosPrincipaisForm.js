import {
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import FormInput from "../commons/form/FormInput";
import FormSelect from "../commons/form/FormSelect";
import FormDatepicker from "../commons/form/FormDatepicker";
import FormCheckbox from "../commons/form/FormCheckbox";
import { optionsEstadoCivil, optionsGenero } from "../../providers/enumProvider";

const DadosPrincipaisForm = ({ data, onChange }) => {
  const [changeAvailable, setChangeAvailable] = useState(false);
  const [travelAvailable, setTravelAvailable] = useState(false);

  const [dados, setDados] = useState(data || {});

  useEffect(() => {
    if (data) {
      setDados(data);
      if (data.aceitaTrabalharDistancia) setTravelAvailable(true);
      if (data.aceitaMudarDistancia) setChangeAvailable(true);
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
        <Grid item xs={12} sm={6}>
          <FormInput
            label="Primeiro Nome"
            name="nomePrimeiro"
            data={dados}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            label="Sobrenome"
            name="nomeUltimo"
            data={dados}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            label="Como prefere ser chamado"
            name="nomePreferido"
            data={dados}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} />

        <Grid item xs={12} sm={6}>
          <FormSelect
            label="Gênero"
            name="genero"
            data={dados}
            onChange={handleChange}
            required
            options={optionsGenero}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormSelect
            label="Estado Civil"
            name="estadoCivil"
            data={dados}
            onChange={handleChange}
            options={optionsEstadoCivil}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            label="Nacionalidade"
            name="nacionalidade"
            data={dados}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormDatepicker
            label="Data de Nascimento"
            name="nascimento"
            data={dados}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormCheckbox
            label="Portador de Deficiência"
            name="pcd"
            data={dados}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          {dados.pcd && (
            <FormInput
              label="Descrição da Deficiência"
              name="pcdDescricao"
              data={dados}
              onChange={handleChange}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormCheckbox
            label="Disponível para Viagens"
            name="travelAvailable"
            data={{ travelAvailable }}
            onChange={(value) => setTravelAvailable(value)}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          {travelAvailable && (
            <FormInput
              label="Quantos KM aceita viajar"
              name="aceitaTrabalharDistancia"
              data={dados}
              onChange={handleChange}
              type="number"
            />
          )}
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormCheckbox
            label="Disponível para Mudança"
            name="changeAvailable"
            data={{ changeAvailable }}
            onChange={(value) => setChangeAvailable(value)}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          {changeAvailable && (
            <FormInput
              label="Quantos KM aceita se mudar"
              name="aceitaMudarDistancia"
              data={dados}
              onChange={handleChange}
              type="number"
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default DadosPrincipaisForm;
