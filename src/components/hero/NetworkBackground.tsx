
import { CSSProperties } from "react";

interface NetworkBackgroundProps {
  scrollY?: number;
}

export const NetworkBackground = ({ scrollY = 0 }: NetworkBackgroundProps) => {
  const style: CSSProperties = {
    transform: `translateY(${scrollY * 0.5}px)`,
  };

  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={style}
    >
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
  );
};
