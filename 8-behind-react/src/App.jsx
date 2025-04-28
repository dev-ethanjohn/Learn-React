import { useState } from "react";

const content = [
  {
    summary: "React is a library for building UIs",
    details:
      "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "State management is like giving state a home",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "We can think of props as the component API",
    details:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

export default function App() {
  return (
    <div>
      <Tabbed content={content} />
    </div>
  );
}

function Tabbed({ content }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="tabs">
        {/* <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={3} activeTab={activeTab} onClick={setActiveTab} /> */}
        {Array.from({ length: 4 }).map((_, num) => (
          <Tab
            key={num}
            num={num}
            activeTab={activeTab}
            onClick={setActiveTab}
          />
        ))}
      </div>
      {/* When we navigate here, all state from the TabContent will be reset (Diffing- SAME POSITION, DIFF ELEMENT rule) */}
      {/* React treats different components (TabContent vs DifferentContent) at the
      same DOM position as different elements, so their internal state resets. */}
      {activeTab <= 2 ? (
        <TabContent
          item={content.at(activeTab)}
          key={content.at(activeTab).summary} //  a key forces state reset inside <TabContent>
        />
      ) : (
        <DifferentContent />
      )}
    </div>
  );
}

function Tab({ num, activeTab, onClick }) {
  return (
    <button
      className={activeTab === num ? "tab active" : "tab"}
      onClick={() => onClick(num)}
    >
      Tab {num + 1}
    </button>
  );
}

function TabContent({ item }) {
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);

  console.log("RENDER");

  function handleInc() {
    setLikes((currentLikes) => currentLikes + 1);
  }

  function handleTripleInc() {
    setLikes((currentLikes) => currentLikes + 3);
  }

  function handleUndoLater() {
    setTimeout(handleUndo, 2000);
  }

  function handleUndo() {
    setShowDetails(true);
    setLikes(0);
    console.log(likes);
  }

  return (
    <div className="tab-content">
      <h4>{item.summary}</h4>
      {showDetails && <p>{item.details}</p>}

      <div className="tab-actions">
        <button onClick={() => setShowDetails((h) => !h)}>
          {showDetails ? "Hide" : "Show"} details
        </button>

        <div className="hearts-counter">
          <span>{likes} ❤️</span>
          <button onClick={handleInc}>+</button>
          <button onClick={handleTripleInc}>+++</button>
        </div>
      </div>

      <div className="tab-undo">
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleUndoLater}>Undo in 2s</button>
      </div>
    </div>
  );
}

function DifferentContent() {
  return (
    <div className="tab-content">
      <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
    </div>
  );
}

// console.log(<DifferentContent test={23} />);
// console.log(DifferentContent());

//* IMPORTANT:124 coMPONENTS, instances and elements
// NOTE: Component -> Component Instance -> (*returns) React Elements ->(*converted and inserted) DOM elements (HTML)

// INSTANCES
// Instances are created when we "use" compoennts
// Actual physical manifestatuon of a component
// Has its own state and props
// Has a lifecycle (can be born, live, or die)

// React Elements
// JSX is converted to React.createElement() function calls
// the result of these function calls
// converted to DOM elements

// DOM Element
// Actual visual representation of the component intsance in the browser

//* IMPORTANT: 127 How rendering works: RENDER PHASE
//NOTE:  1. Render Is Triggered
// 2 WAYS THAT TRIGGERS render
// - 1. initia render of the app
// - 2. State is updated in one of more component instances (re-render) (Rendering in React is all about calling only the component function)
// - render process is triggered for the entire app
// - Renders are not triggered immediately, but scheduled for when the JS engine has some "free time". There is also batching of multiple setState calls in event handlers.

//* IMPORTANT: 128: How rendering works: COMMIT PHASE
// NOTE: NOT TRUE: RENDERING IS UPDATING THE SCREEN/UI/DOM
// NOTE: REACT COMPLETELY DISCARDS OLD VIEW (DOM) ON RE-RENDER

