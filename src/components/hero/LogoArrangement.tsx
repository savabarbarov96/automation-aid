
import React from 'react';

export const LogoArrangement = () => {
  return (
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
          <path d="M 50% 15%, Q 50% 27.5%, 50% 40%" stroke="#9b87f5" strokeWidth="2" fill="none" strokeOpacity="0.3" />
          <path d="M 50% 85%, Q 50% 72.5%, 50% 60%" stroke="#9b87f5" strokeWidth="2" fill="none" strokeOpacity="0.3" />
          <path d="M 15% 50%, Q 27.5% 50%, 40% 50%" stroke="#9b87f5" strokeWidth="2" fill="none" strokeOpacity="0.3" />
          <path d="M 85% 50%, Q 72.5% 50%, 60% 50%" stroke="#9b87f5" strokeWidth="2" fill="none" strokeOpacity="0.3" />
          <path d="M 25% 30%, Q 33.5% 36%, 42% 42%" stroke="#9b87f5" strokeWidth="2" fill="none" strokeOpacity="0.3" />
          <path d="M 75% 30%, Q 66.5% 36%, 58% 42%" stroke="#9b87f5" strokeWidth="2" fill="none" strokeOpacity="0.3" />
          <path d="M 25% 70%, Q 33.5% 64%, 42% 58%" stroke="#9b87f5" strokeWidth="2" fill="none" strokeOpacity="0.3" />
          <path d="M 75% 70%, Q 66.5% 64%, 58% 58%" stroke="#9b87f5" strokeWidth="2" fill="none" strokeOpacity="0.3" />
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
  );
};
