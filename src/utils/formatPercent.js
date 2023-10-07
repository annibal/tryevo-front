export default function formatPercent(val, decimals = 0) {
  if (val == null || isNaN(val)) return '--%';
  let intVal = +val;
  if (intVal < 1) intVal *= 100;
  return intVal.toFixed(decimals) + '%'
}