import { Box, Button, Grid, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../providers/useFetch";
import ResponseWrapper from "../../components/ResponseWrapper";
import PrettyPrint from "../commons/PrettyPrint";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useEffect, useState } from "react";
import { doCall } from "../../providers/baseProvider";
import Section from "../../components/Section";
import { LoadingButton } from "@mui/lab";
import VagaCard from "../../components/VagaCard";
import InfoTable from "../../components/InfoTable";
import allRoutesData from "../../base/routes_data";

const ManageSingleVaga = () => {
  const { vagaId } = useParams();
  const baseVagaApiUrl = `vaga/${vagaId}`;
  const [cache, setCache] = useState(+new Date());
  const [actionError, setActionError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const vagaResponse = useFetch("GET", `${baseVagaApiUrl}?cache=${cache}`);

  let sectionTitle = vagaId;
  if (vagaResponse?.data?.titulo) {
    sectionTitle = vagaResponse.data.titulo;
  }

  const handleToggleActive = () => {
    setActionError(null);
    setActionLoading(false);
    doCall(baseVagaApiUrl, {
      method: "POST",
      body: {
        active: !vagaResponse.data?.active,
      },
    }).then((response) => {
      if (response.error) {
        setActionError(response.error?.message || response.error);
      } else {
        setCache(+new Date());
      }
      setActionLoading(false);
    });
  };

  return (
    <div>
      <ResponseWrapper {...vagaResponse}>
        <Section title={sectionTitle} subtitle="Gerenciar Vaga" spacing={4}>
          {vagaResponse.data != null && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <InfoTable
                  data={[
                    { name: "ID da vaga", value: vagaId },
                    {
                      name: "Status",
                      value: vagaResponse.data?.active ? "Ativa" : "Inativa"
                    },
                    {
                      name: "Usuário Dono",
                      value: vagaResponse.data?.owner?.email,
                    },
                    {
                      name: "Plano",
                      value: vagaResponse.data?.owner?.plano,
                    },
                  ]}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <VagaCard
                  vaga={vagaResponse.data}
                  disableFavorite
                  showCandidatarBtn={false}
                  sx={{ border: "1px solid #88888888", p: 4, pb: 0 }}
                />
              </Grid>
            </Grid>
          )}
        </Section>

        <Section title="Ações de Gerenciamento" spacing={4}>
          {actionError && (
            <Box sx={{ pb: 2 }}>
              <Typography color="error">{String(actionError)}</Typography>
            </Box>
          )}
          <LoadingButton
            sx={{ mr: 1 }}
            variant="outlined"
            onClick={handleToggleActive}
            loading={actionLoading}
            color={vagaResponse.data?.active ? "inherit" : "primary"}
            startIcon={
              vagaResponse.data?.active ? (
                <UnpublishedIcon />
              ) : (
                <CheckCircleIcon />
              )
            }
          >
            {vagaResponse.data?.active ? "Desativar" : "Ativar"}
          </LoadingButton>
          <Button
            sx={{ mr: 1 }}
            color="primary"
            variant="contained"
            LinkComponent={Link}
            startIcon={<EditNoteIcon />}
            to={
              "/app/" +
              allRoutesData.pjEditarMinhaVaga.path +
              vagaId +
              "/" +
              encodeURIComponent(
                vagaResponse?.data?.apelido
                  ? vagaResponse?.data?.apelido
                  : vagaResponse?.data?.titulo
              )
            }
          >
            Editar
          </Button>
        </Section>

        <Section title="Todos os Dados" spacing={4} withoutDivider>
          <PrettyPrint
            keyName="Dados da Vaga"
            value={vagaResponse.data}
            ignoreFields={["_id", "__v"]}
          />
        </Section>
      </ResponseWrapper>
    </div>
  );
};

export default ManageSingleVaga;
