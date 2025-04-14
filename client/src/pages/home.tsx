import Hero from "@/components/home/hero";
import About from "@/components/home/about";
import Services from "@/components/home/services";
import Portfolio from "@/components/home/portfolio";
import Testimonials from "@/components/home/testimonials";
import Contact from "@/components/home/contact";

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Testimonials />
      <Contact />
    </div>
  );
};

export default Home;
