import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./contexts";
import { App } from "./App";

import ReactDOM from "react-dom";
import React from "react";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
