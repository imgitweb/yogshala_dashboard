// Improved Styled Sidebar.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  Users,
  UserCircle,
  Wallet,
  Building,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { logout } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

// ---------------- Sidebar Structure with Submenus ----------------
const sidebarLinks = {
  trainer: [
    {
      label: "Dashboard",
      path: "/trainer",
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: "Bookings",
      icon: <Users size={20} />,
      children: [
        { label: "Requests", path: "/trainer/requests" },
        { label: "My Schedule", path: "/trainer/schedule" },
      ],
    },
    {
      label: "Earnings",
      path: "/trainer/earnings",
      icon: <Wallet size={20} />,
    },
    {
      label: "Profile",
      icon: <UserCircle size={20} />,
      children: [
        { label: "View Profile", path: "/trainer/profile" },
        { label: "Edit Profile", path: "/trainer/profile/edit" },
      ],
    },
  ],

  user: [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: "Find Trainers",
      path: "/dashboard/trainers",
      icon: <Users size={20} />,
    },
    {
      label: "My Bookings",
      icon: <Calendar size={20} />,
      children: [
        { label: "Upcoming", path: "/dashboard/bookings" },
        { label: "History", path: "/dashboard/bookings/history" },
      ],
    },
    {
      label: "Profile",
      path: "/dashboard/profile",
      icon: <UserCircle size={20} />,
    },
  ],

  admin: [
    {
      label: "Dashboard",
      path: "/admin",
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: "Studios",
      icon: <Building size={20} />,
      children: [
         { label: "Add New Studio", path: "/admin/studios/add" },
        { label: "All Studio List", path: "/admin/studios" },
       
      ],
    },
     {
      label: "Batches",
      icon: <Calendar size={20} />,
      children: [
         { label: "Add New Batch", path: "/admin/add-batch" },
        { label: "All Batch List", path: "/admin/batch-list" },
        { label: "Add Members to Batch", path: "/admin/batches/add-member" },
        { label: "All Batch Members", path: "/admin/batch-member-list" },
      ],
    },
    {
      label: "Manage Trainers",
      icon: <Users size={20} />,
      children: [
        { label: "Add New Trainer", path: "/admin/register-trainer" },
        { label: "All Trainers", path: "/admin/trainers" },
      ],
    },
   
    {
      label: "Members",
      icon: <UserCircle size={20} />,
      children: [
        { label: "Add New Member", path: "/admin/register-member" },
        { label: "All Members", path: "/admin/members" }
        

      ],
    },
    {
      label: "Enquiries",
      icon: <Users size={20} />,
      children: [
        { label: "All Enquiries", path: "/admin/enquiries" },
      ],
    },
    {
      label: "Invoices",
      icon: <Wallet size={20} />,
      children: [
        { label: "Invoice List", path: "/admin/invoice/list" },
        
      ],
    },
  ],
};

// ---------------- Main Sidebar Component ----------------
const Sidebar = ({ role, sidebarOpen, setSidebarOpen, collapsed, setCollapsed }) => {
  const location = useLocation();
  const links = sidebarLinks[role] || [];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openMenus, setOpenMenus] = React.useState({});

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 260 }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
        className={`fixed lg:static z-40 h-screen bg-white/90 backdrop-blur-md border-r border-gray-200 flex flex-col shadow-lg
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} transition-transform duration-300`}
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-5 border-b border-gray-200 bg-white/50 backdrop-blur-md">
          {!collapsed && (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold text-gray-800 tracking-wide w-40 brightness-10"
              src="/images/logo.svg"
              alt="Yogshala Logo"
          
            >
            
            </motion.img>
          )}

          <button
            className="p-2 rounded-lg bg-primary cursor-pointer text-white shadow hover:opacity-90 transition"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto scrollbar-hide">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            const hasChildren = Array.isArray(link.children);

            return (
              <div key={link.label}>
                <button
                  onClick={() => (hasChildren ? toggleMenu(link.label) : navigate(link.path))}
                  className={`flex items-center justify-between w-full gap-4 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 backdrop-blur-sm
                    ${isActive ? "bg-primary text-white shadow" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}
                >
                  <div className="flex items-center gap-4">
                    {link.icon}
                    {!collapsed && <span>{link.label}</span>}
                  </div>

                  {!collapsed && hasChildren && (
                    <motion.span
                      animate={{ rotate: openMenus[link.label] ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-gray-500"
                    >
                      <ChevronRight size={18} />
                    </motion.span>
                  )}
                </button>

                {/* Submenus */}
                <AnimatePresence>
                  {hasChildren && openMenus[link.label] && !collapsed && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="ml-10 mt-1 mb-2 flex flex-col gap-1 border-l border-gray-200 pl-3"
                    >
                      {link.children.map((child) => {
                        const activeChild = location.pathname === child.path;
                        return (
                          <Link
                            key={child.label}
                            to={child.path}
                            onClick={() => setSidebarOpen(false)}
                            className={`px-3 py-2 text-sm rounded-lg transition font-medium
                              ${activeChild ? "bg-offwhite text-primary" : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"}`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-gray-200 px-3 py-4 bg-white/50 backdrop-blur-md">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 w-full px-4 py-2.5 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 font-medium transition-all duration-200"
          >
            <LogOut size={20} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
