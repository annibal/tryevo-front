import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import FormInput from "../commons/form/FormInput";
import FormMaskedInput from "../commons/form/FormMaskedInput";

const DadosEnderecoForm = ({ data, onChange }) => {
  const [isLoadingCEP, setIsLoadingCEP] = useState(false);
  const [dados, setDados] = useState(data?.endereco || {});

  useEffect(() => {
    if (data?.endereco) setDados(data.endereco);
  }, [data]);

  const handleChange = (value, name, data) => {
    if (name === "cep" && value && value.toString().length === 8) {
      getAddressData(value);
    }

    setDados({
      ...data,
      [name]: value,
    });
    onChange();
  };

  const getAddressData = async (cep) => {
    setIsLoadingCEP(true);
    const addressData = await fetch(
      `https://brasilapi.com.br/api/cep/v1/${cep}`
    ).then((r) => r.json());
    if (addressData) {
      let cepData = {};
      if (addressData.cep) cepData.cep = addressData.cep;
      if (addressData.state) cepData.estado = addressData.state;
      if (addressData.city) cepData.cidade = addressData.city;
      if (addressData.neighborhood) cepData.bairro = addressData.neighborhood;
      if (addressData.street) cepData.rua = addressData.street

      if (addressData.cep !== data?.endereco?.cep) {
        cepData.numero = '';
        cepData.complemento = '';
      }
      setDados({
        ...dados,
        ...cepData
      })
    }
    setIsLoadingCEP(false);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormMaskedInput
            fullWidth={false}
            maskType="CEP"
            label="CEP"
            name="endereco[cep]"
            getValue={() => dados.cep}
            data={dados}
            onChange={(value, name, data) => handleChange(value, 'cep', data)}
            disabled={isLoadingCEP}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            label="País"
            name="endereco[pais]"
            getValue={() => "Brasil"}
            data={dados}
            onChange={(value, name, data) => handleChange(value, 'pais', data)}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            label="Estado"
            name="endereco[estado]"
            getValue={() => dados.estado}
            data={dados}
            onChange={(value, name, data) => handleChange(value, 'estado', data)}
            disabled={isLoadingCEP}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            label="Cidade"
            name="endereco[cidade]"
            getValue={() => dados.cidade}
            data={dados}
            onChange={(value, name, data) => handleChange(value, 'cidade', data)}
            disabled={isLoadingCEP}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            label="Bairro"
            name="endereco[bairro]"
            getValue={() => dados.bairro}
            data={dados}
            onChange={(value, name, data) => handleChange(value, 'bairro', data)}
            disabled={isLoadingCEP}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormInput
            label="Nome da Rua"
            name="endereco[rua]"
            getValue={() => dados.rua}
            data={dados}
            onChange={(value, name, data) => handleChange(value, 'rua', data)}
            disabled={isLoadingCEP}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormInput
            label="Número"
            name="endereco[numero]"
            getValue={() => dados.numero}
            data={dados}
            onChange={(value, name, data) => handleChange(value, 'numero', data)}
            type="number"
            disabled={isLoadingCEP}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <FormInput
            label="Complemento"
            name="endereco[complemento]"
            getValue={() => dados.complemento}
            data={dados}
            onChange={(value, name, data) => handleChange(value, 'complemento', data)}
            disabled={isLoadingCEP}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default DadosEnderecoForm;
