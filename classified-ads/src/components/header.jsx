import { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const isLogin = true; // Replace with real auth logic
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

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
    <header className="flex justify-between items-center px-4 sm:px-6 py-4 bg-white shadow-md relative z-50">
      {/* Logo */}
      <div
        className="text-2xl sm:text-3xl font-bold text-blue-700 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <span className="text-gray-800">Ujala</span> Classified
      </div>

      {/* Auth Section */}
      <div className="relative" ref={dropdownRef}>
        {isLogin ? (
          <div
            className="flex items-center gap-2 sm:gap-3 cursor-pointer"
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
            className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}

        {/* Dropdown with Framer Motion */}
        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              key="dropdown"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-3 w-44 sm:w-48 bg-white border border-gray-200 rounded shadow-md z-50"
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
  );
}

export default Header;
