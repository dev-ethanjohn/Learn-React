import { createContext, useReducer } from "react";
import Child from "./Child";

const CounterContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "UP":
      return state + action.value;
    default:
      throw new Error("Invalid action type");
  }
}

function Parent() {
  const [counter, dispatchCounter] = useReducer(reducer, 0);
  console.log("rendering parent");

  return (
    <CounterContext.Provider value={dispatchCounter}>
      <h1>{counter}</h1>
      <Child />
    </CounterContext.Provider>
  );
}

export default Parent;
export { CounterContext };
