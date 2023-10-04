import { Typography } from "@mui/material";

const MatchDesc = ({ matchDesc, match }) => {
  if (!matchDesc || Object.keys(matchDesc).length === 0) return "";
  return (
    <>
      <Typography sx={{ mb: 0 }}>
        Match Palavras:
        <br />- {matchDesc.palavras.vaga} palavras únicas em vaga.descrição,
        <br />- {matchDesc.palavras.candidato} palavras únicas em
        candidato.resumo,
        <br />- {matchDesc.palavras.comuns} palavras em comum:
        <br />- <b>{matchDesc.palavras.match}</b> match *{" "}
        {matchDesc.palavras.base} base
        <br />
        {matchDesc.palavras.match === null &&
          "vaga não tem descrição, match ignora descrição/resumo"}
      </Typography>
      <Typography sx={{ mb: 0 }}>
        Match Habilidades:
        <br />- {matchDesc.habilidades.vaga} habilidades únicas na vaga,
        <br />- {matchDesc.habilidades.candidato} habilidades únicas no
        candidato,
        <br />- {matchDesc.habilidades.comuns} habilidades em comum:
        <br />- <b>{matchDesc.habilidades.match}</b> match *{" "}
        {matchDesc.habilidades.base} base
        <br />
        {matchDesc.habilidades.match === null &&
          "vaga não tem habilidades, match ignora habilidades"}
      </Typography>
      <Typography sx={{ mb: 0 }}>
        Match Qualificações:
        <br />- {matchDesc.qualificacoes.vaga} qualificacoes únicas na vaga,
        <br />- {matchDesc.qualificacoes.candidato} qualificacoes únicas nas
        experiencias profissionais do candidato,
        <br />- {matchDesc.qualificacoes.comuns} qualificacoes em comum:
        <br />- <b>{matchDesc.qualificacoes.match}</b> match *{" "}
        {matchDesc.qualificacoes.base} base
        <br />
        {matchDesc.qualificacoes.match === null &&
          "vaga não tem qualificações, match ignora qualificações"}
      </Typography>
      <Typography sx={{ mb: 2 }}>
        (
        {[
          matchDesc.palavras.match !== null
            ? `(${matchDesc.palavras.match} * ${matchDesc.palavras.base})`
            : "",
          matchDesc.habilidades.match !== null
            ? `(${matchDesc.habilidades.match} * ${matchDesc.habilidades.base})`
            : "",
          matchDesc.qualificacoes.match !== null
            ? `(${matchDesc.qualificacoes.match} * ${matchDesc.qualificacoes.base})`
            : "",
        ]
          .filter((x) => x)
          .join(" + ")}
        ) /{" "}
        {(matchDesc.palavras.match !== null ? matchDesc.palavras.base : 0) +
          (matchDesc.habilidades.match !== null
            ? matchDesc.habilidades.base
            : 0) +
          (matchDesc.qualificacoes.match !== null
            ? matchDesc.qualificacoes.base
            : 0)}{" "}
        = {match}
      </Typography>
    </>
  );
};

export default MatchDesc;
