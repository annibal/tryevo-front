import { createTheme } from "@mui/material";
import { ptBR } from '@mui/x-date-pickers/locales';

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  ptBR
});

console.log(theme)

export default theme;