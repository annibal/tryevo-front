import { Add, Delete } from "@mui/icons-material";
import { Button, Grid, IconButton } from "@mui/material";
import { Fragment } from "react";
import FormInput from "./form/FormInput";
import FormSelect from "./form/FormSelect";

const ManyForm = ({
  data,
  onChange,
  label,
  name,
  type = "text",
  tipoLabel,
  options,
  valueOptions,
}) => {
  const items = data[name] || [];

  const removeItem = (itemIndex) => {
    const newItems = items.filter((i, idx) => idx !== itemIndex);
    onChange(newItems, name, data);
  };

  const addItem = () => {
    const newItems = [...items, { valor: "", tipo: "" }];
    onChange(newItems, name, data);
  };

  const updateItem = (itemVal, itemName, itemIndex) => {
    const newItems = items.map((item, idx) =>
      idx === itemIndex ? { ...item, [itemName]: itemVal } : item
    );
    onChange(newItems, name, data);
  };

  return (
    <div className="many-form">
      <Grid container spacing={2}>
        {(items || []).map((item, idx) => {
          const valorName = `${name}[${idx}][valor]`;
          const tipoName = `${name}[${idx}][tipo]`;
          const strIdx = `${idx + 1}`;
          const strTipoLabel = tipoLabel ? tipoLabel : `Tipo de ${label}`;

          return (
            <Fragment key={idx}>
              <Grid item sm={7} xs={12}>
                {valueOptions ? (
                  <FormSelect
                    label={`${label} ${strIdx}`}
                    name={valorName}
                    getValue={() => item.valor}
                    data={item}
                    onChange={(value) => updateItem(value, "valor", idx)}
                    id={valorName}
                    options={valueOptions}
                  />
                ) : (
                  <FormInput
                    label={`${label} ${strIdx}`}
                    name={valorName}
                    getValue={() => item.valor}
                    data={item}
                    onChange={(value) => updateItem(value, "valor", idx)}
                    type={type}
                  />
                )}
              </Grid>
              <Grid item sm={4} xs={10}>
                <FormSelect
                  label={strTipoLabel}
                  name={tipoName}
                  getValue={() => item.tipo}
                  data={item}
                  onChange={(value) => updateItem(value, "tipo", idx)}
                  id={tipoName}
                  options={options}
                />
              </Grid>
              <Grid item sm={1} xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton onClick={() => removeItem(idx)} tabIndex={-1}>
                  <Delete />
                </IconButton>
              </Grid>
              <Grid item xs={12} sx={{ mb: 2, display: { xs: 'block', sm: 'none' } }}/>
            </Fragment>
          );
        })}
        <Grid item xs={12}>
          <Button variant="outlined" onClick={addItem} startIcon={<Add />}>
            Adicionar {label}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ManyForm;
