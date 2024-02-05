import { FormControl, OutlinedInput, InputLabel } from "@mui/material";
import { forwardRef, useState } from "react";
import { IMaskInput } from "react-imask";

const getMaskComponent = (mask) =>
  forwardRef(function MaskComponentFn(props, ref) {
    const { onChange: maskOnChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask={mask}
        definitions={{
          "#": /[1-9]/,
          X: /[0-9X]/,
        }}
        inputRef={ref}
        unmask={true}
        onAccept={(unmaskedValue, inputMaskEvt) => {
          maskOnChange({
            maskedValue: inputMaskEvt._value,
            target: {
              name: props.name,
              value: unmaskedValue,
            },
          });
        }}
        overwrite
      />
    );
  });

const MASKS = {
  NONE: getMaskComponent(/.*/),
  CEP: getMaskComponent("00000-000"),
  CPF: getMaskComponent("000.000.000-00"),
  CNPJ: getMaskComponent("00.000.000/0000-00"),
  RG: getMaskComponent("00.000.000-X"),
  CNH: getMaskComponent("0000.00000-00"),
  PASSPORT: getMaskComponent("aa000000"),
  PHONE: getMaskComponent("(00) [0]0000-0000"),
  // http://www.sintegra.gov.br/
  INSCRICAO_ESTADUAL: getMaskComponent("00000000[000000]"),
  CREDIT_CARD: getMaskComponent("0000 0000 0000 0000"),
  CVV: getMaskComponent("000[0]"),

  // {
  //   "AC": "01.292.299/873-08",       "0129229987308",
  //   "AL": "248696289",               "248696289",
  //   "AP": "039098818",               "039098818",
  //   "AM": "37.679.010-5",            "376790105",
  //   "BA": "4301644-08",              "430164408",
  //   "CE": "62423644-7",              "624236447",
  //   "DF": "07671816001-08",          "0767181600108",
  //   "ES": "08376269-8",              "083762698",
  //   "GO": "10.262.226-4",            "102622264",
  //   "MA": "12030036-2",              "120300362",
  //   "MT": "5127406938-0",            "51274069380",
  //   "MS": "28868422-2",              "288684222",
  //   "MG": "548.876.848/7214",        "5488768487214",
  //   "PA": "15-236683-0",             "152366830",
  //   "PB": "80779588-7",              "807795887",
  //   "PR": "433.09969-90",            "4330996990",
  //   "PE": "5308239-77",              "530823977",
  //   "PI": "83765607-9",              "837656079",
  //   "RJ": "87.741.00-1",             "87741001",
  //   "RN": "20.010.084-0",            "200100840",
  //   "RS": "020/7111456",             "0207111456",
  //   "RO": "0298619723251-1",         "02986197232511",
  //   "RR": "24484770-3",              "244847703",
  //   "SP": "091.318.870.338",         "091318870338",
  //   "SC": "959.083.537",             "959083537",
  //   "SE": "67666407-5",              "676664075",
  // "TO_a": "3703153496-8"             "37031534968",
  // "TO_b": "37153496-8"               "371534968",
  // }
};

const FormMaskedInput = ({
  label,
  id,
  name,
  data,
  maskType,
  onChange,
  getValue,
  disabled,
  inputProps,
  ...restProps
}) => {
  const fnGetValue =
    typeof getValue === "function" ? getValue : () => data[name] || "";
  const [writtenValue, setWrittenValue] = useState("");

  const strId = id || name;
  const value = fnGetValue();

  let MaskComp = MASKS[`${maskType}`.toUpperCase()];
  if (!MaskComp) {
    MaskComp = MASKS.NONE;
  }

  return (
    <FormControl fullWidth key={id}>
      <InputLabel id={`${strId}-label`} shrink={!!writtenValue}>
        {label}
      </InputLabel>
      <OutlinedInput
        // labelId={`${strId}-label`}
        id={strId}
        label={label}
        name={name}
        value={value}
        onChange={(evt) => {
          setWrittenValue(evt.maskedValue)
          const val = evt.target.value;
          if (val !== value) {
            onChange(val, name, data);
          }
        }}
        fullWidth
        {...restProps}
        inputComponent={MaskComp}
        inputProps={{
          ...(inputProps || {}),
          disabled,
        }}
      />
    </FormControl>
  );
};

export default FormMaskedInput;
