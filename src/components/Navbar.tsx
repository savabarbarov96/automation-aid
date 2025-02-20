
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center">
            <img src="/lovable-uploads/0b1d58aa-e581-427c-b9ac-ba4a7b283d30.png" alt="Quantum Automations Logo" className="h-20" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Features</a>
            <a href="#testimonials" className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Testimonials</a>
            <a href="#contact" className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Contact</a>
            <ThemeToggle />
            <button className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button onClick={() => setIsOpen(!isOpen)} className="text-black dark:text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-24 left-0 right-0 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 animate-slide-in">
            <div className="flex flex-col space-y-4 px-4 py-6">
              <a href="#features" className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Features</a>
              <a href="#testimonials" className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Testimonials</a>
              <a href="#contact" className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Contact</a>
              <button className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors w-full">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
