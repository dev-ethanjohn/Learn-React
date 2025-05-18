import { useState } from "react";

function Counter() {
  let [count, setCount] = useState(0);
  function increaseCount() {
    setCount((prevCount) => prevCount + 1);
  }

  function decreaseCount() {
    setCount((prevCount) => prevCount - 1);
  }

  return (
    <>
      <h1>Counter: {count}</h1>
      <button onClick={decreaseCount}>-</button>
      <button onClick={increaseCount}>+</button>
    </>
  );
}

export default Counter;
