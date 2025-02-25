
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { ContactForm } from "./ContactForm";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleGetStarted = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFormOpen(true);
  };

  return (
    <nav className="fixed w-full bg-white/5 backdrop-blur-md z-50 border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/">
              <img src="/lovable-uploads/5f0bce7a-38e6-4daf-b989-6c44279836ea.png" alt="Automation Aid Logo" className="h-12" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 mx-auto">
            <a href="#features" className="text-white/80 hover:text-white transition-colors">Функционалности</a>
            <a href="#work" className="text-white/80 hover:text-white transition-colors">Нашата Работа</a>
            <a href="#journey" className="text-white/80 hover:text-white transition-colors">Процес</a>
            <a href="#testimonials" className="text-white/80 hover:text-white transition-colors">Отзиви</a>
            <a href="#faq" className="text-white/80 hover:text-white transition-colors">Въпроси</a>
            <Link to="/resources" className="text-white/80 hover:text-white transition-colors">Ресурси</Link>
          </div>

          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleGetStarted} className="hidden md:inline-flex">
                Свържете се
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <ContactForm onSuccess={() => setIsFormOpen(false)} />
            </DialogContent>
          </Dialog>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white/5 backdrop-blur-md border-b border-white/10 animate-slide-in">
            <div className="flex flex-col space-y-4 px-4 py-6">
              <a href="#features" className="text-white/80 hover:text-white transition-colors">Функционалности</a>
              <a href="#work" className="text-white/80 hover:text-white transition-colors">Нашата Работа</a>
              <a href="#journey" className="text-white/80 hover:text-white transition-colors">Процес</a>
              <a href="#testimonials" className="text-white/80 hover:text-white transition-colors">Отзиви</a>
              <a href="#faq" className="text-white/80 hover:text-white transition-colors">Въпроси</a>
              <Link to="/resources" className="text-white/80 hover:text-white transition-colors">Ресурси</Link>
              <Button onClick={handleGetStarted} className="w-full">
                Свържете се
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
