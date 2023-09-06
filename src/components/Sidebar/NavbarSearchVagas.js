import { useRef, useState } from "react";
import FormInput from "../../pages/commons/form/FormInput";
import { Box, IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";
import allRoutesData from "../../base/routes_data";

const NavbarSearchVagas = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const formInputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/app/${allRoutesData.pfVagas.path}${searchText ? `?q=${searchText}` : ''}`);
    // setSearchText("");
    formInputRef.current.blur();
  };

  const handleClear = () => {
    setSearchText("");
    formInputRef.current.focus();
  }

  return (
    <Box className="navbar-search">
      <form onSubmit={handleSubmit}>
        <FormInput
          inputRef={formInputRef}
          className="navbar-search-input"
          size="small"
          name="searchText"
          placeholder="Buscar"
          data={{ searchText }}
          onChange={(value) => setSearchText(value)}
          InputProps={{
            onBlur: () => {},
            endAdornment: (
              <InputAdornment position="end">
                {searchText?.length > 0 && (
                  <IconButton
                    type="button"
                    onClick={handleClear}
                    tabIndex={500}
                  >
                    <ClearIcon />
                  </IconButton>
                )}
                <IconButton type="submit" edge="end" color="primary">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </Box>
  );
};

export default NavbarSearchVagas;
