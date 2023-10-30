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
import logoFull from "../assets/logo-full.png";

import formatTelefone from "../utils/formatTelefone";
import getYears from "../utils/getYears";
import { Fragment } from "react";
import InfoTable from "./InfoTable";
import formatDate from "../utils/formatDate";
import formatDateRange from "../utils/formatDateRange";

// className="print-section"

const CVSection = ({
  title,
  subtitle,
  withoutDivider,
  className,
  children,
}) => {
  return (
    <Box sx={{ mb: 4 }} className={className}>
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

const FullCV = ({ cv, title }) => {
  if (!cv) return "";

  let nome = cv.nomePreferido;
  if (nome == null || nome.length < 1) {
    nome = cv.nomePrimeiro;
    if (cv.nomeUltimo != null && cv.nomeUltimo.length > 0) {
      nome += " " + cv.nomeUltimo;
    }
  }
  if (nome == null || nome.length < 1) {
    nome = cv.email;
  }
  const optGenero = optionsGenero.find((o) => o.value === cv.genero);
  const anos = getYears(new Date(), new Date(cv.nascimento));
  const optEstadoCivil = optionsEstadoCivil.find(
    (o) => o.value === cv.estadoCivil
  );
  const hasEndereco = cv.endereco != null;
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

      const r = {
        nome: escolaridade.nome,
        nomeCurso: escolaridade.nomeCurso,
        status: status?.label,
        nivel: nivel?.label,
        nivelIdx,
        dataInicio: formatDate(escolaridade.dataInicio),
        dataConclusao: formatDate(escolaridade.dataConclusao),
        dataPrevisaoTermino: formatDate(escolaridade.dataPrevisaoTermino),
      };
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
                  <Typography key={telefone.valor + telefone.tipo}>
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
                  {isNaN(anos) ? "" : `${anos} anos`}
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
              {hasEndereco && (
                <Typography>
                  {endereco.rua}, {endereco.numero}
                  {endereco.complemento && ` - ${endereco.complemento}`}
                  <br />
                  {endereco.bairro}
                  <br />
                  {endereco.cidade} - {endereco.estado}, {endereco.cep}
                </Typography>
              )}
            </InlineIconInfo>
          </Grid>
        </Grid>
      </CVSection>

      <CVSection title="Objetivos">
        {(cv.objetivos || []).length > 0 && (
          <Grid container spacing={2}>
            {(cv.objetivos || []).map((objetivo, idx) => (
              <Grid item xs={12}>
                <ObjetivoBox objetivos={cv.objetivos} idx={idx} />
              </Grid>
            ))}
            <Grid item xs />
          </Grid>
        )}
      </CVSection>

      <CVSection title="Habilidades">
        {(cv.habilidades || []).map((q) => (
          <Chip size="small" label={q.nome} key={q._id} sx={{ mr: 2, mt: 1 }} />
        ))}
      </CVSection>

      <CVSection title="Resumo Profissional" className="print-section">
        <Typography sx={{ whiteSpace: "pre-line" }}>
          {(cv.resumo || "").trim()}
        </Typography>
      </CVSection>

      <CVSection title="Experiencia Profissional">
        {(cv.experienciasProfissionais || [])
          .sort((xpA, xpB) => +new Date(xpB.inicio) - +new Date(xpA.inicio))
          .map((xp, idx) => {
            const endDate = xp.isAtual ? null : xp.fim;
            const formattedRange = formatDateRange(xp.inicio, endDate);

            let strDate = null;
            if (formattedRange) {
              strDate = [
                formattedRange.range,
                ":",
                formattedRange.dates[0],
                "-",
                formattedRange.dates[1],
              ].join(" ");
              if (xp.isAtual) {
                strDate = [
                  formattedRange.range,
                  ":",
                  formattedRange.dates[0],
                  "- Cargo Atual",
                ].join(" ");
              }
            }

            const qualif = (xp.qualificacoes || []).map((q) => (
              <Chip
                label={q.nome}
                key={q._id}
                size="small"
                sx={{ mr: 2, mb: 1 }}
              />
            ));

            const data = [
              {
                name: "Empresa",
                value: (
                  <Typography>
                    <Typography
                      fontWeight={600}
                      component="span"
                      sx={{ display: "inline-block", mr: 1 }}
                    >
                      {xp.empresa}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      component="span"
                      sx={{ display: "inline-block" }}
                    >
                      {strDate}
                    </Typography>
                  </Typography>
                ),
              },
              { name: "Ramo", value: xp.ramoAtividadeEmpresa },
              {
                name: "Cargo",
                value: (
                  <Typography fontWeight={600} color="primary">
                    {xp.cargo?.nome}
                  </Typography>
                ),
              },
              {
                name: "Qualificações",
                value: qualif.length > 0 ? qualif : null,
              },
              {
                name: "Descrição",
                value: xp.descricao ? (
                  <Typography sx={{ whiteSpace: "pre-line" , mb: 2}}>
                    {xp.descricao}
                  </Typography>
                ) : null,
              },
            ];

            return (
              <Box key={idx} sx={{ mb: 2 }}>
                <InfoTable data={data} width="170px" />
              </Box>
            );
          })}
      </CVSection>

      <CVSection title="Idiomas">
        {linguagens.length > 0 && (
          <InfoTable
            width="170px"
            data={linguagens.map((l) => ({
              name: l.idioma,
              value: l.fluencia,
            }))}
          />
        )}
      </CVSection>

      <CVSection title="Formação">
        {escolaridades.map((escolaridade, idx) => {
          const dataEscolaridade = [
            {
              name: "Nível",
              value: (
                <Typography noWrap>
                  <Typography component="span" fontWeight={600}>
                    {escolaridade.nivel}
                  </Typography>
                  <Typography component="span">
                    {" - "}
                    {escolaridade.status}
                  </Typography>
                </Typography>
              ),
            },
            { name: "Instituição", value: escolaridade.nome },
            { name: "Nome do Curso", value: escolaridade.nomeCurso },
            { name: "Ingressou em", value: escolaridade.dataInicio },
            { name: "Concluído em", value: escolaridade.dataConclusao },
            {
              name: "Fim Previsto",
              value: escolaridade.dataPrevisaoTermino,
            },
          ];
          return (
            <Box key={idx} sx={{ mb: 2 }} className="print-section">
              <InfoTable data={dataEscolaridade} width="170px" />
            </Box>
          );
        })}
      </CVSection>

      <CVSection title="Cursos">
        {(cv.cursos || []).map((curso, idx) => {
          const cArr = [
            curso.inicio ? formatDate(curso.inicio, "MMM YYYY") : "",
            curso.isCursando ? "Cursando" : "",
          ].filter((x) => x);

          const dataCurso = [
            {
              name: "Curso",
              value: (
                <Typography>
                  <Typography
                    fontWeight={600}
                    component="span"
                    sx={{ display: "inline-block", mr: 1 }}
                  >
                    {curso.titulo}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    component="span"
                    sx={{ display: "inline-block" }}
                  >
                    {cArr.length > 0 && " - "}
                    {cArr.join(" - ")}
                  </Typography>
                </Typography>
              ),
            },
            {
              name: "Carga Horária",
              value: `${curso.cargaHoraria} horas`,
            },
            {
              name: "Instituição",
              value: curso.nomeEscola,
            },
            {
              name: "Descrição",
              value: (
                <Typography sx={{ whiteSpace: "pre-line" }}>
                  {curso.descricao}
                </Typography>
              ),
            },
          ];

          return (
            <Box key={idx} sx={{ mb: 2 }} className="print-section">
              <InfoTable data={dataCurso} width="170px" />
            </Box>
          );
        })}
      </CVSection>

      <CVSection title="Projetos">
        {(cv.projetosPessoais || []).map((proj, idx) => {
          const dataProj = [
            {
              name: (
                <Typography noWrap fontWeight={600} align="right">
                  {proj.titulo}:
                </Typography>
              ),
              value: (
                <Typography sx={{ whiteSpace: "pre-line" }}>
                  {(proj.descricao || "").trim()}
                </Typography>
              ),
            },
          ];
          return (
            <Box key={idx} sx={{ mb: 2 }} className="print-section">
              <InfoTable data={dataProj} width="170px" />
            </Box>
          );
        })}
      </CVSection>
    </Container>
  );
};

export default FullCV;
