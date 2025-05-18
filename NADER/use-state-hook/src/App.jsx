import { useState } from "react";

function App() {
  let [count, setCount] = useState(0);
  const add = () => {
    console.log(count); //* 0
    setCount((prevCount) => prevCount + 1); //* does not run synchronously (instead schedules count to become 1)
    console.log(count); //*  still 0 — count hasn't updated yet!
  };

  // NOTE: the first log is the "MOUNTING" phase where the component is rendered for the 1ST TIME
  // NOTE: The subsequent logs is the "UPDATE" phase. Every time you call setCount, it updates the state and triggers a "re-render".
  // NOTE: Everytime the state changes, we get a "RERENDER"

  console.log("rendering App");

  return (
    <>
      <button onClick={add}>Click: {count}</button>
    </>
  );
}

export default App;

// IMPORTANT: React is all about building interactive user interfaces, and those interfaces need to change over time in response to user actions (like clicks, typing, form submissions).

//*1. Adds state to your functional components (used to only be possible with class components).
//*2. Automatically triggers re-renders when the state changes.
//*3. Keeps the UI in sync with the underlying data (like count).

//IMPORTANT Object.is(prevState, newState)
// -> If true: Do nothing
// -> If false: Trigger re-render (rerun component function)

// NOTE: Example
/*
const [count, setCount] = useState(0);
setCount(0); // Object.is(0, 0) => true -> No re-render
setCount(1); // Object.is(0, 1) => false -> Re-render
*/

/*
const [user, setUser] = useState({ name: "Ana" });
setUser({ name: "Ana" }); // Different object → Object.is returns false → Re-render
*/ //* Even though both objects look the same, they are not the same in memory — they are two different references.

// IMPORTANT
// ✅ PRIMITIVES — compared by VALUE
// 5 === 5             -> true
// 'hi' === 'hi'       -> true

// ❌ OBJECTS — compared by REFERENCE
// { name: 'Ana' } === { name: 'Ana' } -> false

// ❌ ARRAYS — compared by REFERENCE
// [1, 2, 3] === [1, 2, 3] -> false
