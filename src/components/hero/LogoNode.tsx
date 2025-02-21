
import React from 'react';

interface LogoNodeProps {
  imageSrc: string;
  altText: string;
  position: string;
  color: string;
  transform?: string;
}

export const LogoNode = ({ imageSrc, altText, position, color, transform = '' }: LogoNodeProps) => {
  return (
    <div className={`absolute ${position} ${transform}`}>
      <div className={`w-16 h-16 rounded-full ${color}/20 backdrop-blur-sm flex items-center justify-center`}>
        <div className={`w-12 h-12 rounded-full ${color}/30 flex items-center justify-center`}>
          {altText === "Quantum Automations Logo" ? (
            <div className="w-12 h-12 rounded-full bg-accent">
              <img src={imageSrc} alt={altText} style={{ filter: "brightness(0)", transform: "scale(2)" }} />
            </div>
          ) : (
            <img src={imageSrc} alt={altText} />
          )}
        </div>
      </div>
    </div>
  );
};
