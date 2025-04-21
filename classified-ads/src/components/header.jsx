import { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const isLogin = true; // Replace with real auth logic
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
    navigate("/");
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dropdownOpen]);

  return (
    <>
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-lg rounded-md relative z-50">
        {/* Left - Hamburger + Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="text-gray-800 hover:text-blue-600 p-2 rounded-full focus:outline-none transition duration-300 transform hover:scale-105"
          >
            <FaBars size={22} />
          </button>

          <div
            className="text-2xl font-bold text-blue-700 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span className="text-gray-800">Ujala</span> Classified
          </div>
        </div>

        {/* Right - Profile/Login */}
        <div className="relative" ref={dropdownRef}>
          {isLogin ? (
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={toggleDropdown}
            >
              <FaUserCircle
                size={26}
                className="text-gray-700 hover:text-blue-600 transition duration-200"
              />
              <span className="hidden sm:inline font-medium text-gray-800">
                Profile
              </span>
            </div>
          ) : (
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition duration-200 transform hover:scale-105"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}

          {/* Dropdown */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50"
              >
                <ul className="text-gray-700 divide-y">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate("/dashboard");
                      setDropdownOpen(false);
                    }}
                  >
                    Dashboard
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 text-red-500 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 rounded-r-xl"
          >
            <div className="flex justify-between items-center px-4 py-6 border-b">
              <h2 className="text-2xl font-semibold text-blue-700">Menu</h2>
              <button
                onClick={toggleSidebar}
                className="text-gray-600 hover:text-red-500 text-2xl"
              >
                ✕
              </button>
            </div>
            <ul className="p-4 space-y-6 text-gray-800 font-medium">
              <li
                onClick={() => {
                  navigate("/");
                  setSidebarOpen(false);
                }}
                className="cursor-pointer hover:text-blue-600 transition duration-200 transform hover:scale-105"
              >
                Home
              </li>
              <li
                onClick={() => {
                  navigate("/about");
                  setSidebarOpen(false);
                }}
                className="cursor-pointer hover:text-blue-600 transition duration-200 transform hover:scale-105"
              >
                About
              </li>
              <li
                onClick={() => {
                  navigate("/tariff");
                  setSidebarOpen(false);
                }}
                className="cursor-pointer hover:text-blue-600 transition duration-200 transform hover:scale-105"
              >
                Tariff
              </li>
              <li
                onClick={() => {
                  navigate("/epaper");
                  setSidebarOpen(false);
                }}
                className="cursor-pointer hover:text-blue-600 transition duration-200 transform hover:scale-105"
              >
                Epaper
              </li>
              <li
                onClick={() => {
                  navigate("/booking");
                  setSidebarOpen(false);
                }}
                className="cursor-pointer hover:text-blue-600 transition duration-200 transform hover:scale-105"
              >
                Booking
              </li>
              <li
                onClick={() => {
                  navigate("/contact");
                  setSidebarOpen(false);
                }}
                className="cursor-pointer hover:text-blue-600 transition duration-200 transform hover:scale-105"
              >
                Contact Us
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
