
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
              <img src="/lovable-uploads/52b283b3-b8fa-4361-a7e5-f23ad7ab3166.png" alt="Automation Aid Logo" className="h-16" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 mx-auto">
            <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
            <a href="#work" className="text-white/80 hover:text-white transition-colors">Our Work</a>
            <a href="#journey" className="text-white/80 hover:text-white transition-colors">Journey</a>
            <a href="#testimonials" className="text-white/80 hover:text-white transition-colors">Testimonials</a>
            <a href="#faq" className="text-white/80 hover:text-white transition-colors">FAQ</a>
            <Link to="/resources" className="text-white/80 hover:text-white transition-colors">Resources</Link>
          </div>

          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleGetStarted} className="hidden md:inline-flex">
                Get Started
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
              <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
              <a href="#work" className="text-white/80 hover:text-white transition-colors">Our Work</a>
              <a href="#journey" className="text-white/80 hover:text-white transition-colors">Journey</a>
              <a href="#testimonials" className="text-white/80 hover:text-white transition-colors">Testimonials</a>
              <a href="#faq" className="text-white/80 hover:text-white transition-colors">FAQ</a>
              <Link to="/resources" className="text-white/80 hover:text-white transition-colors">Resources</Link>
              <Button onClick={handleGetStarted} className="w-full">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
