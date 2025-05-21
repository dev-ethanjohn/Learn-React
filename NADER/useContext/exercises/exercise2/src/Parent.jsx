import { createContext } from "react";
import Child from "./Child";

const StringContext = createContext();
const NumberContext = createContext();

const name = "Monkey";
const age = 20;

function Parent() {
  return (
    <StringContext value={name}>
      <NumberContext value={age}>
        <Child />
      </NumberContext>
    </StringContext>
  );
}

export default Parent;
export { NumberContext, StringContext };
