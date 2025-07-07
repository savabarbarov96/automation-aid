import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { ContactForm } from "./ContactForm";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Какви видове решения за автоматизация предлагате?",
    answer: "Предлагаме широка гама от решения за автоматизация, включително роботизирана процесна автоматизация (RPA), индустриална автоматизация, системи за интелигентно производство и персонализирани решения за специфичните нужди на индустрията. Нашите решения могат да бъдат интегрирани със съществуващи системи или внедрени като самостоятелни решения.",
  },
  {
    question: "Колко време отнема внедряването?",
    answer: "Времето за внедряване варира в зависимост от сложността и обхвата на проекта. Простите решения за автоматизация могат да бъдат внедрени в рамките на 2-4 седмици, докато по-сложните системи за цялото предприятие могат да отнемат 3-6 месеца. Предоставяме подробни времеви оценки по време на първоначалната консултация.",
  },
  {
    question: "Каква поддръжка предоставяте след внедряването?",
    answer: "Предлагаме цялостна поддръжка след внедряване, включително денонощна техническа помощ, редовни проверки за поддръжка, актуализации на софтуера и услуги за непрекъсната оптимизация. Нашият екип за поддръжка винаги е на разположение, за да отговори на всички въпроси и да гарантира безпроблемната работа на вашите системи за автоматизация.",
  },
  {
    question: "Могат ли вашите решения да се интегрират със съществуващите ни системи?",
    answer: "Да, нашите решения за автоматизация са проектирани да се интегрират безпроблемно с повечето съществуващи системи и софтуер. Извършваме задълбочени оценки на съвместимостта преди внедряването и можем да персонализираме нашите решения, за да работят с вашата текуща инфраструктура.",
  },
  {
    question: "Каква възвръщаемост на инвестицията можем да очакваме?",
    answer: "Въпреки че възвръщаемостта варира според проекта, нашите клиенти обикновено виждат резултати в рамките на 6-12 месеца след внедряването. Това включва намалени оперативни разходи, повишена производителност, подобрена точност и по-добро използване на ресурсите. Предоставяме подробни прогнози за възвръщаемостта по време на фазата на планиране.",
  },
];

export const FAQ = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFormOpen(true);
  };

  return (
    <section id="faq" className="py-24 bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute -top-[500px] -right-[500px] w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-[300px] -left-[300px] w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <HelpCircle className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-4xl font-bold mb-4 text-white">Често Задавани Въпроси</h2>
          <p className="text-lg text-white/70 mx-auto max-w-2xl">
            Намерете отговори на често задавани въпроси за нашите решения и услуги за автоматизация.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Background decorative elements */}
          <div className="absolute -left-24 top-1/4 w-16 h-16 bg-primary/10 rounded-full opacity-50 hidden lg:block"></div>
          <div className="absolute -right-16 top-3/4 w-12 h-12 bg-primary/10 rounded-full opacity-50 hidden lg:block"></div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border border-white/10 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm"
                >
                  <AccordionTrigger className="text-left text-lg font-semibold text-white px-6 py-4 hover:bg-white/5">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/70 px-6 pb-6 pt-2 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12 pt-6 border-t border-white/10"
          >
            <p className="text-white/70">
              Все още имате въпроси? <button 
                onClick={handleContactClick}
                className="text-primary font-medium hover:underline cursor-pointer bg-transparent border-none p-0 inline"
              >
                Свържете се с нас
              </button> за персонализирана консултация.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <ContactForm onSuccess={() => setIsFormOpen(false)} />
        </DialogContent>
      </Dialog>
    </section>
  );
};
