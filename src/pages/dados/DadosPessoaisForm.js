import {
  Box,
  Grid,
  Typography,
} from "@mui/material";
import ManyForm from "../commons/ManyForm";
import { useEffect, useState } from "react";
import FormSelect from "../commons/form/FormSelect";
import FormInput from "../commons/form/FormInput";
import FormMaskedInput from "../commons/form/FormMaskedInput";
import { optionsCategoriaCNH, optionsLinks, optionsTelefone } from "../../providers/enumProvider";

const DadosPessoaisForm = ({ data, onChange, loading }) => {
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
          <Typography variant="h6" sx={{ mt: 4 }}>
            Documentos
          </Typography>
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormMaskedInput
            label="CPF"
            maskType="CPF"
            placeholder="000.000.000-00"
            name="cpf"
            data={dados}
            onChange={handleChange}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormMaskedInput
            label="RG"
            maskType="RG"
            placeholder="00.000.000-X"
            name="rg"
            data={dados}
            onChange={handleChange}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormMaskedInput
            label="Passaporte"
            maskType="PASSPORT"
            placeholder="AA000000"
            name="passaporte"
            data={dados}
            onChange={handleChange}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormMaskedInput
            label="CNH"
            maskType="CNH"
            placeholder="0000.00000-00"
            name="cnh"
            data={dados}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box sx={{ mt: 2 }}>
            <FormSelect
              label="Categoria CNH"
              name="categoriaCNH"
              data={dados}
              onChange={handleChange}
              options={optionsCategoriaCNH}
            />
          </Box>
        </Grid>

      </Grid>
    </>
  );
};

export default DadosPessoaisForm;
