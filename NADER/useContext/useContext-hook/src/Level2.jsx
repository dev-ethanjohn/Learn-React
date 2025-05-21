import Level1 from "./Level1";
function Level2() {
  console.log("level 2 is rerendering");
  return (
    <>
      <h2>Level 2</h2>
      <Level1 />
    </>
  );
}

export default Level2;
