
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden flex items-center px-4 bg-background">
      {/* Network sphere background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Interactive network nodes */}
        <div className="absolute w-full h-full">
          {/* Core network group 1 */}
          <div className="absolute left-1/4 top-1/3 animate-[float_12s_ease-in-out_infinite]">
            <div className="relative">
              <div className="w-40 h-40 bg-accent/20 rounded-full blur-xl"></div>
              <div className="absolute -inset-4 bg-accent/10 rounded-full blur-2xl animate-pulse"></div>
            </div>
          </div>
          
          {/* Core network group 2 */}
          <div className="absolute right-1/3 top-1/2 animate-[float_15s_ease-in-out_infinite] [animation-delay:0.5s]">
            <div className="relative">
              <div className="w-56 h-56 bg-accent/15 rounded-full blur-xl"></div>
              <div className="absolute -inset-8 bg-accent/5 rounded-full blur-3xl animate-pulse [animation-delay:0.7s]"></div>
            </div>
          </div>
          
          {/* Orbital nodes */}
          <div className="absolute left-1/2 top-1/4 animate-[float_18s_ease-in-out_infinite] [animation-delay:1s]">
            <div className="w-32 h-32 bg-[#D946EF]/20 rounded-full blur-2xl"></div>
          </div>
          
          <div className="absolute right-1/4 bottom-1/3 animate-[float_14s_ease-in-out_infinite] [animation-delay:1.5s]">
            <div className="w-48 h-48 bg-[#0EA5E9]/15 rounded-full blur-2xl"></div>
          </div>

          {/* Interconnected nodes */}
          <div className="absolute left-1/3 bottom-1/4 animate-[float_16s_ease-in-out_infinite] [animation-delay:2s]">
            <div className="relative">
              <div className="w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-[#D946EF]/10 rounded-full blur-2xl animate-pulse [animation-delay:1.2s]"></div>
            </div>
          </div>

          {/* Central core */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-[32rem] h-[32rem] rounded-full bg-gradient-to-tr from-accent/5 via-[#D946EF]/10 to-[#0EA5E9]/5 blur-3xl animate-pulse"></div>
              <div className="absolute -inset-10 bg-gradient-radial from-accent/10 to-transparent rounded-full blur-3xl"></div>
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

      <div className="container mx-auto relative grid grid-cols-1 lg:grid-cols-2 gap-12 pt-40">
        {/* Left side content */}
        <div className="text-left">
          <h1 className="font-inter text-5xl md:text-7xl font-bold text-cool-300 mb-8 animate-fade-in leading-tight">
            Accelerating Business Growth Through Intelligent Automation
          </h1>
          <p className="text-xl md:text-2xl text-cool-300 mb-12 animate-fade-in max-w-3xl" style={{ animationDelay: "0.2s" }}>
            We empower your sales & marketing teams with automations so you can close more deals.
          </p>
          <div className="flex flex-wrap gap-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <button className="font-inter bg-accent text-[#000080] px-10 py-4 rounded-lg hover:bg-accent/90 transition-colors flex items-center gap-2 text-lg font-medium">
              Get Started <ArrowRight size={24} />
            </button>
            <button className="font-inter bg-cool-200 text-[#000080] px-10 py-4 rounded-lg hover:bg-cool-200/90 transition-colors text-lg font-medium">
              Learn More
            </button>
          </div>
        </div>

        {/* Right side - Octahedral logo arrangement */}
        <div className="relative w-full h-[600px] flex items-center justify-center">
          {/* Central hub */}
          <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 z-10">
            <div className="w-24 h-24 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center animate-pulse">
              <div className="w-16 h-16 rounded-full bg-accent/30 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-accent shadow-lg" />
              </div>
            </div>
          </div>

          {/* Octahedral arrangement of logos */}
          {/* Top logo */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 transform -translate-y-4">
            <div className="w-16 h-16 rounded-full bg-[#D946EF]/20 backdrop-blur-sm flex items-center justify-center animate-[float_12s_ease-in-out_infinite]">
              <div className="w-12 h-12 rounded-full bg-[#D946EF]/30" />
            </div>
          </div>

          {/* Bottom logo */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 transform translate-y-4">
            <div className="w-16 h-16 rounded-full bg-[#0EA5E9]/20 backdrop-blur-sm flex items-center justify-center animate-[float_12s_ease-in-out_infinite]">
              <div className="w-12 h-12 rounded-full bg-[#0EA5E9]/30" />
            </div>
          </div>

          {/* Left logos */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 transform -translate-x-4">
            <div className="w-16 h-16 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center animate-[float_15s_ease-in-out_infinite]">
              <div className="w-12 h-12 rounded-full bg-accent/30" />
            </div>
          </div>
          <div className="absolute left-[15%] top-[25%] transform">
            <div className="w-16 h-16 rounded-full bg-[#D946EF]/20 backdrop-blur-sm flex items-center justify-center animate-[float_13s_ease-in-out_infinite]">
              <div className="w-12 h-12 rounded-full bg-[#D946EF]/30" />
            </div>
          </div>

          {/* Right logos */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 transform translate-x-4">
            <div className="w-16 h-16 rounded-full bg-[#0EA5E9]/20 backdrop-blur-sm flex items-center justify-center animate-[float_14s_ease-in-out_infinite]">
              <div className="w-12 h-12 rounded-full bg-[#0EA5E9]/30" />
            </div>
          </div>
          <div className="absolute right-[15%] top-[25%] transform">
            <div className="w-16 h-16 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center animate-[float_16s_ease-in-out_infinite]">
              <div className="w-12 h-12 rounded-full bg-accent/30" />
            </div>
          </div>

          {/* Bottom left and right logos */}
          <div className="absolute left-[15%] bottom-[25%] transform">
            <div className="w-16 h-16 rounded-full bg-[#0EA5E9]/20 backdrop-blur-sm flex items-center justify-center animate-[float_17s_ease-in-out_infinite]">
              <div className="w-12 h-12 rounded-full bg-[#0EA5E9]/30" />
            </div>
          </div>
          <div className="absolute right-[15%] bottom-[25%] transform">
            <div className="w-16 h-16 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center animate-[float_18s_ease-in-out_infinite]">
              <div className="w-12 h-12 rounded-full bg-accent/30" />
            </div>
          </div>

          {/* Connecting lines using pseudo-elements */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 before:content-[''] before:absolute before:w-full before:h-full before:border-2 before:border-accent/10 before:rounded-full before:animate-pulse" />
            <div className="absolute inset-0 before:content-[''] before:absolute before:w-full before:h-full before:border-2 before:border-[#D946EF]/10 before:rounded-full before:animate-pulse before:rotate-45" />
          </div>
        </div>
      </div>
    </section>
  );
};
