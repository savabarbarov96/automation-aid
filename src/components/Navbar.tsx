import { useState, useEffect } from "react";
import { Menu, X, ChevronRight, MessageSquare, Phone, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { ContactForm } from "./ContactForm";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll events to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleGetStarted = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFormOpen(true);
  };

  const menuItems = [
    { href: "#features", label: "Функционалности", icon: <ChevronRight className="h-4 w-4" /> },
    { href: "#work", label: "Нашата Работа", icon: <ChevronRight className="h-4 w-4" /> },
    { href: "#journey", label: "Процес", icon: <ChevronRight className="h-4 w-4" /> },
    { href: "#testimonials", label: "Отзиви", icon: <ChevronRight className="h-4 w-4" /> },
    { href: "#faq", label: "Въпроси", icon: <ChevronRight className="h-4 w-4" /> },
    { href: "/blog", label: "Блог", isLink: true, icon: <ChevronRight className="h-4 w-4" /> }
  ];

  const contactMethods = [
    { icon: <Phone className="h-5 w-5" />, label: "Телефон", value: "+359 888 123 456" },
    { icon: <Mail className="h-5 w-5" />, label: "Имейл", value: "contact@automation-aid.com" }
  ];

  return (
    <div className="relative">
      <nav 
        className={cn(
          "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300",
          scrolled 
            ? "bg-background/90 backdrop-blur-lg shadow-lg py-2" 
            : "bg-white/5 backdrop-blur-md py-4"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link to="/" className="transition-transform duration-300">
                <img 
                  src="/lovable-uploads/5f0bce7a-38e6-4daf-b989-6c44279836ea.png" 
                  alt="Automation Aid Logo" 
                  className={cn(
                    "w-auto transition-all duration-300",
                    scrolled ? "h-12" : "h-16"
                  )}
                />
              </Link>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8 mx-auto">
              {menuItems.map((item, index) => (
                item.isLink ? (
                  <Link
                    key={index}
                    to={item.href}
                    className="text-white hover:text-primary transition-colors duration-300 font-medium tracking-wide"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={index}
                    href={item.href}
                    className="text-white hover:text-primary transition-colors duration-300 font-medium tracking-wide"
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
                  className={cn(
                    "hidden md:inline-flex bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold transition-all duration-300",
                    scrolled ? "px-4 py-2 text-sm" : "px-5 py-2.5"
                  )}
                >
                  Свържете се
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <ContactForm onSuccess={() => setIsFormOpen(false)} />
              </DialogContent>
            </Dialog>

            {/* Mobile Menu Button */}
            <div className="md:hidden z-[9999]">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-white p-2 rounded-full bg-primary/20 hover:bg-primary/30 transition-colors"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Simplified Mobile Menu - Plain HTML/CSS approach */}
      <div 
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 z-[999]' : 'opacity-0 pointer-events-none -z-10'
        }`}
        onClick={() => setIsOpen(false)}
      />
      
      <div 
        className={`fixed top-0 right-0 bottom-0 w-[300px] bg-gradient-to-br from-background via-background/95 to-background/90 shadow-2xl overflow-hidden transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0 z-[1000]' : 'translate-x-full -z-10'
        }`}
        style={{
          boxShadow: "0 0 25px rgba(0, 0, 0, 0.3), 0 0 15px rgba(59, 130, 246, 0.2)"
        }}
      >
        {/* Header with close button */}
        <div className="flex justify-between items-center p-5 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Меню</h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Menu items */}
        <div className="h-[calc(100%-170px)] overflow-y-auto py-4 scrollbar-hide">
          <div className="px-4 pb-4">
            {menuItems.map((item, index) => (
              <div key={index} className="mb-1">
                {item.isLink ? (
                  <Link
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-3 rounded-lg text-white hover:bg-white/10 transition-all duration-200 group"
                  >
                    <span className="text-lg font-medium">{item.label}</span>
                    <div className="text-white/50 group-hover:text-primary transition-colors">
                      {item.icon}
                    </div>
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-3 rounded-lg text-white hover:bg-white/10 transition-all duration-200 group"
                  >
                    <span className="text-lg font-medium">{item.label}</span>
                    <div className="text-white/50 group-hover:text-primary transition-colors">
                      {item.icon}
                    </div>
                  </a>
                )}
              </div>
            ))}
          </div>
          
          {/* Contact info section */}
          <div className="mt-4 px-4 py-5 border-t border-white/10">
            <h3 className="text-white/80 font-medium px-3 mb-3">Контакти</h3>
            
            <div className="space-y-3 mb-5">
              {contactMethods.map((method, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5"
                >
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    {method.icon}
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">{method.label}</p>
                    <p className="text-white font-medium">{method.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Contact button */}
        <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-white/10">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                onClick={() => {
                  setIsFormOpen(true);
                  setIsOpen(false);
                }}
                className="w-full py-6 text-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-medium group"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Изпратете запитване
                <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <ContactForm onSuccess={() => setIsFormOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
