import { useEffect, useRef, useState } from "react";
import Box from "./Box";
import ErrorMessage from "./Components/ErrorMessage";
import Loader from "./Components/Loader";
import MainContent from "./MainContent";
import MovieList from "./MovieList";
import NavBar from "./NavBar";
import NumResults from "./NumResults";
import Search from "./Search";
import StarRating from "./StarRating";
import tempMovieData from "./tempMovieData";
import WatchedMoviesList from "./WatchedMoviesList";
import WatchedSummary from "./WatchMov/WatchedSummary";

// const average = (arr) =>
//   arr.length === 0 ? 0 : arr.reduce((acc, cur) => acc + cur, 0) / arr.length;

const KEY = "6faae9f8";

function MovieDetail({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);

  // check if you already rated this movie (added already to the watched list)
  const watchedIds = new Set(watched.map((movie) => movie.imdbID));
  const isWatched = watchedIds.has(selectedId);
  // console.log(isWatched);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title = "Loading...",
    Year: year = "N/A",
    Poster: poster = "https://via.placeholder.com/300x450",
    Runtime: runtime = "N/A",
    imdbRating = "N/A",
    Plot: plot = "No plot available.",
    Released: released = "N/A",
    Actors: actors = "N/A",
    Director: director = "N/A",
    Genre: genre = "N/A",
  } = movie;

  // !
  // if (imdbRating > 8) return <p>Greatest ever!</p>;
  // if (imdbRating > 8) [isTop, setIsTop] = useState(true);

  // ?
  // const [isTop, setIsTop] = useState(imdbRating > 8);
  // console.log(isTop);
  // useEffect(
  //   function () {
  //     setIsTop(imdbRating > 8);
  //   },
  //   [imdbRating]
  // );

  //* ✅ (DERIVED STATE)
  // const isTop = imdbRating > 8;
  // console.log(isTop);

  // const [avgRating, setAvgRating] = useState(0); //?

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating: Number(userRating),
      countRatingDecisions: countRef.current,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie(); //? after adding a movie to a watched list, close it

    // setAvgRating(Number(imdbRating)); //?
    // setAvgRating((aveRating) => (aveRating + userRating) / 2); //?
  }

  useEffect(() => {
    if (userRating) {
      countRef.current = countRef.current + 1;
    }
  }, [userRating]);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();

        if (data.Response === "False") {
          throw new Error(data.Error || "Failed to fetch movie data");
        }

        setMovie(data);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        //* custom message if (offline)
        if (error.message === "Failed to fetch") {
          setError(
            "Network error: Could not connect to the server. Please check your connection."
          );
        } else {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedId) {
      getMovieDetails();
    }
  }, [selectedId]);

  useEffect(() => {
    if (!title) return; //* stop immeditaley if undefined/null

    const defaultTitle = "usePopcorn";
    document.title = `Movie | ${title}`;

    return function () {
      document.title = defaultTitle;
    };
  }, [title]);

  // keypress
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === "Escape") {
        onCloseMovie();
      }
    }

    //* NO NEED OF useRef
    // handling a global side effect (keyboard event), so there's no DOM node you need to reference.
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCloseMovie]);

  return (
    <div className="details">
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {!isLoading && !error && (
        <>
          <header>
            <button onClick={onCloseMovie} className="btn-back">
              ←
            </button>
            <img src={poster} alt={`Poster of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} • {runtime}
              </p>
              <p>{genre}</p>
              <p>
                ⭐️
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          {/* <p>{avgRating}</p> */}

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to List
                    </button>
                  )}
                </>
              ) : (
                <p>You already rated this movie {watchedUserRating} ⭐️</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function App() {
  const [movies, setMovies] = useState(tempMovieData);
  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useState(() => {
    //* must be pure func (no arg)
    // *should not call a function inside useState
    // Pass a lazy initializer to avoid re-reading localStorage on every render
    // This runs only once on initial mount
    const storedWatched = localStorage.getItem("watched");
    return storedWatched ? JSON.parse(storedWatched) : [];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const [selectedId, setSelectedId] = useState(null);
  // const tempQuery = "interstellar";

  function handleSelectMovie(id) {
    setSelectedId((selectedID) => (id === selectedID ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);

    //NOTE:* LOCAL STORAGE inside handler func
    // setWatched((prevWatched) => {
    //   const updated = [...prevWatched, movie];
    //   localStorage.setItem("watched", JSON.stringify(updated));
    //   return updated;
    // });
  }
  function handleDeleteWatched(id) {
    //returns all movies that do not match the current id, effectively removing the one you clicked on.
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  //* NOTE LOCAL STORAGE inside useEffect
  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]); //* The watched dependency already contains the updated array from

  //! Fetching data  in the render logic is a side effect (because it affects things outside the component, e.g., making a network request). React render phase must be pure: no fetch, no timers, no DOM mutations, no direct state changes!
  //? Only event handlers and useEffect (or other effect hooks) are allowed to cause side effects!
  //? "Rendering should just compute JSX based on the current state/props. Effects happen after the render.";
  useEffect(() => {
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

    handleCloseMovie();
    fetchMovies();

    // cleanup
    return function () {
      controller.abort();
    };
  }, [query]); //* ✅ Empty dependency array = run once on mount

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <MainContent>
        {/* <Box element={<MovieList movies={movies} />} />
        <Box
          element={
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          }
        /> */}
        {/* {isLoading && <p className="loader">Loading...</p>}
        {error && <p className="error">{error}</p>} */}

        <>
          <Box>
            {isLoading && <Loader />}
            {error && <ErrorMessage message={error} />}

            {!isLoading && !error && (
              <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
            )}
          </Box>
          <Box>
            {selectedId ? (
              <MovieDetail
                selectedId={selectedId}
                onCloseMovie={handleCloseMovie}
                onAddWatched={handleAddWatched}
                watched={watched}
              />
            ) : (
              <>
                <WatchedSummary watched={watched} />
                <WatchedMoviesList
                  watched={watched}
                  onDeleteWatched={handleDeleteWatched}
                />
              </>
            )}
          </Box>
        </>
      </MainContent>
    </>
  );
}

export default App;

//* IMPORTANT: 103: SPLITTING UI into COMPONENTS
// 4 CRITERIA
// 1. Logical separation of content / layout
// 2. Reusability
// 3. Responsibilities/ complexity
// 4. personal coding style (subjective)

//* IMPORTANT: 109 Component categories
// 1. Stateless/ Presentational components
// - No state
// - Can receive props and simply present received data or other content
// - usually small and reusable

// 2. Stateful components
// - have state
// - can still be reusable

// 3. Structural components
// - "pages"/ "layout" or "screens" of the app
// - result of composition
// - can be huge and nonreusable (but don't have to)

//* IMPORTANT:111 Component composition
// Combining diff components using `children prop` (or explicitly defined props)
// 1. Create highl reusable and flexible components
// 2. Fix prop drilling (great for layouts)

//* IMPORTANT:111 Component lifecycle
// 1. Mounted (Born) / initial render -> component instance is rendered for the first time. Fresh state and props are created. The component is born.
// 2. Re-render (optional only) -> Happens when [state changes], [props changed], [parent re-renders] [context changes]
// 3. Unmounted (Dies) -> component instance is destroyed and removed. state and props are destroyed.

// NOTE: We an define code to run at these specific points in time

//* IMPORTANT:114 A first look at Effects
// A SIDE EFFECT -> any interation between a react component and the world outside the component. We can also think fo a side as "code that actually does something." Examples, data fetching, setting up subscriptions, setting up timers, manually accessing the DOM, etc.

//  2 WAYS SIDE EFFECTS CAN BE MADE
// 1. EVENT HANDLERS -> triggered by Events
// 2. EFFECTS (useEFFECT) -> Triggered by rendering

// NOTE: EFFECTS allow us to write code that will run at different moment: mount, re-render, or unmount.

//NOTE: EVENT HANDLERS
// -> Executed when the corresponing event happends
// -> Used to react to an event
//IMPORTANT PREFERRED WAY of CREATING SIDE EFFECTS

//NOTE: EFFECTS (useEFFECT)
//  -> Executed after the compount mounts (initial render), and after subsequent re-renders (according to dependency array)
// -> Used to keep a component synchronized with some external system (APIs).

//* IMPORTANT:148 useEffect DEPENDENCY ARRAY
// By default, effects run after every render. We can prevent that by passing a dependency array
// Without the dependency array, REact does not know when to run the effect
// Each time one of the dependencies changes, the effect will be executed again
//NOTE: every state variable and prop used inside the effect must be included in the dependency array

// useEffect is like an event listener that is listening for one dependency to change. Whenever a dependency change, it will execute the effect again (OR THAT COMPONENT IS RE-RENDERED).
// Effects react to udpates to states and props used inside the effect (dependencies). So [effects are "reactive"] (like state updates re-rendering the UI)
//* COMPONENT STATE/PROPS -> SYNCHRONIZE WITH -> EXTERNAL SYSTEM (SIDE EFFECTS)

/* 
  useEffect(() => {
    //*runs after browser paints the screen
    console.log("After initial render");
  }, []);

  useEffect(() => {
    //*runs after browser paints the screen
    console.log("After every render");
  });

  useEffect(() => {
    //*runs after browser paints the screen
    console.log("D");
  }, [query]); //*sync with state/prop, here with query

  console.log("During render"); //* runs during render
  */

//NOTE: TAKEAWAY: We can use the dependency array to run effects when the component renders or re-renders

// EXAMPLE 1:
/* useEffect(finally, [x, y, z]); */
// SYNCHRONIZATION: EFFECT SYNCHRONIZES WITH X, Y, AND Z
// LIFECYCLE: Runs on [mount] and [re-renders] triggered by updating x, y, or z.

// EXAMPLE 2
/* useEffect(fn, []) */
// SYNCHRONIZATION: Effect synchronizes with [no state/ props]
// LIFECYCLE: Runs only on [mount] (INITIAL RENDER)

// EXAMPLE 3
/* useEffect(fn) */
// SYNCHRONIZATION: Effect snchronizes with everything
// LIFECYCLE: Runs on every render (BAD!)

//NOTE: When are Effects executed?
// 1. Mount (initial render) -> commit -> browser paint
// 2. EFFECT ARE EXECUTED AFTER THE BROWSER "PAINTS" the component instance on the screen. (Not immedtialey after render). [If an effect sets state, an additional render will be required. CAN BE QUITE PROBLEMATIC!]

// layout Effect -> runs before the browser paints the screen. NOT ALWAYS USED

//* IMPORTANT:148 useEffect cleanup function
//* function that we can return from an effect (OPTIONAL)
//* Runs on 2 diff occassions:
// 1. Before the effect is executed again
// 2. After a component has unmounted
// * Necessary whenever the side effect keeps happening after the component has been re-rendered or unmounted. EX: HTTP request (race condition) -> potential cleanup (CANCEL REQUEST)
// * Each effect should only do 1 thing (1 side effect)

// COMPONENT RENDERS* => Execute effect of dependency array includes updated data
// COMPONENT UNMOUNTS* =? Execute cleanup function

//* IMPORTANT:160 React Hooks and their rules
// Special built-in functions that allow us to "hook" into React internals
// - Creating and accesing [state] from fiber tree
// -Registering [side effects] in Fiber tree
//  - Manual [DOM selections]
// - Always start with "use" (useState, useEffect, etc)
// Enable easy [reusing of non-visual logic], we can compose multiple hooks into our own [custom hooks]
//  Give [function components] the ability to own sate and run side effects at diff lifecycle points.

// MOST USED
// 1. useState
// 2. useEffect
// 3. useReducer
// 4. useContext

// LESS USED
// 1. useRef
// 2. useCallback
// 3. useMemo
// 4. useTransition
// 5. useDeferredValue
// useLayoutEffect
// useDebugValue
// useImperativeHandle
// useId

// only for libraries
// useSyncExternalStore
// useInsertionEffect

//NOTE: Rules of HOOKS
// 1. Only call hooks at top level
// - Do not call hooks inside [conditions], [loops], [nested functions], or after an [early return]
// - This is necessary to ensure that hooks are always called in the [the same order]

// 2. Only call hooks from React functions
// - Can call hooks inside a [function component] or a [custom hook]

// NOTE: Hooks rely on [CALL ORDER]. Can easily identify the state of each hook. Hooks need to call in teh same order on every render. A->B->C => NEXT render A-> B -> C

//* IMPORTANT:164 useState Summary
//NOTE: 1. CREATING STATE
// A. Simple
/*
const [count, setCount] = useState(0);
*/

// B. Based on function (lazy evaluation)
/*
const [count, setCount] = useState(() => {
  const stored = localStorage.getItem("count");
  return stored ? JSON.parse(stored) : 0;
});
*/

// NOTE: 2. UPDATING STATE (do not mutate objects/arrays -> replace them instead)
// A. Simple
/*
setCount(1000);
*/

// B. Functional update (recommended when the new state depends on the previous one)
/*
setCount((prevCount) => prevCount + 1)
*/

// ✅ For objects:
/*
setUser((prevUser) => ({
  ...prevUser,
  name: "Updated Name",
}));
*/

// ✅ For arrays (e.g., adding an item):
/*
setItems((prevItems) => [...prevItems, newItem]);
*/

// ✅ For arrays (e.g., removing an item by id):
/*
setItems((prevItems) => prevItems.filter(item => item.id !== idToRemove));
*/

// * IMPORTANT: useRef Introduction (React Hook #164)

// useRef creates a "box" (object) with a `.current` property.
// - This property is mutable (can be changed without re-rendering).
// - It is persisted across renders (unlike normal variables which reset).

// 🔑 2 Common Use Cases:

// 1. Storing values across renders without triggering re-renders
//    Examples: previous state, timers (setTimeout ID), counters, etc.

// 2. Referencing and manipulating DOM elements
//    Example: inputRef.current.focus(), measuring dimensions, etc.

// 💡 Ref is for "data that is NOT rendered":
// - You can safely read or write `.current` inside effects, handlers, or event callbacks.
// - DO NOT use `.current` inside the render logic for anything that affects rendering — use `useState` for that.

// STATE VS REF
// ✅ Both State and Ref persist across renders

// ✅ State triggers re-renders when updated
// ❌ Ref does NOT trigger re-renders when updated (good for non-UI data)

// ✅ State is immutable (you replace the value, not mutate it)
// ❌ Ref is mutable (you can change .current directly)

// ✅ State updates are asynchronous (batched and scheduled)
// ❌ Ref updates are synchronous (immediate)
