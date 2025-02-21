
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "2020",
    title: "Company Foundation",
    description: "Quantum Automations was founded with a vision to revolutionize business automation."
  },
  {
    year: "2021",
    title: "First Major Client",
    description: "Successfully implemented automation solutions for our first enterprise client."
  },
  {
    year: "2022",
    title: "Global Expansion",
    description: "Expanded operations to serve clients across three continents."
  },
  {
    year: "2023",
    title: "AI Integration",
    description: "Launched our advanced AI-powered automation platform."
  },
  {
    year: "2024",
    title: "Industry Recognition",
    description: "Named as one of the top automation solution providers globally."
  }
];

export const Journey = () => {
  const [visibleEvents, setVisibleEvents] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const eventIndex = parseInt(entry.target.getAttribute("data-index") || "0");
            setVisibleEvents((prev) => [...new Set([...prev, eventIndex])]);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    document.querySelectorAll("[data-index]").forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-cool-300 mb-16">
          Our Journey
        </h2>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-primary/30 -translate-x-1/2" />
          
          {/* Timeline events */}
          <div className="relative space-y-12">
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                data-index={index}
                className={cn(
                  "relative flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16",
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse",
                  visibleEvents.includes(index) ? "opacity-100" : "opacity-0",
                  "transition-opacity duration-1000"
                )}
              >
                {/* Year bubble */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-primary rounded-full -translate-x-1/2 z-10 shadow-lg" />
                
                {/* Content */}
                <div className={cn(
                  "w-full md:w-[calc(50%-4rem)]",
                  "bg-cool-100 p-6 rounded-lg shadow-lg",
                  "transform transition-all duration-700",
                  visibleEvents.includes(index) 
                    ? "translate-y-0" 
                    : index % 2 === 0 
                      ? "translate-y-8" 
                      : "-translate-y-8"
                )}>
                  <div className="font-bold text-primary text-2xl mb-2">{event.year}</div>
                  <h3 className="text-cool-300 text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-cool-300/80">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
