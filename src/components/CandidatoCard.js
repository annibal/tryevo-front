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
import getYears from "../utils/getYears";
import PlaceIcon from "@mui/icons-material/Place";
import BusinessIcon from "@mui/icons-material/Business";
import SchoolIcon from "@mui/icons-material/School";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import { Link } from "react-router-dom";
import allRoutesData from "../base/routes_data";
import { ACCOUNT_FEATURES, useAuth } from "../base/AuthContext";
import { useEffect, useState } from "react";
import { doCall } from "../providers/baseProvider";
import {
  optionsEscolaridade,
  optionsGenero,
  optionsTipoContrato,
} from "../providers/enumProvider";
import InlineIconInfo from "./InlineIconInfo";

// {
//   "_id": "BHV46L",
//   "nomePrimeiro": "Teste",
//   "nomeUltimo": "1B"
//   "nomePreferido": "Teste 1 PF",
//   "genero": "MASCULINO",
//   "nascimento": "2023-09-25T21:48:46.904Z",
//   "pcd": true,
//   "aceitaTrabalharDistancia": 65,
//   "aceitaMudarDistancia": 1,
//   "categoriaCNH": "NONE",
//   "resumo": "...",
//   "estadoCivil": "CASADO",
//   "habilidades": [
//       {
//           "_id": "WNHPEW",
//           "nome": "Comunicação",
//           "__v": 0
//       },
//   ],
//   "objetivos": [
//       {
//           "cargo": {
//               "_id": "5GNQUZ",
//               "nome": "Diretor de programação",
//               "codigo": "2622-25",
//               "valid": true,
//               "__v": 0
//           },
//           "remuneracao": 7500,
//           "tipoContrato": "PJ",
//           "modeloContrato": "HIBRIDO",
//           "jornada": "INTEGRAL"
//       },
//   ],
//   "linguagens": [
//       {
//           "valor": "Portugues",
//           "tipo": "FLUENTE",
//           "isPrimario": false,
//           "_id": "651d8e6bf19d06461936e933"
//       },
//   ],
//   "projetosPessoais": [
//       {
//           "titulo": "TryEvo",
//           "descricao": "Site de Vagas",
//           "_id": "651d8e6bf19d06461936e936"
//       }
//   ],
//   "escolaridades": [
//       {
//           "nome": "Fatec Carapicuiba",
//           "nivel": "SUPERIOR",
//           "status": "COMPLETO",
//           "dataConclusao": "2016-12-04T15:06:00.943Z",
//           "dataInicio": null,
//           "dataPrevisaoTermino": null,
//           "_id": "651d8e6bf19d06461936e937"
//       },
//       {
//           "nome": "Etec Basilides de Godoy",
//           "nivel": "ENSINO_MEDIO",
//           "status": "COMPLETO",
//           "dataConclusao": "2012-12-04T15:06:22.513Z",
//           "dataInicio": null,
//           "dataPrevisaoTermino": null,
//           "_id": "651d8e6bf19d06461936e938"
//       }
//   ],
// "experienciasProfissionais": [
//     {
//         "empresa": "AAA",
//         "ramoAtividadeEmpresa": "AAA",
//         "inicio": "2023-08-01T03:00:00.000Z",
//         "fim": "2023-09-18T03:00:00.000Z",
//         "qualificacoes": [
//             {
//                 "_id": "javascript",
//                 "nome": "Javascript",
//                 "valid": true,
//                 "descricao": "",
//                 "createdAt": "2023-08-09T18:31:03.915Z",
//                 "updatedAt": "2023-08-10T03:43:54.734Z",
//                 "__v": 0
//             },
//         ],
//         "cargo": {
//             "_id": "B0U27G",
//             "nome": "Abacaxicultor",
//             "codigo": "6125-10",
//             "valid": true,
//             "__v": 0
//         },
//         "_id": "651d8e6bf19d06461936e939"
//     },
//     {
//         "empresa": "IQVIA",
//         "ramoAtividadeEmpresa": "Website",
//         "descricao": "Bolota xablau",
//         "inicio": "2020-08-18T03:00:00.000Z",
//         "isAtual": "on",
//         "qualificacoes": [
//             {
//                 "_id": "front-end",
//                 "nome": "Front End",
//                 "valid": true,
//                 "createdAt": "2023-08-10T14:14:23.305Z",
//                 "updatedAt": "2023-08-10T23:09:27.133Z",
//                 "__v": 0
//             },
//         ],
//         "cargo": {
//             "_id": "I2UMXZ",
//             "nome": "Desenvolvedor web (técnico)",
//             "codigo": "3171-05",
//             "valid": true,
//             "__v": 0
//         },
//         "_id": "651d8e6bf19d06461936e93a"
//     }
// ],
//   "cursos": [
//       {
//           "titulo": "aaaa",
//           "descricao": "DESC",
//           "nomeEscola": "AAA",
//           "inicio": "2000-01-01T17:00:18.437Z",
//           "isCursando": true,
//           "cargaHoraria": 400
//       },
//   ],
//   "endereco": {
//       "cep": "05131000",
//       "estado": "São Paulo",
//       "cidade": "SP",
//       "bairro": "Vila Mangalot",
//       "rua": "Nome da Rua",
//       "numero": "1234",
//       "_id": "651d8e6bf19d06461936e92f"
//   },
// }

