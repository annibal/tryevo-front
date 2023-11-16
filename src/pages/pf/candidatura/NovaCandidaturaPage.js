import { Link, Navigate, useParams } from "react-router-dom";
import allRoutesData from "../../../base/routes_data";
import useFetch from "../../../providers/useFetch";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import ResponseWrapper from "../../../components/ResponseWrapper";
import VagaCard from "../../../components/VagaCard";
import CandidatoCard from "../../../components/CandidatoCard";
import { useAuth } from "../../../base/AuthContext";
import FormInput from "../../commons/form/FormInput";
import { useState } from "react";
import FormSelect from "../../commons/form/FormSelect";
import FormSlider from "../../commons/form/FormSlider";
import { doCall } from "../../../providers/baseProvider";
import { LoadingButton } from "@mui/lab";
import FullCVBtn from "../../../components/FullCVBtn";

const NovaCandidaturaPage = () => {
  const { userInfo } = useAuth();
  let { vagaId, vagaNome } = useParams();
  const vagaResponse = useFetch("GET", `vaga/${vagaId}`);
  const [isLoading, setIsLoading] = useState(false);
  const [actionError, setActionError] = useState(null);
  const [candidaturaCreated, setCandidaturaCreated] = useState(null);

  let enviarCandidaturaEnabled = !!userInfo;

  const [dados, setDados] = useState({});
  const handleChange = (value, name, data) => {
    setActionError(null);
    setDados({
      ...data,
      [name]: value,
    });
  };

  const vaga = vagaResponse.data || {};
  const vagaTitulo = vaga.titulo || vagaNome;
  // const url = '/app/' + allRoutesData.pfCandidaturas.path + (vagaId * 17) + '/' + vagaNome

  const handleSubmit = (event) => {
    const arrQuestoes = vaga.questoes || [];
    const questoes = [
      {
        pergunta: "Carta de Apresentação",
        resposta: dados.cartaApresentacao,
      },
    ];
    Object.entries(dados).forEach((entry) => {
      const respostaValida = entry[1] != null && entry[1] !== "";
      const questao = arrQuestoes.find((q) => q._id === entry[0]);
      if (questao && respostaValida) {
        questoes.push({
          pergunta: questao.titulo,
          resposta: `${entry[1]}`,
        });
      }
    });

    const data = {
      // candidatoId: userInfo._id,
      vagaId,
      questoes,
    };

    setIsLoading(true);
    setActionError(null);
    doCall(`/candidaturas`, {
      method: "POST",
      body: data,
    }).then((response) => {
      if (response.error) {
        console.error(response.error);
        setActionError(response.error?.message || response.error);
      } else {
        setCandidaturaCreated(response.data);
      }
      setIsLoading(false);
    });

    event.preventDefault();
  };

  return (
    <Box>
      <Helmet>
        <title>Nova Candidatura para {vagaTitulo} - TryEvo</title>
      </Helmet>

      {candidaturaCreated && (
        <Navigate
          to={
            "/app/" + allRoutesData.pfCandidaturas.path + candidaturaCreated._id
          }
        />
      )}

      <ResponseWrapper {...vagaResponse}>
        <Box sx={{ mt: 2, mb: 4 }}>
          <Typography variant="h4">Nova Candidatura</Typography>
        </Box>

        <Box sx={{ mb: 8 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5.5}>
              {userInfo ? (
                <CandidatoCard
                  pf={userInfo || {}}
                  sx={{ border: "1px solid #88888888", p: 4, pb: 0, mb: 2 }}
                />
              ) : (
                <Box sx={{ pb: 2 }}>
                  <Typography color="error">
                    Você precisa pelo menos inserir algum dado pessoal antes de 
                    começar a enviar candidaturas.
                  </Typography>
                </Box>
              )}

              <Grid container spacing={2}>
                <Grid item xs>
                  <Button
                    disableElevation
                    variant={enviarCandidaturaEnabled ? "outlined" : "contained"}
                    sx={{ width: { xs: "auto", sm: "100%" } }}
                    LinkComponent={Link}
                    to={"/app/" + allRoutesData.pfDados.path}
                    startIcon={allRoutesData.pfDados.icon}
                  >
                    Editar Dados
                  </Button>
                </Grid>
                <Grid item xs>
                  <FullCVBtn sx={{ width: { xs: "auto", sm: "100%" } }} />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sm={1}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ArrowForwardIcon />
            </Grid>
            <Grid item xs={12} sm={5.5}>
              <VagaCard
                vaga={vaga}
                disableFavorite
                showCandidatarBtn={false}
                sx={{ border: "1px solid #88888888", p: 4, pb: 0 }}
              />
            </Grid>
          </Grid>
        </Box>

        {/* <Box sx={{ mb: 4 }}>
          <Typography>Ao enviar sua candidatura ...</Typography>
        </Box> */}

        <Box sx={{ mb: 4 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={8}>
                <Typography variant="h6" id="questoes-pre-candidatura">Questões pré-candidatura</Typography>
              </Grid>

              <Grid item xs={12} sm={8}>
                <FormInput
                  label="Carta de Apresentação"
                  name="cartaApresentacao"
                  data={dados}
                  onChange={handleChange}
                  multiline
                  rows={6}
                />
              </Grid>

              {(vaga.questoes || []).map((questao) => {
                return (
                  <Grid item xs={12} sm={8} key={questao._id}>
                    {questao.tipo === "TEXTO" && (
                      <FormInput
                        label={questao.titulo}
                        name={questao._id}
                        required={questao.isObrigatorio === true}
                        data={dados}
                        onChange={handleChange}
                        multiline
                        rows={6}
                      />
                    )}
                    {questao.tipo === "ESCOLHA" && (
                      <FormSelect
                        label={questao.titulo}
                        name={questao._id}
                        required={questao.isObrigatorio === true}
                        allowDefault={questao.isObrigatorio !== true}
                        data={dados}
                        onChange={handleChange}
                        options={(questao.escolhas || []).map((escolha) => ({
                          value: escolha,
                          label: escolha,
                        }))}
                      />
                    )}
                    {questao.tipo === "SLIDER" && (
                      <FormSlider
                        label={questao.titulo}
                        name={questao._id}
                        required={questao.isObrigatorio === true}
                        data={dados}
                        onChange={handleChange}
                        min={questao.minimo}
                        max={questao.maximo}
                      />
                    )}
                  </Grid>
                );
              })}

              <Grid item xs={12} sm={8}>
                {!isLoading && actionError && (
                  <Box sx={{ pb: 2 }}>
                    <Typography color="error">{String(actionError)}</Typography>
                  </Box>
                )}

                <LoadingButton
                  type="submit"
                  size="large"
                  disableElevation
                  loading={isLoading}
                  variant="contained"
                  disabled={!enviarCandidaturaEnabled}
                  startIcon={<HandshakeIcon />}
                  sx={{ width: { xs: "auto", sm: "100%" } }}
                >
                  Enviar Candidatura
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </Box>
      </ResponseWrapper>
    </Box>
  );
};

export default NovaCandidaturaPage;
