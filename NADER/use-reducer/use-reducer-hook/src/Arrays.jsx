import { useReducer } from "react";

function arrReducer(prevState, action) {
  // Object.is(obj1, obj2);
  // prevState.push(action.value);
  // return prevState;

  //NOTE: he spread operator (...) is key because React requires immutability in state updates. So we need to create a new copy of the state with the updates applied
  //! IMPORTANT: DO not manipulate references!
  switch (action.type) {
    case "add":
      return [...prevState, action.value];
    default:
      throw new Error("Invalid action type");
  }
}

function Arrays() {
  const [state, dispatch] = useReducer(arrReducer, [20]);

  function add() {
    dispatch({ type: "add", value: 1338 });
    console.log(state);
  }

  return (
    <>
      <h1>Arrays</h1>
      <p>{JSON.stringify(state, null, 2)}</p>
      <button onClick={add}>ADD TO ARRAY</button>
    </>
  );
}

export default Arrays;
