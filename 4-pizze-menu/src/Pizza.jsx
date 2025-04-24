// import spinach from "./pizzas/spinaci.jpg";

function Pizza(props) {
  // console.log("hello");
  return (
    <>
      <li className="pizza">
        <img src={props.pizzaObj.photoName} alt={props.pizzaObj.name} />

        <div>
          <h3>{props.pizzaObj.name}</h3>
          <p>{props.pizzaObj.ingredients}</p>
          <span>{props.pizzaObj.price + 3}</span>
        </div>
      </li>
    </>
  );
}

export default Pizza;
