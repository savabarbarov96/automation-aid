
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden flex items-center px-4 bg-background">
      {/* Network sphere background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Network nodes */}
        <div className="absolute w-full h-full">
          <div className="absolute left-1/4 top-1/4 animate-float">
            <div className="w-4 h-4 bg-accent/30 rounded-full blur-sm"></div>
          </div>
          
          <div className="absolute right-1/3 top-1/3 animate-float [animation-delay:1s]">
            <div className="w-6 h-6 bg-accent/40 rounded-full blur-sm"></div>
          </div>
          
          <div className="absolute left-1/2 bottom-1/4 animate-float [animation-delay:2s]">
            <div className="w-8 h-8 bg-accent/30 rounded-full blur-sm"></div>
          </div>
          
          <div className="absolute right-1/4 top-2/3 animate-float [animation-delay:1.5s]">
            <div className="w-5 h-5 bg-accent/50 rounded-full blur-sm"></div>
          </div>

          {/* Additional nodes */}
          <div className="absolute left-1/6 top-1/6 animate-float [animation-delay:2.5s]">
            <div className="w-7 h-7 bg-accent/35 rounded-full blur-sm"></div>
          </div>

          <div className="absolute right-1/5 top-1/5 animate-float [animation-delay:3s]">
            <div className="w-6 h-6 bg-accent/40 rounded-full blur-sm"></div>
          </div>

          <div className="absolute left-3/4 top-1/3 animate-float [animation-delay:1.8s]">
            <div className="w-5 h-5 bg-accent/45 rounded-full blur-sm"></div>
          </div>

          <div className="absolute right-2/3 bottom-1/3 animate-float [animation-delay:2.2s]">
            <div className="w-8 h-8 bg-accent/35 rounded-full blur-sm"></div>
          </div>

          <div className="absolute left-1/3 bottom-1/2 animate-float [animation-delay:3.5s]">
            <div className="w-6 h-6 bg-accent/40 rounded-full blur-sm"></div>
          </div>

          <div className="absolute right-1/2 top-1/6 animate-float [animation-delay:2.8s]">
            <div className="w-7 h-7 bg-accent/35 rounded-full blur-sm"></div>
          </div>

          <div className="absolute left-2/3 bottom-2/3 animate-float [animation-delay:1.2s]">
            <div className="w-5 h-5 bg-accent/45 rounded-full blur-sm"></div>
          </div>

          <div className="absolute right-3/4 top-2/5 animate-float [animation-delay:3.2s]">
            <div className="w-6 h-6 bg-accent/40 rounded-full blur-sm"></div>
          </div>
          
          {/* Large central sphere */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-64 h-64 rounded-full bg-gradient-to-br from-accent/10 to-accent/30 blur-2xl animate-pulse"></div>
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
