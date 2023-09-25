import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../base/AuthContext";
import allRoutesData from "../../base/routes_data";
import { Helmet } from "react-helmet";
import useFetch from "../../providers/useFetch";
import { Box, Button, Grid, Typography } from "@mui/material";
import ResponseWrapper from "../../components/ResponseWrapper";

const VagaPage = () => {
  let { vagaId, vagaNome } = useParams();
  const auth = useAuth();
  const vagaResponse = useFetch("GET", `vaga/${vagaId}`);

  const vaga = vagaResponse.data || {};
  const vagaTitulo = vaga.titulo || vagaNome;

  return (
    <Box>
      <Helmet>
        <title>{vagaTitulo} - Vaga em TryEvo</title>
      </Helmet>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h3">{vagaTitulo}</Typography>
      </Box>

      <ResponseWrapper {...vagaResponse}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            {vaga.match != null && (
              <Typography sx={{ mb: 2 }}>Match: {Math.floor(vaga.match * 100)}%</Typography>
            )}
            {vaga.matchDesc && (
              <>
                <Typography sx={{ mb: 0 }}>
                  Match Palavras:<br />
                  - {vaga.matchDesc.palavras.vaga} palavras únicas em vaga.descrição,<br />
                  - {vaga.matchDesc.palavras.candidato} palavras únicas em candidato.resumo,<br />
                  - {vaga.matchDesc.palavras.comuns} palavras em comum:<br />
                  - <b>{vaga.matchDesc.palavras.match}</b> match * {vaga.matchDesc.palavras.base} base<br />
                  {vaga.matchDesc.palavras.match === null && 'vaga não tem descrição, match ignora descrição/resumo'}
                </Typography>
                <Typography sx={{ mb: 0 }}>
                  Match Habilidades:<br />
                  - {vaga.matchDesc.habilidades.vaga} habilidades únicas na vaga,<br />
                  - {vaga.matchDesc.habilidades.candidato} habilidades únicas no candidato,<br />
                  - {vaga.matchDesc.habilidades.comuns} habilidades em comum:<br />
                  - <b>{vaga.matchDesc.habilidades.match}</b> match * {vaga.matchDesc.habilidades.base} base<br />
                  {vaga.matchDesc.habilidades.match === null && 'vaga não tem habilidades, match ignora habilidades'}
                </Typography>
                <Typography sx={{ mb: 0 }}>
                  Match Qualificações:<br />
                  - {vaga.matchDesc.qualificacoes.vaga} qualificacoes únicas na vaga,<br />
                  - {vaga.matchDesc.qualificacoes.candidato} qualificacoes únicas nas experiencias profissionais do candidato,<br />
                  - {vaga.matchDesc.qualificacoes.comuns} qualificacoes em comum:<br />
                  - <b>{vaga.matchDesc.qualificacoes.match}</b> match * {vaga.matchDesc.qualificacoes.base} base<br />
                  {vaga.matchDesc.qualificacoes.match === null && 'vaga não tem qualificações, match ignora qualificações'}
                </Typography>
                <Typography sx={{ mb: 2 }}>
                  ({[
                    vaga.matchDesc.palavras.match !== null ? `(${vaga.matchDesc.palavras.match} * ${vaga.matchDesc.palavras.base})` : '',
                    vaga.matchDesc.habilidades.match !== null ? `(${vaga.matchDesc.habilidades.match} * ${vaga.matchDesc.habilidades.base})` : '',
                    vaga.matchDesc.qualificacoes.match !== null ? `(${vaga.matchDesc.qualificacoes.match} * ${vaga.matchDesc.qualificacoes.base})` : '',
                  ].filter(x => x).join(' + ')}) / {
                    (vaga.matchDesc.palavras.match !== null ? vaga.matchDesc.palavras.base : 0) +
                    (vaga.matchDesc.habilidades.match !== null ? vaga.matchDesc.habilidades.base : 0) +
                    (vaga.matchDesc.qualificacoes.match !== null ? vaga.matchDesc.qualificacoes.base : 0)
                  } = {vaga.match}
                </Typography>
              </>
            )}
            {vaga.cargo?.nome && (
              <Typography sx={{ mb: 2 }}>Cargo: {vaga.cargo?.nome}</Typography>
            )}
            <Typography sx={{ mb: 6 }}>{vaga.descricao}</Typography>
            {vaga.beneficios?.length > 0 && (
              <Box>
                <Typography sx={{ mb: 2 }}>Benefícios:</Typography>
                {vaga.beneficios.map((beneficio) => (
                  <Typography sx={{ mb: 2 }}>
                    {beneficio.tipo} - {beneficio.valor}
                  </Typography>
                ))}
              </Box>
            )}

            {vaga.endereco && (
              <Box>
                <Typography sx={{ mb: 2 }}>Local da Vaga:</Typography>
                <Typography sx={{ mb: 2 }}>
                  <br />
                  {vaga.endereco.rua}, {vaga.endereco.numero}
                  {vaga.endereco.complemento &&
                    ` - ${vaga.endereco.complemento}`}
                  <br />
                  {vaga.endereco.bairro}
                  <br />
                  {vaga.endereco.cidade} - {vaga.endereco.estado}
                </Typography>
              </Box>
            )}

            {!vaga.ocultarEmpresa && vaga.empresa && (
              <Box>
                <Typography sx={{ mb: 0 }}>Contratante</Typography>
                {vaga.empresa.nomeResponsavel && (
                  <Typography sx={{ mb: 2 }}>
                    Nome do Responsável: {vaga.empresa.nomeResponsavel}
                  </Typography>
                )}
                {vaga.empresa.razaoSocial && (
                  <Typography sx={{ mb: 2 }}>
                    Razão Social: {vaga.empresa.razaoSocial}
                  </Typography>
                )}
                {vaga.empresa.nomeFantasia && (
                  <Typography sx={{ mb: 2 }}>
                    Nome Fantasia: {vaga.empresa.nomeFantasia}
                  </Typography>
                )}
                {vaga.empresa.links?.length > 0 &&
                  vaga.empresa.links.map((link) => (
                    <Typography sx={{ mb: 2 }}>
                      <a href={link.valor} target="_blank" rel="noreferrer">
                        {link.tipo}: {link.valor}
                      </a>
                    </Typography>
                  ))}
                {/* {vaga.empresa.telefones?.length > 0 &&
                  vaga.empresa.telefones.map((telefone) => (
                    <Typography sx={{ mb: 2 }}>
                      {telefone.tipo}: {telefone.valor}
                    </Typography>
                  ))} */}
              </Box>
            )}

            <Button
              variant="contained"
              LinkComponent={Link}
              to={
                "/app/" +
                allRoutesData.pfNovaCandidatura.path +
                vagaId +
                "/" +
                vagaNome
              }
            >
              Me Candidatar
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            {vaga.experiencia != null && (
              <Typography sx={{ mb: 2 }}>
                Experiência Mínima: {vaga.experiencia} anos
              </Typography>
            )}
            {/* {vaga.salarioMinimo != null && (
              <Typography sx={{ mb: 2 }}>
                Salário Base Oferecido: {(+vaga.salarioMinimo).toLocaleString()}
              </Typography>
            )} */}
            {/* {vaga.salarioMaximo != null && (
              <Typography sx={{ mb: 2 }}>
                Salário Máximo Disponível:{" "}
                {(+vaga.salarioMaximo).toLocaleString()}
              </Typography>
            )} */}
            {/* {vaga.idadeMinima != null && (
              <Typography sx={{ mb: 2 }}>
                Idade Mínima Exigida: {vaga.idadeMinima} anos
              </Typography>
            )} */}
            {/* {vaga.idadeMaxima != null && (
              <Typography sx={{ mb: 2 }}>
                Idade Máxima Exigida: {vaga.idadeMaxima} anos
              </Typography>
            )} */}
            {vaga.tipoContrato && (
              <Typography sx={{ mb: 2 }}>
                Tipo de Contrato: {vaga.tipoContrato}
              </Typography>
            )}
            {vaga.diasPresencial != null && (
              <Typography sx={{ mb: 2 }}>
                Dias Presenciais Exigidos: {vaga.diasPresencial} dias
              </Typography>
            )}
            {vaga.modeloContrato && (
              <Typography sx={{ mb: 2 }}>
                Modelo de Contrato: {vaga.modeloContrato}
              </Typography>
            )}
            {vaga.jornada && (
              <Typography sx={{ mb: 2 }}>Jornada: {vaga.jornada}</Typography>
            )}
            {vaga.categoriaCNH && (
              <Typography sx={{ mb: 2 }}>
                Categoria de CNH Exigida: {vaga.categoriaCNH}
              </Typography>
            )}
            {vaga.escolaridade && (
              <Typography sx={{ mb: 2 }}>
                Escolaridade Mínima: {vaga.escolaridade}
              </Typography>
            )}
            {/* {vaga.genero && (
              <Typography sx={{ mb: 2 }}>
                Apenas para pessoas do Gênero {vaga.genero}
              </Typography>
            )} */}
            {vaga.linguagens?.length > 0 &&
              vaga.linguagens.map((idioma) => (
                <Typography sx={{ mb: 2 }}>
                  Exige {idioma.tipo} {idioma.valor}
                </Typography>
              ))}
            {vaga.pcd && <Typography sx={{ mb: 2 }}>Vaga para PCD</Typography>}
            {vaga.disponivelViagem && (
              <Typography sx={{ mb: 2 }}>
                Exige disponibilidade de Viagem
              </Typography>
            )}
            {vaga.disponivelMudanca && (
              <Typography sx={{ mb: 2 }}>
                Exige disponibilidade de Mudança
              </Typography>
            )}
          </Grid>
        </Grid>
      </ResponseWrapper>
    </Box>
  );
};

export default VagaPage;
