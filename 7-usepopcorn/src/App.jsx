import { useEffect, useState } from "react";
import StarRating from "./StarRating";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
// const average = (arr) =>
//   arr.length === 0 ? 0 : arr.reduce((acc, cur) => acc + cur, 0) / arr.length;

function NavBar({ children }) {
  return (
    <>
      <Logo />
      <nav className="nav-bar">{children}</nav>
    </>
  );
}

function NumResults({ movies }) {
  return (
    <>
      <p className="num-results">
        Found <strong>{movies.length}</strong> results
      </p>
    </>
  );
}

function Logo() {
  return (
    <>
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
    </>
  );
}

function Search({ query, setQuery }) {
  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </>
  );
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <div className="box">
        <button
          className="btn-toggle"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? "–" : "+"}
        </button>
        {isOpen && children}
      </div>
    </>
  );
}

function MovieList({ movies, onSelectMovie }) {
  // const [movies, setMovies] = useState(tempMovieData);
  return (
    <>
      <ul className="list list-movies">
        {movies?.map((movie) => (
          <Movie
            key={movie.imdbID}
            movie={movie}
            onSelectMovie={onSelectMovie}
          />
        ))}
      </ul>
    </>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
    <>
      <li onClick={() => onSelectMovie(movie.imdbID)}>
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>🗓</span>
            <span>{movie.Year}</span>
          </p>
        </div>
      </li>
    </>
  );
}

function MovieDetail({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState("");

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

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating: Number(userRating),
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie(); //? after adding a movie to a watched list, close it
  }

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

function Main({ children }) {
  return (
    <>
      <main className="main">{children}</main>
    </>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <>
      <div className="summary">
        <h2>Movies you watched</h2>
        <div>
          <p>
            <span>#️⃣</span>
            <span>{watched.length} movies</span>
          </p>
          <p>
            <span>⭐️</span>
            <span>{avgImdbRating.toFixed(2)}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{avgUserRating.toFixed(2)}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{avgRuntime} min</span>
          </p>
        </div>
      </div>
    </>
  );
}

function WatchedMoviesList({ watched, onDeleteWatched }) {
  return (
    <>
      <ul className="list">
        {watched.map((movie) => (
          <WatchedMovie
            key={movie.imdbID}
            movie={movie}
            onDeleteWatched={onDeleteWatched}
          />
        ))}
      </ul>
    </>
  );
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <>
      <li key={movie.imdbID}>
        <img src={movie.poster} alt={`${movie.title} poster`} />
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{movie.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{movie.runtime} min</span>
          </p>

          <button
            className="btn-delete"
            onClick={() => onDeleteWatched(movie.imdbID)}
          >
            X
          </button>
        </div>
      </li>
    </>
  );
}

const KEY = "6faae9f8";

function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState([]);

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
  }

  function handleDeleteWatched(id) {
    //returns all movies that do not match the current id, effectively removing the one you clicked on.
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

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

  //! Fetching data  in the render logic is a side effect (because it affects things outside the component, e.g., making a network request). React render phase must be pure: no fetch, no timers, no DOM mutations, no direct state changes!
  //? Only event handlers and useEffect (or other effect hooks) are allowed to cause side effects!
  //? "Rendering should just compute JSX based on the current state/props. Effects happen after the render.";
  useEffect(() => {
    // fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data.Search);
    //     setMovies(data.Search);
    //   });

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

      <Main>
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
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading....</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>❌</span> {message}
    </p>
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
