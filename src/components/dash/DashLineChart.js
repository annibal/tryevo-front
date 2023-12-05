import { ResponsiveContainer, XAxis, LineChart, Line, Tooltip } from "recharts";
import formatDate from "../../utils/formatDate";
import useDashTooltip from "./DashTooltip";
import tryReduceNumber from "../../utils/tryReduceNumber";

const DashLineChart = ({ data, yKeys, xKey, colors, valueNames }) => {
  const DashTooltip = useDashTooltip({
    formatLabel: (value) => formatDate(value, "MMMM YYYY"),
    formatValue: (val, idx) => `${tryReduceNumber(val, 2)} ${(valueNames || [])[idx]}`,
  });

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <XAxis
          dataKey={xKey}
          interval="preserveStartEnd"
          tickFormatter={(value) => formatDate(value, "MMM")}
        />
        <Tooltip content={<DashTooltip />} />
        {(yKeys || []).map((yKey, idx) => {
          const fill = (colors || [])[idx % colors.length]
          return (
            <Line type="monotone" key={yKey} dataKey={yKey} stroke={fill} fill={fill} />
          )
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DashLineChart;
