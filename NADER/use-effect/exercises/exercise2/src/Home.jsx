import { useEffect, useState } from "react";
import Section from "./Section";

function Home() {
  const [visits, setVisits] = useState(0);

  function visitsGoUp() {
    setVisits((prevVisits) => prevVisits + 1);
  }

  useEffect(() => {
    console.log("Home is rerendered");
  });

  return (
    <>
      <h1>{visits}</h1>
      <button onClick={visitsGoUp}>Go up</button>
      <Section />
    </>
  );
}

export default Home;

// HOME rerenders
// 1. on Mount
// 2. state visits changes when button is clicked
