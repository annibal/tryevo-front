import { Box, Grid } from "@mui/material";
import ResponseWrapper from "../../components/ResponseWrapper";
import Section from "../../components/Section";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../providers/useFetch";
import PrettyPrint from "../commons/PrettyPrint";
import PlanAssForm from "./ManagePlanosAssinaturaComponents/PlanAssForm";
import allRoutesData from "../../base/routes_data";

const ManageNewPlanoAssinaturaPage = () => {
  const nav = useNavigate()

  const handleSubmit = (data) => {
    nav(`/app/${allRoutesData.masterAdminPlanoAssinatura.path}${data._id}`);
  }

  return (
    <Box>
      <Section
        title="Novo plano de Assinatura"
        spacing={4}
      >
        <PlanAssForm onSubmit={handleSubmit}/>
      </Section>
    </Box>
  );
};

export default ManageNewPlanoAssinaturaPage;
