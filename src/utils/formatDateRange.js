import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import localeData from "dayjs/plugin/localeData";
import duration from "dayjs/plugin/duration";
import 'dayjs/locale/pt-br';
import capitalize from "./capitalize";
dayjs.extend(duration);
dayjs.extend(localeData);
dayjs.extend(localizedFormat);

const formatDateRange = (from, to) => {
  const isDateToNow = to == null;

  const dtFrom = dayjs(from)
  const dtTo = dayjs(to == null ? new Date() : to)
  if (!dtFrom.isValid() || !dtTo.isValid()) return null;

  const strYearFrom = dtFrom.format("YYYY")
  const strYearTo = dtTo.format("YYYY")
  const strMonthFrom = capitalize(dtFrom.locale("pt-BR").format("MMM"))
  const strMonthTo = capitalize(dtTo.locale("pt-BR").format("MMM"))

  const hasMonths = strMonthFrom !== strMonthTo;
  
  const objDiff = dayjs.duration(dtTo.diff(dtFrom));
  const years = Math.abs(objDiff.get("years"));
  const months = Math.abs(objDiff.get("months"));

  let range = []
  if (years > 0) range.push(`${years} ${years === 1 ? "ano" : "anos"}`)
  if (hasMonths) range.push(`${months} ${months === 1 ? "mês" : "meses"}`)
  // if (days > 0) range.push(`${days} ${days === 1 ? "dia" : "dias"}`)
  const strRange = range.join(" e ")

  let strFrom = strMonthFrom;
  if (isDateToNow || years > 0) strFrom += " " + strYearFrom;

  const strTo = `${strMonthTo} ${strYearTo}`;

  return { dates: [strFrom, strTo], range: strRange }
};

export default formatDateRange;
