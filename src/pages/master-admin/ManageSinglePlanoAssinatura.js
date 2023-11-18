import { Box, Grid } from "@mui/material";
import ResponseWrapper from "../../components/ResponseWrapper";
import Section from "../../components/Section";
import { useParams } from "react-router-dom";
import useFetch from "../../providers/useFetch";
import PrettyPrint from "../commons/PrettyPrint";

const ManageSinglePlanoAssinaturaPage = () => {
  const { planoId } = useParams();
  const planAssResponse = useFetch("GET", `plano-assinatura/${planoId}`);

  let sectionTitle = planoId;
  if (planAssResponse?.data?.nome) {
    sectionTitle = planAssResponse.data.nome;
  }

  return (
    <Box>
      <Section
        title={sectionTitle}
        subtitle="Gerenciar Plano de Assinatura"
        spacing={4}
      >
        <ResponseWrapper {...planAssResponse}>
          {planAssResponse.data != null && (
            <Box>
              <PrettyPrint
                keyName="Dados da Conta"
                value={planAssResponse.data}
              />
            </Box>
          )}
        </ResponseWrapper>
      </Section>
    </Box>
  );
};

export default ManageSinglePlanoAssinaturaPage;
