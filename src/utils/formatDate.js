import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import localeData from "dayjs/plugin/localeData";
import duration from "dayjs/plugin/duration";
import "dayjs/locale/pt-br";
import capitalize from "./capitalize";
dayjs.extend(duration);
dayjs.extend(localeData);
dayjs.extend(localizedFormat);

const formatDate = (date, format = "MMM YYYY", caps = true) => {
  if (date == null) return null;
  const objDate = dayjs(date);
  if (!objDate.isValid()) return null;
  const r = objDate.locale("pt-BR").format(format);
  if (caps) return capitalize(r);
  return r
};

export default formatDate;
