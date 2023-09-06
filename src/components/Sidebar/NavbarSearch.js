import { useState } from "react";
import FormInput from "../../pages/commons/form/FormInput";
import { Box } from "@mui/material";

const NavbarSearch = () => {
  const [dados, setDados] = useState({});
  const handleChange = (value, name, data) => {
    setDados({ ...data, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <Box className="navbar-search">
      <form onSubmit={handleSubmit}>
        <FormInput
          className="navbar-search-input"
          size="small"
          type="search"
          name="busca"
          placeholder="Buscar"
          data={dados}
          onChange={handleChange}
        />
      </form>
    </Box>
  );
}

export default NavbarSearch;