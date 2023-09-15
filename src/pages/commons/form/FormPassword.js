import { useState } from "react";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";

const FormPassword = ({
  label,
  name,
  id,
  data,
  onChange,
  getValue,
  ...restProps
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const fnGetValue =
    typeof getValue === "function" ? getValue : () => data[name];

  let value = fnGetValue();
  if (value === undefined) value = "";
  const strId = id || name;

  return (
    <FormControl variant="outlined" fullWidth {...restProps}>
      <InputLabel htmlFor={strId} shrink={!!value}>
        {label}
      </InputLabel>
      <OutlinedInput
        id={strId}
        type={showPassword ? "text" : "password"}
        label={label}
        name={name}
        value={value}
        onChange={(evt) => onChange(evt.target.value, name, data)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={(evt) => {
                evt.preventDefault();
              }}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default FormPassword;
