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
