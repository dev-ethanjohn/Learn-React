import { useEffect, useState } from "react";
import "./App.css";

function App() {
  let [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Fetch error", err));
  }, []);

  return (
    <>
      <h1>Pikachu Info</h1>
      {data ? (
        <p>
          Name: {data.name}, Weight: {data.weight}
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

/*

&&  -> when you only want to render something if the condition is true (and skip if not).
?. -> to avoid breaking when accessing deep object values.
? : -> when you need two branches — like “if data exists, show A, else show B.”

*/

export default App;
