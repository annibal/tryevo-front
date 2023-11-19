import capitalize from "../../../utils/capitalize";

export default function unslugifyFeatureChave(str) {
  return capitalize(str.split("_").join(" "));
}
