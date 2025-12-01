import React, { useState, useRef } from "react";
import {
  ChevronDown,
  User,
  Stethoscope,
  Code,
  Hospital,
  IdCard,
  Droplets,
  Info,
  ShieldCheck,
  PlusSquare,
  Calendar,
  FileText,
  Smartphone,
  X,
  Menu,
} from "lucide-react";
import { Search, Video, Home, Building2, Briefcase, LogIn, HelpCircle, Users , InfoIcon } from "lucide-react";

import { Link } from "react-router-dom";


const navItems = [
  {
    label: "Find a Trainer",
    path: "/trainers",
  },
  
  {
    label: "For Trainers",
    path: "/for-trainers",
    submenu: [
      { icon: <Briefcase size={20} />, label: "Why Join Us?", path: "/for-trainers" },
      { icon: <LogIn size={20} />, label: "Trainer Registration", path: "/register-trainer" },
      { icon: <HelpCircle size={20} />, label: "Trainer FAQ", path: "/trainer-faq" },
    ],
  },
  {
    label: "How it Works",
    path: "/how-it-works",
    // submenu: [],
  },
  {
    label: "Our Story",
    path: "/our-story",
    // submenu: [],
  },
  // {
  //   label: "Contact",
  //   path: "/contact",
  //   // submenu: [],
  // },
];

const DropdownMenu = ({ submenu }) => {
  const [highlightStyle, setHighlightStyle] = useState({ opacity: 0 });
  const listRef = useRef(null);

  const moveHighlight = (e) => {
    if (listRef.current) {
      const item = e.currentTarget;
      setHighlightStyle({
        opacity: 1,
        width: `${item.offsetWidth}px`,
        height: `${item.offsetHeight}px`,
        transform: `translateY(${item.offsetTop}px)`,
      });
    }
  };

  const hideHighlight = () => {
    setHighlightStyle({ ...highlightStyle, opacity: 0 });
  };

  return (
    <div className="absolute top-full left-0 mt-2 w-72 bg-white text-dark rounded-xl shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 overflow-hidden">
      <ul className="relative py-2" ref={listRef} onMouseLeave={hideHighlight}>
        <div
          className="absolute left-2 right-2 rounded-lg transition-all duration-200 ease-out"
          style={{ ...highlightStyle, zIndex: 0 }}
        />
        {submenu.map((sub, j) => (
          <li
            key={j}
            className="relative z-10 flex items-center space-x-3 px-5 py-3 cursor-pointer hover:bg-gray-100 transition-colors duration-300"
            onMouseEnter={moveHighlight}
          >
            <Link to={sub.path} className="flex items-center space-x-3 w-full">
              <span className="w-9 h-9 flex items-center justify-center rounded-md bg-offwhite text-primary">
                {sub.icon}
              </span>
              <span className="font-400 text-base">{sub.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const token = localStorage.getItem("token");
  

  return (
   <header className="bg-primary text-white shadow-md md:shadow-none sticky top-0 z-50">
  <div className="max-w-7xl mx-auto flex items-center justify-between px-6 ">
    {/* Logo */}
    <div className="flex items-center space-x-2">
      <Link to="/">
        <img src="/images/logo1.svg" alt="Logo" className="h-[100px]  w-full object-covr " />
      </Link>
    </div>

    {/* Desktop Nav */}
    <nav className="hidden md:flex items-center space-x-2">
      {navItems.map((item, i) => (
        <div key={i} className="relative group">
          <Link
            to={item.path}

            className="flex items-center space-x-1 font-400 text-[16px] px-4 py-2 transition-all duration-300 hover:text-gray-200 hover:bg-gray-200/10 rounded-md"
          >
            <span>{item.label}</span>
            {item?.submenu?.length > 0 && (
              <ChevronDown
                size={18}
                className="mt-0.5 transition-transform duration-300 group-hover:rotate-180"
              />
            )}
          </Link>
          {item?.submenu?.length > 0 && <DropdownMenu submenu={item.submenu} />}
        </div>
      ))}
    </nav>

    {/* Desktop Buttons */}
    <div className="hidden md:flex items-center space-x-4">
      <Link
        to="/auth?mode=login"
        className="font-500 text-lg hover:text-gray-200 transition-colors"
      >
      {token ? 'Dashboard' : 'Login'}
      </Link>
  
     <Link
        to="/book-free-session"
        className="btn bg-white text-primary hover:bg-gray-100"
      >
        Book Free Session
      </Link>

    </div>

    {/* Mobile Hamburger */}
    <div className="md:hidden">
      <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white">
        {mobileOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
    </div>
  </div>

{/* Mobile Menu */}
{mobileOpen && (
  <div className="md:hidden absolute top-full left-0 w-full bg-white text-dark px-6 py-4 space-y-4 border-t border-light animate-slide-in-up z-50">
    {navItems.map((item, i) => (
      <div key={i}>
        <button
          onClick={() => setOpenIndex(openIndex === i ? null : i)}
          className="w-full flex justify-between items-center font-500 text-[1.1rem] py-2"
        >
          <Link 
            to={item.path} 
            onClick={() => setMobileOpen(false)}  
          >
            {item.label}
          </Link>
          {item?.submenu?.length > 0 && (
            <ChevronDown
              size={18}
              className={`transition-transform duration-300 ${
                openIndex === i ? "rotate-180" : ""
              }`}
            />
          )}
        </button>

        {item?.submenu?.length > 0 && openIndex === i && (
          <ul className="pl-4 mt-2 space-y-2">
            {item.submenu.map((sub, j) => (
              <li key={j}>
                <Link
                  to={sub.path}
                  onClick={() => setMobileOpen(false)}  
                  className="flex items-center space-x-3 py-2 hover:text-primary transition-colors"
                >
                  <span className="w-8 h-8 flex items-center justify-center rounded-md bg-primary/10 text-primary">
                    {sub.icon}
                  </span>
                  <span className="font-500">{sub.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    ))}

    <div className="flex flex-col gap-3 pt-4 border-t border-light">
      <Link
        to="/auth?mode=login"
        onClick={() => setMobileOpen(false)} 
        className="font-500 btn-outline text-center py-2 text-dark rounded-md hover:bg-gray-100 transition-colors"
      >
       {token ? 'Dashboard' : 'Login'}
      </Link>



  <Link
        to="/book-free-session"
        onClick={() => setMobileOpen(false)}
        className="btn bg-primary text-white hover:bg-primary-light text-center"
      >
       Book Free Session
      </Link>

      
    </div>
  </div>
)}

</header>

  );
}

export default Header;
