import "./App.css";
import Level3 from "./Level3";

function App() {
  return (
    <>
      <Level3 />
    </>
  );
}

//  NOTE: useContext
// 1. End prop drilling
// 2. Share data with all child components
// 3. can be stateful in conjunction with useState
// 4. can be combined with useReducer

export default App;
