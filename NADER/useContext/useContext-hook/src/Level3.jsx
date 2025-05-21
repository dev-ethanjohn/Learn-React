import { createContext, useState } from "react";
import Level2 from "./Level2";

const AuthContext = createContext(); //1. create the Context object
const authStateInitial = { useId: 123, loggedIn: true }; //2. state you wanna share

function Level3() {
  // No rerendering happening when context changes unless defined
  // Not stateful by defefault

  console.log("level 3 parent is rerendering");

  const [authState, setAuthState] = useState(authStateInitial);

  return (
    <>
      <h1>Level 3</h1>
      <AuthContext.Provider value={[authState, setAuthState]}>
        <Level2 />
      </AuthContext.Provider>
    </>
  );
}

export default Level3;
export { AuthContext };
