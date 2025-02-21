
import { Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-muted py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-white/80 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-white/80 hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-white/80 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Solutions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Solutions</h3>
            <ul className="space-y-2">
              <li><Link to="/automation" className="text-white/80 hover:text-white transition-colors">Automation</Link></li>
              <li><Link to="/analytics" className="text-white/80 hover:text-white transition-colors">Analytics</Link></li>
              <li><Link to="/integrations" className="text-white/80 hover:text-white transition-colors">Integrations</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-white/80 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/documentation" className="text-white/80 hover:text-white transition-colors">Documentation</Link></li>
              <li><Link to="/support" className="text-white/80 hover:text-white transition-colors">Support</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-white/80 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-white/80 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/cookies" className="text-white/80 hover:text-white transition-colors">Cookie Policy</Link></li>
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
              © 2024 Quantum Automations. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

