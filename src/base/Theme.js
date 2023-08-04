import { createTheme } from "@mui/material";
import { ptBR } from "@mui/x-date-pickers/locales";

let theme = createTheme();

theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  palette: {
    primary: theme.palette.augmentColor({
      color: {
        main: '#02617d',
      },
    }),
    secondary: theme.palette.augmentColor({
      color: {
        main: '#df9c10',
      },
    }),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => {
          if (ownerState.size === "medium") {
            return {
              padding: "10px 20px",
            };
          }
          if (ownerState.size === "large") {
            return {
              padding: "14px 28px",
              fontSize: '1rem',
            };
          }
          // console.log(ownerState);
        },
      },
    },
  },
  ptBR,
});

// console.log(theme)

export default theme;
