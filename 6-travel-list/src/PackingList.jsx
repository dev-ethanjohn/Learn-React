import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import Item from "./Item";

function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
  const [sortBy, setSortBy] = useState("input");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sortingFunctions = {
    input: (a, b) => a.id - b.id, //*ascending num
    packed: (a, b) => Number(b.packed) - Number(a.packed) || a.id - b.id, //* true -> ascending num
    description: (a, b) =>
      a.description.localeCompare(b.description) || a.id - b.id, //* alphabetical -> ascending num
  };

  const sortedItems = [...items].sort(sortingFunctions[sortBy]);
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => {
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

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={() => setIsModalOpen(true)}>Clear List</button>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          onClearList();
          setIsModalOpen(false);
        }}
        message="Are you sure you want to clear the entire list? This action cannot be undone."
      />
    </div>
  );
}

export default PackingList;
