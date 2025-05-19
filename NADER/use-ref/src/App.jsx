import { useEffect, useRef } from "react";

// const ref = {
//   current: 0,
// };

function App() {
  const ref = useRef(0);
  const domRef = useRef(null);

  console.log(ref); //* {current: 0}
  console.log(domRef); //* {current: null}

  function handleClick() {
    // NOTE: ref.current is mutable and persists between renders. Changing ref.current does NOT trigger a re-render.
    ref.current++;
    console.log(ref);
  }

  useEffect(() => {
    console.log(`ref changed: ${ref}`); //* ref changed: [object Object]
    // NOTE: WE GET ACCESS TO THE DOM NODE
    console.log(domRef); //* {current: h1}
  });

  // IMPORTANT: WORKS BUT DO NOT DO THIS (BETTER USE STATE)
  // useEffect(() => {
  //   domRef.current.textContent = "This is h1";
  // }, []);

  return (
    <>
      <h1 ref={domRef}></h1>
      <p>Hello</p>
      <button onClick={handleClick}>Click Me!</button>
    </>
  );
}

// USEREF
//  1. Store values independent of rendering
// 2. "useState" without rerender
// 3. easily store DOM nodes reference
// 4. custom component references

export default App;

// IMPORTANT: WHEN TO USE REF OR STATE
// A. USE REF
// 1. Need state, but without re-renders
// 2. DOM Node references
// 3. Other ref unrelated to renders
// 4. Custom component references

// Use state
//1. Need state to re-render
