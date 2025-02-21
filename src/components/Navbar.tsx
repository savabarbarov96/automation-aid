
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

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
            <Link to="/#features" className="text-gray-800 hover:text-primary transition-colors">Features</Link>
            <Link to="/#testimonials" className="text-gray-800 hover:text-primary transition-colors">Testimonials</Link>
            <Link to="/blog" className="text-gray-800 hover:text-primary transition-colors">Blog</Link>
            <Link to="/#contact" className="text-gray-800 hover:text-primary transition-colors">Contact</Link>
            <button className="bg-primary text-[#000080] px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              Get Started
            </button>
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
              <Link to="/#features" className="text-gray-800 hover:text-primary transition-colors">Features</Link>
              <Link to="/#testimonials" className="text-gray-800 hover:text-primary transition-colors">Testimonials</Link>
              <Link to="/blog" className="text-gray-800 hover:text-primary transition-colors">Blog</Link>
              <Link to="/#contact" className="text-gray-800 hover:text-primary transition-colors">Contact</Link>
              <button className="bg-primary text-[#000080] px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors w-full">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
