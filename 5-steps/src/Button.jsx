function Button({ children, textColor, bgColor, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {/* <div>Text inside Button component: {text}</div> */}
      {children}
    </button>
  );
}

export default Button;
