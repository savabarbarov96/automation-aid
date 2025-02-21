
import React from 'react';
import { NetworkBackground } from './hero/NetworkBackground';
import { HeroContent } from './hero/HeroContent';
import { LogoArrangement } from './hero/LogoArrangement';

export const Hero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden flex items-center px-4 bg-background">
      <NetworkBackground />
      <div className="container mx-auto relative grid grid-cols-1 lg:grid-cols-2 gap-12 pt-40">
        <HeroContent />
        <LogoArrangement />
      </div>
    </section>
  );
};
