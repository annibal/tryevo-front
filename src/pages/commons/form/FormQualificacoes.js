import {
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  createFilterOptions,
  debounce,
} from "@mui/material";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { doCall } from "../../../providers/baseProvider";
import { LoadingButton } from "@mui/lab";

const filter = createFilterOptions();

const FormQualificacoes = ({
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
  const [dialogValue, setDialogValue] = useState({ nome: '', desc: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState([]);
  const autocompleteElement = useRef()

  const handleClose = () => {
    setDialogValue({ nome: '', descricao: '' });
    toggleOpen(false);
  };

  const handleCreateQualificacao = () => {
    setLoading(true);
    setError(null);
    doCall("qualificacao", {
      method: "POST",
      body: dialogValue,
    }).then((response) => {
      if (response.error) {
        setError(response.error?.message || response.error);
      } else {
        handleAutocompleteChange(null, response.data);
      }
      handleClose();
      setLoading(false);
    });
  };

  const handleAutocompleteChange = (event, newValue) => {
    if (typeof newValue === "string") {
      // timeout to avoid instant validation of the dialog's form.
      setTimeout(() => {
        toggleOpen(true);
        setDialogValue({ nome: newValue, descricao: '' });
      });
    } else if (newValue && newValue.inputValue) {
      toggleOpen(true);
      setDialogValue({ nome: newValue.inputValue, descricao: '' });
    } else {
      setAutocompleteValue(newValue);
      if (newValue?._id) {
        setTimeout(() => {
          try {
            autocompleteElement.current.querySelector('.MuiAutocomplete-clearIndicator').click()
          } catch (e) { console.error(e) }
        })
        onChangeAdd(newValue);
      }
    }
  };

  const fetch = useMemo(
    () =>
      debounce((request, callback) => {
        const url = request === '' ? 'qualificacao?valid=yes&from=0&to=30' : `qualificacao?q=${request}&valid=yes&from=0&to=30`;
        doCall(url, { method: "GET" }).then(callback);
      }, 400),
    []
  );

  useEffect(() => {
    let active = true;

    // if (inputValue === "") {
    //   setOptions(autocompleteValue ? [autocompleteValue] : []);
    //   return undefined;
    // }

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
          if (!nonRepeatedOptions.find((x) => x._id === opt._id)) {
            nonRepeatedOptions.push(opt);
          }
        });

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
  if (value === undefined) value = [];
  const strId = id || name;

  const valueMap = value.reduce((a,c) => ({
    ...a,
    [c._id]: true,
  }), {});

  const onChangeAdd = (item) => {
    const newVal = [...value, item];
    onChange(newVal, name, data);
  }
  const onChangeRemove = (item) => {
    const newVal = value.filter(v => v?._id !== item?._id);
    onChange(newVal, name, data);
  }

  return (
    <>
      <Autocomplete
        filterOptions={(options, params) => {
          const filtered = filter(options, params).filter((opt) => !valueMap[opt?._id]);;

          if (params.inputValue !== "" && !loading) {
            filtered.push({
              inputValue: params.inputValue,
              nome: `Criar competência "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        ref={autocompleteElement}
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
        value={autocompleteValue || ""}
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
      
      <Box>
        {value.map((v, idx) => (
          <Fragment key={v?._id}>
            <Chip label={v?.nome} onDelete={() => onChangeRemove(v)} sx={{ mr: 2, mt: 2 }} />
            <input
              type="hidden"
              name={`${name}[${idx}][_id]`}
              value={v?._id}
            />
          </Fragment>
        ))}
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Criar Competência</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            required
            label="Nome"
            type="text"
            id={strId + "-new-competencia"}
            sx={{ mt: 2 }}
            value={dialogValue.nome}
            onChange={(event) => setDialogValue({ ...dialogValue, nome: event.target.value })}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleCreateQualificacao();
              }
            }}
          />
          <TextField
            autoFocus
            fullWidth
            label="Descrição"
            type="text"
            id={strId + "-new-competencia-desc"}
            sx={{ mt: 2 }}
            multiline
            rows={3}
            value={dialogValue.descricao}
            onChange={(event) => setDialogValue({ ...dialogValue, descricao: event.target.value })}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleCreateQualificacao();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={handleCreateQualificacao}
          >
            Criar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FormQualificacoes;
