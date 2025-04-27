function Step({ number, isActive }) {
  return <div className={isActive ? "active" : ""}>{number}</div>;
}

export default Step;
