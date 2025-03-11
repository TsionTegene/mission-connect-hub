
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Organization Info */}
          <div>
            <h3 className="text-xl font-medium mb-4">Grace Mission</h3>
            <p className="text-primary-foreground/80 mb-6">
              Bringing hope and positive change to communities around the world through faith, service, and compassion.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#mission" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Our Mission
                </a>
              </li>
              <li>
                <a href="#programs" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Programs
                </a>
              </li>
              <li>
                <a href="#donate" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Donate
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Volunteer
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  News & Updates
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-medium mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-primary-foreground/70 mt-1" />
                <span className="text-primary-foreground/80">
                  123 Compassion Way<br />
                  Hopeville, CA 90210
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-primary-foreground/70" />
                <a href="tel:+11234567890" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-primary-foreground/70" />
                <a href="mailto:info@gracemission.org" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  info@gracemission.org
                </a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-medium mb-4">Stay Connected</h3>
            <p className="text-primary-foreground/80 mb-4">
              Subscribe to our newsletter for updates on our work and impact.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-primary-foreground text-primary rounded-lg hover:bg-primary-foreground/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-primary-foreground/20 text-center text-primary-foreground/60 text-sm">
          <p>© {currentYear} Grace Mission. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
