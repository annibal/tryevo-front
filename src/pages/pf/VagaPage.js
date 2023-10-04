import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HandshakeIcon from "@mui/icons-material/Handshake";
import PlaceIcon from "@mui/icons-material/Place";
import BusinessIcon from "@mui/icons-material/Business";
import TodayIcon from "@mui/icons-material/Today";
import ChecklistIcon from "@mui/icons-material/Checklist";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import { ACCOUNT_FEATURES, useAuth } from "../../base/AuthContext";
import allRoutesData from "../../base/routes_data";
import { Helmet } from "react-helmet";
import useFetch from "../../providers/useFetch";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import ResponseWrapper from "../../components/ResponseWrapper";
import { doCall } from "../../providers/baseProvider";
import { LoadingButton } from "@mui/lab";
import {
  optionsCategoriaCNH,
  optionsEscolaridade,
  optionsFluenciaLinguagem,
  optionsJornada,
  optionsLinguagens,
  optionsModeloContrato,
  optionsTipoContrato,
} from "../../providers/enumProvider";
import InlineIconInfo from "../../components/InlineIconInfo";
import { Fragment } from "react";

const VagaPage = () => {
  let { vagaId, vagaNome } = useParams();
  const auth = useAuth();
  const vagaResponse = useFetch("GET", `vaga/${vagaId}`);
  const [isLoadingSalvarVaga, setIsLoadingSalvarVaga] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    setIsFavorite((auth.userInfo?.vagasSalvas || []).includes(vagaId));
  }, [auth.userInfo?.vagasSalvas, vagaId]);

  const vaga = vagaResponse.data || {};
  const vagaTitulo = vaga.titulo || vagaNome;
  const chips = [
    (vaga.qualificacoes || []).map((x) => ({ ...x, type: "q" })),
    (vaga.habilidades || []).map((x) => ({ ...x, type: "h" })),
  ].flat();

  const categoriaCNH = optionsCategoriaCNH.find(
    (o) => o.value === vaga.categoriaCNH
  );
  const exigeCNG = categoriaCNH != null && categoriaCNH.value !== "NONE";
  const linguagens = (vaga.linguagens || []).map((l) => {
    let idioma = optionsLinguagens.find((o) => o.value === l.valor);
    if (!idioma) {
      idioma = l.valor;
    } else {
      idioma = idioma.label;
    }
    let fluencia = optionsFluenciaLinguagem.find((o) => o.value === l.tipo);
    if (!fluencia) {
      fluencia = l.tipo;
    } else {
      fluencia = fluencia.label;
    }
    return {
      idioma,
      fluencia,
    };
  });
  const escolaridade = optionsEscolaridade.find(
    (o) => o.value === vaga.escolaridade
  );

  const tipoContrato = optionsTipoContrato.find(
    (o) => o.value === vaga.tipoContrato
  );
  const modeloContrato = optionsModeloContrato.find(
    (o) => o.value === vaga.modeloContrato
  );
  const jornada = optionsJornada.find((o) => o.value === vaga.jornada);

  const hasRequisitos =
    exigeCNG ||
    escolaridade ||
    linguagens.length > 0 ||
    vaga.pcd ||
    vaga.disponivelViagem ||
    vaga.experiencia != null ||
    vaga.disponivelMudanca;

  const handleSalvarVaga = () => {
    setIsLoadingSalvarVaga(true);
    doCall(`/info/salvar-vaga/${vagaId}`, {
      method: "POST",
    }).then((response) => {
      if (response.error) {
        console.error(response.error);
        // setActionError(response.error?.message || response.error);
      } else {
        auth.setUserInfo({
          ...auth.userInfo,
          vagasSalvas: response.data.vagasSalvas,
        });
        setIsFavorite(!isFavorite);
      }
      setIsLoadingSalvarVaga(false);
    });
  };

  return (
    <Box>
      <Helmet>
        <title>{vagaTitulo} - Vaga em TryEvo</title>
      </Helmet>

      <ResponseWrapper {...vagaResponse}>
        <>
          <Box sx={{ mb: 6, mt: 2 }}>
            <Grid container spacing={2}>
              {/* Titulo */}

              <Grid item xs={12} sm={8}>
                <Typography variant="h3">{vagaTitulo}</Typography>
              </Grid>

              {/* Botoes */}

              <Grid item xs={12} sm={4}>
                {auth.features[ACCOUNT_FEATURES.LOGGED] && (
                  <>
                    <LoadingButton
                      loading={isLoadingSalvarVaga}
                      onClick={handleSalvarVaga}
                      size="large"
                      disableElevation
                      variant="outlined"
                      startIcon={<FavoriteIcon />}
                      sx={{ width: { xs: "auto", sm: "100%" } }}
                    >
                      Salvar Vaga
                    </LoadingButton>
                    <Box sx={{ pt: 1 }} />
                    <Button
                      size="large"
                      disableElevation
                      variant="contained"
                      startIcon={<HandshakeIcon />}
                      LinkComponent={Link}
                      to={
                        "/app/" +
                        allRoutesData.pfNovaCandidatura.path +
                        vagaId +
                        "/" +
                        vagaNome
                      }
                      sx={{ width: { xs: "auto", sm: "100%" } }}
                    >
                      Me Candidatar
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={2}>
            {/* Principal */}

            <Grid item xs={12} sm={8}>
              <Box className="vaga-descricao" sx={{ mb: 4 }}>
                <Typography sx={{ whiteSpace: "pre-line" }}>
                  {(vaga.descricao || "").trim()}
                </Typography>
              </Box>

              <Box className="vaga-chips" sx={{ mb: 6 }}>
                <Box className="vaga-card-chips" sx={{ mb: 2 }}>
                  {chips?.length > 1 &&
                    chips.map((chip) => (
                      <Chip
                        label={chip.nome}
                        key={chip._id}
                        size="small"
                        sx={{ mr: 2, mt: 1 }}
                      />
                    ))}
                </Box>
              </Box>

              <InlineIconInfo
                Icon={TodayIcon}
                className="vaga-created-at"
                sx={{ mb: 4 }}
              >
                <Typography>
                  {new Date(vaga.createdAt).toLocaleDateString()}
                </Typography>
              </InlineIconInfo>

              {hasRequisitos && (
                <InlineIconInfo
                  Icon={ChecklistIcon}
                  className="vaga-requisitos"
                  sx={{ mb: 4 }}
                  title="Requisitos"
                >
                  {exigeCNG && (
                    <Typography>CNH Categoria {categoriaCNH.label}</Typography>
                  )}
                  {linguagens?.length > 0 &&
                    linguagens.map((l) => (
                      <Typography key={l.idioma + l.fluencia}>
                        {l.idioma} - {l.fluencia}
                      </Typography>
                    ))}
                  {escolaridade && (
                    <Typography>
                      Escolaridade Mínima: {escolaridade.label}
                    </Typography>
                  )}
                  {vaga.pcd && <Typography>Vaga para PCD</Typography>}
                  {vaga.disponivelViagem && (
                    <Typography>Disponibilidade para Viajar</Typography>
                  )}
                  {vaga.disponivelMudanca && (
                    <Typography>Disponibilidade de Mudança</Typography>
                  )}
                  {vaga.experiencia != null && (
                    <Typography>
                      {vaga.experiencia} anos de experiência
                    </Typography>
                  )}
                </InlineIconInfo>
              )}

              {vaga.endereco && (
                <InlineIconInfo
                  Icon={PlaceIcon}
                  className="vaga-local"
                  sx={{ mb: 4 }}
                >
                  <Typography>
                    {vaga.endereco.rua}, {vaga.endereco.numero}
                    {vaga.endereco.complemento &&
                      ` - ${vaga.endereco.complemento}`}
                    <br />
                    {vaga.endereco.bairro}
                    <br />
                    {vaga.endereco.cidade} - {vaga.endereco.estado},{" "}
                    {vaga.endereco.cep}
                  </Typography>
                </InlineIconInfo>
              )}

              {!vaga.ocultarEmpresa && vaga.empresa && (
                <InlineIconInfo
                  Icon={BusinessIcon}
                  className="vaga-empresa"
                  sx={{ mb: 4 }}
                >
                  {vaga.empresa.nomeFantasia ? (
                    <Typography>{vaga.empresa.nomeFantasia}</Typography>
                  ) : (
                    <>
                      {vaga.empresa.razaoSocial && (
                        <Typography>{vaga.empresa.razaoSocial}</Typography>
                      )}
                    </>
                  )}
                  {vaga.empresa.nomeResponsavel && (
                    <Typography>{vaga.empresa.nomeResponsavel}</Typography>
                  )}
                  {vaga.empresa.links?.length > 0 &&
                    vaga.empresa.links.map((link) => (
                      <Typography key={link.tipo + link.valor}>
                        <a href={link.valor} target="_blank" rel="noreferrer">
                          {link.tipo}: {link.valor}
                        </a>
                      </Typography>
                    ))}
                </InlineIconInfo>
              )}
            </Grid>

            {/* Sidebar */}

            <Grid item xs={12} sm={4}>
              {vaga.cargo?.nome && (
                <InlineIconInfo
                  sx={{ mb: 2 }}
                  Icon={LabelImportantIcon}
                  title="Cargo"
                >
                  {vaga.cargo.nome}
                </InlineIconInfo>
              )}
              {tipoContrato && (
                <InlineIconInfo
                  sx={{ mb: 2 }}
                  Icon={LabelImportantIcon}
                  title="Tipo de Contrato"
                >
                  {tipoContrato.label}
                </InlineIconInfo>
              )}
              {modeloContrato && (
                <InlineIconInfo
                  sx={{ mb: 2 }}
                  Icon={LabelImportantIcon}
                  title="Modelo de Contrato"
                >
                  {modeloContrato.label}
                  {vaga.diasPresencial != null && vaga.diasPresencial != 0 && (
                    <>
                      <br />
                      {vaga.diasPresencial} dias presenciais
                    </>
                  )}
                </InlineIconInfo>
              )}
              {jornada && (
                <InlineIconInfo
                  sx={{ mb: 2 }}
                  Icon={LabelImportantIcon}
                  title="Jornada"
                >
                  {jornada.label}
                </InlineIconInfo>
              )}
              {vaga.beneficios?.length > 0 && (
                <InlineIconInfo
                  sx={{ mb: 2 }}
                  Icon={LabelImportantIcon}
                  title="Benefícios"
                >
                  {vaga.beneficios.map((beneficio) => (
                    <Fragment key={beneficio.tipo + beneficio.valor}>
                      {beneficio.tipo} - {beneficio.valor}
                    </Fragment>
                  ))}
                </InlineIconInfo>
              )}
            </Grid>
          </Grid>
        </>
      </ResponseWrapper>
    </Box>
  );
};

export default VagaPage;
