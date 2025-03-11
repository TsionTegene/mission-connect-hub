
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const navLinks = [
    { name: "Home", href: "/", hash: "#hero" },
    { name: "About", href: "/about", hash: "" },
    { name: "Mission", href: "/", hash: "#mission" },
    { name: "Ministries", href: "/", hash: "#ministries" },
    { name: "Programs", href: "/", hash: "#programs" },
    { name: "Compassion", href: "/", hash: "#compassion-projects" },
    { name: "Events", href: "/", hash: "#events" },
    { name: "Get Involved", href: "/", hash: "#get-involved" },
    { name: "Donate", href: "/", hash: "#donate" }
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

  const getHref = (link: typeof navLinks[0]) => {
    if (link.hash && location.pathname === link.href) {
      return link.hash;
    }
    return link.href;
  };

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
        <Link to="/" className="flex items-center">
          <span className="text-xl font-semibold tracking-tight text-primary">Grace Mission</span>
        </Link>
        
        {/* Desktop menu */}
        <ul className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={getHref(link)}
                className="text-sm text-foreground/90 hover:text-primary transition-colors duration-200"
              >
                {link.name}
              </Link>
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
            <Link
              key={link.name}
              to={getHref(link)}
              className="block py-2 text-base text-foreground/80 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
