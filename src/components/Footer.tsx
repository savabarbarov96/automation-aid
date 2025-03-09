
import { Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-background/50 backdrop-blur-lg py-8 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Страници</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="text-white/60 hover:text-white transition-colors">Функционалности</a></li>
              <li><a href="#work" className="text-white/60 hover:text-white transition-colors">Нашата Работа</a></li>
              <li><a href="#journey" className="text-white/60 hover:text-white transition-colors">Процес</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Ресурси</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/resources" className="text-white/60 hover:text-white transition-colors">Ресурси</Link></li>
              <li><Link to="/blog" className="text-white/60 hover:text-white transition-colors">Блог</Link></li>
              <li><a href="#testimonials" className="text-white/60 hover:text-white transition-colors">Отзиви</a></li>
              <li><a href="#faq" className="text-white/60 hover:text-white transition-colors">Въпроси</a></li>
            </ul>
          </div>

          <div className="space-y-4 col-span-2 md:col-span-2">
            <h3 className="text-sm font-semibold text-white">Контакти</h3>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.linkedin.com/in/ghanem-mahmoud/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/60 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Automation Aid. Всички права запазени.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
