import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const FormSelect = ({
  label,
  name,
  id,
  data,
  onChange,
  getValue,
  hasDefault = true,
  options,
  ...restProps
}) => {
  const fnGetValue =
    typeof getValue === "function" ? getValue : () => data[name];

  const value = fnGetValue();
  const strId = id || name;

  return (
    <FormControl fullWidth>
      <InputLabel id={`${strId}-label`}>{label}</InputLabel>
      <Select
        labelId={`${strId}-label`}
        id={strId}
        label={label}
        name={name}
        value={value}
        onChange={(evt) => onChange(evt.target.value, name, data)}
        fullWidth
        {...restProps}
      >
        {hasDefault && (
          <MenuItem value="" selected disabled>
            - Selecione -
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FormSelect;
