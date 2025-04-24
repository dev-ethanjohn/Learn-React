import Footer from "./Footer";
import Header from "./Header";
import Menu from "./Menu";

function App() {
  return (
    <>
      <div className="container">
        <Header />
        <Menu />
        <Footer />
      </div>
    </>
  );
}

export default App;

//* IMPORTANT: 37: WHAT is JSX?
//1. a declarative syntax to describe what components look like and how they work
//2. Components must return a block of JSX
//3. Extension of JS that allows us to embed JS, CSS and React Components into HTML
//4. Each JSX element is converted to a React.createElement function call
//5. We could use React without JSX (NOT GOOD!)

//NOTE: IMPERATIVE vs DECLARATIVE
// IMPERATIVE ("HOW TO DO THINGS")
// 1. Manual DOM element selections and DOM traversing
// 2. Step-by-step DOM mutations until we reached the desired UI

// DECLARATIVE ("WHAT WE WANT")
// 1. Describe what UI should look like using JSX, based on current data/state
// 2. React is an abstraction away from DOM
// 3. We think of the UI as a refelection of the current data

// NOTE: SEPARATION OF CONCERN
// OLD WAY -> one tech per file
// NEW WAY -> One component per file (each componeht is concerned wirth 1 piece of the UI)

//* IMPORTANT 43: Props, immutability, and one way data flow
// NOTE: Props are used pass data from parent component to child components
// Essential tool to configure and customize components (like func param)
// Parent controls how child components look and work
// Anything can be passed as props

// NOTE: Props are read-only! (IMMUTABLE)
// State -> internal data that can be updated by the commponent's logic
//  Props -> data coming from the outside, and can only be updated by the parent component. Use state for mutation. Mutating props would affect parent, creating side effects (not pure). This allows React to optimize apps, avoid bugs, make apps predictable.

//NOTE: ONE WAY DATA FLOW (parent -> child, top -> bottom)
// 1. Makes apps more predictable and easier to understand
// 2. Make apps easier to debug, as we have more control over the data
// 3. more performant

//* IMPORTANT 45: JSX Rules
// NOTE: General JSX rules
// 1. JSX like HTML, we can enter "JS mode" by using {} for text or attributes
// 2. We can place JS expressions inside {}. Ex. reference variables, create arrays or obj, [].map(), ternary
// 3. Statements are not allowed (if/else, for, switch)
// 4. JSX produces a JS expression. We can place other pieces of JSX inside {}. We can  write JSX anywhere inside a component (in if/else, assign to variables, pass into functions)
// 5. A piece of JSX can only have 1 root element. If you need more use <React.Fragment> </React.Fragment> or <></>

// NOTE: Differences of JSX and HTML
// 1. className > class
// 2. htmlFor > for
// 3. Every tag needs to be closed. ex: <img/> or <br/>
// 4. All event handlers and other properties need to be camelCased. ex: onClick or onMouseOver
// 5. Exceptions: aria-* and data-* are written w/ dashes like in HTML
// 6. CSS inline styles are written like {{<style></style>}} to reference a variable , and then an object
// 7. CSS property names are also camelCased
// 8. Comments need to be {} because they are JS
