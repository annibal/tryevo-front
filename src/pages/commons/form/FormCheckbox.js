import { Checkbox, FormControlLabel } from "@mui/material";

const FormCheckbox = ({ label, name, data, onChange, getValue, ...restProps }) => {
  const fnGetValue =
    typeof getValue === "function" ? getValue : () => data[name];

  const value = fnGetValue();

  return (
    <FormControlLabel
      control={
        <Checkbox
          name={name}
          checked={!!value}
          onChange={(evt) => onChange(evt.target.checked, name, data)}
          {...restProps}
        />
      }
      label={label}
    />
  );
};

export default FormCheckbox;
