import { useRef, useState } from "react";

function Form() {
  const formRef = useRef(null);
  const [submittedData, setSubmittedData] = useState(null);

  function submitForm(e) {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      age: formData.get("age"),
    };

    setSubmittedData(data);

    formRef.current.reset();
  }

  return (
    <>
      <form ref={formRef} onSubmit={submitForm}>
        <input type="text" name="name" placeholder="name" />
        <input type="email" name="email" placeholder="monkey@gmail.com" />
        <input type="number" name="age" placeholder="20" />
        <button type="submit"> Submit</button>
      </form>

      {submittedData && (
        <p>
          ✅ Submitted: {submittedData.name}, {submittedData.email},
          {submittedData.age}
        </p>
      )}
    </>
  );
}

export default Form;
