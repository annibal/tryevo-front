import {
  Box,
  Button,
  Divider,
  Chip,
  Container,
  Grid,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import {
  optionsEstadoCivil,
  optionsFluenciaLinguagem,
  optionsGenero,
  optionsJornada,
  optionsLinguagens,
  optionsLinks,
  optionsModeloContrato,
  optionsTelefone,
  optionsTipoContrato,
  optionsEscolaridade,
  optionsStatusEscolaridade,
} from "../providers/enumProvider";
import InlineIconInfo from "./InlineIconInfo";
import AdfScannerIcon from "@mui/icons-material/AdfScanner";
import PlaceIcon from "@mui/icons-material/Place";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LinkIcon from "@mui/icons-material/Link";
import PersonIcon from "@mui/icons-material/Person";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
// import Looks1Icon from "@mui/icons-material/Looks1";
// import Looks2Icon from "@mui/icons-material/Looks2";
// import Looks3Icon from "@mui/icons-material/Looks3";
// import Looks4Icon from "@mui/icons-material/Looks4";
import logoFull from "../assets/logo-full.png";

import formatTelefone from "../utils/formatTelefone";
import Section from "./Section";
import getYears from "../utils/getYears";
import { Fragment } from "react";

// className="print-section"

const CVSection = ({ title, subtitle, withoutDivider, children }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5">{title}</Typography>
        {subtitle && <Typography variant="body2">{subtitle}</Typography>}
        {!withoutDivider && <Divider sx={{ mt: 0 }} />}
      </Box>

      {children}
    </Box>
  );
};

const ObjetivoBox = ({ objetivos, idx }) => {
  if (objetivos == null) return "";
  const objetivo = objetivos[idx];
  if (!objetivo) return "";

  const tipoContrato = optionsTipoContrato.find(
    (x) => x.value === objetivo.tipoContrato
  );
  const tipoJornada = optionsJornada.find((x) => x.value === objetivo.jornada);
  const tipoModelo = optionsModeloContrato.find(
    (x) => x.value === objetivo.modeloContrato
  );
  const strRemuneracao =
    objetivo.remuneracao != null
      ? "Pretensão: R$ " +
        (+objetivo.remuneracao).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          currency: "BRL",
        })
      : null;
  //

  const hasCargoNome =
    objetivo.cargo?.nome != null && objetivo.cargo?.nome !== "";
  const strTitle = hasCargoNome ? objetivo.cargo.nome : `Objetivo ${idx + 1}`;
  const Title = () => (
    <Typography color="primary" component="span" fontWeight={600}>
      {strTitle}
    </Typography>
  );

  const arrObjetivo = [
    tipoContrato?.label,
    tipoModelo?.label,
    tipoJornada?.label,
  ].filter((x) => x != null && x !== "");

  const IdxIcon = () => <Typography component="span">{idx + 1}:</Typography>;

  return (
    <InlineIconInfo Icon={IdxIcon} title={<Title />} sx={{ mr: 2 }}>
      {strRemuneracao != null && <Typography>{strRemuneracao}</Typography>}
      {arrObjetivo.length > 0 && (
        <Typography color="text.secondary">
          {arrObjetivo.join(" - ")}
        </Typography>
      )}
    </InlineIconInfo>
  );

  // <Typography
  //   align="right"
  //   component="span"
  //   color="text.secondary"
  //   sx={{ display: "inline-block", width: "12px", mr: 1 }}
  // >
  //   {idx + 1}
  //   {": "}
  // </Typography>
};

