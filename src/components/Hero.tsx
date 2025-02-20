
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden pt-40 pb-32 px-4">
      {/* Connected bubbles animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* First bubble */}
        <div className="absolute top-20 left-20 animate-blob">
          <div className="w-[40px] h-[40px] bg-black/20 rounded-full blur-sm"></div>
        </div>
        
        {/* Second bubble with connecting line */}
        <div className="absolute top-40 right-1/4 animate-blob animation-delay-2000">
          <div className="relative">
            <div className="absolute right-1/2 top-1/2 w-[300px] h-[8px] bg-black/20 blur-sm transform -translate-y-1/2 rotate-[30deg] -translate-x-[150px]"></div>
            <div className="w-[40px] h-[40px] bg-black/20 rounded-full blur-sm"></div>
          </div>
        </div>
        
        {/* Third bubble with connecting line */}
        <div className="absolute bottom-40 left-1/3 animate-blob animation-delay-4000">
          <div className="relative">
            <div className="absolute left-1/2 bottom-1/2 w-[200px] h-[8px] bg-black/20 blur-sm transform -translate-x-full rotate-[135deg] origin-right"></div>
            <div className="w-[40px] h-[40px] bg-black/20 rounded-full blur-sm"></div>
          </div>
        </div>
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
