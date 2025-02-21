
import React from 'react';
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export const HeroContent = () => {
  return (
    <div className="text-left">
      <h1 className="font-inter text-5xl md:text-7xl font-bold text-cool-300 mb-8 animate-fade-in leading-tight">
        Stop Incremental Gains. Take a Quantum Leap in your Lead Generation
      </h1>
      <p className="text-xl md:text-2xl text-cool-300 mb-12 animate-fade-in max-w-3xl" style={{ animationDelay: "0.2s" }}>
        Unleash Exponential Growth with Quantum Automations
      </p>
      <div className="flex flex-wrap gap-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <Button className="bg-primary text-[#000080] px-10 py-4 hover:bg-primary/90 text-lg font-medium">
          Get Started <ArrowRight size={24} />
        </Button>
        <Button 
          variant="ghost"
          className="bg-accent/10 text-accent px-10 py-4 hover:bg-accent/20 text-lg font-medium"
        >
          Learn More
        </Button>
      </div>
    </div>
  );
};