// 1. Component instances that triggered re-renders
// 2. React elements
// 3. New virtual DOM

// NOTE: VIRTUAL DOM
// Tree of all React elements created from all instances in teh component tree. Cheap and fast to create multiple trees.
// nOthing to do with "shadow DOM"

// NOTE: Rendering a component will cause all of its child components to be rendered as well (no matter is props changed or not)

// NOTE: Why not update the entire DOM whenever state changes? 1. Cuase it will be slow, 2. Usually only a small part of the DOM needs to be updated.

// RECONCILIATION: Deciding which DOM lements actually need to be inserted, dleted or updated in order to reflect the latest state changes. The reconciler = Fiber.
// Fiber TRee: internal tree that has a "fiber" for each component instance and DOM element
// Fiber are not re-created on every render
// work can be done asynchronously (Rendering process can split into chunks, tasks can be prioritized, and work can be paused, reused, or thrown aa) Enables concurrent featrues like Suspanese or transitions, long renders won't block the JS engine

// Diffing -> comparing elements based on their position in the tree

// Commit final phase
// React writes to the DOM: insertions, deletions, abd updates (lst of DOM udpates "flushed" to the DOM)
// Committing is synchronous.
// After commit phase, teh workInProgress fiber tree becomes the current truee for the next render cycle.
// As a result it will repaint the screen (Updated UI on teh screen)

// NOTE: REACT DOES NOT TOUCH THE DOM. REACT ONLY RENDERS. IT DOEST KNOW WHERE THE RENDER RESULT WILL GO
// NOTE: REACT CAN BE USED ON DIFFERNT PLATFORMS ("HOSTS")

// RECAP (updated React elements => new virtual DOm / curent fiber tree => Reconciliation + Diffing => Updated fiber tree => List of DOM updates => Updated DOM => UPDATED ui on screen)
// 1. TRIGGER _> Happens onl on initial render and state updates
// 2. RENDER PHASE -> does not produce any visual output. Rendering a component also renders all of its child components
// 3. COMMIT PHASE -> synchornous (UPDATED DOM)
// 4. BROWSER PAINTS => uPDATED ui ON SCREEN

//* IMPORTANT: 129: how diffing works
// 2 RULES
// 1. 2 elements of diff types will product different trees (SAME POSITION, DIFF ELEMENT)
// - REACT assumes entire sub-tree is no longer valid
// - Old components are destroyed ad removed from DOM, including STATE
// - Tree might be rebuilt if children stay the same (state is reset)
// 2. elements with a stable key prop stay the same across renders (SAME POSITION, SAME ELEMENT)
// - Elements will be kep (as well as chidl elements), including state
//* NOTE: - sometimes this is not what we want! Then we can use the key prop

//* IMPORTANT: 131: key prop
// Special prop taht we use to tell the diffing algorithm that an element is unique
// Allows React to distinguish bet. multiple instances of the same component type
// *When a key stays teh same across renders, the element will be kept in the DOM (even if the position in the tree changes)

// NOTE: 1.Using keys in lists (stable KEY)
// When a key changes between rebders, the element will be destroyed and a new one will be created (even if teh position in teh tree is the same as before)

//* NOTE: WITHOUT KEYS: Same elements, but diff position in tree, are removed and recreated in the DOM (BAD)
//* NOTE: WITH KEYS: Different position in the tree, but the key stays the same, so element will be kep in DOM (GOOD)

// NOTE: 2. Using keys to reset state (changing KEY)
// if we have the same elemenbt at the same position in the tree the DOM element (although props may differ) and state will be kept.
// we need a key to reset this state

// IMPORTANT: "If you want to preserve state, keep the same type and same key. If you want to reset state, change the key."

//* IMPORTANT 134: Rules for Render Logic: PURE COMPONENTS
// 2 TYPES OF LOGIC in REACT COMPONENTS
// 1. RENDER LOGIC
// - Code that lives at the top level of the component function
// - participates in describing how the component view looks like
// - exeuted everytime the component renders
// 2. EVENT HANDLER FUNCTION
// - executed as a consequence of the event that the handler is listening for
// - code that actually does things: update state, perform an HTTP request, read an input field, navigate to another page, etc.

