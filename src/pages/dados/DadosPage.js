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

const DadosPage = () => {
  const auth = useAuth();
  const [dados, setDados] = useState(auth?.userInfo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  
  console.log({ dados, hasChanges, loading, error, auth })

  useEffect(() => {
    if (auth?.userInfo) setDados(auth.userInfo);
  }, [auth?.userInfo]);

  const handleChange = () => {
    setHasChanges(true)
  };

  //

  async function handleSubmitPF(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(event.currentTarget);

    try {
      let pfObj = formDataToObject(formData);
      if (pfObj.endereco && Object.values(pfObj.endereco).every(value => value === '')) {
        delete pfObj.endereco;
      }
      // console.log({ formData, pfObj });

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
      if (pjObj.endereco && Object.values(pjObj.endereco).every(value => value === '')) {
        delete pjObj.endereco;
      }
      // console.log({ formData, pjObj });

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

  const saveBar = (
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
              variant={hasChanges ? "contained" : "outlined"}
              color="primary"
              type="submit"
            >
              Salvar
            </LoadingButton>
          </Grid>
        </Grid>
      </div>
    </div>
  );

  if (auth.features[ACCOUNT_FEATURES.PF]) {
    return (
      <Box sx={{ pt: 2 }}>
        <form onSubmit={handleSubmitPF}>
          {saveBar}

          <Typography variant="h4" sx={{ mb: 6 }}>
            Dados Pessoais
          </Typography>
          <DadosPrincipaisForm
            data={dados || {}}
            onChange={handleChange}
          />
          <DadosPessoaisForm
            data={dados || {}}
            onChange={handleChange}
          />

          <Divider sx={{ mt: 6, mb: 2 }} />

          <Typography variant="h4" sx={{ mb: 6 }}>
            Endereço
          </Typography>
          <DadosEnderecoForm
            data={dados}
            onChange={handleChange}
          />

          <Divider sx={{ mt: 6, mb: 2 }} />

          <Typography variant="h4" sx={{ mb: 6 }}>
            Idiomas
          </Typography>
          <IdiomasForm data={dados} onChange={handleChange} />

          <Divider sx={{ mt: 6, mb: 2 }} />

          <Typography variant="h4" sx={{ mb: 6 }}>
            Escolaridade
          </Typography>
          <DadosEscolaridadeForm
            data={dados}
            onChange={handleChange}
          />

          <Divider sx={{ mt: 6, mb: 2 }} />

          <Typography variant="h4" sx={{ mb: 6 }}>
            Experiencia Profissional
          </Typography>
          <DadosExperienciaProfissionalForm
            data={dados}
            onChange={handleChange}
          />

          <Divider sx={{ mt: 6, mb: 2 }} />

          <Typography variant="h4" sx={{ mb: 6 }}>
            Projetos
          </Typography>
          <DadosProjetosForm
            data={dados}
            onChange={handleChange}
            loading={loading}
          />
        </form>
      </Box>
    );
  }

  if (auth.features[ACCOUNT_FEATURES.PJ]) {
    return (
      <Box sx={{ pt: 2 }}>
        <form onSubmit={handleSubmitPJ}>
          {saveBar}

          <Typography variant="h4" sx={{ mb: 6 }}>
            Dados da Empresa
          </Typography>
          <DadosEmpresaForm
            data={dados}
            onChange={handleChange}
          />

          <Divider sx={{ mt: 6, mb: 2 }} />

          <Typography variant="h4" sx={{ mb: 6 }}>
            Endereço
          </Typography>
          <DadosEnderecoForm
            data={dados}
            onChange={handleChange}
          />
        </form>
      </Box>
    );
  }
};

export default DadosPage;
