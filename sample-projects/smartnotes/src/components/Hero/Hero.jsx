import abstractShapes from "../../assets/abstract-shapes.png";
import arrow from "../../assets/arrow.svg";

function Hero() {
  return (
    <section className="hero">
      <div className="hero__column">
        <h1 className="h1 hero__heading">
          <span className="hero__heading-gradient">Intelligent</span>
          cloud-based{" "}
          <span className="hero__heading-gradient">note-taking</span>
          and collaboration tool
        </h1>
        <p className="hero__subheading text-reg">
          Experience the power of smart note-taking and transform the way you
          work today.
        </p>
        <div className="hero__input-container">
          <input
            className="hero__input"
            type="email"
            placeholder="Enter your email"
          />
          <button className="hero__submit text-reg">
            Sign up <img src={arrow} alt="" className="hero__submit-arrow" />
          </button>
        </div>
      </div>

      <div className="hero__column">
        <img className="hero__graphic" src={abstractShapes} alt="#" />
      </div>
    </section>
  );
}

export default Hero;
