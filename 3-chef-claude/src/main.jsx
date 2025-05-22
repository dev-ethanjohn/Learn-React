import { useRef, useState } from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromMistral } from "./ai";

export default function Main() {
  const [ingredients, setIngredients] = useState([]);
  const formRef = useRef();

  const [recipe, setRecipe] = useState(""); // store fetched recipe text
  const [loading, setLoading] = useState(false); // show loading state
  const [error, setError] = useState(null);

  function addIngredient(formData) {
    // event.preventDefault();
    // const formData = new FormData(event.currentTarget);
    // const newIngredient = formData.get("ingredient");

    const newIngredient = formData.get("ingredient")?.trim();
    if (!newIngredient) return;

    setIngredients((prev) => [...prev, newIngredient]);
    formRef.current?.reset();
  }

  async function fetchRecipe() {
    setLoading(true);
    setError(null);
    setRecipe(""); // clear old recipe
    try {
      const fetchedRecipe = await getRecipeFromMistral(ingredients);
      setRecipe(fetchedRecipe);
    } catch (err) {
      setError("Failed to fetch recipe. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <form
        // onSubmit={handleSubmit}
        // onSubmit={addIngredient}
        className="add-ingredient-form"
        ref={formRef}
        action={addIngredient}
      >
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button type="submit">Add ingredient</button>
      </form>

      {ingredients.length > 0 ? (
        <IngredientsList
          fetchRecipe={fetchRecipe}
          ingredients={ingredients}
          isLoading={loading}
        />
      ) : null}

      {loading && <p>Loading recipe...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {recipe ? <ClaudeRecipe recipe={recipe} /> : null}
    </main>
  );
}
