import spinach from "./pizzas/spinaci.jpg";

function Pizza() {
  return (
    <>
      <h2>Pizza</h2>
      <p>Tomato, mozarella, and ricotta cheese</p>
    </>
  );
}

function App() {
  // console.log(pizzaData);
  return (
    <>
      <h1>Hello React!</h1>
      <img src={spinach} alt="" />
      <Pizza />
    </>
  );
}

export default App;
