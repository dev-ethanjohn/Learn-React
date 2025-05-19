import { useEffect, useRef, useState } from "react";

function GuessNumber() {
  const inputRef = useRef(null); // for accessing input field
  const answerRef = useRef(null); // for storing the correct number
  // const resultRef = useRef(null);
  const [result, setResult] = useState("");

  useEffect(() => {
    // Generate a random number from 1 to 10 once when component mounts
    answerRef.current = Math.floor(Math.random() * 10) + 1;
    console.log("Answer is", answerRef.current);
  }, []);

  function handleGuess() {
    const guess = parseInt(inputRef.current.value);
    const correct = answerRef.current;

    if (guess === correct) {
      setResult("🎉 Correct!");
    } else {
      setResult(`❌ Incorrect. Try again!`);
    }

    inputRef.current.value = "";
  }

  return (
    <>
      <input type="text" ref={inputRef} placeholder="Guess a number 1-10" />
      <button onClick={handleGuess}>Guess!</button>
      <p>{result}</p>
    </>
  );
}

export default GuessNumber;
