import {
  Grid, Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import FormInput from "../commons/form/FormInput";
import ManyForm from "../commons/ManyForm";
import FormMaskedInput from "../commons/form/FormMaskedInput";

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
            options={[
              { value: "FIXO", label: "Fixo" },
              { value: "CELULAR", label: "Celular" },
              { value: "WHATSAPP", label: "Whatsapp" },
              { value: "TELEGRAM", label: "Telegram" },
              { value: "OUTRO", label: "Outro" },
            ]}
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
            options={[
              { value: "WEBSITE", label: "Web Site" },
              { value: "LINKEDIN", label: "LinkedIn" },
              { value: "FACEBOOK", label: "Facebook" },
              { value: "INSTAGRAM", label: "Instagram" },
              { value: "TWITTER", label: "Twitter" },
              { value: "YOUTUBE", label: "Youtube" },
              { value: "OUTRO", label: "Outro" },
            ]}
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
