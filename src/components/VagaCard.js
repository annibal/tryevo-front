import {
  Box,
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
import { Link } from "react-router-dom";
import allRoutesData from "../base/routes_data";
import { ACCOUNT_FEATURES, useAuth } from "../base/AuthContext";
import { useEffect, useState } from "react";
import { doCall } from "../providers/baseProvider";

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
  disableFavorite,
}) => {
  const auth = useAuth();
  const [isLoadingSalvarVaga, setIsLoadingSalvarVaga] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const vagaUrl = `/app/${allRoutesData.vagas.path}${_id}/${encodeURIComponent(
    titulo
  )}`;

  useEffect(() => {
    setIsFavorite((auth.userInfo?.vagasSalvas || []).includes(_id))
  }, [auth.userInfo?.vagasSalvas, _id])

  // subheader="September 14, 2016"
  const chips = [
    (qualificacoes || []).map((x) => ({ ...x, type: "q" })),
    (habilidades || []).map((x) => ({ ...x, type: "h" })),
  ].flat();

  let strEmpresa = empresa?.nome;
  if (ocultarEmpresa) strEmpresa = "";

  const handleSalvarVaga = () => {
    setIsLoadingSalvarVaga(true);
    doCall(`/info/salvar-vaga/${_id}`, {
      method: "POST",
    }).then((response) => {
      if (response.error) {
        console.error(response.error)
        // setActionError(response.error?.message || response.error);
      } else {
        auth.setUserInfo({
          ...auth.userInfo,
          vagasSalvas: response.data.vagasSalvas
        });
        setIsFavorite(!isFavorite)
      }
      setIsLoadingSalvarVaga(false);
    });
  };

  if (auth.loading) return "";

  return (
    <Box
      className="vaga-card"
      sx={{ mb: 1, borderBottom: "1px solid #88888888" }}
    >
      <Box className="vaga-card-header" sx={{ mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <Link to={vagaUrl}>
              <Typography variant="h5" color="primary">
                {titulo}
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={2} sx={{ textAlign: "right" }}>
            {isLoadingSalvarVaga ? (<>
              <CircularProgress />
            </>) : (<>
              {auth.features[ACCOUNT_FEATURES.LOGGED] && !disableFavorite && (
                <IconButton
                  aria-label="favorite"
                  color={isFavorite ? "secondary" : "textSecondary"}
                  onClick={handleSalvarVaga}
                >
                  <FavoriteIcon />
                </IconButton>
              )}
            </>)}
          </Grid>
        </Grid>
      </Box>

      <Box className="vaga-card-contract" sx={{ mb: 1 }}>
        {tipoContrato && (
          <Typography variant="span" fontWeight="500" color="textSecondary">
            {tipoContrato}
            {" - "}
          </Typography>
        )}
        {cargo && (
          <Typography variant="span" color="textSecondary">
            {cargo?.nome}
            {" - "}
          </Typography>
        )}
        <Typography variant="span" color="textSecondary">
          {new Date(createdAt).toLocaleDateString()}
        </Typography>
      </Box>

      <Box className="vaga-card-desc" sx={{ mb: 1 }}>
        <Typography>{desc}</Typography>
      </Box>

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

      <Box className="vaga-card-footer" sx={{ mb: 4 }}>
        {strEmpresa && (
          <Typography variant="span" color="textSecondary">
            {strEmpresa}
          </Typography>
        )}
        {(strEmpresa && endereco) ? " - " : "" }
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
