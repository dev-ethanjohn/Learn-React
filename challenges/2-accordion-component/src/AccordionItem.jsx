// import { useState } from "react";

function AccordionItem({ children, num, title, isOpen, handleToggle, index }) {
  // const [isOpen, setIsOpen] = useState(false);

  // function handleToggle() {
  //   setIsOpen((isOpen) => !isOpen);
  // }

  return (
    <div
      className={`item ${isOpen ? "open" : ""}`}
      onClick={() => handleToggle(index)}
    >
      <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{children}</div>}{" "}
      {/*conditional if isOpen render the div */}
    </div>
  );
}

export default AccordionItem;
