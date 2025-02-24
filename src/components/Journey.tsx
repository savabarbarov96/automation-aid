import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { ContactForm } from "./ContactForm";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "Stage 1",
    title: "Enter the Tunnel. Discovery Call (15 Min)",
    description: "Let's map your current marketing, identify roadblocks, and ignite your tunnel journey in a quick 15-minute call."
  },
  {
    year: "Stage 2",
    title: "Tunnel Vision. Analyze Your Bottlenecks",
    description: "We'll pinpoint the exact marketing barriers holding you back through a deep analysis of your current processes."
  },
  {
    year: "Stage 3",
    title: "The Phase-Shift. See AI in Action for You",
    description: "Prepare to witness a personalized AI demonstration, revealing how you can tunnel through your specific marketing limitations."
  },
  {
    year: "Stage 4",
    title: "Navigation Blueprint. Secure Your Liberation Plan",
    description: "Review your custom proposal – your actionable blueprint to navigate the Quantum Tunnel and achieve marketing freedom."
  },
  {
    year: "Stage 5",
    title: "Activate Your Quantum Engine. Implement AI Workflows",
    description: "Our team expertly installs your AI workflows, seamlessly integrating them to power your journey through the tunnel."
  },
  {
    year: "Stage 6",
    title: "Emerge Liberated. Go LIVE with AI Automation",
    description: "Your AI-powered marketing is now live! Start experiencing liberation from roadblocks and see immediate results."
  },
  {
    year: "Stage 7",
    title: "Revenue Entanglement. Attain Perpetual Growth",
    description: "Embrace the deep connection of Revenue Entanglement, watch as leads surge, ROI multiplies, and your revenue stream becomes perpetually enhanced by AI."
  }
];

export const Journey = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
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
    <section id="journey" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-cool-300 mb-16">
          Through the AI Tunnel: 7 Stages to Roadblock Liberation
        </h2>
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-primary/30 -translate-x-1/2" />
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
                <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-primary rounded-full -translate-x-1/2 z-10 shadow-lg" />
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
        <div className="text-center mt-16">
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-primary text-[#000080] hover:bg-primary/90">
                Book Now
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <ContactForm onSuccess={() => setIsFormOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};
