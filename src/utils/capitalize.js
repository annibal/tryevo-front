export default function capitalize(str) {
  if (!str) return "";
  return str.toLowerCase().replace(/(^\w|\s\w)/g, m => m.toUpperCase());
}