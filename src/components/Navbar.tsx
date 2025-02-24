
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/5 backdrop-blur-md z-50 border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center -ml-4">
            <Link to="/">
              <img src="/lovable-uploads/52b283b3-b8fa-4361-a7e5-f23ad7ab3166.png" alt="Automation Aid Logo" className="h-28" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
            <a href="#work" className="text-white/80 hover:text-white transition-colors">Our Work</a>
            <a href="#journey" className="text-white/80 hover:text-white transition-colors">Journey</a>
            <a href="#testimonials" className="text-white/80 hover:text-white transition-colors">Testimonials</a>
            <a href="#faq" className="text-white/80 hover:text-white transition-colors">FAQ</a>
            <Link to="/resources" className="text-white/80 hover:text-white transition-colors">Resources</Link>
            <Button asChild>
              <Link to="#contact">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-24 left-0 right-0 bg-white/5 backdrop-blur-md border-b border-white/10 animate-slide-in">
            <div className="flex flex-col space-y-4 px-4 py-6">
              <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
              <a href="#work" className="text-white/80 hover:text-white transition-colors">Our Work</a>
              <a href="#journey" className="text-white/80 hover:text-white transition-colors">Journey</a>
              <a href="#testimonials" className="text-white/80 hover:text-white transition-colors">Testimonials</a>
              <a href="#faq" className="text-white/80 hover:text-white transition-colors">FAQ</a>
              <Link to="/resources" className="text-white/80 hover:text-white transition-colors">Resources</Link>
              <Button asChild className="w-full">
                <Link to="#contact">Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
