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
      <p>Hello</p>
      <Header>
        <Navigation />
        <Hero />
      </Header>
      <Logos />
      <Testimonial></Testimonial>
      <Features />
      <Testimonial></Testimonial>
      <Video />
      <Testimonial></Testimonial>
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
