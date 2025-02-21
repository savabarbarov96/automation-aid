
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden flex items-center px-4 bg-background">
      {/* Connected bubbles animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* First bubble */}
        <div className="absolute -top-40 -left-40 animate-blob">
          <div className="w-[800px] h-[800px] bg-[#9b87f5]/40 rounded-full blur-3xl"></div>
        </div>
        
        {/* Second bubble */}
        <div className="absolute top-1/4 -right-20 animate-blob animation-delay-2000">
          <div className="w-[1000px] h-[1000px] bg-[#8B5CF6]/30 rounded-full blur-3xl"></div>
        </div>
        
        {/* Third bubble */}
        <div className="absolute -bottom-40 left-1/3 animate-blob animation-delay-4000">
          <div className="w-[900px] h-[900px] bg-[#9b87f5]/30 rounded-full blur-3xl"></div>
        </div>
      </div>

      <div className="container mx-auto relative pt-40">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-inter text-5xl md:text-7xl font-bold text-cool-300 mb-8 animate-fade-in leading-tight">
            Accelerating Business Growth Through Intelligent Automation
          </h1>
          <p className="text-xl md:text-2xl text-cool-300 mb-12 animate-fade-in max-w-3xl mx-auto" style={{ animationDelay: "0.2s" }}>
            We empower your sales & marketing teams with automations so you can close more deals.
          </p>
          <div className="flex flex-wrap justify-center gap-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <button className="font-inter bg-accent text-[#000080] px-10 py-4 rounded-lg hover:bg-accent/90 transition-colors flex items-center gap-2 text-lg font-medium">
              Get Started <ArrowRight size={24} />
            </button>
            <button className="font-inter bg-cool-200 text-[#000080] px-10 py-4 rounded-lg hover:bg-cool-200/90 transition-colors text-lg font-medium">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
