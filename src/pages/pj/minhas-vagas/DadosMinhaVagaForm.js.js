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

const DadosMinhaVagaForm = ({ data, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [dados, setDados] = useState(data || {});

  const handleChange = (value, name, data) => {
    setDados({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError(false);
    setLoading(true);
    
    const formData = new FormData(event.currentTarget);

    try {
      let vagaObj = formDataToObject(formData);
      if (vagaObj.endereco && Object.values(vagaObj.endereco).every(value => value === '')) {
        delete vagaObj.endereco;
      }
      // console.log({ formData, pjObj });

      doCall('vaga', { method: "POST", body: vagaObj }).then(
        ({ error }) => {
          if (error) {
            setError(error?.message || error);
          } else {
            onSubmit();
          }
          setLoading(false);
        }
      );
    } catch (error) {
      console.log({ error, msg: error.message });
      setError(error);
    }
    setLoading(false);
  };

  console.log(dados)

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormInput
            label="Titulo da vaga"
            name="titulo"
            data={dados}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormInput
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
            label="Salário Mínimo"
            name="salarioMinimo"
            data={dados}
            onChange={handleChange}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            label="Salário Máximo"
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

        <Grid item xs={12}>
          <FormQualificacoes
            label="Competências Desejadas"
            name="qualificacoes"
            data={dados}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Habilidades Desejadas
          </Typography>
          <DadosHabilidadesForm
            data={dados}
            onChange={(newHabilidades) =>
              handleChange(newHabilidades, "habilidades", dados)
            }
          />
        </Grid>

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
          <FormCheckbox
            label="Exige disponibilidade para viajar"
            name="travelAvailable"
            data={dados}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormCheckbox
            label="Exige disponibilidade para mudança"
            name="changeAvailable"
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
            label="Gênero, Apenas para"
            name="genero"
            data={dados}
            onChange={handleChange}
            required
            options={[
              { value: "NAO_ESPECIFICADO", label: "Não Especificado" },
              { value: "MASCULINO", label: "Masculino" },
              { value: "FEMININO", label: "Feminino" },
              { value: "OUTRO", label: "Outro" },
            ]}
          />
        </Grid>

        <Grid item xs={12}>
          <DadosEnderecoForm
            data={dados}
            onChange={(newEndereco) =>
              handleChange(newEndereco, "endereco", dados)
            }
          />
        </Grid>
        
        <Grid item xs={12}>
          Idiomas
        </Grid>
        <Grid item xs={12}>
          Beneficios Oferecidos
        </Grid>
        <Grid item xs={12}>
          Questoes
        </Grid>

        <Grid item xs={12}>
          <LoadingButton
            loading={loading}
            variant="contained"
            color="primary"
            type="submit"
          >
            Salvar
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default DadosMinhaVagaForm;