const InfoTable = ({ data, width }) => (
  <Table size="small">
    <TableBody>
      {data.map((item, idx) => {
        if (item.value == null) return "";
        return (
          <TableRow key={idx} sx={{ verticalAlign: "top" }}>
            <TableCell sx={{ border: "none", width, py: 0 }}>
              <Typography noWrap color="text.secondary" align="right">
                {item.name}:
              </Typography>
            </TableCell>
            <TableCell sx={{ border: "none", py: 0 }}>
              <Typography>{item.value}</Typography>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
);

const FullCV = ({ cv, title }) => {
  if (!cv) return "";

  let nome = cv.nomePreferido;
  if (nome == null || nome.length < 1) {
    nome = cv.nomePrimeiro;
    if (cv.nomeUltimo != null && cv.nomeUltimo.length > 0) {
      nome += " " + cv.nomeUltimo;
    }
  }
  const optGenero = optionsGenero.find((o) => o.value === cv.genero);
  const anos = getYears(new Date(), new Date(cv.nascimento));
  const optEstadoCivil = optionsEstadoCivil.find(
    (o) => o.value === cv.estadoCivil
  );
  const endereco = cv.endereco || {};
  const linguagens = (cv.linguagens || []).map((l) => {
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

  const escolaridades = (cv.escolaridades || [])
    .map((escolaridade) => {
      const status = optionsStatusEscolaridade.find(
        (o) => o.value === escolaridade.status
      );
      const nivelIdx = optionsEscolaridade.findIndex(
        (o) => o.value === escolaridade.nivel
      );
      const nivel = optionsEscolaridade[nivelIdx];

      const dataInicio = escolaridade.dataInicio
        ? new Date(escolaridade.dataInicio).toLocaleDateString().slice(3)
        : null;
      const dataConclusao = escolaridade.dataConclusao
        ? new Date(escolaridade.dataConclusao).toLocaleDateString().slice(3)
        : null;
      const dataPrevisaoTermino = escolaridade.dataPrevisaoTermino
        ? new Date(escolaridade.dataPrevisaoTermino)
            .toLocaleDateString()
            .slice(3)
        : null;

      const r = {
        nome: escolaridade.nome,
        nomeCurso: escolaridade.nomeCurso,
        status: status?.label,
        nivel: nivel?.label,
        nivelIdx,
        dataInicio,
        dataConclusao,
        dataPrevisaoTermino,
      };
      console.log(r);
      return r;
    })
    .sort((a, b) => a.nivelIdx - b.nivelIdx);

  return (
    <Container sx={{ pb: 15 }}>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs>
            <img src={logoFull} alt="tryEvo" style={{ height: 45 }} />
          </Grid>
          <Grid item>
            <div className="print-hidden">
              <Button
                disableElevation
                variant="text"
                onClick={() => window.print()}
                endIcon={<AdfScannerIcon />}
              >
                Salvar como PDF
              </Button>
            </div>
          </Grid>
        </Grid>
      </Box>

      <CVSection title={`${nome}${title ? ` - ${title}` : ""}`}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InlineIconInfo Icon={EmailIcon} sx={{ mb: 2 }} title="Email">
              <Typography>{cv.email}</Typography>
            </InlineIconInfo>

            <InlineIconInfo
              Icon={LocalPhoneIcon}
              sx={{ mb: 2 }}
              title="Telefone"
            >
              {(cv.telefones || []).map((telefone) => {
                const tipoTelefone = optionsTelefone.find(
                  (x) => x.value === telefone.tipo
                );
                return (
                  <Typography key={telefone.valor}>
                    {formatTelefone(telefone.valor)}
                    {tipoTelefone && (
                      <Typography color="textSecondary" component="span">
                        {" - "}
                        {tipoTelefone.label}
                      </Typography>
                    )}
                  </Typography>
                );
              })}
            </InlineIconInfo>

            <InlineIconInfo Icon={LinkIcon} title="Links">
              {(cv.links || []).map((link) => {
                const tipoLink = optionsLinks.find(
                  (x) => x.value === link.tipo
                );
                return (
                  <a
                    href={link.valor}
                    key={link.valor}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Typography color="primary">
                      {link.valor}
                      {tipoLink && (
                        <Typography color="textSecondary" component="span">
                          {" - "}
                          {tipoLink.label}
                        </Typography>
                      )}
                    </Typography>
                  </a>
                );
              })}
            </InlineIconInfo>
          </Grid>

          <Grid item xs={6}>
            <InlineIconInfo Icon={PersonIcon} sx={{ mb: 2 }} title="Dados">
              <Typography>
                <Typography component="span">Gênero:&nbsp;</Typography>
                <Typography component="span" fontWeight={600}>
                  {optGenero?.label}
                </Typography>
              </Typography>
              <Typography>
                <Typography component="span">Idade:&nbsp;</Typography>
                <Typography component="span" fontWeight={600}>
                  {anos} anos
                </Typography>
              </Typography>
              <Typography>
                <Typography component="span">Estado Civil:&nbsp;</Typography>
                <Typography component="span" fontWeight={600}>
                  {optEstadoCivil?.label}
                </Typography>
              </Typography>
              <Typography>
                <Typography component="span">Nacionalidade:&nbsp;</Typography>
                <Typography component="span" fontWeight={600}>
                  {cv.nacionalidade}
                </Typography>
              </Typography>
            </InlineIconInfo>

            <InlineIconInfo Icon={PlaceIcon} title="Endereço">
              <Typography>
                {endereco.rua}, {endereco.numero}
                {endereco.complemento && ` - ${endereco.complemento}`}
                <br />
                {endereco.bairro}
                <br />
                {endereco.cidade} - {endereco.estado}, {endereco.cep}
              </Typography>
            </InlineIconInfo>
          </Grid>
        </Grid>
      </CVSection>

      <CVSection title="Objetivos">
        <Grid container spacing={2}>
          {cv.objetivos.map((objetivo, idx) => (
            <Grid item xs={12}>
              <ObjetivoBox objetivos={cv.objetivos} idx={idx} />
            </Grid>
          ))}
          <Grid item xs />
        </Grid>
      </CVSection>

      <CVSection title="Resumo Profissional">
        <Typography sx={{ whiteSpace: "pre-line" }}>
          {(cv.resumo || "").trim()}
        </Typography>
      </CVSection>

      <CVSection title="Idiomas">
        <InfoTable
          width="200px"
          data={linguagens.map((l) => ({
            name: l.idioma,
            value: l.fluencia,
          }))}
        />
      </CVSection>

      <CVSection title="Experiencia Profissional">
        <Table size="small">
          <TableBody>
            {(cv.experienciasProfissionais || []).map((xp, idx) => {
              return (
                <Fragment key={idx}>
                  <TableRow sx={{ verticalAlign: "top" }}>
                    <TableCell sx={{ py: 0, border: "none" }}>
                      <Typography color="text.secondary" noWrap>
                        Empresa:
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 0, border: "none" }}>
                      <Typography fontWeight={600} noWrap>
                        {xp.empresa}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 0, border: "none", width: "100%" }}>
                      <Typography>
                        {new Date(xp.inicio).toLocaleDateString().slice(3)}
                        {" - "}
                        {xp.isAtual
                          ? "Cargo Atual"
                          : new Date(xp.fim).toLocaleDateString().slice(3)}
                      </Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ verticalAlign: "top" }}>
                    <TableCell sx={{ py: 0, border: "none" }}>
                      <Typography color="text.secondary" noWrap>
                        Cargo:
                      </Typography>
                    </TableCell>
                    <TableCell colSpan={2} sx={{ py: 0, border: "none" }}>
                      <Typography noWrap>{xp.cargo?.nome}</Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ verticalAlign: "top" }}>
                    <TableCell sx={{ pt: 0, pb: 4, border: "none" }}>
                      <Typography color="text.secondary" noWrap>
                        Qualificações:
                      </Typography>
                    </TableCell>
                    <TableCell
                      colSpan={2}
                      sx={{ pt: 0, pb: 4, border: "none" }}
                    >
                      {(xp.qualificacoes || []).map((q) => (
                        <Chip
                          label={q.nome}
                          key={q._id}
                          size="small"
                          sx={{ mr: 2, mt: 1 }}
                        />
                      ))}
                    </TableCell>
                  </TableRow>
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </CVSection>

      <CVSection title="Habilidades">
        {(cv.habilidades || []).map((q) => (
          <Chip label={q.nome} key={q._id} sx={{ mr: 2, mt: 1 }} />
        ))}
      </CVSection>

      <CVSection title="Formação">
        <Table size="small">
          <TableBody>
            {escolaridades.map((escolaridade, idx) => {
              const isLast = idx === escolaridades.length - 1;
              const cellStyle = isLast
                ? { pb: 2, border: "none" }
                : { pb: 2, borderBottomColor: "rgba(224, 224, 224, 0.5)" };
              const dataEscolaridade = [
                { name: "Instituição", value: escolaridade.nome },
                { name: "Nome do Curso", value: escolaridade.nomeCurso },
                { name: "Ingressou em", value: escolaridade.dataInicio },
                { name: "Concluído em", value: escolaridade.dataConclusao },
                {
                  name: "Previsão de Término",
                  value: escolaridade.dataPrevisaoTermino,
                },
              ];
              return (
                <TableRow key={idx} sx={{ verticalAlign: "top" }}>
                  <TableCell sx={cellStyle}>
                    <Typography noWrap fontWeight={600}>
                      {escolaridade.nivel}
                    </Typography>
                    <Typography color="text.secondary">
                      {" "}
                      {escolaridade.status}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ ...cellStyle, width: "100%" }}>
                    <InfoTable data={dataEscolaridade} width="230px" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CVSection>

      <CVSection title="Cursos">
        <Table size="small">
          <TableBody>
            {(cv.cursos || []).map((curso, idx) => {
              const cArr = [
                curso.inicio
                  ? new Date(curso.inicio).toLocaleDateString().slice(3)
                  : "",
                curso.isCursando ? "cursando" : "",
              ].filter((x) => x);

              return (
                <Fragment key={idx}>
                  <TableRow sx={{ verticalAlign: "top" }}>
                    <TableCell sx={{ py: 0, border: "none" }}>
                      <Typography color="text.secondary" noWrap>
                        Curso:
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 0, border: "none" }}>
                      <Typography fontWeight={600} noWrap>
                        {curso.titulo}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 0, border: "none", width: "100%" }}>
                      <Typography color="text.secondary">
                        {cArr.map((t, i) => (
                          <Typography key={i} component="span">
                            {i > 0 && " - "}
                            {t}
                          </Typography>
                        ))}
                      </Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ verticalAlign: "top" }}>
                    <TableCell sx={{ py: 0, border: "none" }}>
                      <Typography color="text.secondary" noWrap>
                        Carga Horária:
                      </Typography>
                    </TableCell>
                    <TableCell colSpan={2} sx={{ py: 0, border: "none" }}>
                      <Typography noWrap>{curso.cargaHoraria} Horas</Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ verticalAlign: "top" }}>
                    <TableCell sx={{ py: 0, border: "none" }}>
                      <Typography color="text.secondary" noWrap>
                        Instituição:
                      </Typography>
                    </TableCell>
                    <TableCell colSpan={2} sx={{ py: 0, border: "none" }}>
                      <Typography noWrap>{curso.nomeEscola}</Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ verticalAlign: "top" }}>
                    <TableCell sx={{ pt: 0, pb: 4, border: "none" }}>
                      <Typography color="text.secondary" noWrap>
                        Descrição:
                      </Typography>
                    </TableCell>
                    <TableCell
                      colSpan={2}
                      sx={{ pt: 0, pb: 4, border: "none" }}
                    >
                      <Typography sx={{ whiteSpace: "pre-line" }}>
                        {curso.descricao}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </CVSection>

      <CVSection title="Projetos">
        <Table size="small">
          <TableBody>
            {(cv.projetosPessoais || []).map((proj, idx) => (
              <TableRow key={idx} sx={{ verticalAlign: "top" }}>
                <TableCell sx={{ pl: 0, border: "none" }}>
                  <Typography noWrap fontWeight={600}>
                    {proj.titulo}:
                  </Typography>
                </TableCell>
                <TableCell sx={{ pr: 0, border: "none", width: "100%" }}>
                  <Typography sx={{ whiteSpace: "pre-line" }}>
                    {(cv.resumo || "").trim()}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CVSection>
    </Container>
  );
};

export default FullCV;
