import React from "react";
import ReactDOM from "react-dom/client";
import { AppProvider } from "@shopify/polaris";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import State from "./Context/state";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AppProvider>
      <BrowserRouter>
        <State>
          <App />
        </State>
      </BrowserRouter>
    </AppProvider>
);
