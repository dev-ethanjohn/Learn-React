import { useState } from "react";
import Button from "./Button";
import Step from "./Step";
import getButtons from "./buttonConfig";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App() {
  const [step, setStep] = useState(1);
  const maxStep = messages.length;
  const [isOpen, setIsOpen] = useState(true);

  //NOTE: TESTING
  // const [test, setTest] = useState({ name: "Ethan" });

  const handlePrevious = () => {
    // if (step > 1) setStep(step - 1) //!updating state based on current state
    if (step > 1) setStep((prevStep) => prevStep - 1); //* updating state based on previous/recent value
  };

  const handleNext = () => {
    if (step < maxStep) setStep((prevStep) => prevStep + 1);

    // test.name = "John"; //! BAD
    // setTest((prev) => ({ ...prev, name: "John" })); //*spreads the previous object and overwrites the name property
  };

  const handleOpen = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <>
      <button onClick={handleOpen} className="close">
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            {/* <div className={`${step >= 1 ? "active" : ""}`}>1</div>
          <div className={`${step >= 2 ? "active" : ""}`}>2</div>
          <div className={`${step >= 3 ? "active" : ""}`}>3</div> */}
            {Array.from({ length: maxStep }, (_, i) => (
              <Step key={i} number={i + 1} isActive={step >= i + 1} />
            ))}
          </div>

          {/* 
          <p className="message">
            Step {step}: {messages[step - 1]}
          </p> */}
          <StepMessage step={step}>
            {messages[step - 1]}
            <div className="buttons">
              <Button
                onClick={() => alert(`Learn how to ${messages[step - 1]}`)}
                bgColor="#333"
                textColor="#fff"
              >
                <span>🔥</span> Start Now
              </Button>
            </div>
          </StepMessage>

          <div className="buttons">
            {getButtons(handlePrevious, handleNext).map((btn, index) => (
              <Button key={index} {...btn}>
                {btn.text === "Previous" && <span>⏮️ </span>}
                {btn.text}
                {btn.text === "Next" && <span> ⏭️</span>}
              </Button>
            ))}
          </div>
        </div>
      )}{" "}
    </>
  );
}

function StepMessage({ step, children }) {
  return (
    <div className="message">
      <h3 className="step">Step {step}</h3>
      {children}
    </div>
  );
}

export default App;

//* IMPORTANT: 59 WHat is state?
// Data that a component can hold over tie, necessary for info that it needs to remember throughout the app's lifecycle. (COMPONENT'S MEMORY)
// State vairbale /piece of state: A single variable in a component (component state)
//NOTE: Updating component state triggers React to RE-RENDER the component
// stATE keeps the data and UI in sync.

// State allows dev to UPDATE THE COMPONENT'S VIEW (RERENDER)
// State allows dev to PERSIST LOCAL VARIABLES BETWEEN RENDERS

//* IMPORTANT: 62 The mechanic of state
// 1. No DOM manipulation (declarative)
// 2. A view is updated by re-rendering the component
// 3. A component is rerendered when its state is updated
// NOTE: SO, TO UPDATE A VIEW, WE UPDATE STATE
// NOTE: REACT, REACTS TO STATE CHANGES BY RE-RENDERING THE UI

//* IMPORTANT: 66 State guidelines
//NOTE: Each compoennt has and manages its own state, no matter how many times we render the same component

// 1. Use a state variable for any data that teh component should keep track of ("remember") over time. This is data that will change at some point. IN JS, let, [] or {}
// 2. Whenever you want something in the component to be dynamic, create a piece of state related to that "thing" should change. Ex: A modal window can be open or closed. So we create a state variable `isOpen` that tracks whether the modal is open or not. On `isOpen` = `true` we display the window, on `isOpen = `false` we hide it.
// 3. If you want to change the way a component looks, or the data it displays, update its state. This is usually happens in an event handler function.
// 4. When building a component, imagine its view as a reflection of state changing over time.
// 5. For data hat should not trigger component re-renders, dont use state. Use a regular variable.

//* IMPORTANT 90: children Props
//1. Allows us to pass JSX into components (besides reg props)
// 2.Make components reusable (component contents)
// 3.USeful for generic componenst that don't know their content before being used (modal)
// NOTE: "children = whatever I write between <Component>...</Component>, which gets inserted into {children}.";
