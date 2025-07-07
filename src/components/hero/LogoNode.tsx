
import { forwardRef } from 'react';

interface LogoNodeProps {
  className: string;
  bgColor: string;
  logoSrc: string;
  alt: string;
}

export const LogoNode = forwardRef<HTMLDivElement, LogoNodeProps>(
  ({ className, bgColor, logoSrc, alt }, ref) => {
    return (
      <div ref={ref} className={className}>
        <div className={`w-16 h-16 rounded-full ${bgColor}/20 backdrop-blur-sm flex items-center justify-center 
                        hover:scale-110 hover:shadow-lg transition-all duration-300 group`}>
          <div className={`w-12 h-12 rounded-full ${bgColor}/30 group-hover:bg-accent/40 transition-colors`}>
            <img 
              src={logoSrc} 
              alt={alt} 
              className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    );
  }
);

LogoNode.displayName = 'LogoNode';
