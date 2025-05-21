import { useContext } from "react";
import { MyContext } from "./Parent";

function Child() {
  const ctx = useContext(MyContext);
  return <h1>{ctx}</h1>;
}

export default Child;
