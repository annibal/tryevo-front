import { Link, useParams } from "react-router-dom";
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

const NovaCandidaturaPage = () => {
  const { userInfo } = useAuth();
  let { vagaId, vagaNome } = useParams();
  const vagaResponse = useFetch("GET", `vaga/${vagaId}`);

  const [dados, setDados] = useState({});
  const handleChange = (value, name, data) => {
    setDados({
      ...data,
      [name]: value,
    });
  };

  const vaga = vagaResponse.data || {};
  const vagaTitulo = vaga.titulo || vagaNome;
  // const url = '/app/' + allRoutesData.pfCandidaturas.path + (vagaId * 17) + '/' + vagaNome

  const handleSubmit = (event) => {
    console.log(dados)
    event.preventDefault();
  };

  return (
    <Box>
      <Helmet>
        <title>{vagaTitulo} - Vaga em TryEvo</title>
      </Helmet>

      <ResponseWrapper {...vagaResponse}>
        <Box sx={{ mt: 2, mb: 4 }}>
          <Typography variant="h4">Nova Candidatura</Typography>
        </Box>

        <Box sx={{ mb: 8 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5.5}>
              <CandidatoCard
                pf={userInfo || {}}
                sx={{ border: "1px solid #88888888", p: 4, pb: 0, mb: 2 }}
              />

              <Grid container spacing={2}>
                <Grid item xs>
                  <Button
                    disableElevation
                    variant="outlined"
                    sx={{ width: { xs: "auto", sm: "100%" } }}
                    LinkComponent={Link}
                    to={"/app/" + allRoutesData.pfDados.path}
                  >
                    Editar Dados
                  </Button>
                </Grid>
                <Grid item xs>
                  <Button
                    disableElevation
                    variant="outlined"
                    sx={{ width: { xs: "auto", sm: "100%" } }}
                    LinkComponent={Link}
                    to={"/app/" + allRoutesData.pfCurriculoCompleto.path}
                  >
                    Ver CV Completo
                  </Button>
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
                sx={{ border: "1px solid #88888888", p: 4, pb: 0 }}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography>
            Ao enviar sua candidatura ...
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={8}>
                <Typography variant="h6">
                  Questões pré-candidatura
                </Typography>
              </Grid>

              <Grid item xs={12} sm={8}>
                <FormInput
                  label="Carta de Apresentação"
                  name="cartaApresentacao"
                  data={dados}
                  required
                  onChange={handleChange}
                  multiline
                  rows={6}
                />
              </Grid>

              {(vaga.questoes || []).map(questao => {

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
                        options={(questao.escolhas || []).map(escolha => ({
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
                )
              })}

              <Grid item xs={12} sm={8}>
                <Button
                  type="submit"
                  size="large"
                  disableElevation
                  variant="contained"
                  startIcon={<HandshakeIcon />}
                  sx={{ width: { xs: "auto", sm: "100%" } }}
                >
                  Enviar Candidatura
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </ResponseWrapper>
    </Box>
  );
};

export default NovaCandidaturaPage;
