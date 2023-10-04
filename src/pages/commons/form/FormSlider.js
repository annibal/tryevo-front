import { Slider, Box, Typography } from "@mui/material";
import { forwardRef } from "react";

const FormSlider = forwardRef(
  ({ label, name, id, data, onChange, getValue, ...restProps }, ref) => {
    const fnGetValue =
      typeof getValue === "function" ? getValue : () => data[name];
  
    let value = fnGetValue();
    if (value === undefined) value = "";
    const strId = id || name;

    return (
      <Box>
        <Typography id={`${strId}-label`} gutterBottom>
          {label}
        </Typography>
        <Slider
          valueLabelDisplay="auto"
          id={strId}
          label={label}
          name={name}
          value={value}
          onChange={(evt) => onChange(evt.target.value, name, data)}
          fullWidth
          {...restProps}
        />
      </Box>
    );
  }
);

export default FormSlider;
