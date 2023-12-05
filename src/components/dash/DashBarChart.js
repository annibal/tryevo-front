import { darken, useMediaQuery } from "@mui/material";
import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Text,
  Rectangle,
  Tooltip,
  CartesianGrid,
} from "recharts";
import tryReduceNumber from "../../utils/tryReduceNumber";
import useDashTooltip from "./DashTooltip";
import capitalize from "../../utils/capitalize";
import { useTheme } from "@emotion/react";

let ctx;

export const measureText = (text) => {
  if (!ctx) {
    ctx = document.createElement("canvas").getContext("2d");
    ctx.font = "16px 'Poppins'";
  }

  return ctx.measureText(text).width;
};

export const centerEllipsis = (text, maxLen) => {
  if (text.length >= maxLen) {
    const charsBefore = Math.floor(maxLen / 2);
    const charsAfter = Math.ceil(maxLen / 2);
    return (
      text.slice(0, charsBefore).trim() +
      "..." +
      text.slice(charsAfter * -1).trim()
    );
  }
  return text;
};

const BAR_AXIS_SPACE = 10;

const DashBarChart = ({
  data,
  yKey,
  xKey,
  fill,
  formatLabel,
  formatValue,
  onClick,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const maxBarLen = isMobile ? 10 : 22;

  const [largestStrValue, largestStrLabel] = useMemo(
    () =>
      data
        .sort((a, b) => b[yKey] - a[yKey])
        .reduce(
          (acc, cur) => {
            const value = cur[yKey];
            const text = centerEllipsis(cur[xKey], maxBarLen);
            const valueWidth = measureText(tryReduceNumber(value, 1));
            if (valueWidth > acc[0]) {
              acc[0] = valueWidth;
            }
            const textWidth = measureText(text);
            if (textWidth > acc[1]) {
              acc[1] = textWidth;
            }
            return acc;
          },
          [measureText("88"), 0]
        ),
    [data, yKey, xKey, maxBarLen]
  );

  const DashTooltip = useDashTooltip({
    formatLabel:
      typeof formatLabel === "function"
        ? formatLabel
        : (value) => capitalize(value),
    formatValue:
      typeof formatValue === "function"
        ? formatValue
        : (val) => tryReduceNumber(val, 2),
  });

  const YAxisLeftTick = ({ y, payload: { value } }) => {
    return (
      <Text x={largestStrLabel} y={y} textAnchor="end" verticalAnchor="middle">
        {centerEllipsis(value, maxBarLen)}
      </Text>
    );
  };

  const isClickable = typeof onClick === "function";
  const handleClick = (payload, index, event) => {
    if (isClickable) {
      onClick(payload, index, event);
    }
  };

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{
          left: largestStrLabel - 60 + BAR_AXIS_SPACE,
          right: largestStrValue + BAR_AXIS_SPACE,
        }}
      >
        <Tooltip content={<DashTooltip />} />
        <XAxis hide axisLine={false} type="number" />
        <YAxis
          yAxisId={0}
          dataKey={xKey}
          type="category"
          interval={0}
          axisLine={false}
          tickLine={false}
          tick={YAxisLeftTick}
        />
        <Bar
          dataKey={yKey}
          minPointSize={2}
          barSize={32}
          onClick={handleClick}
          fill={fill}
        >
          {data.map((d, idx) => {
            return (
              <Cell
                key={d[xKey]}
                fill={fill}
                className={isClickable ? "cursor-pointer" : ""}
              />
            );
          })}
        </Bar>
        <YAxis
          orientation="right"
          yAxisId={1}
          dataKey={yKey}
          type="category"
          interval={0}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => tryReduceNumber(value, 1).padStart(2, "0")}
          mirror
          tick={{
            transform: `translate(${largestStrValue + BAR_AXIS_SPACE}, 0)`,
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DashBarChart;
