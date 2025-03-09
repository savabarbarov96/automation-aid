
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
    <nav className="fixed top-0 left-0 right-0 w-full bg-white/5 backdrop-blur-md z-50 border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="transition-transform duration-300 hover:scale-105">
              <img 
                src="/lovable-uploads/5f0bce7a-38e6-4daf-b989-6c44279836ea.png" 
                alt="Automation Aid Logo" 
                className="h-16 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 mx-auto">
            {[
              { href: "#features", label: "Функционалности" },
              { href: "#work", label: "Нашата Работа" },
              { href: "#journey", label: "Процес" },
              { href: "#testimonials", label: "Отзиви" },
              { href: "#faq", label: "Въпроси" },
              { href: "/blog", label: "Блог", isLink: true }
            ].map((item, index) => (
              item.isLink ? (
                <Link
                  key={index}
                  to={item.href}
                  className="text-white/80 hover:text-white transition-colors duration-300 font-medium tracking-wide"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={index}
                  href={item.href}
                  className="text-white/80 hover:text-white transition-colors duration-300 font-medium tracking-wide"
                >
                  {item.label}
                </a>
              )
            ))}
          </div>

          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleGetStarted} className="hidden md:inline-flex bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold">
                Свържете се
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <ContactForm onSuccess={() => setIsFormOpen(false)} />
            </DialogContent>
          </Dialog>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2 rounded-md hover:bg-white/10">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white/5 backdrop-blur-md border-b border-white/10 transition-all duration-300 animate-fade-in">
            <div className="flex flex-col space-y-4 px-4 py-6">
              <a href="#features" className="text-white/80 hover:text-white transition-colors py-2">Функционалности</a>
              <a href="#work" className="text-white/80 hover:text-white transition-colors py-2">Нашата Работа</a>
              <a href="#journey" className="text-white/80 hover:text-white transition-colors py-2">Процес</a>
              <a href="#testimonials" className="text-white/80 hover:text-white transition-colors py-2">Отзиви</a>
              <a href="#faq" className="text-white/80 hover:text-white transition-colors py-2">Въпроси</a>
              <Link to="/blog" className="text-white/80 hover:text-white transition-colors py-2">Блог</Link>
              <Button onClick={handleGetStarted} className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold mt-4">
                Свържете се
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
