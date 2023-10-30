import { Navigate, useParams } from "react-router-dom";
import allRoutesData from "../../../base/routes_data";
import DadosMinhaVagaForm from "./DadosMinhaVagaForm.js";
import { useState } from "react";
import useFetch from "../../../providers/useFetch";
import { Box, Typography } from "@mui/material";
import ResponseWrapper from "../../../components/ResponseWrapper";
import { ACCOUNT_FEATURES, useAuth } from "../../../base/AuthContext";

const EditarMinhaVagaPage = () => {
  const auth = useAuth();
  let { vagaId, vagaNome } = useParams();
  const [created, setCreated] = useState(false);
  const vagaResponse = useFetch("GET", `vaga/${vagaId}`);

  const handleSubmit = () => {
    setCreated(true);
  };

  const urlNavigate = auth.features[ACCOUNT_FEATURES.MASTER_ADMIN]
    ? `/app/${allRoutesData.masterAdminVaga.path}${vagaId}`
    : "/app/" + allRoutesData.pjMinhaVaga.path + vagaId + "/" + vagaNome;

  return (
    <Box>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3">{vagaNome}</Typography>
        <Typography variant="caption">Editando</Typography>
      </Box>

      <ResponseWrapper {...vagaResponse}>
        <DadosMinhaVagaForm data={vagaResponse.data} onSubmit={handleSubmit} />
      </ResponseWrapper>

      {created && <Navigate to={urlNavigate} />}
    </Box>
  );
};

export default EditarMinhaVagaPage;
