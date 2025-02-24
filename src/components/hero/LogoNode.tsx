
interface LogoNodeProps {
  ref?: React.RefObject<HTMLDivElement>;
  className: string;
  bgColor: string;
  logoSrc: string;
  alt: string;
}

export const LogoNode = ({ ref, className, bgColor, logoSrc, alt }: LogoNodeProps) => {
  return (
    <div ref={ref} className={className}>
      <div className={`w-16 h-16 rounded-full ${bgColor}/20 backdrop-blur-sm flex items-center justify-center`}>
        <div className={`w-12 h-12 rounded-full ${bgColor}/30`}>
          <img src={logoSrc} alt={alt} />
        </div>
      </div>
    </div>
  );
};
