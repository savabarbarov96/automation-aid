
import React from 'react';
import { LogoNode } from './LogoNode';
import { ConnectingLines } from './ConnectingLines';

export const LogoArrangement = () => {
  return (
    <div className="relative w-full h-[600px] flex items-center justify-center">
      {/* Central hub */}
      <LogoNode 
        imageSrc="/logos/ns.png"
        altText="Quantum Automations Logo"
        position="transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 z-10"
        color="bg-accent"
      />

      {/* Top logo */}
      <LogoNode 
        imageSrc="/logos/gd.png"
        altText="Quantum Automations Logo"
        position="top-0 left-1/2 -translate-x-1/2"
        color="bg-[#D946EF]"
        transform="-translate-y-4"
      />

      {/* Bottom logo */}
      <LogoNode 
        imageSrc="/logos/m.png"
        altText="Make Logo"
        position="bottom-0 left-1/2 -translate-x-1/2"
        color="bg-[#0EA5E9]"
        transform="translate-y-4"
      />

      {/* Left logos */}
      <LogoNode 
        imageSrc="/logos/n8n.png"
        altText="N8N Logo"
        position="left-0 top-1/2 -translate-y-1/2"
        color="bg-accent"
        transform="-translate-x-4"
      />
      <LogoNode 
        imageSrc="/logos/at.png"
        altText="Airtable Logo"
        position="left-[15%] top-[25%]"
        color="bg-[#D946EF]"
      />

      {/* Right logos */}
      <LogoNode 
        imageSrc="/logos/cgpt.png"
        altText="CGPT Logo"
        position="right-0 top-1/2 -translate-y-1/2"
        color="bg-[#0EA5E9]"
        transform="translate-x-4"
      />
      <LogoNode 
        imageSrc="/logos/wa.png"
        altText="Whatsapp Logo"
        position="right-[15%] top-[25%]"
        color="bg-accent"
      />

      {/* Bottom left and right logos */}
      <LogoNode 
        imageSrc="/logos/apify.png"
        altText="Apify Logo"
        position="left-[15%] bottom-[25%]"
        color="bg-[#0EA5E9]"
      />
      <LogoNode 
        imageSrc="/logos/retell.png"
        altText="Retell Logo"
        position="right-[15%] bottom-[25%]"
        color="bg-accent"
      />

      <ConnectingLines />
    </div>
  );
};
