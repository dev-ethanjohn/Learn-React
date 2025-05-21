import { useContext } from "react";
import { StringContext } from "./Parent";

function Child() {
  const [stringState, setStringState] = useContext(StringContext);

  return (
    <>
      <h1>{stringState}</h1>
      <button
        onClick={() => {
          return setStringState((prev) =>
            prev === "Start" ? "Finish" : "Start"
          );
        }}
      >
        Change text!
      </button>
    </>
  );
}

export default Child;
