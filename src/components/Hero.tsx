
import { NetworkBackground } from "./hero/NetworkBackground";
import { LogoNetwork } from "./hero/LogoNetwork";
import { HeroContent } from "./hero/HeroContent";

export const Hero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden flex items-center px-4 bg-background">
      <NetworkBackground scrollY={typeof window !== 'undefined' ? window.scrollY : 0} />
      
      <div className="container mx-auto relative grid grid-cols-1 lg:grid-cols-2 gap-12 pt-28">
        <HeroContent />
        <LogoNetwork />
      </div>
    </section>
  );
};
