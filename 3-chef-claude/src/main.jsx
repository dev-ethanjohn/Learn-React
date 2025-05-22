import { useState } from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";

export default function Main() {
  const [ingredients, setIngredients] = useState([]);
  const [recipeShown, setRecipeShown] = useState(false);

  /**
   *
   * 2. Move the list of ingredients <section> into its
   *    own IngredientsList component.
   *
   * While you're considering how to structure things, consider
   * where state is, think about if it makes sense or not to
   * move it somewhere else, how you'll communicate between
   * the parent/child components, etc.
   *
   * The app should function as it currently does when you're
   * done, so there will likely be some extra work to be done
   * beyond what I've listed above.
   */

  function addIngredient(formData) {
    // event.preventDefault();
    // const formData = new FormData(event.currentTarget);
    // const newIngredient = formData.get("ingredient");

    const newIngredient = formData.get("ingredient");
    console.log(newIngredient);

    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  function toggleRecipe() {
    setRecipeShown((prev) => !prev);
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

      {ingredients.length > 0 ? (
        <IngredientsList
          toggleRecipe={toggleRecipe}
          ingredients={ingredients}
        />
      ) : null}

      {recipeShown ? <ClaudeRecipe /> : null}
    </main>
  );
}
