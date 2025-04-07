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

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  const navItems = [
    { label: "My Ads", to: "/dashboard", icon: <MdDashboard size={24} /> },
    { label: "Create Ad", to: "/dashboard/create-ad", icon: <MdAddBox size={24} /> },
    { label: "Settings", to: "/dashboard/settings", icon: <MdSettings size={24} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 h-screen p-4 space-y-6 transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="text-white mb-4 focus:outline-none"
        >
          {isSidebarOpen ? <MdClose size={26} /> : <MdMenu size={26} />}
        </button>

        {/* Title */}
        {isSidebarOpen && (
          <h2 className="text-2xl font-bold text-blue-400">Dashboard</h2>
        )}

        {/* Navigation */}
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
              >
                {icon}
                {isSidebarOpen && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          onClick={logoutHandler}
          className="flex items-center gap-4 w-full py-2 px-4 bg-red-600 hover:bg-red-500 rounded transition"
        >
          <MdLogout size={24} />
          {isSidebarOpen && <span>Logout</span>}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
