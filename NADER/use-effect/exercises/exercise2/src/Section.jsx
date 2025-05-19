import { useEffect, useState } from "react";

function Section() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    console.log("Section is rerendered");
  });

  useEffect(() => {
    const id = setTimeout(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearTimeout(id);
  }, [time]);
  return (
    <>
      <h1>Time on page: {time} seconds</h1>
    </>
  );
}

// Section rerenders when:
// 1. Home rerenders
// 2. On mount
// 3. When `time` state changes (from the setTimeout)

export default Section;
