// import spinach from "./pizzas/spinaci.jpg";

function Pizza({ pizzaObj }) {
  // if (pizzaObj.soldOut) return null;
  return (
    <>
      <li className={`pizza ${pizzaObj.soldOut && "sold-out"}`}>
        <img src={pizzaObj.photoName} alt={pizzaObj.name} />

        <div>
          <h3>{pizzaObj.name}</h3>
          <p>{pizzaObj.ingredients}</p>
          <span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price + 3}</span>
        </div>
      </li>
    </>
  );
}

export default Pizza;
