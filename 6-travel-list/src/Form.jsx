import { useState } from "react";

function Form({ onAddItems }) {
  // const [description, setDescription] = useState("Test");
  // const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({ description: "", quantity: 1 });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newValue = name === "quantity" ? parseInt(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description) return;

    const newItem = {
      description: formData.description,
      quantity: formData.quantity,
      packed: false,
      id: Date.now(),
    };

    console.log(newItem);

    onAddItems(newItem); //* Communicate with the parent (SEND data back to App parent)

    // NOTE: RESET to default after form submits
    setFormData({ description: "", quantity: 1 });
  };

  //* IMPORTANT: ALTERNATIVE: Extract form data using FormData API
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Create a FormData object from the form
  //   const formData = new FormData(e.target);

  //   // Extract values from the FormData object
  //   const description = formData.get("description");
  //   const quantity = parseInt(formData.get("quantity"), 10);

  //   // Validate the description field
  //   if (!description) return;

  //   // Create a new item object
  //   const newItem = {
  //     description,
  //     quantity,
  //     packed: false,
  //     id: Date.now(),
  //   };

  //   console.log(newItem); // Log the new item for debugging

  //   // Reset the form fields to their default values
  //   e.target.reset();
  // };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <h3>What do you need for you 😍 trip?</h3>
      <select value={formData.quantity} onChange={handleChange} name="quantity">
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}{" "}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={formData.description}
        onChange={handleChange}
        name="description"
      />
      <button>Add</button>
    </form>
  );
}

export default Form;
