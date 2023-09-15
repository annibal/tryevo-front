import { Navigate } from "react-router-dom";
import allRoutesData from "../../../base/routes_data";
import DadosMinhaVagaForm from "./DadosMinhaVagaForm.js";
import { useState } from "react";
import { Box, Typography } from "@mui/material";

const NovaMinhaVagaPage = () => {
  const [vagaCreated, setVagaCreated] = useState({});

  const [created, setCreated] = useState(false)

  const handleSubmit = (newVaga) => {
    setVagaCreated(newVaga)
    setCreated(true);
  }

  return (
    <Box>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3">Criar Vaga</Typography>
      </Box>

      <DadosMinhaVagaForm data={{}} onSubmit={handleSubmit} />

      {created && (
        <Navigate to={'/app/' + allRoutesData.pjMinhaVaga.path + vagaCreated._id + '/' + encodeURIComponent(vagaCreated.titulo)} />
      )}
    </Box>
  );
};

export default NovaMinhaVagaPage;
