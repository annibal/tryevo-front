import {
  Autocomplete,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  createFilterOptions,
  debounce,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { doCall } from "../../../providers/baseProvider";
import { LoadingButton } from "@mui/lab";

const filter = createFilterOptions();

const FormCBO = ({
  label,
  name,
  id,
  data,
  onChange,
  getValue,
  ...restProps
}) => {
  const [autocompleteValue, setAutocompleteValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [open, toggleOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState([]);

  const handleClose = () => {
    setDialogValue("");
    toggleOpen(false);
  };

  const handleCreateCargo = () => {
    setLoading(true);
    setError(null);
    doCall("cbo", { method: "POST", body: { nome: dialogValue } }).then(
      (response) => {
        if (response.error) {
          setError(response.error?.message || response.error);
        } else {
          handleAutocompleteChange(null, response.data)
        }
        handleClose();
        setLoading(false);
      }
    );
  };

  const handleAutocompleteChange = (event, newValue) => {
    if (typeof newValue === "string") {
      // timeout to avoid instant validation of the dialog's form.
      setTimeout(() => {
        toggleOpen(true);
        setDialogValue("");
      });
    } else if (newValue && newValue.inputValue) {
      toggleOpen(true);
      setDialogValue(newValue.inputValue);
    } else {
      setAutocompleteValue(newValue);
      onChange(newValue, name, data);
    }
  };

  const fetch = useMemo(
    () =>
      debounce((request, callback) => {
        const url = `cbo?q=${request}&valid=yes&from=0&to=30`;
        doCall(url, { method: "GET" }).then(callback);
      }, 400),
    []
  );

  useEffect(() => {
    let active = true;

    if (inputValue === "") {
      setOptions(autocompleteValue ? [autocompleteValue] : []);
      return undefined;
    }

    setLoading(true);
    fetch(inputValue, (response) => {
      if (active) {
        let newOptions = [];
        setLoading(false);

        if (autocompleteValue) {
          newOptions = [autocompleteValue];
        }

        if (response.error) {
          setError(response.error?.message || response.error);
          return undefined;
        }

        if (response.success && response.data) {
          newOptions = [...newOptions, ...response.data];
        }

        const nonRepeatedOptions = [];
        newOptions.forEach((opt) => {
          if (!nonRepeatedOptions.find(x => x._id === opt._id)) {
            nonRepeatedOptions.push(opt)
          }
        })

        setOptions(nonRepeatedOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [autocompleteValue, inputValue, fetch]);

  const fnGetValue =
    typeof getValue === "function" ? getValue : () => data[name];

  let value = fnGetValue();
    if (value === undefined) value = '';
  const strId = id || name;

  useEffect(() => {
    if (value && value._id) {
      setAutocompleteValue(value);
    }
  }, [value])

  return (
    <>
      <Autocomplete
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "" && !loading) {
            filtered.push({
              inputValue: params.inputValue,
              nome: `Criar cargo "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.nome;
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        value={autocompleteValue || ''}
        onChange={handleAutocompleteChange}
        id={strId}
        autoComplete
        options={options}
        loading={loading}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => <li {...props}>{option.nome}</li>}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            fullWidth
            helperText={error}
            error={!!error}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      <input type="hidden" name={`${name}[_id]`} value={autocompleteValue?._id} />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Criar Cargo</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 4 }}>
            Não achou seu cargo na lista? Pode adicionar como você preferir.
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            required
            label="Cargo"
            type="text"
            id={strId + "-new-cargo"}
            value={dialogValue}
            onChange={(event) => setDialogValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                handleCreateCargo();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
          <LoadingButton loading={loading} variant="contained" onClick={handleCreateCargo}>
            Criar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FormCBO;
