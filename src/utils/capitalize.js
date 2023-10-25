export default function capitalize(str) {
  return str.toLowerCase().replace(/(^\w|\s\w)/g, m => m.toUpperCase());
}