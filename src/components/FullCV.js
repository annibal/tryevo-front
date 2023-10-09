import { Box, Button, Chip, Container, Grid, Typography } from "@mui/material";
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
import AdfScannerIcon from '@mui/icons-material/AdfScanner';
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LinkIcon from "@mui/icons-material/Link";

import formatTelefone from "../utils/formatTelefone";
import Section from "./Section";
import getYears from "../utils/getYears";
import { Fragment } from "react";

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

  return (
    <Container sx={{ pb: 25 }}>
      
      {title && (
        <Box sx={{ mt: 4 }}>
          <Section title={title} titleVariant="h6" spacing={2} />
        </Box>
      )}
      <Section spacing={4}>
        <Grid container spacing={2}>
          <Grid item xs>
            <Typography variant="h5">{nome}</Typography>
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
        <Box sx={{ mt: 2 }}>
          <Typography color="textSecondary">
            Gênero: <b>{optGenero?.label}</b>
          </Typography>
          <Typography color="textSecondary">
            Idade: <b>{anos} anos</b>
          </Typography>
          <Typography color="textSecondary">
            Estado Civil: <b>{optEstadoCivil?.label}</b>
          </Typography>
          <Typography color="textSecondary">
            Nacionalidade: <b>{cv.nacionalidade}</b>
          </Typography>
        </Box>
      </Section>

      <Section spacing={4} title="Contato" titleVariant="h5">
        <InlineIconInfo Icon={EmailIcon} sx={{ mb: 2 }} title="Email">
          <Typography>{cv.email}</Typography>
        </InlineIconInfo>

        <InlineIconInfo Icon={LocalPhoneIcon} sx={{ mb: 2 }} title="Telefone">
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

        <InlineIconInfo Icon={LinkIcon} sx={{ mb: 2 }} title="Links">
          {(cv.links || []).map((link) => {
            const tipoLink = optionsLinks.find((x) => x.value === link.tipo);
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
      </Section>

      <Section spacing={4} title="Endereço" titleVariant="h5">
        <Typography>
          {endereco.rua}, {endereco.numero}
          {endereco.complemento && ` - ${endereco.complemento}`}
          <br />
          {endereco.bairro}
          <br />
          {endereco.cidade} - {endereco.estado}, {endereco.cep}
        </Typography>
      </Section>

      <Section spacing={4} title="Objetivos" titleVariant="h5">
        {(cv.objetivos || []).map((objetivo, idx) => {
          const tipoContrato = optionsTipoContrato.find(
            (x) => x.value === objetivo.tipoContrato
          );
          const tipoJornada = optionsJornada.find(
            (x) => x.value === objetivo.jornada
          );
          const tipoModelo = optionsModeloContrato.find(
            (x) => x.value === objetivo.modeloContrato
          );
          const strRemuneracao =
            objetivo?.remuneracao != null
              ? "R$ " +
                (+objetivo.remuneracao).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  currency: "BRL",
                })
              : null;
          const arrObjetivo = [
            objetivo.cargo?.nome,
            tipoContrato?.label,
            tipoModelo?.label,
            tipoJornada?.label,
            strRemuneracao,
          ].filter((x) => x != null && x !== "");
          return (
            <Typography key={idx}>
              <Typography
                align="right"
                component="span"
                color="text.secondary"
                sx={{ display: "inline-block", width: "12px", mr: 1 }}
              >
                {idx + 1}
                {": "}
              </Typography>
              {arrObjetivo.join(" - ")}
            </Typography>
          );
        })}
      </Section>

      <Section spacing={4} title="Escolaridade" titleVariant="h5">
        {(cv.escolaridades || []).map((escolaridade, idx) => {
          const status = optionsStatusEscolaridade.find(
            (o) => o.value === escolaridade.status
          );
          const nivel = optionsEscolaridade.find(
            (o) => o.value === escolaridade.nivel
          );

          return (
            <Box sx={{ mb: 2 }} key={idx}>
              <Typography>
                {escolaridade.nome}
                <Typography
                  color="text.secondary"
                  component="span"
                  fontWeight="bold"
                >
                  {" - "}
                  {nivel?.label}
                </Typography>
                <Typography color="text.secondary" component="span">
                  {" "}
                  {status?.label}
                </Typography>
              </Typography>
              {escolaridade.dataInicio && (
                <Typography color="text.secondary">
                  Ingressou em:{" "}
                  {new Date(escolaridade.dataInicio)
                    .toLocaleDateString()
                    .slice(3)}
                </Typography>
              )}
              {escolaridade.dataConclusao && (
                <Typography color="text.secondary">
                  Concluído em{" "}
                  {new Date(escolaridade.dataConclusao)
                    .toLocaleDateString()
                    .slice(3)}
                </Typography>
              )}
              {escolaridade.dataPrevisaoTermino && (
                <Typography color="text.secondary">
                  Previsão de Término:{" "}
                  {new Date(escolaridade.dataPrevisaoTermino)
                    .toLocaleDateString()
                    .slice(3)}
                </Typography>
              )}
            </Box>
          );
        })}
      </Section>

      <Section spacing={4} title="Idiomas" titleVariant="h5">
        {linguagens.map((l) => (
          <Typography key={l.idioma + l.fluencia}>
            <Typography
              color="text.secondary"
              fontWeight="bold"
              component="span"
            >
              {l.idioma}
            </Typography>{" "}
            - {l.fluencia}
          </Typography>
        ))}
      </Section>

      <Section spacing={4} title="Resumo Profissional" titleVariant="h5">
        <Typography sx={{ whiteSpace: "pre-line" }}>
          {(cv.resumo || "").trim()}
        </Typography>
      </Section>

      <Section spacing={4} title="Experiencia Profissional" titleVariant="h5">
        {(cv.experienciasProfissionais || []).map((xp, idx) => {
          return (
            <Box sx={{ mb: 4 }} key={idx}>
              <Typography color="textSecondary">
                {new Date(xp.inicio).toLocaleDateString().slice(3)}
                {" - "}
                {xp.isAtual
                  ? "Cargo Atual"
                  : new Date(xp.fim).toLocaleDateString().slice(3)}
              </Typography>
              <Typography color="textSecondary">
                <Typography component="span" color="textPrimary">
                  {xp.cargo?.nome}
                </Typography>
                {" na empresa "}
                <Typography
                  component="span"
                  color="textPrimary"
                  fontWeight="bold"
                >
                  {xp.empresa}
                </Typography>
                {" - (ramo de atividade "}
                <Typography component="span" color="textPrimary">
                  {xp.ramoAtividadeEmpresa}
                </Typography>
                {")"}
              </Typography>
              <Grid container spacing={2}>
                <Grid item>
                  <Typography sx={{ mt: 0.875 }} color="textSecondary">
                    Qualificações:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs>
                  {(xp.qualificacoes || []).map((q) => (
                    <Chip
                      label={q.nome}
                      key={q._id}
                      size="small"
                      sx={{ mr: 2, mt: 1 }}
                    />
                  ))}
                </Grid>
              </Grid>
            </Box>
          );
        })}
      </Section>

      <Section spacing={3} title="Habilidades" titleVariant="h5">
        {(cv.habilidades || []).map((q) => (
          <Chip label={q.nome} key={q._id} sx={{ mr: 2, mt: 1 }} />
        ))}
      </Section>

      <Section spacing={4} title="Cursos" titleVariant="h5">
        {(cv.cursos || []).map((curso, idx) => {
          const cArr = [
            curso.inicio
              ? new Date(curso.inicio).toLocaleDateString().slice(3)
              : "",
            `${curso.cargaHoraria} horas`,
            curso.isCursando ? "cursando" : "",
          ].filter((x) => x);

          return (
            <Box sx={{ mb: 4 }} key={idx}>
              <Typography>
                <Typography fontWeight="bold" component="span">
                  {curso.titulo}
                </Typography>
                {" em "}
                <Typography component="span">{curso.nomeEscola}</Typography>
              </Typography>
              <Typography>
                {cArr.map((t, i) => (
                  <Typography key={i} component="span">
                    {i > 0 && " - "}
                    {t}
                  </Typography>
                ))}
              </Typography>
              <Typography color="textSecondary">{curso.descricao}</Typography>
            </Box>
          );
        })}
      </Section>

      <Section spacing={4} title="Projetos" titleVariant="h5" withoutDivider>
        {(cv.projetosPessoais || []).map((proj, idx) => (
          <Fragment key={idx}>
            <Typography fontWeight="bold">{proj.titulo}</Typography>
            <Typography sx={{ whiteSpace: "pre-line" }}>
              {(cv.resumo || "").trim()}
            </Typography>
          </Fragment>
        ))}
      </Section>
    </Container>
  );
};

export default FullCV;
