import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { Link } from "react-router-dom";
import allRoutesData from "../base/routes_data";
import { ACCOUNT_FEATURES, useAuth } from "../base/AuthContext";
import { useEffect, useState } from "react";
import { doCall } from "../providers/baseProvider";
import { optionsTipoContrato } from "../providers/enumProvider";
import capitalize from "../utils/capitalize";

// {
//   "_id": "UXX5WQ",
//   "createdAt": "2023-09-11T13:53:41.898Z",
//   "titulo": "Gerente de Recursos Humanos",
//   "cargo": {
//       "_id": "3JOOVV",
//       "nome": "Gerente de recursos humanos"
//   },
//   "active": true,
//   "tipoContrato": "PJ",
//   "qualificacoes": [
//       { "_id": "python", "nome": "Python" },
//   ],
//   "habilidades": [
//       { "_id": "WNHPEW", "nome": "Comunicação" },
//   ],
//   "endereco": {
//       "cep": "18072300",
//       "estado": "SP",
//       "cidade": "Sorocaba",
//       "bairro": "Parque São Bento",
//       "rua": "Rua Reverendo Isaar Carlos de Camargo",
//       "numero": "50",
//       "_id": "64ff1be597e2387e24d4b221"
//   },
//   "ocultarEmpresa": false,
//   "desc": "Responsabilidades Principais:\n\nDesenvolvimento de Estratégias de RH: Colaborar com a alta administração para desenvolver e implementar estratégias de recursos humanos que atendam às metas e objetivos da empresa.\n\nRecrutamento e Seleção: Gerenciar",
//   "empresa": {
//       "_id": "E3UDGF",
//       "nome": "Sergius ",
//   }

const VagaCard = ({
  vaga: {
    _id,
    createdAt,
    titulo,
    cargo,
    tipoContrato,
    desc,
    qualificacoes,
    habilidades,
    endereco,
    ocultarEmpresa,
    empresa,
  },
  isPJ = false,
  disableFavorite,
  showCandidatarBtn = true,
  ...restProps
}) => {
  const auth = useAuth();
  const [isLoadingSalvarVaga, setIsLoadingSalvarVaga] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const tituloURL = encodeURIComponent(titulo);
  const path = isPJ ? allRoutesData.pjMinhaVaga.path : allRoutesData.vagas.path;
  const vagaUrl = `/app/${path}${_id}/${tituloURL}`;
  const candidatarURL = `/app/${allRoutesData.pfNovaCandidatura.path}${_id}/${tituloURL}#questoes-pre-candidatura`;

  useEffect(() => {
    setIsFavorite((auth.userInfo?.vagasSalvas || []).includes(_id));
  }, [auth.userInfo?.vagasSalvas, _id]);

  // subheader="September 14, 2016"
  const chips = [
    (qualificacoes || []).map((x) => ({ ...x, type: "q" })),
    (habilidades || []).map((x) => ({ ...x, type: "h" })),
  ].flat();

  let strEmpresa = empresa?.nome;
  if (ocultarEmpresa) strEmpresa = "";

  const strTipoContrato = optionsTipoContrato.find(
    (o) => o.value === tipoContrato
  );

  const handleSalvarVaga = () => {
    setIsLoadingSalvarVaga(true);
    doCall(`/info/salvar-vaga/${_id}`, {
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

  if (auth.loading) return "";

  return (
    <Box
      className="vaga-card"
      sx={{ mb: 1, borderBottom: "1px solid #88888888" }}
      {...restProps}
    >
      <Box className="vaga-card-header" sx={{ mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <Link to={vagaUrl}>
              <Typography variant="h5" color="primary" sx={{ }}>
                {capitalize(titulo)}
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={2} sx={{ textAlign: "right" }}>
            {isLoadingSalvarVaga ? (
              <>
                <CircularProgress />
              </>
            ) : (
              <>
                {auth.features[ACCOUNT_FEATURES.LOGGED] && !disableFavorite && (
                  <IconButton
                    aria-label="favorite"
                    color={isFavorite ? "secondary" : "textSecondary"}
                    onClick={handleSalvarVaga}
                  >
                    <FavoriteIcon />
                  </IconButton>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Box>

      <Box className="vaga-card-footer" sx={{ mb: 1 }}>
        {strEmpresa && (
          <Typography variant="span" color="textSecondary">
            {strEmpresa}
          </Typography>
        )}
        {strEmpresa && endereco ? " - " : ""}
        {endereco && (
          <Typography variant="span" color="textSecondary">
            <PlaceIcon
              color="inherit"
              fontSize="inherit"
              sx={{ verticalAlign: "-2px" }}
            />{" "}
            {endereco.cidade}, {endereco.estado}
          </Typography>
        )}
        {/* <Typography variant="span" color="textSecondary">
          {" - "}
          Match 0%
        </Typography> */}
      </Box>

      <Box className="vaga-card-contract" sx={{ mb: 1 }}>
        {strTipoContrato && (
          <Typography variant="span" fontWeight="500" color="textSecondary">
            {strTipoContrato.label}
            {" - "}
          </Typography>
        )}
        {/* {cargo && (
          <Typography variant="span" color="textSecondary">
            {cargo?.nome}
            {" - "}
          </Typography>
        )} */}
        <Typography variant="span" color="textSecondary">
          {new Date(createdAt).toLocaleDateString()}
        </Typography>
      </Box>

      <Box className="vaga-card-desc" sx={{ mb: 1 }}>
        <Typography>{desc}</Typography>
      </Box>

      <Box className="vaga-card-chips" sx={{ mb: showCandidatarBtn ? 2 : 4 }}>
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

      {showCandidatarBtn && (
        <Box className="vaga-card-desc" sx={{ mb: 4, textAlign: "right" }}>
          <Button
            disableElevation
            variant="outlined"
            color="secondary"
            startIcon={<HandshakeIcon />}
            LinkComponent={Link}
            to={candidatarURL}
            sx={{ width: { sm: "auto", xs: "100%" } }}
          >
            Me Candidatar
          </Button>
        </Box>
      )}
    </Box>
  );

  // return (
  //   <Card>
  //     <CardHeader
  //       action={
  //         auth.features[ACCOUNT_FEATURES.LOGGED] &&
  //         !disableFavorite && (
  //           <IconButton
  //             aria-label="favorite"
  //             color={isFavorite ? "primary" : "default"}
  //           >
  //             <FavoriteIcon />
  //           </IconButton>
  //         )
  //       }
  //       title={<Link to={vagaUrl}>{titulo}</Link>}
  //     />
  //     <CardContent>
  //       <Typography variant="body2" color="text.secondary">
  //         {desc}
  //       </Typography>
  //       {qualificacoes?.length > 1 &&
  //         qualificacoes.map((qualificacao) => (
  //           <Chip label={qualificacao} key={qualificacao} sx={{ mr: 2, mt: 2 }} />
  //         ))}
  //     </CardContent>
  //   </Card>
  // );
};

export default VagaCard;
