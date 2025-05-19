import { useEffect, useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Component mounted");
  }, []);

  useEffect(() => {
    console.log("Counter Changed");
  }, [count]);

  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => setCount((prev) => prev + 1)}>Go up!</button>
    </>
  );
}

export default Counter;
