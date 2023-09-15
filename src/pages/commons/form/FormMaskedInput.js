import { FormControl, OutlinedInput, InputLabel } from "@mui/material";
import { forwardRef } from "react";
import { IMaskInput } from "react-imask";

const getMaskComponent = (mask) => forwardRef(function MaskComponentFn(props, ref) {
  const { onChange: maskOnChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask={mask}
      definitions={{
        "#": /[1-9]/,
        "X": /[0-9X]/,
      }}
      inputRef={ref}
      unmask={true}
      onAccept={(unmaskedValue) => {
        console.log(ref.current, props)
        // if (value !== unmaskedValue) {
          maskOnChange({ target: { name: props.name, value: unmaskedValue } });
        // }
      }}
      overwrite
    />
  );
});

const MASKS = {
  CEP: getMaskComponent('00000-000'),
  CPF: getMaskComponent('000.000.000-00'),
  RG: getMaskComponent('00.000.000-X'),
  CNH: getMaskComponent('0000.00000-00'),
  PASSPORT: getMaskComponent('aa000000'),
  PHONE: getMaskComponent('(11) [0]0000-0000'),
}

const FormMaskedInput = ({
  label,
  id,
  name,
  data,
  maskType,
  onChange,
  getValue,
  ...restProps
}) => {
  const fnGetValue =
    typeof getValue === "function" ? getValue : () => data[name] || "";

  const strId = id || name;
  const value = fnGetValue();

  const MaskComp = MASKS[`${maskType}`.toUpperCase()];
  if (!MaskComp) {
    throw TypeError(`maskType "${maskType}" does not map to any valid mask element`)
  }

  return (
    <FormControl fullWidth key={id}>
      <InputLabel id={`${strId}-label`} shrink={!!value}>
        {label}
      </InputLabel>
      <OutlinedInput
        labelId={`${strId}-label`}
        id={strId}
        label={label}
        name={name}
        value={value}
        onChange={(evt) => {
          console.log(evt)
          const val = evt.target.value;
          if (val !== value) {
            onChange(val, name, data)
          }
        }}
        fullWidth
        {...restProps}
        inputComponent={MaskComp}
      />
    </FormControl>
  );
};

export default FormMaskedInput;
