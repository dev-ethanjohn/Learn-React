import { useEffect, useState } from "react";

function Pokemon() {
  const URL = "https://pokeapi.co/api/v2/pokemon/pikachu";
  const [src, setSrc] = useState("");

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch(URL);
      const data = await response.json();
      console.log(data);

      const imageUrl = data.sprites.other["official-artwork"].front_default;
      console.log(imageUrl);

      setSrc(imageUrl);
    };

    fetchPokemon();
  }, []);
  // onMount - fetch mainkey from api

  // 2. get url for the iamge from json response

  //3. set src value of our img to that url

  // 4.rerender teh component with new image

  return (
    <>
      <h1>Mankey</h1>
      <img src={src} alt="sd" />
    </>
  );
}

export default Pokemon;
