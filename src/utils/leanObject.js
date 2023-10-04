export default function leanObject(obj) {
  return Object.entries(obj).reduce(
    (all, curr) =>
      curr[1] != null && curr[1] !== ""
        ? {
            ...all,
            [curr[0]]: curr[1],
          }
        : all,
    {}
  );
}