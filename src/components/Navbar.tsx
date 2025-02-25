
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { ContactForm } from "./ContactForm";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFormOpen(true);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/10 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="transition-transform duration-300 hover:scale-105">
              <img 
                src="/lovable-uploads/5f0bce7a-38e6-4daf-b989-6c44279836ea.png" 
                alt="Automation Aid Logo" 
                className="h-16 w-auto" // Increased logo size
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
              { href: "/resources", label: "Ресурси", isLink: true }
            ].map((item, index) => (
              item.isLink ? (
                <Link
                  key={index}
                  to={item.href}
                  className="relative text-white/80 hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-primary after:left-0 after:bottom-0 after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={index}
                  href={item.href}
                  className="relative text-white/80 hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-primary after:left-0 after:bottom-0 after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300"
                >
                  {item.label}
                </a>
              )
            ))}
          </div>

          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={handleGetStarted} 
                className="hidden md:inline-flex bg-primary/20 backdrop-blur-sm border border-primary/30 text-white hover:bg-primary/30 transition-all duration-300 transform hover:scale-105"
              >
                Свържете се
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <ContactForm onSuccess={() => setIsFormOpen(false)} />
            </DialogContent>
          </Dialog>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden absolute top-20 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-b border-white/10 transition-all duration-300 transform ${
            isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          }`}
        >
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
      </div>
    </nav>
  );
};
