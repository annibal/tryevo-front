import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Text
} from "recharts";

let ctx;

export const measureText14HelveticaNeue = text => {
  if (!ctx) {
    ctx = document.createElement("canvas").getContext("2d");
    ctx.font = "16px 'Helvetica Neue";
  }

  return ctx.measureText(text).width;
};

const BAR_AXIS_SPACE = 10;

const SimpleBarChart = ({ data, yKey, xKey, fill }) => {
  const [maxValueWidth, maxTextWidth] = useMemo(
    () =>
      data.reduce((acc, cur) => {
        const value = cur[yKey];
        const text = cur[xKey];
        const valueWidth = measureText14HelveticaNeue(value.toLocaleString());
        const textWidth = measureText14HelveticaNeue(text);
        if (valueWidth > acc[0]) {
          acc[0] = valueWidth;
        }
        if (textWidth > acc[1]) {
          acc[1] = textWidth;
        }
        return acc;
      }, [0, 0]),
    [data, yKey, xKey]
  );

  const YAxisLeftTick = ({ y, payload: { value } }) => {
    return (
      <Text x={maxTextWidth * 1.5} y={y} textAnchor="end" verticalAnchor="middle">
        {value}
      </Text>
    );
  };

  return (
    <ResponsiveContainer>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ left: maxTextWidth * 0.875, right: maxValueWidth * 1.1 + BAR_AXIS_SPACE }}
      >
        <XAxis hide axisLine={false} type="number" />
        <YAxis
          yAxisId={0}
          dataKey={xKey}
          type="category"
          axisLine={false}
          tickLine={false}
          tick={YAxisLeftTick}
        />
        <YAxis
          orientation="right"
          yAxisId={1}
          dataKey={yKey}
          type="category"
          axisLine={false}
          tickLine={false}
          tickFormatter={value => value.toLocaleString()}
          mirror
          tick={{
            transform: `translate(${maxValueWidth * 1.2 + BAR_AXIS_SPACE}, 0)`
          }}
        />
        <Bar dataKey={yKey} minPointSize={2} barSize={32}>
          {data.map((d, idx) => {
            return <Cell key={d[xKey]} fill={fill} />;
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SimpleBarChart