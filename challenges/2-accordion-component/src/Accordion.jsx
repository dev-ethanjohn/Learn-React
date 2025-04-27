import { useState } from "react";
import AccordionItem from "./AccordionItem";

function Accordion({ data }) {
  const [openIndex, setOpenIndex] = useState(null); // null = none open

  function handleToggle(index) {
    setOpenIndex((curIndex) => (curIndex === index ? null : index));
    // If clicked again, close it
  }
  return (
    <div className="accordion">
      {data.map((faq, index) => (
        <AccordionItem
          key={index}
          num={index}
          title={faq.title}
          isOpen={openIndex === index}
          handleToggle={handleToggle}
          index={index}
        >
          {faq.text}
        </AccordionItem>
      ))}
    </div>
  );
}

export default Accordion;
