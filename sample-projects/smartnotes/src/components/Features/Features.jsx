import shape from "../../assets/features/radial-gradient-features.png";
import { features } from "../../utils/constants";

function Features() {
  return (
    <section className="features">
      <div className="features__heading-container">
        <h2 className="h2 features__heading">
          Discover the Power of{" "}
          <span className="h2 features__text-gradient">SmartNotes </span>
        </h2>
        <p className="text-reg features__subheading">
          SmartNotes is packed with innovative features designed to
          revolutionize the way you take notes, collaborate with others, and
          stay organized.
        </p>
      </div>
      <div className="features__feature-container">
        {features.map((obj, i) => {
          return (
            <div className={`feature ${obj.gridArea}`} key={i}>
              <img
                className="feature__icon"
                src={obj.image}
                alt={obj.heading}
              />
              <p className="text-large feature__heading">{obj.heading}</p>
              <p className="text-reg feature__description">{obj.description}</p>
            </div>
          );
        })}
      </div>

      <div
        className="features__overlay-gradient"
        style={{ backgroundImage: `url(${shape})` }}
      ></div>
    </section>
  );
}

export default Features;
