import pizzaData from "./data";
import Pizza from "./Pizza";

function Menu() {
  //* NOTE: RENDERING A LIST
  // const pizzas = [];
  const pizzas = pizzaData;
  const numPizzas = pizzas?.length;

  return (
    <>
      <main className="menu">
        <h2>Our menu</h2>
        {numPizzas > 0 ? (
          <ul className="pizzas">
            {pizzas.map((pizza) => (
              <Pizza key={pizza.name} pizzaObj={pizza} />
            ))}
          </ul>
        ) : (
          <p>No pizzas available</p>
        )}
      </main>
    </>
  );
}

export default Menu;

// NOTE:
// We dont use if else cause it doesnt produce any value
