import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import {
  MdDashboard,
  MdAddBox,
  MdSettings,
  MdLogout,
  MdMenu,
  MdClose,
} from "react-icons/md";
import { motion } from "framer-motion";

const SIDEBAR_WIDTH_OPEN = 256; // 64 * 4 (Tailwind's w-64)
const SIDEBAR_WIDTH_COLLAPSED = 80; // 20 * 4 (Tailwind's w-20)
const HEADER_HEIGHT = 64; // 16 * 4 (Tailwind's h-16)

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const logoutHandler = async () => {
    setIsLoggingOut(true);
    try {
      await dispatch(logout());
    } catch (error) {
      // handle error
    } finally {
      setIsLoggingOut(false);
    }
  };

  const navItems = [
    { label: "My Ads", to: "/dashboard", icon: <MdDashboard size={24} /> },
    { label: "Create Ad", to: "/dashboard/create-ad", icon: <MdAddBox size={24} /> },
    { label: "Settings", to: "/dashboard/settings", icon: <MdSettings size={24} /> },
  ];

  return (
    <div className="flex bg-gray-900 text-white">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-16 left-0 bottom-0 z-20 bg-gray-800 p-4 space-y-6 transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
        style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}
      >
        {/* Toggle Sidebar Button */}
        <button
          onClick={toggleSidebar}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          className="text-white mb-4 focus:outline-none"
        >
          {isSidebarOpen ? <MdClose size={26} /> : <MdMenu size={26} />}
        </button>

        {/* Sidebar Title */}
        {isSidebarOpen && (
          <h2 className="text-2xl font-bold text-blue-400">Dashboard</h2>
        )}

        {/* Navigation Links */}
        <nav className="space-y-3">
          {navItems.map(({ label, to, icon }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-4 py-2 px-4 rounded transition duration-200 ${
                  isActive ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {icon}
                {isSidebarOpen && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <button
          onClick={logoutHandler}
          className={`flex items-center gap-4 w-full py-2 px-4 rounded transition ${
            isLoggingOut
              ? "bg-red-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-500"
          }`}
          disabled={isLoggingOut}
          aria-disabled={isLoggingOut}
        >
          <MdLogout size={24} />
          {isSidebarOpen && (
            <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
          )}
        </button>
      </motion.aside>

      {/* Main Content */}
      <main
        className={`flex-1 mt-16 transition-all duration-300 overflow-y-auto p-6`}
        style={{
          marginLeft: isSidebarOpen ? SIDEBAR_WIDTH_OPEN : SIDEBAR_WIDTH_COLLAPSED,
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
