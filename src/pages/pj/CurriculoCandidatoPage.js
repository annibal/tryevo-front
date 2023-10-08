import { Link, useParams } from "react-router-dom";
import FullCV from "../../components/FullCV";
import useFetch from "../../providers/useFetch";
import { Box, Button, Container, Typography } from "@mui/material";
import LoaderTryEvo from "../../components/LoaderTryEvo";
import allRoutesData from "../../base/routes_data";


const CurriculoCandidatoPage = () => {
  let { propostaId } = useParams();
  const propostaResponse = useFetch("GET", `proposta/${propostaId}`);

  const Wrapper = ({ children }) => (
    <Container>
      <Box sx={{ p: 4, textAlign: "center" }}>
        {children}
      </Box>
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Button
          disableElevation
          variant="text"
          LinkComponent={Link}
          to={"/app/" + allRoutesData.pjPropostaFeita.path + propostaId}
        >
          Voltar para Proposta
        </Button>

        <Button
          disableElevation
          variant="text"
          LinkComponent={Link}
          to={"/app/" + allRoutesData.pjPropostasFeitas.path}
          sx={{ ml: 2 }}
        >
          Minhas Propostas
        </Button>

        <Button
          disableElevation
          variant="text"
          LinkComponent={Link}
          to={"/app/" + allRoutesData.pjMinhasVagas.path}
          sx={{ ml: 2 }}
        >
          Minhas Vagas
        </Button>

        <Button
          disableElevation
          variant="text"
          LinkComponent={Link}
          to={"/app/" + allRoutesData.pjDashboard.path}
          sx={{ ml: 2 }}
        >
          Página Principal
        </Button>
      </Box>
    </Container>
  );

  if (propostaResponse.loading) {
    return (
      <Wrapper>
        <LoaderTryEvo />
      </Wrapper>
    );
  }

  if (propostaResponse.error) {
    return (
      <Wrapper>
        <Typography color="error">
          {propostaResponse.error?.message || propostaResponse.error}
        </Typography>
      </Wrapper>
    );
  }

  const proposta = propostaResponse.data;
  if (!proposta) {
    return (
      <Wrapper>
        <Typography color="error">
          Não foi encontrada a Proposta para carregar o currículo do Candidato
        </Typography>
      </Wrapper>
    );
  }

  if (!proposta.viuDados) {
    return (
      <Wrapper>
        <Typography color="error">
          Os dados do Candidato ainda não foram liberados para a Proposta
        </Typography>
      </Wrapper>
    );
  }

  if (!proposta.candidato) {
    return (
      <Wrapper>
        <Typography color="error">
          A proposta não possui dados do candidato, não é possível carregar o
          currículo
        </Typography>
      </Wrapper>
    );
  }

  return <FullCV title={`Currículo enviado para a vaga "${proposta.vaga.titulo}"`} cv={proposta.candidato} />;
};

export default CurriculoCandidatoPage;
