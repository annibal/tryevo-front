import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import Section from "../../components/Section";
import FormCompetencia from "./ManageCompetenciasComponents/FormCompetencia";
import ListCompetencias from "./ManageCompetenciasComponents/ListCompetencias";

const ManageCompetencias = () => {
  const [competenciaEdit, setCompetenciaEdit] = useState({});

  const handleSave = () => {
    setCompetenciaEdit({});
  };

  return (
    <div>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3">Gerenciar Competencias</Typography>
        <Typography variant="body2">
          Qualificações criadas por usuários
        </Typography>
      </Box>

      <FormCompetencia data={competenciaEdit} onSubmit={handleSave} />

      <ListCompetencias
        onEdit={(item) => setCompetenciaEdit(item)}
        itemEdit={competenciaEdit}
      />
    </div>
  );
};

export default ManageCompetencias;
