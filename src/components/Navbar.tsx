import { useState, useEffect } from "react";
import { Menu, X, ShieldCheck, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  const mainNavLinks = [
    { name: "Home", href: "/", hash: "" },
  ];

  const aboutLinks = [
    { name: "About", href: "/about", hash: "" },
    { name: "Mission", href: "/#mission", hash: "mission" },
  ];

  const ministriesLinks = [
    { name: "Ministries", href: "/#ministries", hash: "ministries" },
    { name: "Programs", href: "/#programs", hash: "programs" },
  ];

  const involvementLinks = [
    { name: "Compassion", href: "/#compassion-projects", hash: "compassion-projects" },
    { name: "Volunteer", href: "/#get-involved", hash: "get-involved" },
    { name: "Events", href: "/#events", hash: "events" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      setIsAdmin(!!token);
    };

    window.addEventListener("scroll", handleScroll);
    checkAuthStatus();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (link: {name: string, href: string, hash: string}, e: React.MouseEvent) => {
    if (link.hash && link.href.startsWith('/#')) {
      e.preventDefault();
      if (location.pathname === '/') {
        const element = document.getElementById(link.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', `/#${link.hash}`);
        }
      } else {
        window.location.href = link.href;
      }
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 sm:px-8 py-4",
        isScrolled ? "glass border-b border-white/10" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-semibold tracking-tight text-primary">Live Message</span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-2">
          <ul className="flex gap-6">
            {mainNavLinks.map((link) => (
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

            {/* About Dropdown */}
            <li className="relative group">
              <button className="text-sm text-foreground/90 hover:text-primary transition-colors duration-200 flex items-center gap-1">
                About
                <ChevronDown className="h-4 w-4 opacity-70" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  {aboutLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={(e) => handleNavigation(link, e)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-accent/10"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </li>

            {/* Ministries Dropdown */}
            <li className="relative group">
              <button className="text-sm text-foreground/90 hover:text-primary transition-colors duration-200 flex items-center gap-1">
                Ministries
                <ChevronDown className="h-4 w-4 opacity-70" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  {ministriesLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={(e) => handleNavigation(link, e)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-accent/10"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </li>

            {/* Involvement Dropdown */}
            <li className="relative group">
              <button className="text-sm text-foreground/90 hover:text-primary transition-colors duration-200 flex items-center gap-1">
                Involvement
                <ChevronDown className="h-4 w-4 opacity-70" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  {involvementLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={(e) => handleNavigation(link, e)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-accent/10"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
          </ul>

          <Link
            to={isAdmin ? "/admin/dashboard" : "/admin/login"}
            className="text-sm text-foreground/50 hover:text-primary transition-colors duration-200 flex items-center gap-1 ml-4"
          >
            <ShieldCheck className="h-3 w-3" />
            <span className="text-xs">{isAdmin ? "Dashboard" : "Admin"}</span>
          </Link>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-foreground focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={cn(
          "fixed inset-x-0 top-[72px] glass md:hidden transition-all duration-300 ease-in-out",
          isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"
        )}
      >
        <div className="p-6 space-y-4 divide-y divide-gray-200/20">
          {mainNavLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="block py-2 text-base text-foreground/80 hover:text-primary transition-colors"
              onClick={(e) => handleNavigation(link, e)}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-2">
            <p className="py-1 text-sm font-semibold text-accent">About</p>
            {aboutLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block py-2 pl-2 text-base text-foreground/80 hover:text-primary transition-colors"
                onClick={(e) => handleNavigation(link, e)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2">
            <p className="py-1 text-sm font-semibold text-accent">Ministries</p>
            {ministriesLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block py-2 pl-2 text-base text-foreground/80 hover:text-primary transition-colors"
                onClick={(e) => handleNavigation(link, e)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2">
            <p className="py-1 text-sm font-semibold text-accent">Involvement</p>
            {involvementLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block py-2 pl-2 text-base text-foreground/80 hover:text-primary transition-colors"
                onClick={(e) => handleNavigation(link, e)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <Link
            to={isAdmin ? "/admin/dashboard" : "/admin/login"}
            className="block py-2 text-base text-foreground/80 hover:text-primary transition-colors flex items-center gap-2"
          >
            <ShieldCheck className="h-4 w-4" />
            <span>{isAdmin ? "Admin Dashboard" : "Admin Login"}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
