import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const navLinks = [
    { name: "Home", href: "/", hash: "" },
    { name: "About", href: "/about", hash: "" },
    { name: "Mission", href: "/#mission", hash: "mission" },
    { name: "Ministries", href: "/#ministries", hash: "ministries" },
    { name: "Programs", href: "/#programs", hash: "programs" },
    { name: "Compassion", href: "/#compassion-projects", hash: "compassion-projects" },
    { name: "Events", href: "/#events", hash: "events" },
    { name: "Get Involved", href: "/#get-involved", hash: "get-involved" }
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

  const handleNavigation = (link: typeof navLinks[0], e: React.MouseEvent) => {
    // Only for links with hash on the home page
    if (link.hash && link.href.startsWith('/#')) {
      e.preventDefault();
      
      // If we're already on the homepage, just scroll to the section
      if (location.pathname === '/') {
        const element = document.getElementById(link.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', `/#${link.hash}`);
        }
      } else {
        // Otherwise, navigate to homepage with hash
        window.location.href = link.href;
      }
      
      // Close mobile menu if open
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    }
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
          <span className="text-xl font-semibold tracking-tight text-primary">Live Message</span>
        </Link>
        
        {/* Desktop menu */}
        <ul className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.href}
                onClick={(e) => handleNavigation(link, e)}
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
              to={link.href}
              className="block py-2 text-base text-foreground/80 hover:text-primary transition-colors"
              onClick={(e) => handleNavigation(link, e)}
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
