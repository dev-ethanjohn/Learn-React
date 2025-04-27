import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
// import App from './App.jsx'

import { useState } from "react";
import StarRating from "./StarRating";

function Test() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <div>
      <StarRating color="blue" maxRating={10} onSetRating={setMovieRating} />;
      <p>This movie was rated {movieRating} stars</p>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <StarRating
      maxRating={5}
      messages={["TERRIBLE", "BAD", "OKAY", "GOOD", "AMAZING"]}
    />
    <StarRating maxRating={10} />
    <StarRating size={24} color="red" className="test" defaultRating={3} />
    <Test />
  </StrictMode>
);
