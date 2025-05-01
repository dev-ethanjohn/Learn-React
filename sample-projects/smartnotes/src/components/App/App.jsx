import doubleQoute from "../../assets/double-quote.svg";

import Accordion from "../Accordion/Accordion";
import CTA from "../CTA/CTA";
import FAQ from "../FAQ/FAQ";
import Features from "../Features/Features";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Hero from "../Hero/Hero";
import Logos from "../Logos/Logos";
import Navigation from "../Navigation/Navigation";
import Page from "../Page/Page";
import Pricing from "../Pricing/Pricing";
import Testimonial from "../Testimonial/Testimonial";
import Video from "../Video/Video";

function App() {
  return (
    <Page>
      <Header>
        <Navigation />
        <Hero />
      </Header>
      <Logos />
      <Testimonial>
        <h5 className="h5 testimonial__heading">
          The real-time synchronization and AI-powered organization have made
          our workflow more efficient than ever.
        </h5>
        <div className="testimonial__author-section">
          <p className="testimonial__author text-reg">Sarah Johnson</p>
          <p className="testimonial__organization text-reg">
            Tech Savy Solutions
          </p>
          <img className="testimonial__quotes" src={doubleQoute} alt="quote" />
        </div>
      </Testimonial>
      <Features />
      <Testimonial>
        <h5 className="h5 testimonial__heading">
          The real-time synchronization and AI-powered organization have made
          our workflow more efficient than ever.
        </h5>
        <div className="testimonial__author-section">
          <p className="text-reg testimonial__author">Sarah Johnson</p>
          <p className="text-reg testimonial__organization">
            TechSavvy Solutions
          </p>
        </div>
        <img className="testimonial__quotes" src={doubleQoute} alt="quote" />
      </Testimonial>
      <Video />
      <Testimonial>
        <h5 className="h5 testimonial__heading">
          The real-time synchronization and AI-powered organization have made
          our workflow more efficient than ever.
        </h5>
        <div className="testimonial__author-section">
          <p className="text-reg testimonial__author">Sarah Johnson</p>
          <p className="text-reg testimonial__organization">
            TechSavvy Solutions
          </p>
        </div>
        <img className="testimonial__quotes" src={doubleQoute} alt="quote" />
      </Testimonial>
      <Pricing />
      <Testimonial></Testimonial>
      <FAQ>
        <Accordion />
      </FAQ>
      <CTA />
      <Footer />
    </Page>
  );
}

export default App;
