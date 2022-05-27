import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/app";
import "./styles/fonts.css";
import "./styles/main.css";
import "./styles/topbar.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
