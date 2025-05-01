import { logos } from "../../utils/constants";

function Logos() {
  const duplicatedLogos = [...logos, ...logos];
  return (
    <section className="logos">
      <div className="logos__container">
        <div className="logos__slide">
          {duplicatedLogos.map((logo, index) => (
            <LogoItem key={`logo-${index}`} logo={logo} index={index} />
          ))}
        </div>

        <div className="logos__overlay logos__overlay-left"></div>
        <div className="logos__overlay logos__overlay-right"></div>
      </div>
    </section>
  );
}

function LogoItem({ logo, index }) {
  return (
    <div className="logo-item">
      <img src={logo} alt={`logo-${index}`} className="logo" />
    </div>
  );
}

export default Logos;
