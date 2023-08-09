import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const FormRadio = ({
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

  let value = fnGetValue();
  if (value === undefined) value = "";
  const strId = id || name;

  return (
    <FormControl>
      <FormLabel id={strId}>{label}</FormLabel>
      <RadioGroup
        aria-labelledby={strId}
        name={name}
        value={value}
        onChange={(evt) => onChange(evt.target.value, name, data)}
        {...restProps}
      >
        {options.map((option) => (
          <FormControlLabel {...option} key={option.value} control={<Radio />} />
        ))}
      </RadioGroup>
    </FormControl>

    // <FormControlLabel
    //   control={
    //     <Checkbox
    //       name={name}
    //       checked={!!value}
    //       onChange={(evt) => onChange(evt.target.checked, name, data)}
    //       {...restProps}
    //     />
    //   }
    //   label={label}
    // />
  );
};

export default FormRadio;
