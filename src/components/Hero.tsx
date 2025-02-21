
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden flex items-center px-4 bg-background">
      {/* Network sphere background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Network of spheres */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl">
          <div className="relative w-full h-full">
            {/* Top row */}
            <div className="absolute left-1/4 top-0 w-12 h-12">
              <div className="w-full h-full bg-accent rounded-full blur-[2px]"></div>
              <div className="absolute bottom-0 left-1/2 h-24 w-0.5 bg-accent/30 blur-[1px] origin-top rotate-12"></div>
            </div>
            
            <div className="absolute left-2/4 -top-4 w-16 h-16">
              <div className="w-full h-full bg-[#D946EF] rounded-full blur-[2px]"></div>
              <div className="absolute bottom-0 left-1/2 h-32 w-0.5 bg-[#D946EF]/30 blur-[1px]"></div>
            </div>
            
            <div className="absolute right-1/4 top-0 w-12 h-12">
              <div className="w-full h-full bg-[#0EA5E9] rounded-full blur-[2px]"></div>
              <div className="absolute bottom-0 left-1/2 h-24 w-0.5 bg-[#0EA5E9]/30 blur-[1px] origin-top -rotate-12"></div>
            </div>

            {/* Middle row */}
            <div className="absolute left-0 top-1/2 w-20 h-20 -translate-y-1/2">
              <div className="w-full h-full bg-[#D946EF] rounded-full blur-[2px]"></div>
              <div className="absolute top-1/2 left-full w-32 h-0.5 bg-[#D946EF]/30 blur-[1px]"></div>
            </div>

            <div className="absolute right-0 top-1/2 w-20 h-20 -translate-y-1/2">
              <div className="w-full h-full bg-accent rounded-full blur-[2px]"></div>
              <div className="absolute top-1/2 right-full w-32 h-0.5 bg-accent/30 blur-[1px]"></div>
            </div>

            {/* Additional middle spheres */}
            <div className="absolute left-1/4 top-1/2 w-16 h-16 -translate-y-1/2">
              <div className="w-full h-full bg-[#0EA5E9] rounded-full blur-[2px]"></div>
              <div className="absolute top-1/2 left-full w-24 h-0.5 bg-[#0EA5E9]/30 blur-[1px] rotate-12"></div>
            </div>

            <div className="absolute right-1/4 top-1/2 w-16 h-16 -translate-y-1/2">
              <div className="w-full h-full bg-[#D946EF] rounded-full blur-[2px]"></div>
              <div className="absolute top-1/2 right-full w-24 h-0.5 bg-[#D946EF]/30 blur-[1px] -rotate-12"></div>
            </div>

            {/* Bottom row */}
            <div className="absolute left-1/4 bottom-0 w-12 h-12">
              <div className="w-full h-full bg-[#0EA5E9] rounded-full blur-[2px]"></div>
              <div className="absolute top-0 left-1/2 h-24 w-0.5 bg-[#0EA5E9]/30 blur-[1px] origin-bottom -rotate-12"></div>
            </div>

            <div className="absolute left-2/4 -bottom-4 w-16 h-16">
              <div className="w-full h-full bg-accent rounded-full blur-[2px]"></div>
              <div className="absolute top-0 left-1/2 h-32 w-0.5 bg-accent/30 blur-[1px]"></div>
            </div>

            <div className="absolute right-1/4 bottom-0 w-12 h-12">
              <div className="w-full h-full bg-[#D946EF] rounded-full blur-[2px]"></div>
              <div className="absolute top-0 left-1/2 h-24 w-0.5 bg-[#D946EF]/30 blur-[1px] origin-bottom rotate-12"></div>
            </div>

            {/* Extra spheres for depth */}
            <div className="absolute left-1/3 top-1/3 w-10 h-10">
              <div className="w-full h-full bg-[#0EA5E9] rounded-full blur-[1px]"></div>
            </div>

            <div className="absolute right-1/3 top-1/3 w-10 h-10">
              <div className="w-full h-full bg-accent rounded-full blur-[1px]"></div>
            </div>

            <div className="absolute left-1/3 bottom-1/3 w-10 h-10">
              <div className="w-full h-full bg-[#D946EF] rounded-full blur-[1px]"></div>
            </div>

            <div className="absolute right-1/3 bottom-1/3 w-10 h-10">
              <div className="w-full h-full bg-[#0EA5E9] rounded-full blur-[1px]"></div>
            </div>
          </div>
        </div>

        {/* Add floating animation to the entire structure */}
        <div className="absolute inset-0 animate-float">
          <div className="w-full h-full transform transition-transform"></div>
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
