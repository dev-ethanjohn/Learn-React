import { useEffect, useState } from "react";

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

function Search() {
  const [query, setQuery] = useState("");
  return (
    <>
      {" "}
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

// function WatchedBox() {
//   const [watched, setWatched] = useState(tempWatchedData);
//   const [isOpen2, setIsOpen2] = useState(true);

//   return (
//     <>
//       {" "}
//       <div className="box">
//         <button
//           className="btn-toggle"
//           onClick={() => setIsOpen2((open) => !open)}
//         >
//           {isOpen2 ? "–" : "+"}
//         </button>
//         {isOpen2 && (
//           <>
//             <WatchedSummary watched={watched} />
//             <WatchedMoviesList watched={watched} />
//           </>
//         )}
//       </div>
//     </>
//   );
// }

function MovieList({ movies }) {
  // const [movies, setMovies] = useState(tempMovieData);
  return (
    <>
      <ul className="list">
        {movies?.map((movie) => (
          <Movie key={movie.imdbID} movie={movie} />
        ))}
      </ul>
    </>
  );
}

function Movie({ movie }) {
  return (
    <>
      <li key={movie.imdbID}>
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
            <span>{avgImdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{avgUserRating}</span>
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

function WatchedMoviesList({ watched }) {
  return (
    <>
      <ul className="list">
        {watched.map((movie) => (
          <WatchedMovie key={movie.imdbID} movie={movie} />
        ))}
      </ul>
    </>
  );
}

function WatchedMovie({ movie }) {
  return (
    <>
      <li key={movie.imdbID}>
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
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
        </div>
      </li>
    </>
  );
}

const KEY = "6faae9f8";

function App() {
  const [movies, setMovies] = useState(tempWatchedData);
  const [watched] = useState(tempWatchedData);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const query = "interstellar";

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
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );
        if (!res.ok) throw new Error("Something went wrong...");
        const data = await res.json();
        console.log(data);
        if (data.Response === "False") throw new Error("Movie not found");
        setMovies(data.Search);
      } catch (error) {
        console.error(error);
        // custom message
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

    fetchMovies();
  }, []); //* ✅ Empty dependency array = run once on mount

  return (
    <>
      <NavBar>
        <Search />
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
            {error && <p className="error">{error}</p>}

            {!isLoading && !error && <MovieList movies={movies} />}
          </Box>
          <Box>
            <WatchedSummary watched={watched} />
            <WatchedMoviesList watched={watched} />
          </Box>
        </>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading....</p>;
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
// -> Used to keep a component synchronized with some external system.
