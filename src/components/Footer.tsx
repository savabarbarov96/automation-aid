import { Linkedin, Mail, Phone, MapPin, ChevronRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real application, you would send this to your backend
      console.log("Subscribed with email:", email);
      setSubscribed(true);
      setEmail("");
      // Reset after 3 seconds
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative">
      {/* Wave decoration */}
      <div className="absolute top-0 inset-x-0 -translate-y-full h-16 w-full overflow-hidden">
        <svg viewBox="0 0 1440 54" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M0 27H48C96 27 192 27 288 20.7C384 14.3 480 0.999998 576 0.999998C672 0.999998 768 14.3 864 22.5C960 30.7 1056 33.7 1152 33.7C1248 33.7 1344 30.7 1392 29.2L1440 27V54H1392C1344 54 1248 54 1152 54C1056 54 960 54 864 54C768 54 672 54 576 54C480 54 384 54 288 54C192 54 96 54 48 54H0V27Z" fill="#1E1E2F"/>
        </svg>
      </div>
      
      <div className="bg-background py-16 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Automation Aid</h2>
                <p className="text-white/70 text-sm">Трансформирайте бизнеса си с иновативни решения за автоматизация.</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-white/70 text-sm">София, България</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="text-white/70 text-sm">+359 88 123 4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <a href="mailto:contact@automation-aid.com" className="text-white/70 text-sm hover:text-white">
                    contact@automation-aid.com
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-md font-semibold text-white mb-4">Страници</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#features" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group">
                    <ChevronRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                    <span>Функционалности</span>
                  </a>
                </li>
                <li>
                  <a href="#work" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group">
                    <ChevronRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                    <span>Нашата Работа</span>
                  </a>
                </li>
                <li>
                  <a href="#journey" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group">
                    <ChevronRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                    <span>Процес</span>
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group">
                    <ChevronRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                    <span>Отзиви</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-md font-semibold text-white mb-4">Ресурси</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/resources" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group">
                    <ChevronRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                    <span>Ресурси</span>
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group">
                    <ChevronRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                    <span>Блог</span>
                  </Link>
                </li>
                <li>
                  <a href="#faq" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group">
                    <ChevronRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                    <span>Въпроси</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-md font-semibold text-white">Абонирайте се</h3>
              <p className="text-white/70 text-sm">Получавайте новини и актуализации от нашия екип.</p>
              
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Вашият имейл"
                    className="bg-white/5 border-white/10 text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit" variant="default">
                    {subscribed ? "Готово!" : "Изпрати"}
                  </Button>
                </div>
                {subscribed && (
                  <p className="text-primary text-xs">Благодарим ви за абонамента!</p>
                )}
              </form>
              
              <div className="pt-2">
                <h3 className="text-md font-semibold text-white mb-4">Последвайте ни</h3>
                <div className="flex items-center gap-4">
                  <a 
                    href="https://www.linkedin.com/in/sava-barbarov-79a898232/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-white/10 p-2.5 rounded-full hover:bg-primary/20 transition-colors group"
                  >
                    <Linkedin className="h-5 w-5 text-white group-hover:text-primary" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-6 mt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Automation Aid. Всички права запазени.
            </p>
            <p className="text-white/60 text-sm mt-2 md:mt-0">
              Направено с <Heart className="h-3 w-3 inline text-red-500 mx-1" /> в България
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
