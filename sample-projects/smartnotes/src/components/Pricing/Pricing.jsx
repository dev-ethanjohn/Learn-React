import { useState } from "react";
import { pricingData } from "../../utils/constants";
import PricingTile from "../PricingTile/PricingTile";

function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const handleToggle = () => {
    setIsYearly((prev) => !prev);
  };

  return (
    <section className="pricing">
      <div className="pricing__heading-section">
        <h3 className="h3 pricing__heading">Pricing & Plans</h3>
        <p className="text-reg pricing__subheading">
          With lots of unique blocks, you can easily build a page without
          coding. Build your next landing page.
        </p>
      </div>
      <div className="pricing__billing-section">
        <p className="text-med pricing__period-text">Monthly</p>
        <label className="toggle">
          <input
            className="toggle__input"
            type="checkbox"
            checked={isYearly}
            onChange={handleToggle}
          />
          <span className="toggle__circle"></span>
        </label>
        <p className="text-med pricing__period-text">Yearly</p>
        <span className="text-small pricing__savings">Save 25%</span>
      </div>
      <div className="pricing__tile-section">
        {pricingData.map((tile, i) => {
          return <PricingTile key={i} {...tile} isYearly={isYearly} />;
        })}
      </div>
    </section>
  );
}

export default Pricing;
