import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import CssBaseline from "@mui/material/CssBaseline";
import Router from "./base/Router";
import { AuthProvider } from "./base/AuthContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { ptBR } from "@mui/x-date-pickers/locales";
import 'dayjs/locale/pt-br';
import { ThemeProvider } from "@mui/material";
import theme from "./base/Theme";

const root = ReactDOM.createRoot(document.getElementById("tryevo_root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="pt-br"
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router />
        </ThemeProvider>
      </LocalizationProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
