import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function Step({ number, isActive }) {
  return <div className={isActive ? "active" : ""}>{number}</div>;
}

function App() {
  const [step, setStep] = useState(1);
  const maxStep = messages.length;

  //NOTE: TESTING
  const [test, setTest] = useState({ name: "Ethan" });

  const handlePrevious = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleNext = () => {
    if (step < maxStep) setStep((prev) => prev + 1);

    //! BAD
    // test.name = "John";
    setTest((prev) => ({ ...prev, name: "John" })); //*spreads the previous object and overwrites the name property
  };

  return (
    <>
      <div className="steps">
        <div className="numbers">
          {/* <div className={`${step >= 1 ? "active" : ""}`}>1</div>
          <div className={`${step >= 2 ? "active" : ""}`}>2</div>
          <div className={`${step >= 3 ? "active" : ""}`}>3</div> */}
          {Array.from({ length: maxStep }, (_, i) => (
            <Step key={i} number={i + 1} isActive={step >= i + 1} />
          ))}
        </div>

        <p className="message">
          Step {step}: {messages[step - 1]}
          {test.name}
        </p>

        <div className="buttons">
          <button
            onClick={handlePrevious}
            style={{ backgroundColor: "#7950f2", color: "#fff" }}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            style={{ backgroundColor: "#7950f2", color: "#fff" }}
          >
            Next
          </button>
        </div>
      </div>
    </>
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
