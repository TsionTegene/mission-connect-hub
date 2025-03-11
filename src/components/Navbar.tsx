
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Mission", href: "#mission" },
    { name: "Ministries", href: "#ministries" },
    { name: "Programs", href: "#programs" },
    { name: "Compassion", href: "#compassion-projects" },
    { name: "Events", href: "#events" },
    { name: "Get Involved", href: "#get-involved" },
    { name: "Donate", href: "#donate" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 sm:px-8 py-4",
        isScrolled
          ? "glass border-b border-white/10"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#" className="flex items-center">
          <span className="text-xl font-semibold tracking-tight text-primary">Grace Mission</span>
        </a>
        
        {/* Desktop menu */}
        <ul className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-sm text-foreground/90 hover:text-primary transition-colors duration-200"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        
        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-foreground focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-x-0 top-[72px] glass md:hidden transition-all duration-300 ease-in-out",
          isMobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10 pointer-events-none"
        )}
      >
        <div className="p-6 space-y-4 divide-y divide-gray-200/20">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block py-2 text-base text-foreground/80 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
