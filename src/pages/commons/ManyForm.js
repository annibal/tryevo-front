import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Grid, IconButton } from "@mui/material";
import { Fragment } from "react";
import FormInput from "./form/FormInput";
import FormSelect from "./form/FormSelect";
import FormMaskedInput from './form/FormMaskedInput';

const ManyForm = ({
  data,
  onChange,
  label,
  labelAdd,
  name,
  type = "text",
  tipoLabel,
  options,
  valueOptions,
  typeIsText = false,
  typeType,
  invertOrder = false,
  valorName = 'valor',
  tipoName = 'tipo',
  valorMask,
  tipoMask,
  valorRequired = false,
  tipoRequired = false,
}) => {
  const items = data[name] || [];

  const removeItem = (itemIndex) => {
    const newItems = items.filter((i, idx) => idx !== itemIndex);
    onChange(newItems, name, data);
  };

  const addItem = () => {
    const newItems = [...items, { [valorName]: "", [tipoName]: "" }];
    onChange(newItems, name, data);
  };

  const updateItem = (itemVal, itemName, itemIndex) => {
    const newItems = items.map((item, idx) =>
      idx === itemIndex ? { ...item, [itemName]: itemVal } : item
    );
    onChange(newItems, name, data);
  };

  let strBtnAddLabel = `Adicionar ${label}`;
  if (labelAdd) strBtnAddLabel = labelAdd;

  return (
    <div className="many-form">
      <Grid container spacing={2}>
        {(items || []).map((item, idx) => {
          const strValorName = `${name}[${idx}][${valorName}]`;
          const strTipoName = `${name}[${idx}][${tipoName}]`;
          const strIdx = `${idx + 1}`;
          const strTipoLabel = tipoLabel ? tipoLabel : `Tipo de ${label}`;

          return (
            <Grid item xs={12} container spacing={2} key={idx}>
              <Grid item sm={7} xs={12} order={invertOrder ? 2 : 1}>
                {valueOptions ? (
                  <FormSelect
                    label={`${label} ${strIdx}`}
                    name={strValorName}
                    getValue={() => item[valorName]}
                    data={item}
                    onChange={(value) => updateItem(value, valorName, idx)}
                    id={strValorName}
                    options={valueOptions}
                    required={valorRequired}
                  />
                ) : (
                  <FormMaskedInput
                    label={`${label} ${strIdx}`}
                    name={strValorName}
                    maskType={valorMask}
                    getValue={() => item[valorName]}
                    data={item}
                    onChange={(value) => updateItem(value, valorName, idx)}
                    type={type}
                    required={valorRequired}
                  />
                )}
              </Grid>
              <Grid item sm={4} xs={10} order={invertOrder ? 1 : 2}>
                {typeIsText ? (
                  <FormMaskedInput
                    label={strTipoLabel}
                    name={strTipoName}
                    maskType={tipoMask}
                    getValue={() => item[tipoName]}
                    data={item}
                    onChange={(value) => updateItem(value, tipoName, idx)}
                    type={typeType}
                    required={tipoRequired}
                  />
                ) : (
                  <FormSelect
                    label={strTipoLabel}
                    name={strTipoName}
                    getValue={() => item[tipoName]}
                    data={item}
                    onChange={(value) => updateItem(value, tipoName, idx)}
                    id={strTipoName}
                    options={options}
                    required={tipoRequired}
                  />
                )}
              </Grid>
              <Grid item sm={1} xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} order={3}>
                <IconButton onClick={() => removeItem(idx)} tabIndex={-1}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
              <Grid item xs={12} sx={{ mb: 2, display: { xs: 'block', sm: 'none' } }} order={4}/>
            </Grid>
          );
        })}
        <Grid item xs={12}>
          <Button variant="outlined" onClick={addItem} startIcon={<AddIcon />}>
            {strBtnAddLabel}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ManyForm;
