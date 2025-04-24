import Pizza from "./Pizza";
import funghi from "./pizzas/funghi.jpg";
import spinaci from "./pizzas/spinaci.jpg";

function Menu() {
  return (
    <>
      <main className="menu">
        <h2>Our menu</h2>
        <Pizza
          name="Pizza Spinach"
          ingredients="Tomato, mozarella, spinach, and ricotta cheese"
          photoName={spinaci}
          price={10}
        />

        <Pizza
          name="Pizza Funghi"
          ingredients="Tomato, mushrooms"
          photoName={funghi}
          price={12}
        />
      </main>
    </>
  );
}

export default Menu;
