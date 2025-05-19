import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [counter, setCounter] = useState(0);
  const [counter2, setCounter2] = useState(10);

  function goUp() {
    setCounter((prev) => prev + 1);
  }

  function goUp2() {
    setCounter2((prev) => prev + 1);
  }

  useEffect(() => {
    const random = Math.floor(Math.random() * 1000);
    const id = setInterval(() => {
      console.log(`[${random}] - Rendered`);
    }, 1000);

    return () => clearInterval(id);
  });

  // useEffect(() => {
  //   console.log("hello");
  // }, [counter, counter2]); //* only when counter/counter2 state changes

  // useEffect(() => {
  //   console.log("Rerendered");
  // }); //* everytime

  useEffect(() => {
    console.log("Mounted");

    return () => {
      console.log("Unmount");
    };
  }, []); //* will only render 1 time

  return (
    <>
      <p>Counter: {counter}</p>
      <p>Counter2: {counter2}</p>
      <button onClick={goUp}>Up C1</button>
      <button onClick={goUp2}>Up C2</button>
    </>
  );
}

// useEffect
// -Run "side effects" in components
// -Usually to talk/sync with an external system (DOM, database, api, server, console, etc)
// -Hook in to component lifecycle
// -Quirk of React approach

// NOTE: USECASES
// 1. Data fetching
// 2. Setup event listeners
// 3. setup intersection observers
// 4. observables/subscriptions
// 5 many more...

// NOTE: REACT COMPONENT LIFESCYCLE
// 1. INITIALIZE _> Run function, setup props, state
// 2. MOUNT -> ADD HTML to DOM
// 3. UPDATE -> UPDATE HTML in the DOM and STATE
// 4. UnMount -> Remove HTML  in the DOM and State

export default App;
