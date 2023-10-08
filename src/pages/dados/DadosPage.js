import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Step,
  StepButton,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import DadosPessoaisForm from "./DadosPessoaisForm";
import { ACCOUNT_FEATURES, useAuth } from "../../base/AuthContext";
import IdiomasForm from "./DadosIdiomasForm";
import DadosEmpresaForm from "./DadosEmpresaForm";
import DadosEnderecoForm from "./DadosEnderecoForm";
import DadosEscolaridadeForm from "./DadosEscolaridadeForm";
import DadosExpProfissional from "./DadosExpProfissional";
import DadosProjetosForm from "./DadosProjetosForm";
import * as userInfoProvider from "../../providers/userInfoProvider";
import { Fragment, useEffect, useState } from "react";
import DadosPrincipaisForm from "./DadosPrincipaisForm";
import { LoadingButton } from "@mui/lab";
import formDataToObject from "../../utils/formDataToObject";
import DadosObjetivosForm from "./DadosObjetivosForm";
import DadosHabilidadesForm from "./DadosHabilidadesForm";
import DadosResumo from "./DadosResumo";
import DadosCursosForm from "./DadosCursosForm";
import allRoutesData from "../../base/routes_data";
import { Link } from "react-router-dom";

// return (
//   <Box>
//     <form onSubmit={handleSubmitPF}>
//       <Stepper nonLinear activeStep={activeStep} orientation="vertical">
//         <Step completed={completedSteps[0]}>
//           <StepButton color="inherit" onClick={() => setActiveStep(0)}>
//             Dados Principais
//           </StepButton>
//           <StepContent sx={{ pt: 4 }} >
//             <DadosPrincipaisForm data={dados || {}} onChange={handleChange} />
//             <Box sx={{ mt: 4 }}>{saveContent}</Box>
//           </StepContent>
//         </Step>

//         <Step completed={completedSteps[1]}>
//           <StepButton color="inherit" onClick={() => setActiveStep(1)}>
//             Objetivos
//           </StepButton>
//           <StepContent sx={{ pt: 4 }} >
//             <DadosObjetivosForm data={dados || {}} onChange={handleChange} />
//             <Box sx={{ mt: 4 }}>{saveContent}</Box>
//           </StepContent>
//         </Step>

//         <Step completed={completedSteps[2]}>
//           <StepButton color="inherit" onClick={() => setActiveStep(2)}>
//             Habilidades
//           </StepButton>
//           <StepContent sx={{ pt: 4 }} >
//             <DadosHabilidadesForm data={dados || {}} onChange={handleChange} />
//             <Box sx={{ mt: 4 }}>{saveContent}</Box>
//           </StepContent>
//         </Step>

//         <Step completed={completedSteps[3]}>
//           <StepButton color="inherit" onClick={() => setActiveStep(3)}>
//             Dados Pessoais
//           </StepButton>
//           <StepContent sx={{ pt: 4 }} >
//             <DadosPessoaisForm data={dados || {}} onChange={handleChange} />
//             <Box sx={{ mt: 4 }}>{saveContent}</Box>
//           </StepContent>
//         </Step>

//         <Step completed={completedSteps[4]}>
//           <StepButton color="inherit" onClick={() => setActiveStep(4)}>
//             Endereço
//           </StepButton>
//           <StepContent sx={{ pt: 4 }} >
//             <DadosEnderecoForm data={dados} onChange={handleChange} />
//             <Box sx={{ mt: 4 }}>{saveContent}</Box>
//           </StepContent>
//         </Step>
//       </Stepper>
//     </form>
//   </Box>
// );