const CandidatoCard = ({
  pf: {
    nomePrimeiro,
    nomeUltimo,
    nomePreferido,
    genero,
    nascimento,
    pcd,
    habilidades,
    objetivos,
    projetosPessoais,
    escolaridades,
    experienciasProfissionais,
    cursos,
  },
  ...restProps
}) => {
  let nome = nomePreferido;
  if (nome == null || nome.length < 1) {
    nome = nomePrimeiro;
    if (nomeUltimo != null && nomeUltimo.length > 0) {
      nome += " " + nomeUltimo;
    }
  }
  const optGenero = optionsGenero.find((o) => o.value === genero);
  const anos = getYears(new Date(), new Date(nascimento));

  let lastWork = (experienciasProfissionais || []).find((work) => work.isAtual);
  if (!lastWork)
    lastWork = (experienciasProfissionais || []).sort(
      (a, b) => new Date(b.fim) - new Date(a.fim)
    )[0];

  const lastSchool = (() => {
    const bestSchools = optionsEscolaridade
      .map((opt) =>
        (escolaridades || []).filter((school) => school.nivel === opt.value)
      )
      .filter((schools) => schools.length > 0)
      .slice(-1)[0];

    if (!bestSchools) return null;

    const completedSchools = bestSchools
      .filter((school) => school.status === "COMPLETO")
      .sort((a, b) => new Date(b.dataConclusao) - new Date(a.dataConclusao));
    if (completedSchools[0]) return completedSchools[0];

    const ongoingSchools = bestSchools
      .filter((school) => school.status === "CURSANDO")
      .sort(
        (a, b) =>
          new Date(b.dataPrevisaoTermino) - new Date(a.dataPrevisaoTermino)
      );
    if (ongoingSchools[0]) return ongoingSchools[0];

    const droppedSchools = bestSchools
      .filter((school) => school.status === "INCOMPLETO")
      .sort(
        (a, b) =>
          new Date(b.dataPrevisaoTermino) - new Date(a.dataPrevisaoTermino)
      );
    if (droppedSchools[0]) return droppedSchools[0];

    return null;
  })();
  const lastSchoolNivel = optionsEscolaridade.find(
    (o) => o.value === lastSchool?.nivel
  );

  const goal = (objetivos || [])[0];
  const goalContrato = optionsTipoContrato.find(
    (o) => o.value === goal?.tipoContrato
  );

  const countHabilidades = (habilidades || []).length;
  const countProjetosPessoais = (projetosPessoais || []).length;
  const countCursos = (cursos || []).length;

  return (
    <Box
      className="candidato-card"
      sx={{ mb: 1, borderBottom: "1px solid #88888888" }}
      {...restProps}
    >
      <Box className="candidato-card-header" sx={{ mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" color="primary">
              {nome}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box className="candidato-card-info" sx={{ mb: 1 }}>
        {optGenero && (
          <Typography variant="span" fontWeight="500" color="textSecondary">
            {optGenero.label}
            {" - "}
          </Typography>
        )}
        {pcd && (
          <Typography variant="span" color="textSecondary">
            PCD
            {" - "}
          </Typography>
        )}
        <Typography variant="span" color="textSecondary">
          {anos} anos
        </Typography>
      </Box>

      <InlineIconInfo
        className="candidato-card-ultimo-trabalho"
        Icon={BusinessIcon}
        sx={{ mb: 1 }}
      >
        {lastWork ? (
          <>
            {lastWork.empresa}
            {lastWork.cargo?.nome && ` - ${lastWork.cargo.nome}`}
          </>
        ) : (
          "Sem Experiência Profissional"
        )}
      </InlineIconInfo>

      <InlineIconInfo
        className="candidato-card-ultima-escola"
        Icon={SchoolIcon}
        sx={{ mb: 1 }}
      >
        {lastSchool ? (
          <>
            {lastSchool.nome}
            {lastSchoolNivel && ` - ${lastSchoolNivel.label}`}
          </>
        ) : (
          "Sem Escolaridade"
        )}
      </InlineIconInfo>

      <InlineIconInfo
        className="candidato-card-objetivo"
        Icon={TrackChangesIcon}
        sx={{ mb: 1 }}
      >
        {goal ? (
          <>
            {goal.cargo?.nome && `${goal.cargo.nome} - `}
            {goalContrato?.label}
          </>
        ) : (
          "Sem Objetivos"
        )}
      </InlineIconInfo>

      <Box className="candidato-card-footer" sx={{ mb: 4 }}>
        <Typography variant="span" color="textSecondary">
          <b>{countHabilidades}</b> Habilidade
          {countHabilidades === 1 ? "" : "s"}
          {" - "}
        </Typography>
        <Typography variant="span" color="textSecondary">
          <b>{countProjetosPessoais}</b> Projeto
          {countProjetosPessoais === 1 ? "" : "s"}
          {" - "}
        </Typography>
        <Typography variant="span" color="textSecondary">
          <b>{countCursos}</b> Curso{countCursos === 1 ? "" : "s"}
        </Typography>
      </Box>
    </Box>
  );
};

export default CandidatoCard;
