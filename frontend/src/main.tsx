import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/app";
import "./styles/fonts.css";
import "./styles/main.css";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Auth0Provider
    domain="readee.eu.auth0.com"
    clientId="8eqv9LlFDs3iA0PZzIHMC9DxGuDjPtu4"
    redirectUri={window.location.origin}
    audience="https://readee.com/api"
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>
);
