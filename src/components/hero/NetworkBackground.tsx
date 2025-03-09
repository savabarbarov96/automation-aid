import { CSSProperties, useEffect, useState } from "react";

interface NetworkBackgroundProps {
  scrollY?: number;
}

export const NetworkBackground = ({ scrollY = 0 }: NetworkBackgroundProps) => {
  const [isMobile, setIsMobile] = useState(false);

  // Check if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const style: CSSProperties = {
    transform: `translateY(${scrollY * (isMobile ? 0.15 : 0.5)}px)`,
    willChange: 'transform',
  };

  // Reduce animation complexity on mobile
  const blurAmount = isMobile ? {
    sm: 'blur-sm',
    md: 'blur-md', 
    lg: 'blur-lg', 
    xl: 'blur-lg', 
    xl2: 'blur-xl',
    xl3: 'blur-xl'
  } : {
    sm: 'blur-sm',
    md: 'blur-md', 
    lg: 'blur-lg', 
    xl: 'blur-xl', 
    xl2: 'blur-2xl',
    xl3: 'blur-3xl'
  };

  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={style}
    >
      <div className="absolute w-full h-full">
        {/* Core network group 1 - reduced size on mobile */}
        <div className={`absolute left-1/4 top-1/3 animate-[float_12s_ease-in-out_infinite] ${isMobile ? 'opacity-60' : ''}`}>
          <div className="relative">
            <div className={`${isMobile ? 'w-24 h-24' : 'w-40 h-40'} bg-accent/20 rounded-full ${blurAmount.xl}`}></div>
            <div className={`absolute ${isMobile ? '-inset-2' : '-inset-4'} bg-accent/10 rounded-full ${blurAmount.xl2} animate-pulse`}></div>
          </div>
        </div>

        {/* Core network group 2 - reduced size on mobile */}
        <div className={`absolute right-1/3 top-1/2 animate-[float_15s_ease-in-out_infinite] [animation-delay:0.5s] ${isMobile ? 'opacity-60' : ''}`}>
          <div className="relative">
            <div className={`${isMobile ? 'w-32 h-32' : 'w-56 h-56'} bg-accent/15 rounded-full ${blurAmount.xl}`}></div>
            <div className={`absolute ${isMobile ? '-inset-4' : '-inset-8'} bg-accent/5 rounded-full ${blurAmount.xl3} animate-pulse [animation-delay:0.7s]`}></div>
          </div>
        </div>

        {/* Orbital nodes - reduced size on mobile */}
        {!isMobile && (
          <div className="absolute left-1/2 top-1/4 animate-[float_18s_ease-in-out_infinite] [animation-delay:1s]">
            <div className={`w-32 h-32 bg-[#D946EF]/20 rounded-full ${blurAmount.xl2}`}></div>
          </div>
        )}

        <div className={`absolute right-1/4 bottom-1/3 animate-[float_14s_ease-in-out_infinite] [animation-delay:1.5s] ${isMobile ? 'opacity-60' : ''}`}>
          <div className={`${isMobile ? 'w-24 h-24' : 'w-48 h-48'} bg-[#0EA5E9]/15 rounded-full ${blurAmount.xl2}`}></div>
        </div>

        {/* Interconnected nodes - reduced size on mobile */}
        <div className={`absolute left-1/3 bottom-1/4 animate-[float_16s_ease-in-out_infinite] [animation-delay:2s] ${isMobile ? 'opacity-60' : ''}`}>
          <div className="relative">
            <div className={`${isMobile ? 'w-32 h-32' : 'w-64 h-64'} bg-accent/10 rounded-full ${blurAmount.xl3}`}></div>
            <div className={`absolute inset-0 bg-gradient-to-tr from-accent/5 to-[#D946EF]/10 rounded-full ${blurAmount.xl2} animate-pulse [animation-delay:1.2s]`}></div>
          </div>
        </div>

        {/* Central core - reduced size on mobile */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className={`${isMobile ? 'w-[16rem] h-[16rem]' : 'w-[32rem] h-[32rem]'} rounded-full bg-gradient-to-tr from-accent/5 via-[#D946EF]/10 to-[#0EA5E9]/5 ${blurAmount.xl3} animate-pulse`}></div>
            <div className={`absolute ${isMobile ? '-inset-5' : '-inset-10'} bg-gradient-radial from-accent/10 to-transparent rounded-full ${blurAmount.xl3}`}></div>
          </div>
        </div>

        {/* Ambient particles - fewer on mobile */}
        <div className="absolute inset-0">
          <div className={`absolute left-1/4 top-1/2 w-2 h-2 bg-accent/40 rounded-full ${blurAmount.sm} animate-pulse`}></div>
          {!isMobile && (
            <div className={`absolute right-1/3 top-1/3 w-3 h-3 bg-[#D946EF]/30 rounded-full ${blurAmount.sm} animate-pulse [animation-delay:0.5s]`}></div>
          )}
          <div className={`absolute left-2/3 bottom-1/3 w-2 h-2 bg-[#0EA5E9]/40 rounded-full ${blurAmount.sm} animate-pulse [animation-delay:1s]`}></div>
        </div>
      </div>
    </div>
  );
};
