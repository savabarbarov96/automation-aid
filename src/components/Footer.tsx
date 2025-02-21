
import { Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-muted py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Internal Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Page Sections</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a></li>
              <li><a href="#work" className="text-white/80 hover:text-white transition-colors">Our Work</a></li>
              <li><a href="#journey" className="text-white/80 hover:text-white transition-colors">Journey</a></li>
              <li><a href="#testimonials" className="text-white/80 hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#faq" className="text-white/80 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/resources" className="text-white/80 hover:text-white transition-colors">Resources</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <a 
                href="https://www.linkedin.com/in/ghanem-mahmoud/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/80 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <p className="text-white/80 text-sm">
              © {new Date().getFullYear()} Quantum Automations. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
