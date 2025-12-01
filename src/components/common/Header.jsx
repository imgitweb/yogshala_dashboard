// src/components/common/Header.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Search, ChevronDown, LogOut, Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Header = ({ role, onMenuClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {user} = useSelector((state) => state.auth);
  console.log("User in Header:", user);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = () => {
     dispatch(logout());
     navigate("/");
   };
 
  return (
    <header className="h-20 bg-light border-b border-light flex items-center justify-between px-6 md:px-10 sticky top-0 z-20 shadow-sm">
      <div className="flex items-center gap-4">
        <button
           className="p-2 rounded-lg bg-primary cursor-pointer text-white transition lg:hidden md:hidden"
          onClick={onMenuClick}
        >
          <Menu size={20}  className="text-white bg-primary " />
        </button>

        <motion.h1
          className="text-xl font-700 hidden md:block lg:block text-dark capitalize"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {role} Dashboard
        </motion.h1>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <div className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-md border border-light bg-offwhite focus:outline-none focus:ring-2 focus:ring-primary w-56 text-sm text-dark placeholder:text-muted transition"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-muted" />
        </div>

        <button className="relative p-2 rounded-full hover:bg-offwhite transition">
          <Bell size={20} className="text-muted" />
        </button>

        <div className="relative">
          <button
            className="flex items-center gap-2 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold uppercase">
            <img
              src={user?.profilePicture || '/default-avatar.png'}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            </div>
            <ChevronDown
              size={18}
              className={`text-muted transition-transform ${menuOpen ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-light border border-light rounded-xl shadow-lg overflow-hidden z-30"
              >
                <div
                  onClick={() =>{
                    navigate('/trainer/profile');
                    setMenuOpen(false);
                  } }
                
                className="px-4 py-3 border-b border-light">
                  <p className="text-sm font-semibold text-dark capitalize">{user?.fullName}</p>
                  <p className="text-xs text-muted">yogshala.ai</p>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm text-dark hover:bg-offwhite transition"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;
