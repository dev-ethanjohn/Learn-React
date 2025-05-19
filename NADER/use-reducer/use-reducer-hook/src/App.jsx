import { useReducer } from "react";
import "./App.css";

// Action Types
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const RESET = "RESET";

// Initial State
const initialState = 0;

// Reducer
function reducer(prevState, action) {
  switch (action.type) {
    case INCREMENT:
      return prevState + action.value;
    case DECREMENT:
      return prevState + action.value;
    case RESET:
      return initialState;
    default:
      throw new Error("Invalid action type!");
  }
}

function App() {
  const [counter, dispatch] = useReducer(reducer, initialState);

  function goUp() {
    // setCounter(1);
    dispatch({ type: INCREMENT, value: 1 });
  }

  function goDown() {
    dispatch({ type: DECREMENT, value: -1 });
  }

  function reset() {
    dispatch({ type: RESET });
  }

  return (
    <>
      <p>Use Reducer</p>
      <h2>Counter: {counter}</h2>
      <button onClick={goUp}>Up</button>
      <button onClick={goDown}>Down</button>
      <button onClick={reset}>Reset</button>
    </>
  );
}

// NOTE: USEREDUCER
// 1. useState for complex/multiple states
// 2. Uses a reducer to manage state
// 3. Same rendering logic with useState/Effect

//NOTE: What is a reducer
//* It is a function that takes a prev state and gives you a new state.

export default App;
