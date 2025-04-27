import { useState } from "react";
// NOTE: if too many props, PROVIDE GOOD DEFAULT VALUES

export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  messages = [],
  defaultRating = 0,
  onSetRating,
}) {
  const [rating, setRating] = useState(defaultRating); //rating on lciked
  const [tempRating, setTempRating] = useState(0); //temporary rating on hover

  function handleRating(rating) {
    setRating(rating);
    onSetRating(rating);
  }

  function handleTempRating(tempRating) {
    setTempRating(tempRating);
  }

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };

  return (
    <>
      <div style={containerStyle} className={className}>
        <div style={starContainerStyle}>
          {Array.from({ length: maxRating }, (_, i) => (
            <Star
              key={i}
              onRate={handleRating}
              index={i}
              // If there's a temporary rating (hover), show that.
              // If not, fall back to the real clicked rating.
              full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
              setTempRating={handleTempRating}
              color={color}
              size={size}
            />
          ))}
        </div>
        <p style={textStyle}>
          {messages.length === maxRating
            ? messages[tempRating ? tempRating - 1 : rating - 1]
            : tempRating || rating || ""}
        </p>
      </div>
    </>
  );
}

function Star({ onRate, index, full, setTempRating, color, size }) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
  };

  return (
    <>
      {/* NOTE* Summary of why we pass the callback (handleRating) TO THE LAST COMPONENT THAT RECEIVES THE PROP handler: - Avoids
      creating a new inline function (e.g., () => handleRating(i + 1)) on every
      render. - Keeps the function reference (identity) stable between renders.
      - Stable props allow better optimization, especially when using
      React.memo() on child components. - Alone, this does not prevent
      re-renders — React.memo() is needed on the child (Star) component to
      actually skip re-rendering. - This setup makes the component tree lighter
      and avoids unnecessary work during React's diffing process. */}
      <span
        role="button"
        style={starStyle}
        onClick={() => onRate(index + 1)}
        onMouseEnter={() => setTempRating(index + 1)}
        onMouseLeave={() => setTempRating(0)}
      >
        {full ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill={color}
            stroke={color}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke={color}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        )}
      </span>
    </>
  );
}

// putting this outside prevent thsi to be rerender alongside with the StarRating component
const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
};
