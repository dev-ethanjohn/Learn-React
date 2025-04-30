import { useEffect, useRef } from "react";

function Search({ query, setQuery }) {
  // useEffect(() => {
  //   const el = document.querySelector(".search");
  //   console.log(el);
  //   el.focus();
  // }, []);

  const inputEl = useRef(null); //* null for DOM normally

  useEffect(() => {
    function handleFocus(e) {
      if (e.code === "Enter") {
        if (document.activeElement === inputEl.current) return; //* avoid input getting cleared

        inputEl.current.focus();
        setQuery("");
      }
    }
    document.addEventListener("keydown", handleFocus);
    return () => removeEventListener("keydown", handleFocus);
  }, [setQuery]);

  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
      />
    </>
  );
}

export default Search;
