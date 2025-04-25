import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Charger", quantity: 12, packed: false },
// ];

function App() {
  const [items, setItems] = useState([]); //* LIFT UP THE STATE To common parent component

  const handleAddItems = (item) => {
    setItems((prev) => [...prev, item]);
  };

  const handleDeleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggleItem = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  return (
    <>
      <div className="app">
        <Logo />
        <Form onAddItems={handleAddItems} />
        <PackingList
          items={items}
          onDeleteItem={handleDeleteItem}
          onToggleItem={handleToggleItem}
        />
        <Stats items={items} />
      </div>
    </>
  );
}

function Logo() {
  return (
    <>
      <h1>✈️ Far Away</h1>
    </>
  );
}

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

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => {
          return (
            <Item
              key={item.id}
              item={item}
              onDeleteItem={onDeleteItem}
              onToggleItem={onToggleItem}
            />
          );
        })}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  // NOTE: EARLY EXIT
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding items to your packing list 🚀</em>
      </p>
    );

  //NOTE: DERIVED STATES
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;

  const percentage =
    numItems === 0 ? 0 : Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go!"
          : `You have ${numItems} items on your list, and you already packed
        ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}

export default App;

// IMPORTANT: 74: STATE VS PROPS
// NOTE: STATE
// 1. Internal data, owned by component
// 2. Component "memory"
// 3. Can be updated by the component itself
// 4. Updating state causes component to re-render
// 5. Used to make components interactive

// NOTE: PROPS
// 1. Extenal data, owned by parent component
// 2. SImilar to func param
// 3. Read only
// 4. Receiving new props causes component to re-render. Usually when the paren'ts state has been updated
// 5. Used by parent to configure child component ("settings")

//* IMPORTANT:  78: THINKING IN REACT
// 1. Break the UI into components and establish the component tree
// 2. Build a static version in REACT (without state)
// 3. Think about STATE:
// - when to use state
// - types of state: local vs global
// - where to place each piece of state
// 4. Establish data flow
// - one-way data flow
// - child-to-parent communication
// - accessing global state

// IMPORTANT 79: STATE MANAGEMENT
// A. TYPE OF STATE: LOCAL VS GLOBAL
// NOTE: LOCAL STATE
// - State needed only by 1 or few components
// - state that is defined in a component and only that component and child components ahve access to it (by passing via props)

// NOTE: GLOBAL STATE
//  - state that many components might need
// - shared state that is accessible to every component in the app (CONTEXT API / REDUX)

// IMPORTANT 84: Derived state
// State that is computed from existing piece of state or from props
