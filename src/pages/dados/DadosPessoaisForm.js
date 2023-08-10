import {
  Box,
  Grid,
  Typography,
} from "@mui/material";
import ManyForm from "../commons/ManyForm";
import { useEffect, useState } from "react";
import FormSelect from "../commons/form/FormSelect";
import FormInput from "../commons/form/FormInput";

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
          <Typography variant="h6" sx={{ mt: 4, mb: 3 }}>
            Telefones
          </Typography>
          <ManyForm
            label="Telefone"
            name="telefones"
            type="phone"
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
          <Typography variant="h6" sx={{ mt: 4 }}>
            Documentos
          </Typography>
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormInput
            label="CPF"
            name="cpf"
            data={dados}
            onChange={handleChange}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormInput
            label="RG"
            name="rg"
            data={dados}
            onChange={handleChange}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormInput
            label="Passaporte"
            name="passaporte"
            data={dados}
            onChange={handleChange}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormInput
            label="CNH"
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
              options={[
                { value: "NONE", label: "Não Tem" },
                { value: "A", label: "A (moto)" },
                { value: "B", label: "B (carro)" },
                { value: "C", label: "C (caminhão)" },
                { value: "D", label: "D (micro ônibus)" },
                { value: "E", label: "E (articulados)" },
                { value: "AB",label:  "A e B (moto + carro)" },
                { value: "AC",label:  "A e C (moto + caminhão)" },
                { value: "AD",label:  "A e D (moto + micro ônibus)" },
                { value: "AE",label:  "A e E (moto + articulados)" },
              ]}
            />
          </Box>
        </Grid>

      </Grid>
    </>
  );
};

export default DadosPessoaisForm;
