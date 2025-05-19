function Button({ setLoggedInText }) {
  function handleClick() {
    setLoggedInText((prev) =>
      prev === "Logged In" ? "Logged Out" : "Logged In"
    );
  }

  return (
    <>
      <button onClick={handleClick}>Toggle login</button>
    </>
  );
}

export default Button;
