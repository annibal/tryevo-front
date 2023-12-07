import { ResponsiveContainer, XAxis, AreaChart, Area, Tooltip } from "recharts";
import formatDate from "../../utils/formatDate";
import useDashTooltip from "./DashTooltip";
import tryReduceNumber from "../../utils/tryReduceNumber";

const DashAreaChart = ({
  data,
  yKey,
  xKey,
  fill,
  formatLabel,
  formatValue,
}) => {
  const DashTooltip = useDashTooltip({
    formatLabel:
      typeof formatLabel === "function"
        ? formatLabel
        : (value) => formatDate(value, "MMMM YYYY"),
    formatValue:
      typeof formatValue === "function"
        ? formatValue
        : (val) => tryReduceNumber(val, 2),
  });

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data}>
        <XAxis
          dataKey={xKey}
          interval="preserveStartEnd"
          tickFormatter={(value) => formatDate(value, "MMM")}
        />
        <Tooltip content={<DashTooltip />} />
        <Area type="monotone" dataKey={yKey} fill={fill} stroke={fill} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default DashAreaChart;
