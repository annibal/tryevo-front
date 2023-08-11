import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import { Button, Grid, IconButton } from "@mui/material";
import { Fragment } from "react";
import FormInput from "./form/FormInput";
import FormSelect from "./form/FormSelect";

const ManyFormSingle = ({
  data,
  onChange,
  label,
  labelAdd,
  name,
  getValue,
  type = "text",
  options,
}) => {
  const fnGetValue =
    typeof getValue === "function" ? getValue : () => data[name] || '';

  const items = fnGetValue();

  const removeItem = (itemIndex) => {
    const newItems = items.filter((i, idx) => idx !== itemIndex);
    onChange(newItems, name, data);
  };

  const addItem = () => {
    const newItems = [...items, ""];
    onChange(newItems, name, data);
  };

  const updateItem = (itemVal, itemIndex) => {
    const newItems = items.map((item, idx) =>
      idx === itemIndex ? itemVal : item
    );
    onChange(newItems, name, data);
  };

  let strBtnAddLabel = `Adicionar ${label}`;
  if (labelAdd) strBtnAddLabel = labelAdd;

  return (
    <div className="many-form-single">
      <Grid container spacing={2}>
        {(items || []).map((item, idx) => {
          const valorName = `${name}[${idx}][value]`;
          const strIdx = `${idx + 1}`;

          return (
            <Fragment key={idx}>
              <Grid item sm={11} xs={10}>
                {options ? (
                  <FormSelect
                    label={`${label} ${strIdx}`}
                    name={valorName}
                    getValue={() => item}
                    data={item}
                    onChange={(value) => updateItem(value, idx)}
                    id={valorName}
                    options={options}
                  />
                ) : (
                  <FormInput
                    label={`${label} ${strIdx}`}
                    name={valorName}
                    getValue={() => item}
                    data={item}
                    onChange={(value) => updateItem(value, idx)}
                    type={type}
                  />
                )}
              </Grid>
              <Grid item sm={1} xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton onClick={() => removeItem(idx)} tabIndex={-1}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </Grid>
              <Grid item xs={12} sx={{ mb: 2, display: { xs: 'block', sm: 'none' } }}/>
            </Fragment>
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

export default ManyFormSingle;
