import { TextField } from "@mui/material";
import { forwardRef } from "react";

const FormInput = forwardRef(
  ({ label, name, data, onChange, getValue, ...restProps }, ref) => {
    const fnGetValue =
      typeof getValue === "function" ? getValue : () => data[name] || "";

    const value = fnGetValue();

    return (
      <TextField
        ref={ref}
        label={label}
        name={name}
        value={value}
        onChange={(evt) => onChange(evt.target.value, name, data)}
        fullWidth
        InputLabelProps={{ shrink: !!value }}
        {...restProps}
      />
    );
  }
);

export default FormInput;
