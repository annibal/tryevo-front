import {
  Grid, Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import FormInput from "../commons/form/FormInput";
import ManyForm from "../commons/ManyForm";
import FormMaskedInput from "../commons/form/FormMaskedInput";
import { optionsLinks, optionsTelefone } from "../../providers/enumProvider";

const DadosEmpresaForm = ({ data, onChange }) => {
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
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormInput
            label="Razão Social"
            name="razaoSocial"
            data={dados}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormInput
            label="Nome Fantasia"
            name="nomeFantasia"
            data={dados}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormInput
            label="Nome do Responsável"
            name="nomeResponsavel"
            data={dados}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            label="Quantidade de Funcionários"
            name="qtdFuncionarios"
            type="number"
            data={dados}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            label="Faturamento Anual"
            name="faturamentoAnual"
            type="number"
            data={dados}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mt: 0, mb: 3 }}>
            Telefones
          </Typography>
          <ManyForm
            label="Telefone"
            name="telefones"
            type="phone"
            valorMask="PHONE"
            tipoRequired={true}
            valorRequired={true}
            data={dados}
            onChange={handleChange}
            options={optionsTelefone}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mt: 4, mb: 3 }}>
            Redes Sociais
          </Typography>
          <ManyForm
            label="Rede Social"
            name="links"
            data={dados}
            onChange={handleChange}
            tipoRequired={true}
            valorRequired={true}
            options={optionsLinks}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mt: 4, mb: 3 }}>
            Documentos
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormMaskedInput
            label="CNPJ"
            maskType="CNPJ"
            name="cnpj"
            data={dados}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormMaskedInput
            label="Inscrição Estadual"
            maskType="INSCRICAO_ESTADUAL"
            name="inscricaoEstadual"
            data={dados}
            onChange={handleChange}
          />
        </Grid>

      </Grid>
    </>
  );
};

export default DadosEmpresaForm;
