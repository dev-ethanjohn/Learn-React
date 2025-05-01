import { useEffect } from "react";

export function useKey(key, action) {
  // keypress
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }

    //* NO NEED OF useRef
    // handling a global side effect (keyboard event), so there's no DOM node you need to reference.
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [action, key]);
}
