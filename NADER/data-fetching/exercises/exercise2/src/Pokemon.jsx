import { useRef, useState } from "react";

function Pokemon() {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const pokemonCache = useRef(new Map());

  function searchPokemon() {
    const pokemonName = inputRef.current.value.trim().toLowerCase();
    setError(false);
    setLoading(true);

    // Ignore empty input
    if (!pokemonName) {
      setError(true);
      setPokemon(null);
      setLoading(false);
      return;
    }

    // Cache HIT
    if (pokemonCache.current.has(pokemonName)) {
      setPokemon(pokemonCache.current.get(pokemonName));
      setLoading(false);
      return;
    }

    // Cache MISS
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        if (!response.ok) {
          setError(true);
          setPokemon(null); // Clear previous result
          setLoading(false);
          return;
        }
        return response.json();
      })
      .then((json) => {
        if (json) {
          setPokemon(json);
          pokemonCache.current.set(pokemonName, json);
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setPokemon(null);
        setLoading(false);
      });
  }

  return (
    <>
      <input type="text" ref={inputRef} placeholder="Enter Pokémon name" />
      <button onClick={searchPokemon}>Search!</button>

      {loading && <p>Loading...</p>}
      {error && (
        <p style={{ color: "red" }}>Sorry, that Pokémon doesn't exist!</p>
      )}

      {pokemon && !loading && (
        <>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>Weight: {pokemon.weight}</p>
        </>
      )}
    </>
  );
}

export default Pokemon;

/*

🔍 When to use useEffect for fetching:
✅ When you want the data to load automatically as soon as the component renders (e.g., fetch data on mount).

✅ When the side effect depends on some prop or state change (e.g., refetch when pokemonName changes).

❌ When not to use useEffect:
❌ When you're only fetching in response to a user action, like a button click or a form submission.

In that case, you just write the fetch logic directly in the handler, like searchPokemon().

*/
