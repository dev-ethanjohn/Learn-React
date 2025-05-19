import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 2); //→ uses a potentially stale value.
    setCount((prev) => prev + 2); //→ always uses the latest state — safe and correct.
  }
  return (
    <>
      <h1>{count}</h1>
      <button onClick={handleClick}>Add 2</button>
    </>
  );
}

export default Counter;