// FUNCTIONAL PROGRAMMING PRINCIPLES
// 1. Side effect: dependency on or modification of any data outside the function sopce. "Interaction with the outside world": examples: mutating external variables, HTTP requests, writing to DOM, setting timers, etc. (OUTSIDE VARIABLE MUTATION). Side effects are not bad! A program can onl be useful if it has some interaction with teh outside world.
// 2. Pure function: A function that has no side effects. Does not change any avriables outside its scope. Given teh same input, it always returns the same output.

// RULES FOR RENDER LOGIG
// 1. Components must be pure: given the same props (input), a component instance should always return teh same JSX output
// 2. Render logic must produce no side effecs: no interaction with the "outside world" is allowed. So render logic:
// - DO NOT PERFORM NETWORK REQUESTS (API CALLS)
// - DO NOT START TIMERS
// - DO NOT DIRECTLY USE THE DOM API
// - DO NOT MUTATE OBJECTS OR VARIABLES OUTSIDE THE FUNCTION SCOPE (CANT MUTATE PROPS)
// - DO NOT UPDATE STATE (OF REFS).

// NOTE: Side effects are allowed (and encouraged) in event handler functions! Thre is also a special hook to register side effects (useEffect)

//* IMPORTANT 135: State update batching
// Multiple setState calls inside the same handler won't cause multiple re-renders — just one render and commit. All states are batched in the event handler.
// Updating state in React is asynchronous -> updated state variables are not immediately avaiable after setState call, but only after the re-render. This also applies when only 1 state variable is updated. If we need to udpate state based on previous update, we use setState with callback

// NOTE:Starting in React 18, automatic batching is supported everywhere — including inside timeouts, promises, native event listeners, and asynchronous code — improving performance by reducing unnecessary renders

//* IMPORTANT 137: How events work in React
//NOTE: Event propagation and delegation
// -> It event starts from the root down to the target element (capturing phase) and then goes back (bubbling phase)
// By default, event handlers listen to events on the target and during the bubbling phase
// We can prevent bubbling with e.stopPropagation()

//NOTE: Event delegation
// Handing event for multiplpe elements centrally in one single parent element

//NOTE: How React handles events
// React registers all event handlers on the root DOM container. This is where all events are handled.
//* Behind the scenes. React performs event delegation for all events in our application

// Synethtic Events
// -Wrapper around the DOM'S native event object
// - Has some interface as native event objects, like stopPropagation() and preventDEfault()
// - Fixes browser nconsistencies so that events work in teh same way in all browsers.
// - most synthetic events bubble (including focus, blur, and change), except for scroll

// Event handlers in React vs JS
// - Attributes for event handlers are named using camelCase (onClick instead of onclick or click)
// - Default behavior can not be prevented by returning false (onl by using preventDefault())
// - Attach "Capture" if you need to handle during capture phase (onClickCapture)

//* IMPORTANT 138: Libraries vs frameworks: REACT

//NOTE: FRAMEWORKS: VUE, SVELTE, ANGULAR
// - Framworks include everything including HTTP requests, Styling, Routing, Form management, etc.

//NOTE: LIBRARY: React (JS based view library)
// -> Libraries need other external libraries for HTTP requests, styling, routing, form management, etc.

//NOTE: React 3rd party library ecosystem
// Routing -> REACT ROUTER / React location
// http requests -> JS fetch/ Axios
// Remote state management -> React query, SWR, APOLLO
// Global state management -> Context API, Redux, Zustand
// Styling -> CSS MOdules, styled coomponents, tailwindCSS, Sass/SCSS
// Form management -> React Hook form, formik
// animatioons/transitions -> framer motion, react spring
// UI Components -> MUI, chakra, Mantine

