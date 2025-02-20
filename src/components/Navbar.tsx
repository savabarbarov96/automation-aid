
import { useState } from "react";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src="/lovable-uploads/0b1d58aa-e581-427c-b9ac-ba4a7b283d30.png" alt="Quantum Automations Logo" className="h-8" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-accent transition-colors">Features</a>
            <a href="#testimonials" className="text-gray-600 hover:text-accent transition-colors">Testimonials</a>
            <a href="#contact" className="text-gray-600 hover:text-accent transition-colors">Contact</a>
            <button className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent/90 transition-colors">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 animate-slide-in">
            <div className="flex flex-col space-y-4 px-4 py-6">
              <a href="#features" className="text-gray-600 hover:text-accent transition-colors">Features</a>
              <a href="#testimonials" className="text-gray-600 hover:text-accent transition-colors">Testimonials</a>
              <a href="#contact" className="text-gray-600 hover:text-accent transition-colors">Contact</a>
              <button className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent/90 transition-colors w-full">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
