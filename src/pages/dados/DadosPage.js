import { Box, Divider, Grid, Typography } from "@mui/material";
import DadosPessoaisForm from "./DadosPessoaisForm";
import { ACCOUNT_FEATURES, useAuth } from "../../base/AuthContext";
import IdiomasForm from "./DadosIdiomasForm";
import DadosEmpresaForm from "./DadosEmpresaForm";
import DadosEnderecoForm from "./DadosEnderecoForm";
import DadosEscolaridadeForm from "./DadosEscolaridadeForm";
import DadosExperienciaProfissionalForm from "./DadosExperienciaProfissionalForm";
import DadosProjetosForm from "./DadosProjetosForm";
import * as userInfoProvider from "../../providers/userInfoProvider";
import { useEffect, useState } from "react";
import DadosPrincipaisForm from "./DadosPrincipaisForm";
import { LoadingButton } from "@mui/lab";
import formDataToObject from "../../utils/formDataToObject";

const example_pf = {
  nomePrimeiro: "",
  nomeUltimo: "",
  nomePreferido: "",
  genero: "",
  estadoCivil: "",
  nacionalidade: "",
  nascimento: "date",
  categoriaCNH: "",
  isAleijado: false,
  aceitaTrabalharDistancia: 123,
  aceitaMudarDistancia: 123,
  isPsiquiatra: false,
  endereco: {
    cep: "",
    pais: "",
    estado: "",
    cidade: "",
    bairro: "",
    rua: "",
    numero: "",
    complemento: "",
  },
  telefones: [
    {
      valor: "",
      descricao: "",
      tipo: "",
      isPrimario: false,
    },
  ],
  links: [
    {
      valor: "",
      descricao: "",
      tipo: "",
      isPrimario: false,
    },
  ],
  documentos: [
    {
      valor: "",
      descricao: "",
      tipo: "",
      isPrimario: false,
    },
  ],
  qualificacoes: [""],
  linguagens: [
    {
      valor: "",
      descricao: "",
      tipo: "",
      isPrimario: false,
    },
  ],
  projetosPessoais: [
    {
      titulo: "",
      url: "",
      descricao: "",
      quando: "",
    },
  ],
  escolaridades: [
    {
      nome: "",
      nivel: "",
      isCompleto: "",
      inicio: "",
      fim: "",
    },
  ],
  experienciasProfissionais: [
    {
      cargo: "",
      empresa: "",
      descricao: "",
      inicio: "",
      fim: "",
      isAtual: "",
      qualificacoes: "",
    },
  ],
};

const DadosPage = () => {
  const auth = useAuth();
  const [dados, setDados] = useState(auth?.userInfo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (auth?.userInfo) setDados(auth.userInfo);
  }, [auth?.userInfo]);

  const handleDados = (value, name, data) => {
    console.log(value, name, data);
    setDados({
      ...data,
      [name]: value,
    });
  };

  //

  async function handleSubmitPF(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(event.currentTarget);

    try {
      let pfObj = formDataToObject(formData);
      console.log({ formData, pfObj });

      await userInfoProvider.saveInfoPF(pfObj);

      setHasChanges(false);
      auth.invalidate();
    } catch (error) {
      console.log({ error, msg: error.message });
      setError(error);
    }
    setLoading(false);
  }

  async function handleSubmitPJ(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(event.currentTarget);

    try {
      let pjObj = formDataToObject(formData);
      console.log({ formData, pjObj });

      await userInfoProvider.saveInfoPJ(pjObj);

      setHasChanges(false);
      auth.invalidate();
    } catch (error) {
      console.log({ error, msg: error.message });
      setError(error);
    }
    setLoading(false);
  }

  //

  if (auth.loading) {
    return "Loading";
  }

  if (auth.features[ACCOUNT_FEATURES.PF]) {
    return (
      <Box sx={{ pt: 2 }}>
        <form onSubmit={handleSubmitPF}>
          <div className="floating-save-button">
            <div className="content">
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
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Salvar
                  </LoadingButton>
                </Grid>
              </Grid>
            </div>
          </div>

          <Typography variant="h4" sx={{ mb: 6 }}>
            Dados Pessoais
          </Typography>
          <DadosPrincipaisForm
            data={dados || {}}
            onChange={handleDados}
            loading={loading}
          />
          <DadosPessoaisForm
            data={dados || {}}
            onChange={handleDados}
            loading={loading}
          />

          <Divider sx={{ mt: 6, mb: 2 }} />

          <Typography variant="h4" sx={{ mb: 6 }}>
            Endereço
          </Typography>
          <DadosEnderecoForm
            data={dados}
            onChange={handleDados}
            loading={loading}
          />

          <Divider sx={{ mt: 6, mb: 2 }} />

          <Typography variant="h4" sx={{ mb: 6 }}>
            Idiomas
          </Typography>
          <IdiomasForm data={dados} onChange={handleDados} loading={loading} />

          <Divider sx={{ mt: 6, mb: 2 }} />

          <Typography variant="h4" sx={{ mb: 6 }}>
            Escolaridade
          </Typography>
          <DadosEscolaridadeForm
            data={dados}
            onChange={handleDados}
            loading={loading}
          />

          <Divider sx={{ mt: 6, mb: 2 }} />

          <Typography variant="h4" sx={{ mb: 6 }}>
            Experiencia Profissional
          </Typography>
          <DadosExperienciaProfissionalForm
            data={dados}
            onChange={handleDados}
            loading={loading}
          />

          <Divider sx={{ mt: 6, mb: 2 }} />

          <Typography variant="h4" sx={{ mb: 6 }}>
            Projetos
          </Typography>
          <DadosProjetosForm
            data={dados}
            onChange={handleDados}
            loading={loading}
          />
        </form>
      </Box>
    );
  } else {
    return "Em construcao";
    // <Box sx={{ pt: 2 }}>

    //   {!loading && error && (
    //     <Box sx={{ pb: 2 }}>
    //       <Typography color="error">{String(error)}</Typography>
    //     </Box>
    //   )}

    //   <form onSubmit={handleSubmitPJ}>
    //     <div className="floating-save-button">
    //       <div className="content">
    //         <LoadingButton
    //           loading={loading}
    //           variant="contained"
    //           color="primary"
    //           type="submit"
    //         >
    //           Salvar
    //         </LoadingButton>
    //         </div>
    //     </div>

    //     <Typography variant="h4" gutterBottom>
    //       Dados da Empresa
    //     </Typography>
    //     <DadosEmpresaForm
    //       data={dados}
    //       onChange={handleDados}
    //       loading={loading}
    //     />

    //     <Divider sx={{ my: 6 }} />

    //     <Typography variant="h4" gutterBottom>
    //       Endereço
    //     </Typography>
    //     <DadosEnderecoForm
    //       data={dados}
    //       onChange={handleDados}
    //       loading={loading}
    //     />
    //   </form>
    // </Box>
  }
};

export default DadosPage;
