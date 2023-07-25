import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const FormDatepicker = ({ label, name, data, onChange, getValue, ...restProps }) => {
  const fnGetValue =
    typeof getValue === "function" ? getValue : () => data[name];

  const value = dayjs(fnGetValue());
  
  return (
    <>
      <DatePicker
        label={label}
        value={value}
        onChange={(value) => onChange(value, name, data)}
        fullWidth
        clearable
        inputVariant="outlined"
        format="DD/MM/YYYY"
        {...restProps}
      />
      <input type="hidden" name={name} value={value.toJSON()} />
    </>
  );
};

export default FormDatepicker;
