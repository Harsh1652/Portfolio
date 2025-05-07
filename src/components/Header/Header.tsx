
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, FileText } from 'lucide-react';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const menuItems = [
    { title: "Home", href: "#home" },
    { title: "About", href: "#about" },
    { title: "Skills", href: "#skills" },
    { title: "Services", href: "#services" },
    { title: "Projects", href: "#projects" },
    { title: "Testimonials", href: "#testimonials" },
    { title: "Contact", href: "#contact" },
  ];

  const openResume = () => {
    window.open('https://drive.google.com/file/d/1WTa0MMUmavW9f0nB2AjpuU0PNtDPdMK4/view?usp=drive_link', '_blank');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrollPosition > 50 ? "py-3 bg-dark-300/80 backdrop-blur-lg shadow-md" : "py-5"
    }`}>
      <div className="container flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold text-gradient">
          Harsh<span className="text-white">Gupta</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-300"
            >
              {item.title}
            </a>
          ))}
          <Button 
            onClick={openResume}
            className="ml-2 bg-gradient-to-r from-highlight-blue to-highlight-teal hover:opacity-90 transition-opacity"
          >
            <FileText size={16} /> Resume
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-dark-300/95 backdrop-blur-lg z-40 pt-20 px-4 md:hidden">
          <nav className="flex flex-col items-center space-y-6">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg text-gray-300 hover:text-white transition-colors duration-300"
              >
                {item.title}
              </a>
            ))}
            <Button 
              onClick={openResume}
              className="mt-4 bg-gradient-to-r from-highlight-blue to-highlight-teal hover:opacity-90 transition-opacity"
            >
              <FileText size={16} /> Resume
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

