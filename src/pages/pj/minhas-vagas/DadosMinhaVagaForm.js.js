import { LoadingButton } from "@mui/lab";
import {
  TextField,
  Grid,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box,
} from "@mui/material";
import { useState } from "react";
import FormInput from "../../commons/form/FormInput";
import FormCBO from "../../commons/form/FormCBO";
import FormSelect from "../../commons/form/FormSelect";
import FormQualificacoes from "../../commons/form/FormQualificacoes";
import DadosHabilidadesForm from "../../dados/DadosHabilidadesForm";
import FormCheckbox from "../../commons/form/FormCheckbox";
import DadosEnderecoForm from "../../dados/DadosEnderecoForm";
import { doCall } from "../../../providers/baseProvider";
import formDataToObject from "../../../utils/formDataToObject";
import DadosIdiomasForm from "../../dados/DadosIdiomasForm";
import ManyForm from "../../commons/ManyForm";
import DadosVagaQuestoesForm from "../../dados/DadosVagaQuestoesForm";
import Section from "../../../components/Section";

const DadosMinhaVagaForm = ({ data, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [dados, setDados] = useState(data || {});
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (value, name, data) => {
    setDados({
      ...data,
      [name]: value,
    });
    setHasChanges(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError(false);
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    try {
      let vagaObj = formDataToObject(formData);
      if (
        vagaObj.endereco &&
        Object.values(vagaObj.endereco).every((value) => value === "")
      ) {
        delete vagaObj.endereco;
      }
      // console.log({ formData, vagaObj });

      let url = "vaga";
      if (data._id) url = `vaga/${data._id}`;

      doCall(url, { method: "POST", body: vagaObj }).then((response) => {
        if (response.error) {
          setError(response.error?.message || response.error);
        } else {
          setHasChanges(false);
          onSubmit(response.data);
        }
        setLoading(false);
      });
    } catch (error) {
      console.log({ error, msg: error.message });
      setError(error);
    }
    setLoading(false);
  };
  
  const saveContent = (
    <Grid container spacing={2}>
      <Grid item xs>
        {!loading && error && (
          <Box sx={{ pb: 2 }}>
            <Typography color="error">{String(error)}</Typography>
          </Box>
        )}
      </Grid>
      <Grid item>
        <LoadingButton
          loading={loading}
          variant={hasChanges ? "contained" : "outlined"}
          color="primary"
          type="submit"
        >
          Salvar
        </LoadingButton>
      </Grid>
    </Grid>
  );
  const saveBar = (
    <div className="floating-save-button">
      <div className="content">{saveContent}</div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      <Section title="Principal">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormInput
              required
              label="Titulo da vaga"
              name="titulo"
              data={dados}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormInput
              required
              label="Descrição"
              name="descricao"
              data={dados}
              onChange={handleChange}
              multiline
              rows={6}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormCBO
              label="Cargo"
              name="cargo"
              data={dados}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormCheckbox
              label="Ocultar Empresa na listagem"
              name="ocultarEmpresa"
              data={dados}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormSelect
              label="Tipo de Contrato"
              name="tipoContrato"
              data={dados}
              onChange={handleChange}
              type="number"
              options={[
                { value: "CLT", label: "CLT" },
                { value: "PJ", label: "PJ" },
                { value: "ESTAGIO", label: "Estágio" },
                { value: "TEMPORARIO", label: "Temporário" },
                { value: "PRAZO_DETERMINADO", label: "Prazo Determinado" },
                {
                  value: "CONTRATO_INTERMITENTE",
                  label: "Contrato Intermitente",
                },
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormSelect
              label="Jornada"
              name="jornada"
              data={dados}
              onChange={handleChange}
              type="number"
              options={[
                { value: "DIURNO", label: "Diurno" },
                { value: "VESPERTINO", label: "Vespertino" },
                { value: "NOTURNO", label: "Noturno" },
                { value: "HORARIO_DE_TRABALHO", label: "Horário de Trabalho" },
                { value: "ESCALA", label: "Escala" },
              ]}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormSelect
              label="Modelo de Contrato"
              name="modeloContrato"
              data={dados}
              onChange={handleChange}
              type="number"
              options={[
                { value: "PRESENCIAL", label: "Presencial" },
                { value: "HOME_OFFICE", label: "Home Office" },
                { value: "HIBRIDO", label: "Hibrido" },
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {dados.modeloContrato === "HIBRIDO" && (
              <FormInput
                label="Dias Presenciais"
                name="diasPresencial"
                min={0}
                max={7}
                data={dados}
                onChange={handleChange}
                type="number"
              />
            )}
          </Grid>
        </Grid>
      </Section>

      <Section title="Match">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormQualificacoes
              label="Competências Desejadas"
              name="qualificacoes"
              data={dados}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>Habilidades Desejadas</Typography>
            <DadosHabilidadesForm
              data={dados}
              onChange={(newHabilidades) =>
                handleChange(newHabilidades, "habilidades", dados)
              }
            />
          </Grid>
        </Grid>
      </Section>

      <Section title="Benefícios">
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
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Section>

      <Section title="Requisitos">
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
                { value: "MESTRADO", label: "Mestrado" },
                { value: "DOUTORADO", label: "Doutorado" },
                { value: "POS_DOUTORADO", label: "Pós Doutorado" },
                { value: "MBA", label: "MBA" },
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInput
              label="Experiência Mínima"
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
      </Section>

      <Section title="Requisitos - Idiomas">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DadosIdiomasForm
              data={dados}
              onChange={(newIdiomas) =>
                handleChange(newIdiomas, "linguagens", dados)
              }
            />
          </Grid>
        </Grid>
      </Section>

      <Section title="Local da Vaga">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DadosEnderecoForm
              data={dados}
              onChange={(newEndereco) =>
                handleChange(newEndereco, "endereco", dados)
              }
            />
          </Grid>
        </Grid>
      </Section>
      
      <Section title="Questões pré-candidatura">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DadosVagaQuestoesForm
              data={dados}
              onChange={(newIdiomas) =>
                handleChange(newIdiomas, "questoes", dados)
              }
            />
          </Grid>
        </Grid>
      </Section>

      {saveBar}
    </form>
  );
};

export default DadosMinhaVagaForm;
