import { ResponsiveContainer, XAxis, AreaChart, Area, Tooltip } from "recharts";
import formatDate from "../../utils/formatDate";
import useDashTooltip from "./DashTooltip";
import tryReduceNumber from "../../utils/tryReduceNumber";

const DashAreaChart = ({ data, yKey, xKey, fill, valueName }) => {
  const DashTooltip = useDashTooltip({
    formatLabel: (value) => formatDate(value, "MMMM YYYY"),
    formatValue: (val) => `${tryReduceNumber(val, 2)} ${valueName}`,
  });

  return (
    <ResponsiveContainer>
      <AreaChart width={500} height={200} data={data}>
        <XAxis
          dataKey={xKey}
          interval="preserveStartEnd"
          tickFormatter={(value) => formatDate(value, "MMM")}
        />
        <Tooltip content={<DashTooltip />} />
        <Area type="monotone" dataKey={yKey} fill={fill} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default DashAreaChart;
