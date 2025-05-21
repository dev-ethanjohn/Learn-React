import { useContext } from "react";
import { CounterContext } from "./Parent";
function Child() {
  const dispatchCounter = useContext(CounterContext);

  function dispatchUpToCounter() {
    dispatchCounter({ type: "UP", value: 1 });
  }

  console.log("rendering child");
  return (
    <>
      <button onClick={dispatchUpToCounter}>UP</button>
    </>
  );
}

export default Child;
