export default function getPlanColor(tipoPlano) {
  switch (tipoPlano) {
    case "PF":
      return "primary";

    case "PJ":
      return "secondary";

    case "MA":
      return "error";

    default:
      return "inherit";
  }
}
