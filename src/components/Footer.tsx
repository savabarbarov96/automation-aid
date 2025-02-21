
import { Facebook, Twitter, Linkedin, Instagram, Github } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-muted py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#000080]">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-[#000080] hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-[#000080] hover:text-primary transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-[#000080] hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Solutions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#000080]">Solutions</h3>
            <ul className="space-y-2">
              <li><Link to="/automation" className="text-[#000080] hover:text-primary transition-colors">Automation</Link></li>
              <li><Link to="/analytics" className="text-[#000080] hover:text-primary transition-colors">Analytics</Link></li>
              <li><Link to="/integrations" className="text-[#000080] hover:text-primary transition-colors">Integrations</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#000080]">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-[#000080] hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/documentation" className="text-[#000080] hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link to="/support" className="text-[#000080] hover:text-primary transition-colors">Support</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#000080]">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-[#000080] hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-[#000080] hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/cookies" className="text-[#000080] hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#000080] hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#000080] hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#000080] hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#000080] hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[#000080] hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
            <p className="text-[#000080] text-sm">
              © {new Date().getFullYear()} Your Company Name. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
