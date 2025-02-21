
import React from 'react';

export const ConnectingLines = () => {
  return (
    <>
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
      <div className="absolute inset-0">
        <div className="absolute inset-0 before:content-[''] before:absolute before:w-full before:h-full before:border-2 before:border-accent/10 before:rounded-full before:animate-pulse" />
        <div className="absolute inset-0 before:content-[''] before:absolute before:w-full before:h-full before:border-2 before:border-[#D946EF]/10 before:rounded-full before:animate-pulse before:rotate-45" />
      </div>
    </>
  );
};
