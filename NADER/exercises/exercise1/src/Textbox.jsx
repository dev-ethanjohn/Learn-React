import { useState } from "react";

function TextBox() {
  let [text, setText] = useState("");
  function handleInputChange(event) {
    setText(event.target.value);
  }
  return (
    <>
      <h1>{text}</h1>
      <input type="text" onInput={handleInputChange} />
    </>
  );
}

//* function reference not invoked immediately

export default TextBox;
