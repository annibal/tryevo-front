import { TextField } from "@mui/material";

const FormInput = ({ label, name, data, onChange, getValue, ...restProps }) => {
  const fnGetValue =
    typeof getValue === "function" ? getValue : () => data[name];

  const value = fnGetValue();

  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={(evt) => onChange(evt.target.value, name, data)}
      fullWidth
      {...restProps}
    />
  );
};

export default FormInput;
