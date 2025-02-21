
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center -ml-4">
            <Link to="/">
              <img src="/lovable-uploads/0b1d58aa-e581-427c-b9ac-ba4a7b283d30.png" alt="Quantum Automations Logo" className="h-28" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-800 hover:text-primary transition-colors">Features</a>
            <a href="#work" className="text-gray-800 hover:text-primary transition-colors">Our Work</a>
            <a href="#journey" className="text-gray-800 hover:text-primary transition-colors">Journey</a>
            <a href="#testimonials" className="text-gray-800 hover:text-primary transition-colors">Testimonials</a>
            <a href="#faq" className="text-gray-800 hover:text-primary transition-colors">FAQ</a>
            <Link to="/resources" className="text-gray-800 hover:text-primary transition-colors">Resources</Link>
            <Button asChild>
              <Link to="#contact">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-24 left-0 right-0 bg-white/95 border-b border-gray-200 animate-slide-in">
            <div className="flex flex-col space-y-4 px-4 py-6">
              <a href="#features" className="text-gray-800 hover:text-primary transition-colors">Features</a>
              <a href="#work" className="text-gray-800 hover:text-primary transition-colors">Our Work</a>
              <a href="#journey" className="text-gray-800 hover:text-primary transition-colors">Journey</a>
              <a href="#testimonials" className="text-gray-800 hover:text-primary transition-colors">Testimonials</a>
              <a href="#faq" className="text-gray-800 hover:text-primary transition-colors">FAQ</a>
              <Link to="/resources" className="text-gray-800 hover:text-primary transition-colors">Resources</Link>
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
