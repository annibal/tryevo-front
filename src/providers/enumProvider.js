
export const optionsTipoQuestao = [
  { value: "TEXTO", label: "Texto" },
  { value: "SLIDER", label: "Slider de Valor" },
  { value: "ESCOLHA", label: "Múltipla Escolha" },
]

export const optionsTipoContrato = [
  { value: "CLT", label: "CLT" },
  { value: "PJ", label: "PJ" },
  { value: "ESTAGIO", label: "Estágio" },
  { value: "TEMPORARIO", label: "Temporário" },
  { value: "PRAZO_DETERMINADO", label: "Prazo Determinado" },
  { value: "AUTONOMO", label: "Autônomo" },
  { value: "TRAINEE", label: "Trainee" },
  { value: "JOVEM_APRENDIZ", label: "Jovem Aprendiz" },
];

export const optionsLinks = [
  { value: "WEBSITE", label: "Web Site" },
  { value: "LINKEDIN", label: "LinkedIn" },
  { value: "FACEBOOK", label: "Facebook" },
  { value: "INSTAGRAM", label: "Instagram" },
  { value: "TWITTER", label: "Twitter" },
  { value: "YOUTUBE", label: "Youtube" },
  { value: "OUTRO", label: "Outro" },
]

export const optionsTelefone = [
  { value: "FIXO", label: "Fixo" },
  { value: "CELULAR", label: "Celular" },
  { value: "WHATSAPP", label: "Whatsapp" },
  { value: "TELEGRAM", label: "Telegram" },
  { value: "OUTRO", label: "Outro" },
]

export const optionsLinguagens = [
  { value: "Portugues", label: "Portugues" },
  { value: "Inglês", label: "Inglês" },
  { value: "Espanhol", label: "Espanhol" },
  { value: "Francês", label: "Francês" },
  { value: "Italiano", label: "Italiano" },
  { value: "Alemão", label: "Alemão" },
  { value: "Japonês", label: "Japonês" },
  { value: "Mandarim-Chinês", label: "Mandarim-Chinês" },
  { value: "Russo", label: "Russo" },
]

export const optionsFluenciaLinguagem = [
  { value: "NENHUMA", label: "Nenhuma" },
  { value: "BASICA", label: "Básica" },
  { value: "INTERMEDIARIA", label: "Intermediária" },
  { value: "PROFICIENTE", label: "Proficiente" },
  { value: "FLUENTE", label: "Nativo / Fluente" },
]

export const optionsJornada = [
  // { value: "DIURNO", label: "Diurno" },
  // { value: "VESPERTINO", label: "Vespertino" },
  // { value: "NOTURNO", label: "Noturno" },
  // {
  //   value: "HORARIO_DE_TRABALHO",
  //   label: "Horário de Trabalho",
  // },
  // { value: "ESCALA", label: "Escala" },
  { value: "INTEGRAL", label: "Integral" },
  { value: "MANHA", label: "Manhã" },
  { value: "TARDE", label: "Tarde" },
  { value: "NOITE", label: "Noite" },
  { value: "ESCALA_DE_REVEZAMENTO", label: "Escala de Revezamento" },
]

export const optionsModeloContrato = [
  { value: "PRESENCIAL", label: "Presencial" },
  { value: "HOME_OFFICE", label: "Home Office" },
  { value: "HIBRIDO", label: "Hibrido" },
]

export const optionsEscolaridade = [
  { value: "FUNDAMENTAL", label: "Fundamental" },
  { value: "ENSINO_MEDIO", label: "Ensino Médio" },
  { value: "SUPERIOR", label: "Superior (Faculdade)", hasNomeCurso: true },
  { value: "POS_GRADUADO", label: "Pós Graduado", hasNomeCurso: true },
  { value: "MESTRADO", label: "Mestrado", hasNomeCurso: true },
  { value: "DOUTORADO", label: "Doutorado", hasNomeCurso: true },
  { value: "MBA", label: "MBA", hasNomeCurso: true },
]

export const optionsStatusEscolaridade = [
  { value: "COMPLETO", label: "Completo" },
  { value: "CURSANDO", label: "Cursando" },
  { value: "INCOMPLETO", label: "Incompleto" },
]

export const optionsCategoriaCNH = [
  { value: "NONE", label: "Não Tem" },
  { value: "A", label: "A (moto)" },
  { value: "B", label: "B (carro)" },
  { value: "C", label: "C (caminhão)" },
  { value: "D", label: "D (micro ônibus)" },
  { value: "E", label: "E (articulados)" },
  { value: "AB",label:  "A e B (moto + carro)" },
  { value: "AC",label:  "A e C (moto + caminhão)" },
  { value: "AD",label:  "A e D (moto + micro ônibus)" },
  { value: "AE",label:  "A e E (moto + articulados)" },
]

export const optionsGenero = [
  { value: "NAO_ESPECIFICADO", label: "Não Especificado", labelTiny: "n/a" },
  { value: "MASCULINO", label: "Masculino", labelTiny: "Masc" },
  { value: "FEMININO", label: "Feminino", labelTiny: "Fem" },
  { value: "OUTRO", label: "Outro", labelTiny: "Outro" },
]

export const optionsEstadoCivil = [
  { value: "SOLTEIRO", label: "Solteiro" },
  { value: "CASADO", label: "Casado" },
  { value: "UNIAO_ESTAVEL", label: "União Estável" },
  { value: "VIUVO", label: "Viuvo" },
  { value: "OUTRO", label: "Outro" },
]