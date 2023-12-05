const formatPreco = (num) =>
  num.toLocaleString(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    currency: "BRL",
  });

export default formatPreco