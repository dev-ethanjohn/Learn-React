import globe from "../assets/globe.png";

export default function Header() {
  return (
    <>
      <header>
        <img src={globe} alt="" />
        <h1>My travel journal</h1>
      </header>
    </>
  );
}
