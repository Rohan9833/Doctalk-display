import React from "react";
import { createRoot } from "react-dom/client";
import ReactGA from "react-ga4";
import App from "./App.jsx";
import "./index.css";

const measurementId = import.meta.env.VITE_GA_ID;

if (measurementId) {
  ReactGA.initialize(measurementId);
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
