
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden pt-40 pb-32 px-4">
      {/* Connected bubbles animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-[100px] h-[100px] bg-black/20 rounded-full blur-sm animate-blob"></div>
        <div className="absolute top-40 right-1/4 w-[80px] h-[80px] bg-black/20 rounded-full blur-sm animate-blob animation-delay-2000 
          before:content-[''] before:absolute before:w-[200px] before:h-[2px] before:bg-black/10 before:top-1/2 before:right-full before:transform before:-translate-y-1/2"></div>
        <div className="absolute bottom-40 left-1/3 w-[120px] h-[120px] bg-black/20 rounded-full blur-sm animate-blob animation-delay-4000
          before:content-[''] before:absolute before:w-[150px] before:h-[2px] before:bg-black/10 before:top-1/2 before:right-full before:transform before:-translate-y-1/2"></div>
      </div>

      <div className="container mx-auto relative">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-cool-400 mb-8 animate-fade-in leading-tight">
            Accelerating Business Growth Through Intelligent Automation
          </h1>
          <p className="text-xl md:text-2xl text-cool-300 mb-12 animate-fade-in max-w-3xl mx-auto" style={{ animationDelay: "0.2s" }}>
            We empower your sales & marketing teams with automations so you can close more deals.
          </p>
          <div className="flex flex-wrap justify-center gap-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <button className="bg-accent text-white px-10 py-4 rounded-lg hover:bg-accent/90 transition-colors flex items-center gap-2 text-lg">
              Get Started <ArrowRight size={24} />
            </button>
            <button className="bg-primary text-white px-10 py-4 rounded-lg hover:bg-primary/90 transition-colors text-lg">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
