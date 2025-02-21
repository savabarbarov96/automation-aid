
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden flex items-center px-4 bg-background">
      {/* Network sphere background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Interactive network nodes */}
        <div className="absolute w-full h-full">
          {/* Front layer - closest to camera (larger, more vibrant) */}
          <div className="absolute left-1/4 top-1/3 animate-[float_12s_ease-in-out_infinite]">
            <div className="relative">
              <div className="w-48 h-48 bg-accent/30 rounded-full blur-xl"></div>
              <div className="absolute -inset-4 bg-accent/20 rounded-full blur-2xl animate-pulse"></div>
            </div>
          </div>
          
          <div className="absolute right-1/4 bottom-1/3 animate-[float_15s_ease-in-out_infinite] [animation-delay:0.8s]">
            <div className="relative">
              <div className="w-52 h-52 bg-[#D946EF]/25 rounded-full blur-xl"></div>
              <div className="absolute -inset-6 bg-[#D946EF]/15 rounded-full blur-2xl animate-pulse"></div>
            </div>
          </div>

          {/* Middle layer */}
          <div className="absolute left-2/3 top-1/4 animate-[float_14s_ease-in-out_infinite] [animation-delay:0.5s]">
            <div className="relative">
              <div className="w-40 h-40 bg-[#0EA5E9]/20 rounded-full blur-xl"></div>
              <div className="absolute -inset-4 bg-[#0EA5E9]/10 rounded-full blur-2xl animate-pulse"></div>
            </div>
          </div>

          <div className="absolute right-2/3 bottom-1/4 animate-[float_13s_ease-in-out_infinite] [animation-delay:1.2s]">
            <div className="relative">
              <div className="w-36 h-36 bg-accent/20 rounded-full blur-xl"></div>
              <div className="absolute -inset-3 bg-accent/10 rounded-full blur-2xl animate-pulse"></div>
            </div>
          </div>

          {/* Background layer - furthest from camera (smaller, less vibrant) */}
          <div className="absolute left-1/3 top-1/2 animate-[float_16s_ease-in-out_infinite] [animation-delay:0.3s]">
            <div className="relative">
              <div className="w-32 h-32 bg-[#D946EF]/15 rounded-full blur-xl"></div>
              <div className="absolute -inset-3 bg-[#D946EF]/5 rounded-full blur-2xl animate-pulse"></div>
            </div>
          </div>

          <div className="absolute right-1/3 top-1/3 animate-[float_17s_ease-in-out_infinite] [animation-delay:1.5s]">
            <div className="relative">
              <div className="w-28 h-28 bg-[#0EA5E9]/15 rounded-full blur-xl"></div>
              <div className="absolute -inset-2 bg-[#0EA5E9]/5 rounded-full blur-2xl animate-pulse"></div>
            </div>
          </div>

          {/* Additional distant spheres */}
          <div className="absolute left-1/2 bottom-1/3 animate-[float_15s_ease-in-out_infinite] [animation-delay:0.7s]">
            <div className="relative">
              <div className="w-24 h-24 bg-accent/10 rounded-full blur-xl"></div>
              <div className="absolute -inset-2 bg-accent/5 rounded-full blur-2xl animate-pulse"></div>
            </div>
          </div>

          {/* Ambient particles */}
          <div className="absolute inset-0">
            <div className="absolute left-1/4 top-1/2 w-2 h-2 bg-accent/40 rounded-full blur-sm animate-pulse"></div>
            <div className="absolute right-1/3 top-1/3 w-3 h-3 bg-[#D946EF]/30 rounded-full blur-sm animate-pulse [animation-delay:0.5s]"></div>
            <div className="absolute left-2/3 bottom-1/3 w-2 h-2 bg-[#0EA5E9]/40 rounded-full blur-sm animate-pulse [animation-delay:1s]"></div>
          </div>
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
