import AccordionItem from "./AccordionItem";

function Accordion({ data }) {
  return (
    <div className="accordion">
      {data.map((faq, index) => (
        <AccordionItem
          key={index}
          num={index}
          title={faq.title}
          text={faq.text}
        />
      ))}
    </div>
  );
}

export default Accordion;
