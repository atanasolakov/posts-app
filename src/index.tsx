import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Ensure you use a type assertion to let TypeScript know that 'root' is an HTMLElement
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Render the React application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
