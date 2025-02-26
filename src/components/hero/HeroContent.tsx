
import { ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { ContactForm } from "../ContactForm";
import { useState } from "react";

export const HeroContent = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const scrollToJourney = () => {
    const element = document.getElementById('journey');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="text-left px-4 md:px-0">
      <h1 className="font-inter text-3xl md:text-4xl lg:text-6xl font-bold text-cool-300 mb-6 animate-fade-in leading-tight max-w-[90vw] md:max-w-none">
        Трансформирайте Бизнеса си с AI Автоматизация
      </h1>
      <p className="text-lg md:text-xl text-cool-300/90 mb-8 animate-fade-in max-w-2xl" style={{ animationDelay: "0.2s" }}>
        Интегрирайте интелигентни AI решения и автоматизация за оптимизиране на вашите бизнес операции
      </p>
      <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <button className="font-inter bg-primary text-[#000080] px-8 py-3 rounded-lg hover:bg-primary/90 transition-all transform hover:scale-105 flex items-center gap-2 text-lg font-medium shadow-lg">
              Започнете сега <ArrowRight size={20} />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] h-[90vh] sm:h-auto overflow-y-auto">
            <ContactForm onSuccess={() => setIsFormOpen(false)} />
          </DialogContent>
        </Dialog>
        <button 
          onClick={scrollToJourney}
          className="font-inter bg-accent/10 text-accent px-8 py-3 rounded-lg hover:bg-accent/20 transition-all transform hover:scale-105 text-lg font-medium border border-accent/20"
        >
          Научете повече
        </button>
      </div>
    </div>
  );
};
