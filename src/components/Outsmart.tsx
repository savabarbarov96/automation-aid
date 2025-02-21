
import { ArrowRight } from "lucide-react";

export const Outsmart = () => {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-cool-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-cool-300 mb-8">
          Outsmart, Outperform, Outgrow. Quantum Automations
        </h2>
        <button
          onClick={scrollToContact}
          className="font-inter bg-primary text-[#000080] px-10 py-4 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 text-lg font-medium mx-auto"
        >
          Learn How <ArrowRight size={24} />
        </button>
      </div>
    </section>
  );
};
