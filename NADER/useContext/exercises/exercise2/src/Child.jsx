import { useContext } from "react";
import { NumberContext, StringContext } from "./Parent";

useContext;

function Child() {
  const name = useContext(StringContext);
  const age = useContext(NumberContext);
  return (
    <>
      <p>{name}</p>
      <p>{age}</p>
    </>
  );
}

export default Child;
