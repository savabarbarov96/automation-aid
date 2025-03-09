import { ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { ContactForm } from "../ContactForm";
import { useState, useEffect } from "react";

export const HeroContent = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToJourney = () => {
    const element = document.getElementById('journey');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="text-left px-2 sm:px-0">
      <h1 className="font-inter text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-cool-300 mb-4 sm:mb-6 animate-fade-in leading-tight tracking-tight">
        {isMobile ? (
          <>
            Трансформирайте 
            <br />
            Бизнеса си с 
            <br />
            <span className="text-primary">AI Автоматизация</span>
          </>
        ) : (
          <>
            Трансформирайте Бизнеса си с 
            <br />
            <span className="text-primary">AI Автоматизация</span>
          </>
        )}
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-cool-300/90 mb-6 sm:mb-8 animate-fade-in max-w-2xl" style={{ animationDelay: "0.2s" }}>
        Интегрирайте интелигентни AI решения и автоматизация за оптимизиране на вашите бизнес операции
      </p>
      <div className="flex flex-wrap gap-3 sm:gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <button className="font-inter bg-primary text-[#000080] px-5 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-primary/90 transition-all transform hover:scale-105 flex items-center gap-2 text-base sm:text-lg font-medium shadow-lg">
              Започнете сега <ArrowRight size={isMobile ? 16 : 20} />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <ContactForm onSuccess={() => setIsFormOpen(false)} />
          </DialogContent>
        </Dialog>
        <button 
          onClick={scrollToJourney}
          className="font-inter bg-accent/10 text-accent px-5 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-accent/20 transition-all transform hover:scale-105 text-base sm:text-lg font-medium border border-accent/20"
        >
          Научете повече
        </button>
      </div>
    </div>
  );
};
