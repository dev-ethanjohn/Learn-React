import { useEffect, useState } from "react";

const KEY = "6faae9f8";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  //! Fetching data  in the render logic is a side effect (because it affects things outside the component, e.g., making a network request). React render phase must be pure: no fetch, no timers, no DOM mutations, no direct state changes!
  //? Only event handlers and useEffect (or other effect hooks) are allowed to cause side effects!
  //? "Rendering should just compute JSX based on the current state/props. Effects happen after the render.";
  useEffect(() => {
    // callback?.(); //* only be called if callback exists
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");
        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found"); //*if query is invalid

        setMovies(data.Search);
        setError("");
      } catch (error) {
        // console.error(error);

        //* custom message if (offline)
        if (error.message === "Failed to fetch") {
          setError(
            "Network error: Could not connect to the server. Please check your connection."
          );
        } else {
          setError(error.message);
        }

        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        // *this always run
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    // handleCloseMovie();
    fetchMovies();

    // cleanup
    return function () {
      controller.abort();
    };
  }, [query]); //* ✅ Empty dependency array = run once on mount

  return { movies, isLoading, error };
}
