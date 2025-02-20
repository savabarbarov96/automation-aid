
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden flex items-center px-4 bg-background">
      {/* Connected bubbles animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* First bubble */}
        <div className="absolute top-20 left-20 animate-blob">
          <div className="w-[250px] h-[250px] bg-cool-500/10 rounded-full blur-xl"></div>
        </div>
        
        {/* Second bubble */}
        <div className="absolute top-40 right-1/4 animate-blob animation-delay-2000">
          <div className="w-[300px] h-[300px] bg-cool-500/10 rounded-full blur-xl"></div>
        </div>
        
        {/* Third bubble */}
        <div className="absolute bottom-40 left-1/3 animate-blob animation-delay-4000">
          <div className="w-[350px] h-[350px] bg-cool-500/10 rounded-full blur-xl"></div>
        </div>
      </div>

      <div className="container mx-auto relative">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-inter text-5xl md:text-7xl font-bold text-cool-300 mb-8 animate-fade-in leading-tight">
            Accelerating Business Growth Through Intelligent Automation
          </h1>
          <p className="text-xl md:text-2xl text-cool-300/80 mb-12 animate-fade-in max-w-3xl mx-auto" style={{ animationDelay: "0.2s" }}>
            We empower your sales & marketing teams with automations so you can close more deals.
          </p>
          <div className="flex flex-wrap justify-center gap-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <button className="font-inter bg-accent text-accent-foreground px-10 py-4 rounded-lg hover:bg-accent/90 transition-colors flex items-center gap-2 text-lg font-medium">
              Get Started <ArrowRight size={24} />
            </button>
            <button className="font-inter bg-cool-200 text-cool-300 px-10 py-4 rounded-lg hover:bg-cool-200/90 transition-colors text-lg font-medium">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
