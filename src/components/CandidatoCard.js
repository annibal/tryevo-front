import {
  Box,
  Grid,
  Typography,
} from "@mui/material";
import getYears from "../utils/getYears";
import BusinessIcon from "@mui/icons-material/Business";
import SchoolIcon from "@mui/icons-material/School";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import {
  optionsEscolaridade,
  optionsGenero,
  optionsTipoContrato,
} from "../providers/enumProvider";
import InlineIconInfo from "./InlineIconInfo";

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
