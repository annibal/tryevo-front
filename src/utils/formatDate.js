import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import localeData from "dayjs/plugin/localeData";
import duration from "dayjs/plugin/duration";
import 'dayjs/locale/pt-br';
import capitalize from "./capitalize";
dayjs.extend(duration);
dayjs.extend(localeData);
dayjs.extend(localizedFormat);

const formatDate = (date, format = "MMM YYYY") => {
  if (date == null) return null;
  const objDate = dayjs(date);
  if (!objDate.isValid()) return null;
  return capitalize(objDate.locale("pt-BR").format(format));
};

export default formatDate;
