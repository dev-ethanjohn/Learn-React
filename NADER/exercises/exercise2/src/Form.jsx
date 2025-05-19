import { useState } from "react";

function Form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [h1Text, setH1Text] = useState("");

  function handleFName(e) {
    setFirstName(e.target.value);
  }
  function handleLName(e) {
    setLastName(e.target.value);
  }
  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(firstName, lastName, email);
    setH1Text(`FirstName: ${firstName} Last Name: ${lastName} Email: ${email}`);
    setFirstName("");
    setLastName("");
    setEmail("");
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          type="text"
          onInput={handleFName}
          value={firstName}
        />
        <input
          name="lastName"
          type="text"
          onInput={handleLName}
          value={lastName}
        />
        <input name="email" type="text" onInput={handleEmail} value={email} />
        <button type="submit">Submit</button>
      </form>
      <h1>{h1Text}</h1>
    </>
  );
}

export default Form;
