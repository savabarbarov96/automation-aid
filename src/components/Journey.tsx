
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
    year: "Етап 1",
    title: "Влезте в тунела. Опознавателен разговор (15 мин)",
    description: "Нека очертаем вашия текущ маркетинг, идентифицираме пречките и започнем вашето пътуване в кратък 15-минутен разговор."
  },
  {
    year: "Етап 2",
    title: "Тунелна визия. Анализ на проблемите",
    description: "Ще идентифицираме точните маркетингови бариери, които ви спират, чрез задълбочен анализ на текущите ви процеси."
  },
  {
    year: "Етап 3",
    title: "Фазовият преход. Вижте AI в действие",
    description: "Пригответе се да видите персонализирана AI демонстрация, разкриваща как можете да преминете през вашите специфични маркетингови ограничения."
  },
  {
    year: "Етап 4",
    title: "Навигационен план. Осигурете своя път към свободата",
    description: "Прегледайте вашето персонализирано предложение – вашият план за действие за навигация през Квантовия тунел и постигане на маркетингова свобода."
  },
  {
    year: "Етап 5",
    title: "Активирайте своя Квантов двигател. Внедрете AI работни процеси",
    description: "Нашият екип експертно инсталира вашите AI работни процеси, интегрирайки ги безпроблемно, за да захранват вашето пътуване през тунела."
  },
  {
    year: "Етап 6",
    title: "Излезте освободени. Стартирайте с AI автоматизация",
    description: "Вашият AI-powered маркетинг вече е активен! Започнете да изпитвате освобождаване от пречките и виждайте незабавни резултати."
  },
  {
    year: "Етап 7",
    title: "Приходно преплитане. Постигнете постоянен растеж",
    description: "Прегърнете дълбоката връзка на Приходното преплитане, наблюдавайте как лийдовете нарастват, ROI се умножава, и вашият поток от приходи става постоянно подобрен от AI."
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
          Пътека на успеха
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
                Запазете час
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
