import { Slider, Box, Typography, Grid } from "@mui/material";
import { forwardRef, useEffect } from "react";

const FormSlider = forwardRef(
  ({ label, name, id, data, onChange, getValue, min, max, defaultValue, ...restProps }, ref) => {
    const fnGetValue =
      typeof getValue === "function" ? getValue : () => data[name];
  
    let value = fnGetValue();
    if (value === undefined) value = "";
    const strId = id || name;

    let defVal = 0;
    if (defaultValue != null && !isNaN(defaultValue)) {
      defVal = +defaultValue;
    }
    if (min != null && !isNaN(min)) {
      defVal = Math.max(defVal, +min);
    }
    if (max != null && !isNaN(max)) {
      defVal = Math.min(defVal, +max);
    }

    useEffect(() => {
      if ((value == null || value === "") && defVal !== value) {
        onChange(defVal, name, data)
      }
    }, [defVal, value])

    return (
      <Box>
        <Grid container spacing={2}>
          <Grid item xs>
            <Typography id={`${strId}-label`} gutterBottom>
              {label}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="textSecondary" gutterBottom>
              {value}
            </Typography>
          </Grid>
        </Grid>
        <Slider
          valueLabelDisplay="auto"
          id={strId}
          label={label}
          name={name}
          value={value}
          min={min}
          max={max}
          defaultValue={defVal}
          onChange={(evt) => onChange(evt.target.value, name, data)}
          {...restProps}
        />
      </Box>
    );
  }
);

export default FormSlider;
