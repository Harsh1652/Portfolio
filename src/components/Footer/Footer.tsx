
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/UI/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark-400 border-t border-gray-800 py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Info */}
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-4">
              Harsh<span className="text-white">Gupta</span>
            </h3>
            <p className="text-gray-400 mb-6">
              Building secure, scalable, and intelligent systems that solve real-world problems.
            </p>
            <div className="flex space-x-3">
              <Button size="icon" variant="ghost" asChild>
                <a href="https://github.com/Harsh1652" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github size={20} />
                </a>
              </Button>
              <Button size="icon" variant="ghost" asChild>
                <a href="https://linkedin.com/in/harsh-gupta16" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
              </Button>
              <Button size="icon" variant="ghost" asChild>
                <a href="mailto:harsh160502@gmail.com" aria-label="Email">
                  <Mail size={20} />
                </a>
              </Button>
              <Button size="icon" variant="ghost" asChild>
                <a href="tel:+919982346893" aria-label="Phone">
                  <Phone size={20} />
                </a>
              </Button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#projects" className="text-gray-400 hover:text-white transition-colors">Projects</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Services</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="mailto:harsh160502@gmail.com" className="hover:text-white transition-colors flex items-center">
                  <Mail size={16} className="mr-2" /> harsh160502@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+919982346893" className="hover:text-white transition-colors flex items-center">
                  <Phone size={16} className="mr-2" /> +91 9982346893
                </a>
              </li>
              <li>
                <a href="https://github.com/Harsh1652" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center">
                  <Github size={16} className="mr-2" /> Harsh1652
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/harsh-gupta16" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center">
                  <Linkedin size={16} className="mr-2" /> harsh-gupta16
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500">
          <p>© {currentYear} Harsh Gupta. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
