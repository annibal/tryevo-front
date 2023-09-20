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
  ListItemButton,
  List,
  ListItemText,
  Divider,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
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
import DadosMinhaVagaPrincipal from "./DadosMinhaVagaPrincipal";
import DadosMinhaVagaMatch from "./DadosMinhaVagaMatch";
import DadosMinhaVagaBeneficios from "./DadosMinhaVagaBeneficios";
import DadosMinhaVagaRequisitos from "./DadosMinhaVagaRequisitos";
import DadosMinhaVagaIntegracoes from "./DadosMinhaVagaIntegracoes";

const DadosMinhaVagaForm = ({ data, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [dados, setDados] = useState(data || {});
  const [activeFormItem, setActiveFormItem] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (value, name, data) => {
    // setDados({
    //   ...data,
    //   [name]: value,
    // });
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

  const formItems = [
      {
        id: "principal",
        title: "Principal",
        comp: DadosMinhaVagaPrincipal, // elm
      },
      {
        id: "integracoes",
        title: "Integrações",
        comp: DadosMinhaVagaIntegracoes, // elm
      },
      {
        id: "match",
        title: "Match",
        comp: DadosMinhaVagaMatch, // elm
      },
      {
        id: "beneficios",
        title: "Benefícios",
        comp: DadosMinhaVagaBeneficios, // elm
      },
      {
        id: "requisitos",
        title: "Requisitos",
        comp: DadosMinhaVagaRequisitos, // elm
      },
      {
        id: "idiomas",
        title: "Requisitos - Idiomas",
        comp: DadosIdiomasForm, // elm
      },
      {
        id: "local",
        title: "Local da Vaga",
        comp: DadosEnderecoForm, // elm
      },
      {
        id: "questoes",
        title: "Questões pré-candidatura",
        comp: DadosVagaQuestoesForm, // elm
      },
    ]
  
  const handleScroll = (event) => {

    let activeItem = null;
    for (let i=0; i<formItems.length; i++) {
      const elm = document.getElementById(formItems[i].id)
      if (elm) {
        const y = elm.getBoundingClientRect().top;
        if (y >= 0 && y <= window.innerHeight ) {
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

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])
  
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
    <Box sx={{ pt: 2 }}>
      <form onSubmit={handleSubmit}>
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
            </Box>
          </Grid>
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

export default DadosMinhaVagaForm;
