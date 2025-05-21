/*
    Mootin
    (then Charmander)
        - name
       - image (any)
       - weight
*/

import { useEffect, useState } from "react";

function Pokemon() {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = "https://pokeapi.co/api/v2/pokemon/pikachu2";
    fetch(url)
      .then((response) => {
        console.log(response);
        // was the response ok?
        if (!response.ok) {
          throw new Error("Invalid Pokémon name!");
        }
        return response.json();
      })
      .then((json) => setPokemon(json))
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(true); // handle any fetch or JSON parsing errors
      });
  }, []);

  console.log(pokemon);

  if (error) {
    return <p>Sorry, pokemon name must be valid!</p>;
  }

  return (
    <>
      {pokemon && <h2>{pokemon.name}</h2>}
      <img src={pokemon?.sprites.front_default} alt={pokemon?.name} />
      <p>{pokemon?.weight}</p>
    </>
  );
}

export default Pokemon;