//NOTE: Frameworks built on top of React
// React frameworks offer many other features: server-side rendering (SSR), static site generation (SSG), better dev expereince (DX), etc. (full stack frameworks)
// -> Next.JS
// -> Remix
// -> Gatsby

//* IMPORTANT 139: Pratical Takeaways
// 1. A component is like a blueprint for a piece of UI that will eventually exist on the screen. When we "use" a component, React creates a component instance, which is like an actual physical manifestation of a component, containing props, state and more. a component intsace, when rendered, will return a React element.
// 2. "Rendering" only means calling component functions and calculating what DOM elements need to be inserted, deleted, or updated. it has nothing to do with wrting to the DOM, therefore each time a component instance is rendered and re-rendered, the func is called again.
// 3. Only the inital app render and state updates can cause a render, which happens for the entire application, not just one single component
// 4. When a component instance gets re-rendered, all its children will get re-rendered too! This doesn't mean that all children will get updated in the DOM, thanks to reconciliation, which checks whcih elements have actually chaned between 2 renders. But all this re-rendering can still have an impact on performance.
// 5. Diffing is how React decides which DOM elements need to be added or modified. IF, ebtween renders, a certain React element [stays at the same position in the element tree], the corresponding DOM element and component state will stay the same. If the [element changed to a different positon], or if it's a [differnt element type], the DOM element and state will be destroyed.
// 6. Giving elements a key prop allows React to distinguish between multiple component instances. [When a key stays the same across renders], the element is kep in the DOM. This is why we need to use keys in lists. [When we change the key between renders,] the DOM element will be destroyed and rebuilt. We use thsi as a [trick to reset state].
// 7. [Never declare a new component inside another component!] Doing so will re-create the nested component every time tha parent component re-renders. React will always see the nested component as [NEW], and therefore [RESET its STATE] each time the parent state is updated.

// *8. The logic that produces JSX output for a compoentn instance ("render logic") is [not allowed to produce any side effect:] no API calls, no timers, no object or variable mutations, no state updates. [side effects are allowed in event handlers and useEffect hooks]
/*
function MyComponent() {
  const [count, setCount] = useState(0);

  NOTE: 🚨 Side effect inside render - BAD! 
  if (count === 0) {
    setCount(5); // ❌ Updating state during render is illegal
  }

  return <h1>Count is {count}</h1>;
}
*/

/*
function MyComponent() {
  const [count, setCount] = useState(0);

  NOTE: 👍  Side effect inside useEffect (ALLOWED)
  useEffect(() => {
    if (count === 0) {
      setCount(5); // ✅ Safe here — only happens after first render
    }
  }, [count]);

  return <h1>Count is {count}</h1>;
} */

/*
function MyComponent() {
  const [count, setCount] = useState(0);

  NOTE: 👍  Side effect inside an event handler (ALLOWED)
  function handleClick() {
    setCount(count + 1); // ✅ Updating state inside an event handler is safe
  }

  return (
    <div>
      <h1>Count is {count}</h1>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}
*/

//* 9. The DOM is updated in teh commit phase, but not by React, but by a "renderer" called ReactDOM. That's why we always use to include both libraries in a React web app project. WE can use other rendered to use React on differnt platforms, for example to build mobile or native apps.

//* 10. multiple state updates inside an event handler func are [batched], so they happen all at once, causing only one re-render. This means we [cannot access a state variable immediately after updating it]: state updates are [ASYNCHRONOUS]. Since React 18, batching also happens in timeouts, promises, and native event handlers.

//* 11. When using events in event handlers, we get access to a [synthetic event object], not the browser's native object, so that [events work the same wat across all browsers]. the diff is that [most synthetic event bubble], including focus, blur, and change, which do not bubble as native browser events. Only scroll event does not bubble.

//* 12. [REACT IS A LIBRARY, NOT A FRAMEWORK]. This means that you can assemble your app using your fav 3rd partly libs. The downside is that you need to fnd and learn all these additional lib.
