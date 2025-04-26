import { useState } from "react";
import Form from "./Form";
import Logo from "./Logo";
import PackingList from "./PackingList";
import Stats from "./Stats";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Charger", quantity: 12, packed: false },
// ];

function App() {
  const [items, setItems] = useState([]); //* LIFT UP THE STATE To common parent component

  const handleAddItems = (item) => {
    setItems((currentItems) => [...currentItems, item]);
  };

  const handleDeleteItem = (id) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const handleToggleItem = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleClearList = () => {
    setItems([]);
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
          onClearList={handleClearList}
        />
        <Stats items={items} />
      </div>
    </>
  );
}

export default App;

//* IMPORTANT: 74: STATE VS PROPS
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

//* IMPORTANT 79: STATE MANAGEMENT
// A. TYPE OF STATE: LOCAL VS GLOBAL
// NOTE: LOCAL STATE
// - State needed only by 1 or few components
// - state that is defined in a component and only that component and child components ahve access to it (by passing via props)

// NOTE: GLOBAL STATE
//  - state that many components might need
// - shared state that is accessible to every component in the app (CONTEXT API / REDUX)

//* IMPORTANT 84: Derived state
// State that is computed from existing piece of state or from props
