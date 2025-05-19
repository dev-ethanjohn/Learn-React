import { useReducer } from "react";
import Button from "./Button";

function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "RESET":
      return 0;
    default:
      throw new Error("INVALID Action type!");
  }
}

function Counter() {
  const [counter, counterDispatch] = useReducer(counterReducer, 0);

  return (
    <>
      <h1>{counter}</h1>
      <Button
        text="go Up!"
        counterDispatch={counterDispatch}
        action={{ type: "INCREMENT" }}
      />
      <Button
        text="go Down!"
        counterDispatch={counterDispatch}
        action={{ type: "DECREMENT" }}
      />
      <Button
        text="reset!"
        counterDispatch={counterDispatch}
        action={{ type: "RESET" }}
      />
    </>
  );
}

export default Counter;
