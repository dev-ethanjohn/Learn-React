import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Arrays from "./Arrays.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <Arrays />
  </StrictMode>
);
