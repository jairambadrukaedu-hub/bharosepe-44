import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Twitter, Linkedin, Instagram, Facebook } from "lucide-react";
import logo from "@/assets/LOGO.png";

const Footer = () => {
  const footerLinks = [
    { name: "How It Works", path: "/how-it-works" },
    { name: "For Buyers", path: "/buyers" },
    { name: "For Sellers", path: "/sellers" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Brand Column */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <img src={logo} alt="Bharose Pe" className="h-12 w-12 rounded-full object-cover" />
              <span className="text-xl font-bold text-primary">Bharose Pe</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Building trust between buyers and sellers with secure, transparent escrow payments.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>connect@bharosepe.co.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91-8374155974</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Ahmedabad, Gujarat, India</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Bharose Pe. All rights reserved.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

