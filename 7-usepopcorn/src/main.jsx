import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Test from "./Test";
// import './index.css'
// import App from './App.jsx'
import StarRating from "./StarRating";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <StarRating
      maxRating={4}
      messages={["TERRIBLE", "BAD", "OKAY", "GOOD", "AMAZING"]}
    />
    <StarRating maxRating={10} />
    <StarRating size={24} color="red" className="test" defaultRating={3} />
    <Test />
  </StrictMode>
);
