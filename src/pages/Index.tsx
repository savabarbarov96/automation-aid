
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { Outsmart } from "../components/Outsmart";
import { Work } from "../components/Work";
import { Journey } from "../components/Journey";
import { Testimonials } from "../components/Testimonials";
import { FAQ } from "../components/FAQ";
import { Footer } from "../components/Footer";
import { useEffect } from "react";

const Index = () => {
  // Add smooth parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--scroll', `${window.scrollY}px`);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <Navbar />
      <Hero />
      <Features />
      <Outsmart />
      <Work />
      <Journey />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
