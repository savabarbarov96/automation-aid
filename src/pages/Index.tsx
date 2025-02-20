
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { Testimonials } from "../components/Testimonials";
import { FAQ } from "../components/FAQ";
import { Blog } from "../components/Blog";
import { Footer } from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <FAQ />
      <Blog />
      <Footer />
    </div>
  );
};

export default Index;
