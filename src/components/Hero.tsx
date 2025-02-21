
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden flex items-center px-4 bg-background">
      {/* Network sphere background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full">
          {/* Central hub */}
          <div className="absolute left-[60%] top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-accent/30 blur-lg animate-pulse"></div>
              <div className="absolute -inset-4 bg-gradient-radial from-accent/20 to-transparent rounded-full blur-xl"></div>
            </div>
            
            {/* Tool logos arranged in octahedral pattern */}
            <div className="absolute -inset-48">
              {/* Top layer */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-32">
                <div className="w-16 h-16 bg-[#0EA5E9]/20 rounded-full blur-lg animate-[float_12s_ease-in-out_infinite]"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white/80 text-sm">ChatGPT</div>
              </div>
              
              {/* Middle layer - top row */}
              <div className="absolute top-8 left-0 -translate-x-16">
                <div className="w-16 h-16 bg-accent/20 rounded-full blur-lg animate-[float_15s_ease-in-out_infinite]"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white/80 text-sm">Google Drive</div>
              </div>
              <div className="absolute top-8 right-0 translate-x-16">
                <div className="w-16 h-16 bg-[#D946EF]/20 rounded-full blur-lg animate-[float_14s_ease-in-out_infinite]"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white/80 text-sm">WhatsApp</div>
              </div>
              
              {/* Middle layer - middle row */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-24">
                <div className="w-16 h-16 bg-accent/20 rounded-full blur-lg animate-[float_16s_ease-in-out_infinite]"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white/80 text-sm">Make.com</div>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-24">
                <div className="w-16 h-16 bg-[#0EA5E9]/20 rounded-full blur-lg animate-[float_13s_ease-in-out_infinite]"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white/80 text-sm">N8N</div>
              </div>
              
              {/* Middle layer - bottom row */}
              <div className="absolute bottom-8 left-0 -translate-x-16">
                <div className="w-16 h-16 bg-[#D946EF]/20 rounded-full blur-lg animate-[float_17s_ease-in-out_infinite]"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white/80 text-sm">AirTable</div>
              </div>
              <div className="absolute bottom-8 right-0 translate-x-16">
                <div className="w-16 h-16 bg-accent/20 rounded-full blur-lg animate-[float_18s_ease-in-out_infinite]"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white/80 text-sm">APIFY</div>
              </div>
              
              {/* Bottom layer */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-32">
                <div className="w-16 h-16 bg-[#0EA5E9]/20 rounded-full blur-lg animate-[float_19s_ease-in-out_infinite]"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white/80 text-sm">ReTell AI</div>
              </div>
              
              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full" style={{ transform: 'scale(0.8)' }}>
                <g className="opacity-20">
                  {/* Vertical lines */}
                  <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#9b87f5" strokeWidth="1" />
                  {/* Diagonal lines */}
                  <line x1="30%" y1="20%" x2="70%" y2="80%" stroke="#9b87f5" strokeWidth="1" />
                  <line x1="70%" y1="20%" x2="30%" y2="80%" stroke="#9b87f5" strokeWidth="1" />
                  {/* Horizontal lines */}
                  <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#9b87f5" strokeWidth="1" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto relative pt-40">
        <div className="max-w-4xl text-left">
          <h1 className="font-inter text-5xl md:text-7xl font-bold text-cool-300 mb-8 animate-fade-in leading-tight max-w-2xl">
            Accelerating Business Growth Through Intelligent Automation
          </h1>
          <p className="text-xl md:text-2xl text-cool-300 mb-12 animate-fade-in max-w-xl" style={{ animationDelay: "0.2s" }}>
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
      </div>
    </section>
  );
};
