
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="pt-32 pb-16 px-4">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-cool-400 mb-6 animate-fade-in">
            Accelerating Business Growth Through Intelligent Automation
          </h1>
          <p className="text-xl text-cool-300 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            We empower your sales & marketing teams with automations so you can close more deals.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <button className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-cool-600 transition-colors flex items-center gap-2">
              Get Started <ArrowRight size={20} />
            </button>
            <button className="border border-cool-200 text-cool-400 px-8 py-3 rounded-lg hover:bg-cool-100 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
