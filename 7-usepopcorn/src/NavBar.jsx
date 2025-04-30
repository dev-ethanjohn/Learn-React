import Logo from "./Logo";

function NavBar({ children }) {
  return (
    <>
      <Logo />
      <nav className="nav-bar">{children}</nav>
    </>
  );
}

export default NavBar;
