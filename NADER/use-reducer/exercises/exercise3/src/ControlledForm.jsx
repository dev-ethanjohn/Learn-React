import { useReducer } from "react";

const initialState = { name: "", email: "", age: "" };

function formReducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "RESET":
      return initialState;
    default:
      throw new Error("Unknown action type");
  }
}

function ControlledForm() {
  const [formState, dispatchForm] = useReducer(formReducer, initialState);

  function handleChange(e) {
    const { name, value } = e.target;
    dispatchForm({ type: "UPDATE_FIELD", field: name, value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form submitted:", formState);
    dispatchForm({ type: "RESET" }); // optional: clear form after submit
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formState.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formState.email}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formState.age}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default ControlledForm;
