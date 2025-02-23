
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

export const Hero = () => {
  // Create refs for all logo nodes
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

    // Set canvas size to match container
    const container = canvas.parentElement;
    if (!container) return;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    // Function to get center point of an element
    const getElementCenter = (element: HTMLDivElement | null) => {
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top
      };
    };

    // Create particles for each line
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
      speed: 0.003 + Math.random() * 0.002, // Reduced speed range for more consistency
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
          // Reduced number of particles per line from 2 to 1
          particles.push(createParticle(nodePos.x, nodePos.y, centralPos.x, centralPos.y));
        }
      });
    };

    const drawLines = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connection lines
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

      // Draw particles
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

        // Update particle progress
        particle.progress += particle.speed;

        // Reset particle when it reaches the end
        if (particle.progress >= 1) {
          particle.progress = 0;
          particle.direction = direction === 'toCenter' ? 'fromCenter' : 'toCenter';
        }
      });
    };

    // Initialize particles
    initializeParticles();

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      drawLines();
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      initializeParticles();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="min-h-screen relative overflow-hidden flex items-center px-4 bg-background">
      {/* Network sphere background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Interactive network nodes */}
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

      <div className="container mx-auto relative grid grid-cols-1 lg:grid-cols-2 gap-12 pt-40">
        {/* Left side content */}
        <div className="text-left">
          <h1 className="font-inter text-5xl md:text-7xl font-bold text-cool-300 mb-8 animate-fade-in leading-tight">
            Stop Incremental Gains. Take a Quantum Leap in your Lead Generation
          </h1>
          <p className="text-xl md:text-2xl text-cool-300 mb-12 animate-fade-in max-w-3xl" style={{ animationDelay: "0.2s" }}>
            Unleash Exponential Growth with Quantum Automations
          </p>
          <div className="flex flex-wrap gap-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <button className="font-inter bg-primary text-[#000080] px-10 py-4 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 text-lg font-medium">
              Get Started <ArrowRight size={24} />
            </button>
            <button className="font-inter bg-accent/10 text-accent px-10 py-4 rounded-lg hover:bg-accent/20 transition-colors text-lg font-medium">
              Learn More
            </button>
          </div>
        </div>

        {/* Right side - Octahedral logo arrangement */}
        <div className="relative w-full h-[600px] flex items-center justify-center">
          <canvas
            id="connection-lines"
            className="absolute inset-0 pointer-events-none"
          />

          {/* Central hub */}
          <div ref={centralNodeRef} className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 z-10">
            <div className="w-24 h-24 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center animate-pulse">
              <div className="w-16 h-16 rounded-full bg-accent/30 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-accent shadow-lg" >
                  <img src="/logos/ns.png" alt="Quantum Automations Logo" style={{ filter: "brightness(0)", transform: "scale(2)" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Outer nodes */}
          {/* Top logo */}
          <div ref={topNodeRef} className="absolute top-0 left-1/2 -translate-x-1/2 transform -translate-y-4">
            <div className="w-16 h-16 rounded-full bg-[#D946EF]/20 backdrop-blur-sm flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[#D946EF]/30" >
                <img src="/logos/gd.png"  alt="Quantum Automations Logo"  />
              </div>
            </div>
          </div>

          {/* Bottom logo */}
          <div ref={bottomNodeRef} className="absolute bottom-0 left-1/2 -translate-x-1/2 transform translate-y-4">
            <div className="w-16 h-16 rounded-full bg-[#0EA5E9]/20 backdrop-blur-sm flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[#0EA5E9]/30" >
                <img src="/logos/m.png"  alt="Make Logo"  />
              </div>
            </div>
          </div>

          {/* Left logo */}
          <div ref={leftNodeRef} className="absolute left-0 top-1/2 -translate-y-1/2 transform -translate-x-4">
            <div className="w-16 h-16 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-accent/30" >
                <img src="/logos/n8n.png"  alt={"N8N Logo"}  />
              </div>
            </div>
          </div>

          {/* Top left logo */}
          <div ref={topLeftNodeRef} className="absolute left-[15%] top-[25%] transform">
            <div className="w-16 h-16 rounded-full bg-[#D946EF]/20 backdrop-blur-sm flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[#D946EF]/30" >
                <img src="/logos/at.png" alt="Airtable Logo"  />
              </div>
            </div>
          </div>

          {/* Right logo */}
          <div ref={rightNodeRef} className="absolute right-0 top-1/2 -translate-y-1/2 transform translate-x-4">
            <div className="w-16 h-16 rounded-full bg-[#0EA5E9]/20 backdrop-blur-sm flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[#0EA5E9]/30" >
                <img src="/logos/cgpt.png"  alt="CGPT Logo"  />
              </div>
            </div>
          </div>

          {/* Top right logo */}
          <div ref={topRightNodeRef} className="absolute right-[15%] top-[25%] transform">
            <div className="w-16 h-16 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-accent/30">
                <img src="/logos/wa.png"  alt="Whatsapp Logo"  />
              </div>
            </div>
          </div>

          {/* Bottom left logo */}
          <div ref={bottomLeftNodeRef} className="absolute left-[15%] bottom-[25%] transform">
            <div className="w-16 h-16 rounded-full bg-[#0EA5E9]/20 backdrop-blur-sm flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[#0EA5E9]/30" >
                <img src="/logos/apify.png"  alt="Apify Logo"  />
              </div>
            </div>
          </div>

          {/* Bottom right logo */}
          <div ref={bottomRightNodeRef} className="absolute right-[15%] bottom-[25%] transform">
            <div className="w-16 h-16 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-accent/30">
                <img src={"/logos/retell.png"}  alt="Retell Logo"  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

