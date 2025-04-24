import { useState } from "react";

export default function Main() {
  const [ingredients, setIngredients] = useState([]);

  const ingredientsListItems = ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));

  function addIngredient(formData) {
    // event.preventDefault();
    // const formData = new FormData(event.currentTarget);
    // const newIngredient = formData.get("ingredient");

    const newIngredient = formData.get("ingredient");
    console.log(newIngredient);

    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  return (
    <main>
      <form
        // onSubmit={handleSubmit}
        className="add-ingredient-form"
        action={addIngredient}
      >
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>
      <ul>{ingredientsListItems}</ul>
    </main>
  );
}
