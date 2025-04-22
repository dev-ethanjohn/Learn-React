# React Props Interview Questions and Solutions

---

### 1. What Do Props Help Us Accomplish?

**Props** help us make components **more reusable** by allowing us to pass dynamic data into them. Instead of hardcoding values inside a component, we can customize its behavior and appearance by passing different props.

- **Key Benefit**: Props enable components to be flexible and adaptable to various use cases without duplicating code.

---

### 2. How Do You Pass a Prop Into a Component?

To pass a prop into a component, you include it as an attribute in JSX when rendering the component.

##### Example:

```javascript
<MyAwesomeHeader title="Welcome to My App!" />
```

##### Explanation:

In the example above, the `title` prop is passed to the `MyAwesomeHeader` component. The component can then use this prop to dynamically display the value `"Welcome to My App!"`.

---

### 3. Can I Pass a Custom Prop (e.g., `blahblahblah={true}`) to a Native DOM Element? (e.g., `<div blahblahblah={true}>`) Why or Why Not?

No, you **cannot** pass custom props to native DOM elements like `<div>` or `<span>`.

##### Reason:

- JSX for native DOM elements is converted into actual HTML elements by React.
- Real DOM elements only support properties/attributes defined in the official **HTML specification** (e.g., `id`, `class`, `src`, etc.).
- Custom attributes like `blahblahblah` are not part of the HTML specification and will be ignored or cause warnings/errors.

##### Example:

```javascript
<div blahblahblah={true}>Hello</div>
```

This will not work as expected because `blahblahblah` is not a valid HTML attribute.

---

#### 4. How Do I Receive Props in a Component?

To receive props in a functional component, you define the component function with a parameter named `props`. This parameter is an object containing all the props passed to the component.

##### Example:

```javascript
function Navbar(props) {
  console.log(props.blahblahblah); // Accessing the `blahblahblah` prop
  return (
    <header>
      <h1>{props.title}</h1>
    </header>
  );
}
```

##### Explanation:

- The `props` object contains all the props passed to the component.
- You can access individual props using dot notation (e.g., `props.title`).

---

## 5. What Data Type Is `props` When the Component Receives It?

The `props` parameter is always an **object** when received by a component.

##### Example:

If you pass props like this:

```javascript
<Navbar title="My Site" isLoggedIn={true} />
```

The `props` object received by the `Navbar` component will look like this:

```javascript
{
    title: "My Site",
    isLoggedIn: true
}
```

##### Key Points:

- Each prop becomes a key-value pair in the `props` object.
- You can destructure the `props` object for cleaner code:
  ```javascript
  function Navbar({ title, isLoggedIn }) {
    return (
      <header>
        <h1>{title}</h1>
        {isLoggedIn && <p>Welcome back!</p>}
      </header>
    );
  }
  ```

---

### Summary of Key Learnings

1. **Props** make components reusable by passing dynamic data.
2. Props are passed as attributes in JSX (e.g., `<Component propName="value" />`).
3. Custom props cannot be passed to native DOM elements because they don’t conform to the HTML specification.
4. Props are received as a single `props` object in functional components.
5. The `props` object is always of type **object**, with each prop represented as a key-value pair.
