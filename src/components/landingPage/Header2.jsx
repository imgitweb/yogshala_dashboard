import React, { useState } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  X,
  Menu,
} from "lucide-react";
import { Link } from "react-router-dom";

const SocialIcon = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-primary hover:text-primary-light transition duration-300"
  >
    {children}
  </a>
);

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-primary text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        
        {/* Logo */}
        <Link to="/">
          <img
            src="/images/logo1.svg"
            alt="Yogshala Logo"
            className="h-[100px] w-auto object-cover"
          />
        </Link>

        {/* Desktop Social Icons */}
        <div className="hidden md:flex items-center space-x-6 ">
          <SocialIcon href="https://www.facebook.com/Yogshalaai/">
            <Facebook size={24} color="white" 
            className="hover:scale-110 transition-all duration-300"
            />
          </SocialIcon>
          <SocialIcon href="https://x.com/yogshala_ai">
            <Twitter size={24} color="white"
            className="hover:scale-110 transition-all duration-300"
            />
          </SocialIcon>
          <SocialIcon href="https://www.instagram.com/yogshala.ai/">
            <Instagram size={24}
            className="hover:scale-110 transition-all duration-300"
            color="white" />
          </SocialIcon>
          <SocialIcon href="https://www.linkedin.com/company/yogshala-ai/">
            <Linkedin size={24}
            
            className="hover:scale-110 transition-all duration-300"
            color="white" />
          </SocialIcon>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white text-dark px-6 py-6 space-y-6 border-t border-light shadow-lg animate-slide-in-up z-50">

          {/* Mobile Social Icons */}
          <div className="flex items-center justify-between pt-4">
            <SocialIcon href="https://www.facebook.com/Yogshalaai/">
              <Facebook size={26}
              className="hover:scale-110 transition-all duration-300"
              
              />
            </SocialIcon>
            <SocialIcon href="https://x.com/yogshala_ai">
              <Twitter size={26}
              className="hover:scale-110 transition-all duration-300"
              />
            </SocialIcon>
            <SocialIcon href="https://www.instagram.com/yogshala.ai/">
              <Instagram size={26}
              className="hover:scale-110 transition-all duration-300"
              
              />
            </SocialIcon>
            <SocialIcon href="https://www.linkedin.com/company/yogshala-ai/">
              <Linkedin 
              
              className="hover:scale-110 transition-all duration-300"
              size={26} />
            </SocialIcon>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
