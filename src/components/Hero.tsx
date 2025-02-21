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
            Stop Incremental Gains. Take a Quantum Leap in your Lead Generation
          </h1>
          <p className="text-xl md:text-2xl text-cool-300 mb-12 animate-fade-in max-w-3xl" style={{ animationDelay: "0.2s" }}>
            Unleash Exponential Growth with Quantum Automations
          </p>
          <div className="flex flex-wrap gap-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <button className="font-inter bg-primary text-[#000080] px-10 py-4 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 text-lg font-medium">
              Get Started <ArrowRight size={24} />
            </button>
            <button className="font-inter bg-accent/10 text-accent px-10 py-4 rounded-lg hover:bg-accent/20 transition-colors text-lg font-medium">
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
                <div className="w-12 h-12 rounded-full bg-accent shadow-lg">
                  <img src="/logos/ns.png" alt="Quantum Automations Logo" style={{ filter: "brightness(0)", transform: "scale(2)" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Connecting arrows */}
          <div className="absolute inset-0">
            <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
              {/* Top connection */}
              <path
                d="M 50% 15%, Q 50% 27.5%, 50% 40%"
                stroke="#9b87f5"
                strokeWidth="2"
                fill="none"
                strokeOpacity="0.3"
              />
              {/* Bottom connection */}
              <path
                d="M 50% 85%, Q 50% 72.5%, 50% 60%"
                stroke="#9b87f5"
                strokeWidth="2"
                fill="none"
                strokeOpacity="0.3"
              />
              {/* Left connection */}
              <path
                d="M 15% 50%, Q 27.5% 50%, 40% 50%"
                stroke="#9b87f5"
                strokeWidth="2"
                fill="none"
                strokeOpacity="0.3"
              />
              {/* Right connection */}
              <path
                d="M 85% 50%, Q 72.5% 50%, 60% 50%"
                stroke="#9b87f5"
                strokeWidth="2"
                fill="none"
                strokeOpacity="0.3"
              />
              {/* Top Left connection */}
              <path
                d="M 25% 30%, Q 33.5% 36%, 42% 42%"
                stroke="#9b87f5"
                strokeWidth="2"
                fill="none"
                strokeOpacity="0.3"
              />
              {/* Top Right connection */}
              <path
                d="M 75% 30%, Q 66.5% 36%, 58% 42%"
                stroke="#9b87f5"
                strokeWidth="2"
                fill="none"
                strokeOpacity="0.3"
              />
              {/* Bottom Left connection */}
              <path
                d="M 25% 70%, Q 33.5% 64%, 42% 58%"
                stroke="#9b87f5"
                strokeWidth="2"
                fill="none"
                strokeOpacity="0.3"
              />
              {/* Bottom Right connection */}
              <path
                d="M 75% 70%, Q 66.5% 64%, 58% 58%"
                stroke="#9b87f5"
                strokeWidth="2"
                fill="none"
                strokeOpacity="0.3"
              />
            </svg>
          </div>

          {/* Top logo */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 transform -translate-y-4">
            <div className="w-16 h-16 rounded-full bg-[#D946EF]/20 backdrop-blur-sm flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[#D946EF]/30">
                <img src="/logos/gd.png" alt="Quantum Automations Logo" />
              </div>
            </div>
          </div>

          {/* Bottom logo */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 transform translate-y-4">
            <div className="w-16 h-16 rounded-full bg-[#0EA5E9]/20 backdrop-blur-sm flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[#0EA5E9]/30">
                <img src="/logos/m.png" alt="Make Logo" />
              </div>
            </div>
          </div>

          {/* Left logos */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 transform -translate-x-4">
            <div className="w-16 h-16 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-accent/30">
                <img src="/logos/n8n.png" alt="N8N Logo" />
              </div>
            </div>
          </div>
          <div className="absolute left-[15%] top-[25%] transform">
            <div className="w-16 h-16 rounded-full bg-[#D946EF]/20 backdrop-blur-sm flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[#D946EF]/30">
                <img src="/logos/at.png" alt="Airtable Logo" />
              </div>
            </div>
          </div>

          {/* Right logos */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 transform translate-x-4">
            <div className="w-16 h-16 rounded-full bg-[#0EA5E9]/20 backdrop-blur-sm flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[#0EA5E9]/30">
                <img src="/logos/cgpt.png" alt="CGPT Logo" />
              </div>
            </div>
          </div>
          <div className="absolute right-[15%] top-[25%] transform">
            <div className="w-16 h-16 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-accent/30">
                <img src="/logos/wa.png" alt="Whatsapp Logo" />
              </div>
            </div>
          </div>

          {/* Bottom left and right logos */}
          <div className="absolute left-[15%] bottom-[25%] transform">
            <div className="w-16 h-16 rounded-full bg-[#0EA5E9]/20 backdrop-blur-sm flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[#0EA5E9]/30">
                <img src="/logos/apify.png" alt="Apify Logo" />
              </div>
            </div>
          </div>
          <div className="absolute right-[15%] bottom-[25%] transform">
            <div className="w-16 h-16 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-accent/30">
                <img src="/logos/retell.png" alt="Retell Logo" />
              </div>
            </div>
          </div>

          {/* Connecting lines */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 before:content-[''] before:absolute before:w-full before:h-full before:border-2 before:border-accent/10 before:rounded-full before:animate-pulse" />
            <div className="absolute inset-0 before:content-[''] before:absolute before:w-full before:h-full before:border-2 before:border-[#D946EF]/10 before:rounded-full before:animate-pulse before:rotate-45" />
          </div>
        </div>
      </div>
    </section>
  );
};
