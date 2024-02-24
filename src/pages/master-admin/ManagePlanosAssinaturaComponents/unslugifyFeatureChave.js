import capitalize from "../../../utils/capitalize";

export default function unslugifyFeatureChave(str) {
  return capitalize(str.split("_").join(" "))
    .replace("Ver Cv Full", "Ver Currículo Completo do Candidato")
    .replace("Grafico", "Gráfico")
    .replace("Regiao", "Região")
    .replace("Evolucao", "Evolução")
    .replace("Salario", "Salário")
    .replace("Competencias", "Competências")
    .replace("Contratacoes", "Contratações")
    .replace("Limite Candidaturas", "Limite de Candidaturas")
    .replace("Ver Dados Candidato", "Ver os Dados do Candidato")
    ;
}
