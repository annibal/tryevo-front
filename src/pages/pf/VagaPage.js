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

const SidebarInfo = ({ title, children }) => (
  <Box className="vaga-created-at" sx={{ mb: 2 }}>
    <Grid container spacing={2}>
      <Grid item>
        <Typography color="textSecondary">
          <LabelImportantIcon
            color="inherit"
            fontSize="inherit"
            sx={{ verticalAlign: "-2px" }}
          />
        </Typography>
      </Grid>
      <Grid item xs>
        <Typography color="textSecondary">{title}:</Typography>
        <Typography>{children}</Typography>
      </Grid>
    </Grid>
  </Box>
);

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

              <Box className="vaga-created-at" sx={{ mb: 4 }}>
                <Grid container spacing={2}>
                  <Grid item>
                    <TodayIcon
                      color="inherit"
                      fontSize="inherit"
                      sx={{ verticalAlign: "-2px" }}
                    />
                  </Grid>
                  <Grid item xs>
                    <Typography>
                      {new Date(vaga.createdAt).toLocaleDateString()}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              {hasRequisitos && (
                <Box className="vaga-requisitos" sx={{ mb: 4 }}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <ChecklistIcon
                        color="inherit"
                        fontSize="inherit"
                        sx={{ verticalAlign: "-2px" }}
                      />
                    </Grid>
                    <Grid item xs>
                      <Typography color="textSecondary">Requisitos:</Typography>

                      {exigeCNG && (
                        <Typography>
                          CNH Categoria {categoriaCNH.label}
                        </Typography>
                      )}
                      {linguagens?.length > 0 &&
                        linguagens.map((l) => (
                          <Typography>
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
                        <Typography>Exige disponibilidade de Viagem</Typography>
                      )}
                      {vaga.disponivelMudanca && (
                        <Typography>
                          Exige disponibilidade de Mudança
                        </Typography>
                      )}
                      {vaga.experiencia != null && (
                        <Typography>
                          {vaga.experiencia} anos de experiência
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              )}

              {vaga.endereco && (
                <Box className="vaga-local" sx={{ mb: 4 }}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <PlaceIcon
                        color="inherit"
                        fontSize="inherit"
                        sx={{ verticalAlign: "-2px" }}
                      />
                    </Grid>
                    <Grid item xs>
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
                    </Grid>
                  </Grid>
                </Box>
              )}

              {!vaga.ocultarEmpresa && vaga.empresa && (
                <Box className="vaga-empresa" sx={{ mb: 4 }}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <BusinessIcon
                        color="inherit"
                        fontSize="inherit"
                        sx={{ verticalAlign: "-2px" }}
                      />
                    </Grid>
                    <Grid item xs>
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
                          <Typography>
                            <a
                              href={link.valor}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {link.tipo}: {link.valor}
                            </a>
                          </Typography>
                        ))}
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Grid>

            {/* Sidebar */}

            <Grid item xs={12} sm={4}>
              {vaga.cargo?.nome && (
                <SidebarInfo title="Cargo">{vaga.cargo.nome}</SidebarInfo>
              )}
              {tipoContrato && (
                <SidebarInfo title="Tipo de Contrato">
                  {tipoContrato.label}
                </SidebarInfo>
              )}
              {modeloContrato && (
                <SidebarInfo title="Modelo de Contrato">
                  {modeloContrato.label}
                  {vaga.diasPresencial != null && vaga.diasPresencial != 0 && (
                    <>
                      <br />
                      {vaga.diasPresencial} dias presenciais
                    </>
                  )}
                </SidebarInfo>
              )}
              {jornada && (
                <SidebarInfo title="Jornada">{jornada.label}</SidebarInfo>
              )}
              {vaga.beneficios?.length > 0 && (
                <SidebarInfo title="Benefícios">
                  {vaga.beneficios.map((beneficio) => (
                    <>
                      {beneficio.tipo} - {beneficio.valor}
                    </>
                  ))}
                </SidebarInfo>
              )}
            </Grid>
          </Grid>
        </>
      </ResponseWrapper>
    </Box>
  );
};

export default VagaPage;
