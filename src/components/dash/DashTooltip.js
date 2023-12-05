import { Paper, Typography, darken } from "@mui/material";

const useDashTooltip = (params = {}) => {
  const { formatLabel, formatValue, color = "#000" } = params;

  const fnFormatLabel =
    typeof formatLabel === "function" ? formatLabel : (x) => x;
  const fnFormatValue =
    typeof formatValue === "function" ? formatValue : (x) => x;

  const DashTooltip = (params) => {
    const { active, payload, label } = params;

    if (active && payload && payload.length) {
      console.log(label, params);
      return (
        <Paper
          sx={{
            pt: 0.5,
            pb: 0.5,
            px: 1,
            bgcolor: "grey.100",
            border: `1px solid ${color}`,
          }}
          elevation={0}
        >
          <Typography component="div">
            <Typography
              component="div"
              variant="overline"
              fontWeight={600}
              lineHeight={1}
              color="text.secondary"
              sx={{ mb: 0.5 }}
            >
              {fnFormatLabel(label)}
            </Typography>
            {payload.map((row, rowIndex) => {
              const textColor = darken(row.color, 0.20);
              const textContent = fnFormatValue(row.value, rowIndex);
              return (
                <Typography component="div" color={textColor} fontWeight={500}>
                  {textContent}
                </Typography>
              );
            })}
          </Typography>
        </Paper>
      );
    }

    return null;
  };

  return DashTooltip;
};

export default useDashTooltip;
