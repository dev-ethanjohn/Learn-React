// import spinach from "./pizzas/spinaci.jpg";

function Pizza(props) {
  console.log(props);
  return (
    <>
      <div className="pizza">
        <img src={props.photoName} alt={props.name} />

        <div>
          <h3>{props.name}</h3>
          <p>{props.ingredients}</p>
          <span>{props.price + 3}</span>
        </div>
      </div>
    </>
  );
}

export default Pizza;
