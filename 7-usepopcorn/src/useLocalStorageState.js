import { useEffect, useState } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(() => {
    //* must be pure func (no arg)
    // *should not call a function inside useState
    // Pass a lazy initializer to avoid re-reading localStorage on every render
    // This runs only once on initial mount
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState; //* initial state is empty array []
  });

  //* NOTE LOCAL STORAGE inside useEffect
  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(value));
  }, [value, key]); //* The watched dependency already contains the updated array from

  return [value, setValue];
}