const DadosPage = () => {
  const auth = useAuth();
  const [dados, setDados] = useState(auth?.userInfo || {});
  const [loading, setLoading] = useState(false);
  const [activeFormItem, setActiveFormItem] = useState([]);
  const [error, setError] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState({});

  // console.log({ dados, hasChanges, loading, error, auth });

  useEffect(() => {
    if (auth?.userInfo) setDados(auth.userInfo);
  }, [auth?.userInfo]);

  const handleChange = () => {
    setHasChanges(true);
  };

  let formItems = [];
  let submitFn = () => {};

  const handleScroll = (event) => {
    let activeItem = null;
    for (let i = 0; i < formItems.length; i++) {
      const elm = document.getElementById(formItems[i].id);
      if (elm) {
        const y = elm.getBoundingClientRect().top;
        if (y >= 0 && y <= window.innerHeight) {
          activeItem = i;
          break;
        }
        if (y > window.innerHeight) {
          activeItem = i - 1;
          break;
        }
      }
    }
    setActiveFormItem(activeItem);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //

  async function handleSubmitPF(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(event.currentTarget);

    try {
      let pfObj = formDataToObject(formData);
      if (!pfObj.habilidades) pfObj.habilidades = [];
      if (!pfObj.objetivos) pfObj.objetivos = [];
      if (!pfObj.telefones) pfObj.telefones = [];
      if (!pfObj.links) pfObj.links = [];
      if (!pfObj.linguagens) pfObj.linguagens = [];
      if (!pfObj.experienciasProfissionais)
        pfObj.experienciasProfissionais = [];
      if (!pfObj.escolaridades) pfObj.escolaridades = [];
      if (!pfObj.projetosPessoais) pfObj.projetosPessoais = [];
      if (
        pfObj.endereco &&
        Object.values(pfObj.endereco).every((value) => value === "")
      ) {
        delete pfObj.endereco;
      }
      // console.log({ formData, pfObj });

      await userInfoProvider.saveInfoPF(pfObj);

      setHasChanges(false);
      auth.updateData();
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
      if (
        pjObj.endereco &&
        Object.values(pjObj.endereco).every((value) => value === "")
      ) {
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

  if (auth.features[ACCOUNT_FEATURES.PF]) {
    formItems = [
      {
        id: "dados_pessoais",
        title: "Dados Pessoais",
        comp: DadosPrincipaisForm, // elm
      },
      {
        id: "contato_documentos",
        title: "Contato e Documentos",
        comp: DadosPessoaisForm, // elm
      },
      {
        id: "endereco",
        title: "Endereço",
        comp: DadosEnderecoForm, // elm
      },
      {
        id: "objetivos",
        title: "Objetivos",
        comp: DadosObjetivosForm, // elm
      },
      {
        id: "escolaridade",
        title: "Escolaridade",
        comp: DadosEscolaridadeForm, // elm
      },
      {
        id: "idiomas",
        title: "Idiomas",
        comp: IdiomasForm, // elm
      },
      {
        id: "resumo_profissional",
        title: "Resumo Profissional",
        comp: DadosResumo, // elm
      },
      {
        id: "experiencia_profissional",
        title: "Experiencia Profissional",
        comp: DadosExpProfissional, // elm
      },
      {
        id: "habilidades",
        title: "Habilidades",
        comp: DadosHabilidadesForm, // elm
      },
      {
        id: "cursos",
        title: "Cursos",
        comp: DadosCursosForm, // elm
      },
      {
        id: "projetos",
        title: "Projetos",
        comp: DadosProjetosForm, // elm
      },
    ];
    submitFn = handleSubmitPF;
  }

  if (auth.features[ACCOUNT_FEATURES.PJ]) {
    formItems = [
      {
        id: "dados_empresa",
        title: "Dados da Empresa",
        comp: DadosEmpresaForm, // elm
      },
      {
        id: "endereco",
        title: "Endereço",
        comp: DadosEnderecoForm, // elm
      },
    ];
    submitFn = handleSubmitPJ;
  }

  return (
    <Box sx={{ pt: 2 }}>
      <form onSubmit={submitFn}>
        <Box sx={{ display: { sm: "none" } }}>{saveBar}</Box>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Box sx={{ position: "sticky", top: "60px" }}>
              <List component="nav">
                {formItems.map((formItem, idx) => (
                  <ListItemButton
                    component="a"
                    href={`#${formItem.id}`}
                    key={formItem.id}
                    selected={idx === activeFormItem}
                  >
                    <ListItemText primary={formItem.title} />
                  </ListItemButton>
                ))}
              </List>
              <Divider sx={{ mt: 0, mb: 2 }} />
              {!loading && error && (
                <Box sx={{ pb: 2 }}>
                  <Typography color="error">{String(error)}</Typography>
                </Box>
              )}
              <LoadingButton
                loading={loading}
                variant={hasChanges ? "contained" : "outlined"}
                color="primary"
                type="submit"
                fullWidth
              >
                Salvar
              </LoadingButton>
              {auth.features[ACCOUNT_FEATURES.PF] && (
                <Button
                  sx={{ mt: 2 }}
                  disableElevation
                  variant="outlined"
                  LinkComponent={Link}
                  to={"/app/" + allRoutesData.pfCurriculoCompleto.path}
                  target="_blank"
                  fullWidth
                >
                  Ver CV Completo
                </Button>
              )}
            </Box>
          </Grid>
          {auth.features[ACCOUNT_FEATURES.PF] && (
            <Grid item xs={12} sx={{ m: 4, display: { sm: "none", xs: "block" } }}>
              <Button
                disableElevation
                variant="outlined"
                color="secondary"
                LinkComponent={Link}
                to={"/app/" + allRoutesData.pfCurriculoCompleto.path}
                target="_blank"
                fullWidth
              >
                Ver CV Completo
              </Button>
            </Grid>
          )}
          <Grid item xs={12} sm={8}>
            {formItems.map((formItem, idx) => {
              const Comp = formItem.comp;
              return (
                <Fragment key={formItem.id}>
                  {idx > 0 ? (
                    <>
                      <div
                        id={formItem.id}
                        style={{ transform: "translateY(-12px)" }}
                      />
                      <Divider sx={{ mt: 6, mb: 2 }} />
                    </>
                  ) : (
                    <>
                      <div
                        id={formItem.id}
                        style={{ transform: "translateY(-80px)" }}
                      />
                    </>
                  )}
                  <Typography key={formItem.id} variant="h4" sx={{ mb: 6 }}>
                    {formItem.title}
                  </Typography>
                  <Comp data={dados || {}} onChange={handleChange} />
                </Fragment>
              );
            })}
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default DadosPage;
