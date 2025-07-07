import { ArrowRight, Calendar, Building2, UtensilsCrossed, Dumbbell } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { ContactForm } from "../ContactForm";
import { CalendarBooking } from "../CalendarBooking";
import { useState, useEffect } from "react";

export const HeroContent = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
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
            Специализирани 
            <br />
            <span className="text-primary">AI решения</span>
            <br />
            за вашата индустрия
          </>
        ) : (
          <>
            Специализирани <span className="text-primary">AI решения</span>
            <br />
            за недвижими имоти, туризъм и фитнес
          </>
        )}
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-cool-300/90 mb-6 sm:mb-8 animate-fade-in max-w-2xl" style={{ animationDelay: "0.2s" }}>
        ImotiDesk за брокерски агенции, MenuMaster за ресторанти, FitManager за фитнес зали - доказани решения за българския пазар
      </p>

      {/* Industry highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
          <Building2 className="h-6 w-6 text-primary" />
          <div>
            <p className="text-white font-medium text-sm">Недвижими имоти</p>
            <p className="text-white/70 text-xs">ImotiDesk CRM</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
          <UtensilsCrossed className="h-6 w-6 text-primary" />
          <div>
            <p className="text-white font-medium text-sm">Туризъм</p>
            <p className="text-white/70 text-xs">MenuMaster & Villa Pro</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
          <Dumbbell className="h-6 w-6 text-primary" />
          <div>
            <p className="text-white font-medium text-sm">Фитнес</p>
            <p className="text-white/70 text-xs">FitManager & AI планове</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 sm:gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <DialogTrigger asChild>
            <button className="font-inter bg-primary text-[#000080] px-5 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-primary/90 transition-all transform hover:scale-105 flex items-center gap-2 text-base sm:text-lg font-medium shadow-lg">
              <Calendar size={isMobile ? 16 : 20} />
              Резервирай консултация
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden">
            <CalendarBooking />
          </DialogContent>
        </Dialog>

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <button className="font-inter bg-accent/10 text-accent px-5 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-accent/20 transition-all transform hover:scale-105 flex items-center gap-2 text-base sm:text-lg font-medium border border-accent/20">
              Свържете се <ArrowRight size={isMobile ? 16 : 20} />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <ContactForm onSuccess={() => setIsFormOpen(false)} />
          </DialogContent>
        </Dialog>
        
        <button 
          onClick={scrollToJourney}
          className="font-inter bg-white/5 text-white px-5 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-white/10 transition-all transform hover:scale-105 text-base sm:text-lg font-medium border border-white/20"
        >
          Научете повече
        </button>
      </div>
    </div>
  );
};
