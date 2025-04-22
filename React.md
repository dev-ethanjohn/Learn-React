## React Basics – Quick Notes

### Static Pages - #1

1. **Where does React put all of the elements I create in JSX when I call `root.render()`?**

   All the elements I render get put inside the `div` with the `id` of "root" (or whatever other element I might select when calling `createRoot`).
   <br>

2. **What would show up in my console if I were to run this line of code:**

   ```jsx
   console.log(<h1>Hello world!</h1>);
   ```

   An object! Unlike creating an HTML element in vanilla DOM JS, what gets created from the JSX we have in our React code is a plain JavaScript object that React will use to fill in the view.

      <br>

3. **What's wrong with this code:**

   ```jsx
   root.render(
     <section>
       <h1>Hi there</h1>
       <p>This is my website!</p>
     </section>
   );
   ```

   Nothing is wrong here — this is correct! You can only render one **parent** element at a time. That parent can have as many child elements as you want.

   <br>

4. **What does it mean for something to be "declarative" instead of "imperative"?**

   - _Imperative_ means we need to give specific step-by-step instructions on how to accomplish a task.
   - _Declarative_ means we can write our code to simply "describe" _what_ should show up on the page and allow the tool (like React) to handle the details of _how_ to put those things on the page.

   <br>

5. **What does it mean for something to be "composable"?**

   We have small pieces that we can put together to make something larger or greater than the individual pieces themselves. React components are composable, meaning you can build complex UIs by combining simple ones.

---

### Static Pages - #2 Custom Components

1.  **What is a React Component?**

    A **React component** is a reusable piece of UI (User Interface) that can be defined as either a **function** or a **class**. In modern React, functional components are preferred due to their simplicity and compatibility with hooks.

- **Key Characteristics**:

  - A React component must return **React elements** (JSX).
  - Components are reusable and modular, making them ideal for building complex UIs.
  - Functional components are simple JavaScript functions that accept `props` (properties) as arguments and return JSX.

---

2. **What's Wrong with This Code?**

```javascript
function myComponent() {
  return <small>I'm tiny text!</small>;
}
```

React requires components to follow **PascalCase** naming conventions. Component names must start with an uppercase letter (e.g., `MyComponent`). If a component name starts with a lowercase letter, React treats it as a regular HTML tag instead of a custom component.

##### Solution:

Rename the function to use PascalCase.

##### Correct Code:

```javascript
function MyComponent() {
  return <small>I'm tiny text!</small>;
}
```

##### Explanation:

By renaming the function to `MyComponent`, React recognizes it as a valid component. This ensures proper rendering when used in JSX.

---

3.  **What's Wrong with This Code?**

```javascript
function Header() {
  return (
    <header>
      <img src="./react-logo.png" width="40px" alt="React logo" />
    </header>
  );
}

root.render(Header());
```

##### Issues:

1. **Incorrect JSX Syntax**: When rendering a React component, you must use JSX syntax (i.e., `<Header />`) instead of calling the function directly (`Header()`).
   - React expects components to be rendered as JSX elements, not as plain function calls.
2. **Image Path Issue**: The `src` attribute for the image uses a relative path (`./react-logo.png`). If the image is not located in the correct directory, it will fail to load. For production builds, you should use an imported image or a public folder reference.

##### Solution:

Use proper JSX syntax to render the `Header` component and ensure the image path is correctly handled.

##### Correct Code:

```javascript
import React from "react";
import ReactDOM from "react-dom/client";

// Import the image to ensure it's bundled correctly
import reactLogo from "./react-logo.png";

function Header() {
  return (
    <header>
      <img src={reactLogo} width="40px" alt="React logo" />
    </header>
  );
}

// Render the Header component using JSX syntax
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Header />);
```

##### Explanation:

1. **JSX Syntax**: Use `<Header />` instead of `Header()` to render the component. This ensures React properly processes the component as JSX.
2. **Image Handling**: Import the image using `import reactLogo from "./react-logo.png"` to ensure it's bundled during the build process. This avoids issues with relative paths in production environments.

---

---
