
import { useEffect, useRef } from "react";
import { LogoNode } from "./LogoNode";

export const LogoNetwork = () => {
  const centralNodeRef = useRef<HTMLDivElement>(null);
  const topNodeRef = useRef<HTMLDivElement>(null);
  const bottomNodeRef = useRef<HTMLDivElement>(null);
  const leftNodeRef = useRef<HTMLDivElement>(null);
  const rightNodeRef = useRef<HTMLDivElement>(null);
  const topLeftNodeRef = useRef<HTMLDivElement>(null);
  const topRightNodeRef = useRef<HTMLDivElement>(null);
  const bottomLeftNodeRef = useRef<HTMLDivElement>(null);
  const bottomRightNodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = document.getElementById('connection-lines') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const container = canvas.parentElement;
    if (!container) return;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const getElementCenter = (element: HTMLDivElement | null) => {
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top
      };
    };

    type Particle = {
      x: number;
      y: number;
      progress: number;
      speed: number;
      direction: 'toCenter' | 'fromCenter';
      startX: number;
      startY: number;
      endX: number;
      endY: number;
    };

    const createParticle = (startX: number, startY: number, endX: number, endY: number): Particle => ({
      x: startX,
      y: startY,
      progress: 0,
      speed: 0.003 + Math.random() * 0.002,
      direction: Math.random() > 0.5 ? 'toCenter' : 'fromCenter',
      startX,
      startY,
      endX,
      endY
    });

    let particles: Particle[] = [];

    const initializeParticles = () => {
      particles = [];
      const centralPos = getElementCenter(centralNodeRef.current);
      if (!centralPos) return;

      const nodeRefs = [
        topNodeRef, bottomNodeRef, leftNodeRef, rightNodeRef,
        topLeftNodeRef, topRightNodeRef, bottomLeftNodeRef, bottomRightNodeRef
      ];

      nodeRefs.forEach(nodeRef => {
        const nodePos = getElementCenter(nodeRef.current);
        if (nodePos) {
          particles.push(createParticle(nodePos.x, nodePos.y, centralPos.x, centralPos.y));
        }
      });
    };

    const drawLines = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(155, 135, 245, 0.1)';
      ctx.lineWidth = 2;

      const centralPos = getElementCenter(centralNodeRef.current);
      if (!centralPos) return;

      const nodeRefs = [
        topNodeRef, bottomNodeRef, leftNodeRef, rightNodeRef,
        topLeftNodeRef, topRightNodeRef, bottomLeftNodeRef, bottomRightNodeRef
      ];

      nodeRefs.forEach(nodeRef => {
        const nodePos = getElementCenter(nodeRef.current);
        if (nodePos) {
          ctx.beginPath();
          ctx.moveTo(nodePos.x, nodePos.y);
          ctx.lineTo(centralPos.x, centralPos.y);
          ctx.stroke();
        }
      });

      ctx.fillStyle = '#9b87f5';
      particles.forEach(particle => {
        const { direction } = particle;
        const [fromX, fromY] = direction === 'toCenter' 
          ? [particle.startX, particle.startY] 
          : [particle.endX, particle.endY];
        const [toX, toY] = direction === 'toCenter' 
          ? [particle.endX, particle.endY] 
          : [particle.startX, particle.startY];

        particle.x = fromX + (toX - fromX) * particle.progress;
        particle.y = fromY + (toY - fromY) * particle.progress;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fill();

        particle.progress += particle.speed;

        if (particle.progress >= 1) {
          particle.progress = 0;
          particle.direction = direction === 'toCenter' ? 'fromCenter' : 'toCenter';
        }
      });
    };

    initializeParticles();

    let animationFrameId: number;
    const animate = () => {
      drawLines();
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      initializeParticles();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center">
      <canvas
        id="connection-lines"
        className="absolute inset-0 pointer-events-none"
      />

      {/* Central hub */}
      <div ref={centralNodeRef} className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 z-10">
        <div className="w-24 h-24 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-accent/30 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-accent shadow-lg">
              <img src="/lovable-uploads/52b283b3-b8fa-4361-a7e5-f23ad7ab3166.png" alt="Automation Aid Logo" style={{ filter: "brightness(0)", transform: "scale(2)" }} />
            </div>
          </div>
        </div>
      </div>

      <LogoNode
        ref={topNodeRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 transform -translate-y-4"
        bgColor="bg-[#D946EF]"
        logoSrc="/logos/gd.png"
        alt="GD Logo"
      />

      <LogoNode
        ref={bottomNodeRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 transform translate-y-4"
        bgColor="bg-[#0EA5E9]"
        logoSrc="/logos/m.png"
        alt="Make Logo"
      />

      <LogoNode
        ref={leftNodeRef}
        className="absolute left-0 top-1/2 -translate-y-1/2 transform -translate-x-4"
        bgColor="bg-accent"
        logoSrc="/logos/n8n.png"
        alt="N8N Logo"
      />

      <LogoNode
        ref={rightNodeRef}
        className="absolute right-0 top-1/2 -translate-y-1/2 transform translate-x-4"
        bgColor="bg-[#0EA5E9]"
        logoSrc="/logos/cgpt.png"
        alt="CGPT Logo"
      />

      <LogoNode
        ref={topLeftNodeRef}
        className="absolute left-[15%] top-[25%] transform"
        bgColor="bg-[#D946EF]"
        logoSrc="/logos/at.png"
        alt="Airtable Logo"
      />

      <LogoNode
        ref={topRightNodeRef}
        className="absolute right-[15%] top-[25%] transform"
        bgColor="bg-accent"
        logoSrc="/logos/wa.png"
        alt="Whatsapp Logo"
      />

      <LogoNode
        ref={bottomLeftNodeRef}
        className="absolute left-[15%] bottom-[25%] transform"
        bgColor="bg-[#0EA5E9]"
        logoSrc="/logos/apify.png"
        alt="Apify Logo"
      />

      <LogoNode
        ref={bottomRightNodeRef}
        className="absolute right-[15%] bottom-[25%] transform"
        bgColor="bg-accent"
        logoSrc="/logos/retell.png"
        alt="Retell Logo"
      />
    </div>
  );
};
