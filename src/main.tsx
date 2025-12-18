// src/main.tsx

import React from "react";
import ReactDOM from "react-dom/client";

// Нормалізація стилів
import "modern-normalize";
// Глобальні стилі (додатково)
import "./global.css";
import App from "./components/App/App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
