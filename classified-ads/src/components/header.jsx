import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Header() {
  const isLogin = true; // You can replace this with real auth state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow-md relative z-50">
      {/* Logo */}
      <div className="text-3xl font-bold text-blue-700 cursor-pointer">
        <span className="text-gray-800">UC</span> Classified
      </div>

      {/* Auth Section */}
      <div className="relative">
        {isLogin ? (
          <div className="flex items-center gap-2 cursor-pointer" onClick={toggleDropdown}>
            <FaUserCircle size={28} className="text-gray-700 hover:text-blue-600 transition" />
            <span className="font-medium text-gray-800">Profile</span>
          </div>
        ) : (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}

        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-3 bg-white border rounded shadow-md w-48 transition-all animate-fadeIn">
            <ul className="text-gray-700">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                My Profile
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                onClick={() => {
                  // handle logout logic here
                  console.log("Logout");
                }}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
