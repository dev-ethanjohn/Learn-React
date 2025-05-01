import arrow from "../../assets/arrow.svg";
import logo from "../../assets/logo.svg";

function Navigation() {
  return (
    <nav className="navigation">
      <div className="navigation__logo-section">
        <img className="navigation__logo" src={logo} alt="Smart notes logo" />
        <h3 className="navigation__name">SmartNotes</h3>
      </div>

      <ul className="navigation__link-section">
        <li>
          <a href="#" className="navigation__link text-reg">
            Features
          </a>
        </li>
        <li>
          <a href="#" className="navigation__link text-reg">
            Pricing
          </a>
        </li>
        <li>
          <a href="#" className="navigation__link text-reg">
            Support
          </a>
        </li>
      </ul>

      <button className="navigation__cta text-reg">
        Get started{" "}
        <img className="navigation__cta-arrow" src={arrow} alt="arrow" />
      </button>
    </nav>
  );
}

export default Navigation;
