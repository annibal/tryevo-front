import { Box, Divider, Typography } from "@mui/material";
import DadosPessoaisForm from "./DadosPessoaisForm";
import { ACCOUNT_FEATURES, useAuth } from "../../base/AuthContext";
import IdiomasForm from "./DadosIdiomasForm";
import DadosEmpresaForm from "./DadosEmpresaForm";
import DadosEnderecoForm from "./DadosEnderecoForm";
import DadosEscolaridadeForm from "./DadosEscolaridadeForm";
import DadosExperienciaProfissionalForm from "./DadosExperienciaProfissionalForm";
import DadosProjetosForm from "./DadosProjetosForm";

const DadosPage = () => {
  const auth = useAuth();

  if (auth.features[ACCOUNT_FEATURES.PF]) {
    return (
      <Box sx={{ pt: 2 }}>
        <Typography variant="h4" gutterBottom>
          Dados Pessoais
        </Typography>
        <DadosPessoaisForm />
  
        <Divider sx={{ my: 6 }} />

        <Typography variant="h4" gutterBottom>
          Endereço
        </Typography>
        <DadosEnderecoForm type="pf" />
  
        <Divider sx={{ my: 6 }} />
  
        <Typography variant="h4" gutterBottom>
          Idiomas
        </Typography>
        <IdiomasForm />
  
        <Divider sx={{ my: 6 }} />
  
        <Typography variant="h4" gutterBottom>
          Escolaridade
        </Typography>
        <DadosEscolaridadeForm />
  
        <Divider sx={{ my: 6 }} />
  
        <Typography variant="h4" gutterBottom>
          Experiencia Profissional
        </Typography>
        <DadosExperienciaProfissionalForm />
  
        <Divider sx={{ my: 6 }} />
  
        <Typography variant="h4" gutterBottom>
          Projetos
        </Typography>
        <DadosProjetosForm />
  
      </Box>
    );
  } else {
    return (
      <Box sx={{ pt: 2 }}>
        <Typography variant="h4" gutterBottom>
          Dados da Empresa
        </Typography>
        <DadosEmpresaForm />
  
        <Divider sx={{ my: 6 }} />

        <Typography variant="h4" gutterBottom>
          Endereço
        </Typography>
        <DadosEnderecoForm type="pj" />
      </Box>
    )
  }

};

export default DadosPage;